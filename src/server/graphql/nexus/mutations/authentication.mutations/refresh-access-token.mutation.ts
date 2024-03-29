import { refreshAccessToken as _refreshAccessToken } from "@/server/authentication";
import { arg, inputObjectType, mutationField } from "@nexus/schema";

export const RefreshAccessTokenInput = inputObjectType({
	name: "RefreshAccessTokenInput",
	definition: (t) => {
		t.string("refreshToken", {
			required: true,
			description: "The refresh token, that is used to refresh the access token"
		});
	}
});

export const refreshAccessToken = mutationField("refreshAccessToken", {
	type: "TokenPayload",
	description: "Refreshes the currently logged-in user's access token",
	args: {
		input: arg({
			type: "RefreshAccessTokenInput",
			required: true
		})
	},
	rateLimit: () => ({ window: "1m", max: 30 }),
	authorize: (parent, args, { user }) => {
		if (!user) {
			return false;
		}

		return true;
	},
	resolve: async (parent, { input: { refreshToken } }) => {
		const accessToken: string | null = await _refreshAccessToken(refreshToken);

		if (accessToken === null) {
			throw new Error("Could not refresh access token.");
		}

		return { refreshToken, token: accessToken };
	}
});
