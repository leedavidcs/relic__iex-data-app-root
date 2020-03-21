import { KeyStats } from "iexcloud_api_wrapper";

export const IexKeyStatsDataKeys = {
	IEX_KEY_STATS__COMPANY_NAME: "IEX_KEY_STATS__COMPANY_NAME",
	IEX_KEY_STATS__MARKET_CAP: "IEX_KEY_STATS__MARKET_CAP",
	IEX_KEY_STATS__WEEK_52_HIGH: "IEX_KEY_STATS__WEEK_52_HIGH",
	IEX_KEY_STATS__WEEK_52_LOW: "IEX_KEY_STATS__WEEK_52_LOW",
	IEX_KEY_STATS__WEEK_52_CHANGE: "IEX_KEY_STATS__WEEK_52_CHANGE",
	IEX_KEY_STATS__SHARES_OUTSTANDING: "IEX_KEY_STATS__SHARES_OUTSTANDING",
	IEX_KEY_STATS__FLOAT: "IEX_KEY_STATS__FLOAT",
	IEX_KEY_STATS__SYMBOL: "IEX_KEY_STATS__SYMBOL",
	IEX_KEY_STATS__AVG_10_VOLUME: "IEX_KEY_STATS__AVG_10_VOLUME",
	IEX_KEY_STATS__AVG_30_VOLUME: "IEX_KEY_STATS__AVG_30_VOLUME",
	IEX_KEY_STATS__DAY_200_MOVINGAVG: "IEX_KEY_STATS__DAY_200_MOVINGAVG",
	IEX_KEY_STATS__DAY_50_MOVINGAVG: "IEX_KEY_STATS__DAY_50_MOVINGAVG",
	IEX_KEY_STATS__EMPLOYEES: "IEX_KEY_STATS__EMPLOYEES",
	IEX_KEY_STATS__TTM_EPS: "IEX_KEY_STATS__TTM_EPS",
	IEX_KEY_STATS__TTM_DIVIDEND_RATE: "IEX_KEY_STATS__TTM_DIVIDEND_RATE",
	IEX_KEY_STATS__DIVIDEND_YIELD: "IEX_KEY_STATS__DIVIDEND_YIELD",
	IEX_KEY_STATS__NEXT_DIVIDEND_DATE: "IEX_KEY_STATS__NEXT_DIVIDEND_DATE",
	IEX_KEY_STATS__EX_DIVIDEND_DATE: "IEX_KEY_STATS__EX_DIVIDEND_DATE",
	IEX_KEY_STATS__NEXT_EARNINGS_DATE: "IEX_KEY_STATS__NEXT_EARNINGS_DATE",
	IEX_KEY_STATS__PE_RATIO: "IEX_KEY_STATS__PE_RATIO",
	IEX_KEY_STATS__BETA: "IEX_KEY_STATS__BETA",
	IEX_KEY_STATS__MAX_CHANGE_PERCENT: "IEX_KEY_STATS__MAX_CHANGE_PERCENT",
	IEX_KEY_STATS__YEAR_5_CHANGE_PERCENT: "IEX_KEY_STATS__YEAR_5_CHANGE_PERCENT",
	IEX_KEY_STATS__YEAR_2_CHANGE_PERCENT: "IEX_KEY_STATS__YEAR_2_CHANGE_PERCENT",
	IEX_KEY_STATS__YEAR_1_CHANGE_PERCENT: "IEX_KEY_STATS__YEAR_1_CHANGE_PERCENT",
	IEX_KEY_STATS__YTD_CHANGE_PERCENT: "IEX_KEY_STATS__YTD_CHANGE_PERCENT",
	IEX_KEY_STATS__MONTH_6_CHANGE_PERCENT: "IEX_KEY_STATS__MONTH_6_CHANGE_PERCENT",
	IEX_KEY_STATS__MONTH_3_CHANGE_PERCENT: "IEX_KEY_STATS__MONTH_3_CHANGE_PERCENT",
	IEX_KEY_STATS__MONTH_1_CHANGE_PERCENT: "IEX_KEY_STATS__MONTH_1_CHANGE_PERCENT",
	IEX_KEY_STATS__DAY_30_CHANGE_PERCENT: "IEX_KEY_STATS__DAY_30_CHANGE_PERCENT",
	IEX_KEY_STATS__DAY_5_CHANGE_PERCENT: "IEX_KEY_STATS__DAY_5_CHANGE_PERCENT"
};

export const IexKeyStatsSuffixToPropMap: Record<string, keyof KeyStats> = {
	COMPANY_NAME: "companyName",
	MARKET_CAP: "marketcap",
	WEEK_52_HIGH: "week52high",
	WEEK_52_LOW: "week52low",
	WEEK_52_CHANGE: "week52change",
	SHARES_OUTSTANDING: "sharesOutstanding",
	FLOAT: "float",
	SYMBOL: "symbol",
	AVG_10_VOLUME: "avg10Volume",
	AVG_30_VOLUME: "avg30Volume",
	DAY_200_MOVINGAVG: "day200MovingAvg",
	DAY_50_MOVINGAVG: "day50MovingAvg",
	EMPLOYEES: "employees",
	TTM_EPS: "ttmEPS",
	TTM_DIVIDEND_RATE: "ttmDividendRate",
	DIVIDEND_YIELD: "dividendYield",
	NEXT_DIVIDEND_DATE: "nextDividendDate",
	EX_DIVIDEND_DATE: "exDividendDate",
	NEXT_EARNINGS_DATE: "nextEarningsDate",
	PE_RATIO: "peRatio",
	BETA: "beta",
	MAX_CHANGE_PERCENT: "maxChangePercent",
	YEAR_5_CHANGE_PERCENT: "year5ChangePercent",
	YEAR_2_CHANGE_PERCENT: "year2ChangePercent",
	YEAR_1_CHANGE_PERCENT: "year1ChangePercent",
	YTD_CHANGE_PERCENT: "ytdChangePercent",
	MONTH_6_CHANGE_PERCENT: "month6ChangePercent",
	MONTH_3_CHANGE_PERCENT: "month3ChangePercent",
	MONTH_1_CHANGE_PERCENT: "month1ChangePercent",
	DAY_30_CHANGE_PERCENT: "day30ChangePercent",
	DAY_5_CHANGE_PERCENT: "day5ChangePercent"
};
