import { MockedResponse } from "@apollo/react-testing";
import { CreateStockPortfolioMock } from "./create-stock-portfolio.mock";
import { DeleteStockPortfolioMock } from "./delete-stock-portfolio.mock";
import { GetDataKeyOptionsMock } from "./get-data-key-options.mock";
import { GetManyStockPortfoliosMock } from "./get-many-stock-portfolios.mock";
import { GetOneStockPortfolioMocks } from "./get-one-stock-portfolio.mock";
import { GetUserMock } from "./get-user.mock";
import { SearchStockSymbolsMock } from "./search-stock-symbols.mock";

export const mocks: readonly MockedResponse[] = [
	CreateStockPortfolioMock,
	DeleteStockPortfolioMock,
	GetDataKeyOptionsMock,
	GetManyStockPortfoliosMock,
	...GetOneStockPortfolioMocks,
	GetUserMock,
	SearchStockSymbolsMock
];
