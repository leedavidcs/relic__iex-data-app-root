import { scalarType } from "@nexus/schema";
import { EmailAddressResolver } from "graphql-scalars";

export const EmailAddress = scalarType({
	name: "EmailAddress",
	description: EmailAddressResolver.description,
	serialize: EmailAddressResolver.serialize,
	parseValue: EmailAddressResolver.parseValue,
	parseLiteral: EmailAddressResolver.parseLiteral
});
