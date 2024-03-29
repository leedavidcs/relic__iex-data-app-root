import { NotFoundError, PrismaUtils } from "@/server/utils";
import { arg, inputObjectType, queryField } from "@nexus/schema";

export const WebhookWhereUniqueInput = inputObjectType({
	name: "WebhookWhereUniqueInput",
	definition: (t) => {
		t.string("id");
	}
});

export const webhook = queryField("webhook", {
	type: "Webhook",
	args: {
		where: arg({ type: "WebhookWhereUniqueInput", nullable: false })
	},
	authorize: async (parent, args, { prisma, user }) => {
		const { where } = PrismaUtils.castInputs(args);

		if (!user) {
			return false;
		}

		const retrievedWebhook = await prisma.webhook.findOne({
			where,
			include: {
				stockPortfolio: true
			}
		});

		if (!retrievedWebhook) {
			return new NotFoundError("Webhook was not found");
		}

		return retrievedWebhook.stockPortfolio.userId === user.id;
	},
	resolve: (parent, args, { prisma }) => {
		const { where } = PrismaUtils.castInputs(args);

		return prisma.webhook.findOne({ where });
	}
});
