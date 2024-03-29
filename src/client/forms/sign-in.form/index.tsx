import { Anchor, Button, TextInput } from "@/client/components";
import { useLogin, useModal } from "@/client/hooks";
import { yupResolver } from "@hookform/resolvers";
import dynamic from "next/dynamic";
import React, { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useStyles } from "./styles";

const SignUpModal = dynamic(() => import("@/client/modals/sign-up.modal"));

interface IFormData {
	password: string;
	userIdentifier: string;
}

interface IProps {
	onComplete?: () => void;
}

/**
 * @todo Should implement this handler later
 * @author David Lee
 * @date February 21, 2019
 */
const useForgotPasswordHandler = () => useCallback(() => undefined, []);

/**
 * @description This is the onClick handler for if the user clicks to sign-up, instead of sign-in.
 */
const useSignUpHandler = () => {
	const { setContent, toggle } = useModal();

	return useCallback(() => {
		setContent({ title: "Sign up", body: <SignUpModal /> });
		toggle(true);
	}, [setContent, toggle]);
};

const resolver = yupResolver<IFormData>(
	yup.object().shape({
		userIdentifier: yup.string().required("Username or email is required"),
		password: yup.string().required("Password is required")
	})
);

export const SignInForm: FC<IProps> = ({ onComplete }) => {
	const classes = useStyles();

	const onClickForgotPassword = useForgotPasswordHandler();
	const onClickSignUp = useSignUpHandler();

	const { control, errors, handleSubmit, setError } = useForm<IFormData>({
		defaultValues: {
			userIdentifier: "",
			password: ""
		},
		criteriaMode: "all",
		resolver
	});

	const { toggle } = useModal();
	const [login] = useLogin({
		onCompleted: () => {
			toggle(false);

			onComplete?.();
		}
	});

	const onSubmit = useCallback(
		async (data: IFormData) => {
			try {
				const loginResult = await login({ input: data });

				if (loginResult.errors || !loginResult.data?.loginLocalUser) {
					throw new Error("Invalid username/password");
				}
			} catch (err) {
				setError("password", {
					type: "invalid",
					message: "Username/Password combination is invalid"
				});
			}
		},
		[login, setError]
	);

	return (
		<div>
			<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
				<TextInput
					className={classes.textInput}
					label="Username or Email"
					name="userIdentifier"
					error={errors.userIdentifier?.message}
					control={control}
				/>
				<TextInput
					className={classes.textInput}
					label="Password"
					name="password"
					type="password"
					error={errors.password?.message}
					control={control}
				/>
				<div className={classes.btnContainer}>
					<Button intent="primary" type="submit">
						SIGN IN
					</Button>
				</div>
			</form>
			<Anchor
				className={classes.forgotPassword}
				value="Forgot password?"
				onClick={onClickForgotPassword}
			/>
			<div className={classes.signUpWrapper}>
				First time here? <Anchor value="SIGN UP" onClick={onClickSignUp} />
			</div>
		</div>
	);
};
