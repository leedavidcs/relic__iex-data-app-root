import { ModalProvider } from "@/client/components";
import { createApolloClient } from "@/client/graphql";
import { Layout } from "@/client/page-parts";
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from "@apollo/client";
import { IncomingMessage } from "http";
import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

/* eslint-disable no-console */

export interface IWithApolloOptions {
	layout: boolean;
	ssr: boolean;
}

export interface IWithApolloProps {
	apolloClient?: ApolloClient<NormalizedCacheObject>;
	apolloState?: NormalizedCacheObject;
}

interface IInitApolloClientOptions {
	initialState?: NormalizedCacheObject;
	req?: IncomingMessage;
}

const DEFAULT_OPTIONS: IWithApolloOptions = {
	layout: true,
	ssr: true
};

/**
 * @description For the client, the apollo client is stored in the following variable, to prevent
 * the client from reinitializing between page transitions.
 */
let clientSideApolloClient: Maybe<ApolloClient<NormalizedCacheObject>> = null;

const initApolloClient = (
	options: IInitApolloClientOptions
): ApolloClient<NormalizedCacheObject> => {
	const isBrowser = typeof window !== "undefined";

	/**
	 * @description Ensure a new client is created for every server-side request, so that data is
	 *     not shared between connections
	 */
	if (!isBrowser) {
		return createApolloClient(options);
	}

	/** @description Reuse the client on the client-side */
	if (!clientSideApolloClient) {
		clientSideApolloClient = createApolloClient(options);
	}

	return clientSideApolloClient;
};

const initOntoContext = (ctx: NextPageContext): NextPageContext => {
	const { apolloClient, apolloState, req } = ctx;

	const newApolloClient: ApolloClient<NormalizedCacheObject> =
		apolloClient || initApolloClient({ initialState: apolloState, req });

	return { ...ctx, apolloClient: newApolloClient };
};

const preRunGraphQLQueries = async (
	{ AppTree }: NextPageContext,
	pageProps: Record<string, any>,
	apolloClient: ApolloClient<NormalizedCacheObject>
) => {
	try {
		/**
		 * @description Import `@apollo/react-ssr` dynamically. To avoid including this in
		 * the client-side bundle
		 */
		const { getDataFromTree } = await import("@apollo/react-ssr");

		await getDataFromTree(<AppTree pageProps={{ ...pageProps, apolloClient }} />);
	} catch (err) {
		/**
		 * @description Prevent Apollo Client GraphQL errors from crashing SSR.
		 *     Handle them in components via the data.error prop:
		 * @see (@link https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error)
		 */
		console.error("Error while running `getDataFromTree`", err);
	}

	/**
	 * @description `getDataFromTree` does not call `componentWillUnmount`
	 *     head side effect therefore needs to be cleared manually
	 */
	Head.rewind();
};

const getInitialProps = async <P extends Record<string, any>, IP extends Record<string, any>>(
	PageComponent: NextPage<P, IP>,
	ctx: NextPageContext,
	options: IWithApolloOptions
): Promise<IWithApolloProps & IP> => {
	const newCtx = initOntoContext(ctx);
	const { apolloClient } = newCtx;

	const pageProps: IP = ((await PageComponent.getInitialProps?.(newCtx)) || {}) as IP;
	const apolloState: NormalizedCacheObject = apolloClient.cache.extract();

	const isBrowser = typeof window !== "undefined";

	if (isBrowser) {
		return { ...pageProps, apolloState };
	}

	/** @description When redirecting, the response is finished. No need in continuing to render */
	if (newCtx.res?.finished) {
		return pageProps;
	}

	/** @description Pre-run all GraphQL queries, for SSR */
	if (options.ssr) {
		await preRunGraphQLQueries(newCtx, pageProps, apolloClient);
	}

	return { ...pageProps, apolloState };
};

export const withApollo = <
	P extends Record<string, any> = any,
	IP extends Record<string, any> = any
>(
	options: Partial<IWithApolloOptions>
) => (PageComponent: NextPage<P, IP>): NextPage<P, IWithApolloProps & IP> => {
	const finalOptions: IWithApolloOptions = { ...DEFAULT_OPTIONS, ...options };

	const WithApollo: NextPage<P, IWithApolloProps & IP> = ({
		apolloClient,
		apolloState,
		...pageProps
	}) => {
		const client: ApolloClient<NormalizedCacheObject> =
			apolloClient || initApolloClient({ initialState: apolloState });

		const page: ReactElement = finalOptions.layout ? (
			<Layout>
				<PageComponent {...(pageProps as P)} />
			</Layout>
		) : (
			<PageComponent {...(pageProps as P)} />
		);

		return (
			<ApolloProvider client={client}>
				<ModalProvider>{page}</ModalProvider>
			</ApolloProvider>
		);
	};

	if (options.ssr) {
		WithApollo.getInitialProps = (ctx: NextPageContext) => {
			return getInitialProps<P, IWithApolloProps & IP>(PageComponent, ctx, finalOptions);
		};
	}

	return WithApollo;
};
