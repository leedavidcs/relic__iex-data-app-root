import { inputObjectType } from "@nexus/schema";

export const ScheduledEventUpdatedaysInput = inputObjectType({
	name: "ScheduledEventUpdatedaysInput",
	definition: (t) => {
		t.list.field("set", { type: "Day" });
	}
});

export const ScheduledEventUpdateWithoutStockPortfolioEventDataInput = inputObjectType({
	name: "ScheduledEventUpdateWithoutStockPortfolioEventDataInput",
	definition: (t) => {
		t.int("interval");
		t.field("recurrence", { type: "Recurrence" });
		t.field("days", { type: "ScheduledEventUpdatedaysInput" });
		t.int("hour");
		t.int("minute");
	}
});

export const ScheduledEventUpdateOneRequiredWithoutStockPortfolioEventInput = inputObjectType({
	name: "ScheduledEventUpdateOneRequiredWithoutStockPortfolioEventInput",
	definition: (t) => {
		t.field("update", {
			type: "ScheduledEventUpdateWithoutStockPortfolioEventDataInput",
			nullable: false
		});
	}
});

export const StockPortfolioEventUpdateInput = inputObjectType({
	name: "StockPortfolioEventUpdateInput",
	definition: (t) => {
		t.field("type", { type: "StockPortfolioEventType" });
		t.field("scheduledEvent", {
			type: "ScheduledEventUpdateOneRequiredWithoutStockPortfolioEventInput"
		});
	}
});
