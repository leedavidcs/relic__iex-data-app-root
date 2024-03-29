import { createEmailHtml, ISendEmailResponse, sendEmail, VerifyEmail } from "@/server/emails";
import { getBaseUrl } from "@/server/utils";
import { arg, inputObjectType, mutationField, objectType } from "@nexus/schema";
import { User } from "@prisma/client";
import { object, string } from "yup";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;

export const RegisterLocalUserInput = inputObjectType({
	name: "RegisterLocalUserInput",
	definition: (t) => {
		t.field("email", {
			type: "EmailAddress",
			required: true,
			description: "(Unique) The user's email"
		});
		t.field("password", {
			type: "UserPassword",
			required: true,
			description: "The user's decrypted password"
		});
		t.string("username", {
			required: true,
			description: "(Unique) The user's username"
		});
	}
});

export const RegisterLocalUserPayload = objectType({
	name: "RegisterLocalUserPayload",
	description: "The response object from a local register user request",
	definition: (t) => {
		t.boolean("success", {
			nullable: false,
			description: "Whether the registration successfully created a user or not"
		});
		t.string("error", {
			description: "An error will be described if success is false"
		});
		t.field("user", {
			type: "User",
			description: "The user object"
		});
	}
});

export const registerLocalUser = mutationField("registerLocalUser", {
	type: RegisterLocalUserPayload,
	description: "Performs local auth registration (custom username + password)",
	args: {
		input: arg({
			type: "RegisterLocalUserInput",
			required: true
		})
	},
	yupValidation: () => ({
		input: object().shape({
			username: string()
				.min(USERNAME_MIN_LENGTH)
				.max(USERNAME_MAX_LENGTH)
				.matches(/^[a-z0-9_.-]*$/i)
		})
	}),
	rateLimit: () => ({ window: "1m", max: 30 }),
	resolve: async (parent, { input: { email, password, username } }, { prisma }) => {
		const existingUser: User | null = await prisma.user.findOne({ where: { email } });

		if (existingUser !== null) {
			return {
				success: false,
				error: "User already exists.",
				user: existingUser
			};
		}

		const newUser: User = await prisma.user.create({
			data: {
				email,
				password,
				username,
				balance: { create: {} }
			}
		});

		const emailTemplate: string = createEmailHtml(VerifyEmail, {
			confirmationLink: `${getBaseUrl()}/api/verify-email/${newUser.id}`,
			username: newUser.username
		});
		const emailResponse: ISendEmailResponse = await sendEmail({
			to: email,
			subject: "Confirm your account",
			html: emailTemplate
		});

		return {
			success: emailResponse.success,
			error: emailResponse.error,
			user: newUser
		};
	}
});
