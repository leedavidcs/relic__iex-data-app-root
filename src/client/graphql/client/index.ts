import { resolvers } from "@/client/graphql/resolvers";
import { defaultState, IClientState } from "@/client/graphql/state";
import {
	ApolloClient,
	defaultDataIdFromObject,
	gql,
	InMemoryCache,
	NormalizedCacheObject
} from "@apollo/client";
import { IncomingMessage } from "http";
import { getLink } from "./links";

interface ICreateCacheOptions {
	initialState?: NormalizedCacheObject;
}

export interface ICreateApolloClientOptions {
	initialState?: NormalizedCacheObject;
	req?: IncomingMessage;
}

export const createCache = (options?: ICreateCacheOptions): InMemoryCache => {
	const { initialState } = { ...options };

	const cache = new InMemoryCache({
		dataIdFromObject: defaultDataIdFromObject
	}).restore(initialState || {});

	if (!initialState?.data) {
		cache.writeQuery<IClientState>({
			query: gql`
				query {
					modal
					toasts {
						intent
						message
					}
					user {
						id
					}
				}
			`,
			data: defaultState
		});
	}

	return cache;
};

const isDevelopmentMode: boolean = process.env.NODE_ENV === "development";

export const createApolloClient = ({
	initialState,
	req
}: ICreateApolloClientOptions): ApolloClient<NormalizedCacheObject> => {
	const isBrowser: boolean = typeof window !== "undefined";
	const connectToDevTools: boolean = isDevelopmentMode;

	const cache: InMemoryCache = createCache({ initialState });

	const client = new ApolloClient({
		cache,
		link: getLink(req),
		resolvers,
		...(isBrowser ? { connectToDevTools } : { ssrMode: true })
	});

	return client;
};
