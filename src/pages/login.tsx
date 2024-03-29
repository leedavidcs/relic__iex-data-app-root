import { Paper } from "@/client/components";
import { SignInForm } from "@/client/forms";
import { withApollo } from "@/client/hocs";
import { CustomTheme } from "@/client/themes";
import { NextPage } from "next";
import { NextRouter, useRouter } from "next/router";
import React, { useCallback } from "react";
import { createUseStyles } from "react-jss";

const BRAND_NAME = process.env.BRAND_NAME;

const styles = (theme: CustomTheme) => ({
	root: {},
	formWrapper: {
		width: 340,
		margin: "0 auto",
		fontFamily: theme.fontPrimary,
		color: theme.onBackground
	},
	formHeader: {
		fontSize: 24,
		textAlign: "center"
	}
});

const useStyles = createUseStyles<CustomTheme, keyof ReturnType<typeof styles>>(styles);

const Page: NextPage = () => {
	const classes = useStyles();

	const router: NextRouter = useRouter();

	const onComplete = useCallback(() => {
		router.push("/");
	}, [router]);

	return (
		<main>
			<div className={classes.formWrapper}>
				<h3 className={classes.formHeader}>Sign in to {BRAND_NAME}</h3>
				<Paper>
					<SignInForm onComplete={onComplete} />
				</Paper>
			</div>
		</main>
	);
};

export default withApollo({ layout: false, ssr: false })(Page);
