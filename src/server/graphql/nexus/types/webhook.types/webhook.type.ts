import { objectType } from "@nexus/schema";

export const Webhook = objectType({
	name: "Webhook",
	definition: (t) => {
		t.model.id();
		t.model.stockPortfolio();
		t.model.timeout();
		t.model.type();
		t.model.url();
		t.model.query();
		t.model.secret();
		t.model.createdAt();
	}
});
