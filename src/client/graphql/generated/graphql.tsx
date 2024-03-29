import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
// This file was generated on: Jul 7th 2020 1:48:24 am

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  DateTime: any;
  Json: any;
  /** The plain-text password of a user to be hashed */
  UserPassword: any;
};


export type AddressInput = {
  readonly line1: Scalars['String'];
  readonly city?: Maybe<Scalars['String']>;
  readonly country?: Maybe<Scalars['String']>;
  readonly zipcode?: Maybe<Scalars['String']>;
  readonly state?: Maybe<Scalars['String']>;
};

export type Balance = {
  readonly __typename?: 'Balance';
  readonly credits: Scalars['Int'];
  readonly user: User;
};

export type BalanceWhereInput = {
  readonly userId?: Maybe<StringFilter>;
  readonly credits?: Maybe<IntFilter>;
  readonly AND?: Maybe<ReadonlyArray<BalanceWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<BalanceWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<BalanceWhereInput>>;
  readonly user?: Maybe<UserWhereInput>;
};

export type BalanceWhereUniqueInput = {
  readonly userId?: Maybe<Scalars['String']>;
};

export type BooleanFilter = {
  readonly equals?: Maybe<Scalars['Boolean']>;
  readonly not?: Maybe<Scalars['Boolean']>;
};

/** The provider for the data provided by the data key */
export enum DataKey_Provider {
  /** IEX Cloud (see `https://iexcloud.io/`) */
  IexCloud = 'IEX_CLOUD'
}

/** A single data key option that can be selected for a stock portfolio header */
export type DataKeyOption = {
  readonly __typename?: 'DataKeyOption';
  /** A more normal name. This can be shown to users. */
  readonly name: Scalars['String'];
  /** A unique data key for fetching stock portfolio data */
  readonly dataKey: Scalars['String'];
  /** The name of the provider */
  readonly provider: DataKey_Provider;
};


export type DateTimeFilter = {
  readonly equals?: Maybe<Scalars['DateTime']>;
  readonly not?: Maybe<Scalars['DateTime']>;
  readonly in?: Maybe<ReadonlyArray<Scalars['DateTime']>>;
  readonly notIn?: Maybe<ReadonlyArray<Scalars['DateTime']>>;
  readonly lt?: Maybe<Scalars['DateTime']>;
  readonly lte?: Maybe<Scalars['DateTime']>;
  readonly gt?: Maybe<Scalars['DateTime']>;
  readonly gte?: Maybe<Scalars['DateTime']>;
};

export enum Day {
  Mon = 'Mon',
  Tues = 'Tues',
  Wed = 'Wed',
  Thurs = 'Thurs',
  Fri = 'Fri',
  Sat = 'Sat',
  Sun = 'Sun'
}


export type FeaturePricing = {
  readonly __typename?: 'FeaturePricing';
  readonly snapshot: FeaturePricingConfig;
};

export type FeaturePricingConfig = {
  readonly __typename?: 'FeaturePricingConfig';
  readonly price: Scalars['Int'];
};

export type FloatFilter = {
  readonly equals?: Maybe<Scalars['Float']>;
  readonly not?: Maybe<Scalars['Float']>;
  readonly in?: Maybe<ReadonlyArray<Scalars['Float']>>;
  readonly notIn?: Maybe<ReadonlyArray<Scalars['Float']>>;
  readonly lt?: Maybe<Scalars['Float']>;
  readonly lte?: Maybe<Scalars['Float']>;
  readonly gt?: Maybe<Scalars['Float']>;
  readonly gte?: Maybe<Scalars['Float']>;
};

export type IntFilter = {
  readonly equals?: Maybe<Scalars['Int']>;
  readonly not?: Maybe<Scalars['Int']>;
  readonly in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly notIn?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly lt?: Maybe<Scalars['Int']>;
  readonly lte?: Maybe<Scalars['Int']>;
  readonly gt?: Maybe<Scalars['Int']>;
  readonly gte?: Maybe<Scalars['Int']>;
};



export type LatestSnapshotFilter = {
  readonly every?: Maybe<LatestSnapshotWhereInput>;
  readonly some?: Maybe<LatestSnapshotWhereInput>;
  readonly none?: Maybe<LatestSnapshotWhereInput>;
};

export type LatestSnapshotWhereInput = {
  readonly snapshotId?: Maybe<StringFilter>;
  readonly stockPortfolioId?: Maybe<StringFilter>;
  readonly updatedAt?: Maybe<DateTimeFilter>;
  readonly AND?: Maybe<ReadonlyArray<LatestSnapshotWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<LatestSnapshotWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<LatestSnapshotWhereInput>>;
  readonly snapshot?: Maybe<SnapshotWhereInput>;
  readonly stockPortfolio?: Maybe<StockPortfolioWhereInput>;
};

export type LoginLocalUserInput = {
  /** The email or username (either) of the user */
  readonly userIdentifier: Scalars['String'];
  /** The user's decrypted password */
  readonly password: Scalars['String'];
};

/** Root mutation type */
export type Mutation = RequestRoot & {
  readonly __typename?: 'Mutation';
  readonly applySucceededTransaction?: Maybe<Balance>;
  readonly cancelOneOrder?: Maybe<Order>;
  readonly cancelStripeSetupIntent?: Maybe<StripeSetupIntent>;
  readonly cancelTransaction?: Maybe<Balance>;
  readonly createOneOrder: Order;
  readonly createOneStockPortfolio: StockPortfolio;
  readonly createOneWebhook: Webhook;
  readonly createStripePaymentIntent?: Maybe<StripePaymentIntent>;
  readonly createStripeSetupIntent?: Maybe<StripeSetupIntent>;
  readonly deleteOneStockPortfolio?: Maybe<StockPortfolio>;
  readonly deleteOneStockPortfolioEvent?: Maybe<StockPortfolioEvent>;
  readonly deleteOneWebhook?: Maybe<Webhook>;
  /**
   * Mutation version of the query `stockData`. The `StockData` type inherently
   * results in data mutations. As a result, this operation exists both as a query and mutation.
   */
  readonly getStockData?: Maybe<StockData>;
  /** Logins in the user, and returns an expiring access token */
  readonly loginLocalUser?: Maybe<TokenPayload>;
  /** Refreshes the currently logged-in user's access token */
  readonly refreshAccessToken?: Maybe<TokenPayload>;
  /** Performs local auth registration (custom username + password) */
  readonly registerLocalUser?: Maybe<RegisterLocalUserPayload>;
  /** Resends the account verification email to the logged-in user */
  readonly resendVerifyEmail?: Maybe<ResendVerifyEmailPayload>;
  readonly runScheduledEvent?: Maybe<RunScheduledEvent>;
  readonly setToasts: ReadonlyArray<Toast>;
  readonly setUser?: Maybe<User>;
  readonly toggleModal: Scalars['Boolean'];
  readonly updateOneStockPortfolio?: Maybe<StockPortfolio>;
  readonly updateOneStockPortfolioSettings?: Maybe<StockPortfolioSettings>;
  readonly updateOneWebhook?: Maybe<Webhook>;
  readonly upsertOneStockPortfolioEvent: StockPortfolioEvent;
  readonly upsertOneWebhook: Webhook;
  /** The viewer of this request */
  readonly viewer?: Maybe<User>;
};


/** Root mutation type */
export type MutationApplySucceededTransactionArgs = {
  paymentIntentId: Scalars['String'];
};


/** Root mutation type */
export type MutationCancelOneOrderArgs = {
  where: OrderWhereUniqueInput;
};


/** Root mutation type */
export type MutationCancelStripeSetupIntentArgs = {
  id: Scalars['String'];
};


/** Root mutation type */
export type MutationCancelTransactionArgs = {
  paymentIntentId: Scalars['String'];
};


/** Root mutation type */
export type MutationCreateOneOrderArgs = {
  data: OrderCreateInput;
};


/** Root mutation type */
export type MutationCreateOneStockPortfolioArgs = {
  data: StockPortfolioCreateInput;
};


/** Root mutation type */
export type MutationCreateOneWebhookArgs = {
  data: WebhookCreateInput;
};


/** Root mutation type */
export type MutationCreateStripePaymentIntentArgs = {
  orderDetails: ReadonlyArray<OrderDetailInput>;
  paymentMethodId: Scalars['String'];
};


/** Root mutation type */
export type MutationDeleteOneStockPortfolioArgs = {
  where: StockPortfolioWhereUniqueInput;
};


/** Root mutation type */
export type MutationDeleteOneStockPortfolioEventArgs = {
  where: StockPortfolioEventWhereUniqueInput;
};


/** Root mutation type */
export type MutationDeleteOneWebhookArgs = {
  where: WebhookWhereUniqueInput;
};


/** Root mutation type */
export type MutationGetStockDataArgs = {
  where: StockDataWhereUniqueInput;
};


/** Root mutation type */
export type MutationLoginLocalUserArgs = {
  input: LoginLocalUserInput;
};


/** Root mutation type */
export type MutationRefreshAccessTokenArgs = {
  input: RefreshAccessTokenInput;
};


/** Root mutation type */
export type MutationRegisterLocalUserArgs = {
  input: RegisterLocalUserInput;
};


/** Root mutation type */
export type MutationSetToastsArgs = {
  toasts: ReadonlyArray<ToastInput>;
};


/** Root mutation type */
export type MutationToggleModalArgs = {
  force?: Maybe<Scalars['Boolean']>;
};


/** Root mutation type */
export type MutationUpdateOneStockPortfolioArgs = {
  data: StockPortfolioUpdateInput;
  where: StockPortfolioWhereUniqueInput;
};


/** Root mutation type */
export type MutationUpdateOneStockPortfolioSettingsArgs = {
  where: StockPortfolioSettingsWhereUniqueInput;
  data: StockPortfolioSettingsUpdateInput;
};


/** Root mutation type */
export type MutationUpdateOneWebhookArgs = {
  where: WebhookWhereUniqueInput;
  data: WebhookUpdateInput;
};


/** Root mutation type */
export type MutationUpsertOneStockPortfolioEventArgs = {
  where: StockPortfolioEventWhereUniqueInput;
  create: StockPortfolioEventCreateInput;
  update: StockPortfolioEventUpdateInput;
};


/** Root mutation type */
export type MutationUpsertOneWebhookArgs = {
  where: WebhookWhereUniqueInput;
  create: WebhookCreateInput;
  update: WebhookUpdateInput;
};

export type NullableDateTimeFilter = {
  readonly equals?: Maybe<Scalars['DateTime']>;
  readonly not?: Maybe<Scalars['DateTime']>;
  readonly in?: Maybe<ReadonlyArray<Scalars['DateTime']>>;
  readonly notIn?: Maybe<ReadonlyArray<Scalars['DateTime']>>;
  readonly lt?: Maybe<Scalars['DateTime']>;
  readonly lte?: Maybe<Scalars['DateTime']>;
  readonly gt?: Maybe<Scalars['DateTime']>;
  readonly gte?: Maybe<Scalars['DateTime']>;
};

export type NullableFloatFilter = {
  readonly equals?: Maybe<Scalars['Float']>;
  readonly not?: Maybe<Scalars['Float']>;
  readonly in?: Maybe<ReadonlyArray<Scalars['Float']>>;
  readonly notIn?: Maybe<ReadonlyArray<Scalars['Float']>>;
  readonly lt?: Maybe<Scalars['Float']>;
  readonly lte?: Maybe<Scalars['Float']>;
  readonly gt?: Maybe<Scalars['Float']>;
  readonly gte?: Maybe<Scalars['Float']>;
};

export type NullableIntFilter = {
  readonly equals?: Maybe<Scalars['Int']>;
  readonly not?: Maybe<Scalars['Int']>;
  readonly in?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly notIn?: Maybe<ReadonlyArray<Scalars['Int']>>;
  readonly lt?: Maybe<Scalars['Int']>;
  readonly lte?: Maybe<Scalars['Int']>;
  readonly gt?: Maybe<Scalars['Int']>;
  readonly gte?: Maybe<Scalars['Int']>;
};

export type NullableStringFilter = {
  readonly equals?: Maybe<Scalars['String']>;
  readonly not?: Maybe<Scalars['String']>;
  readonly in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly notIn?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly lt?: Maybe<Scalars['String']>;
  readonly lte?: Maybe<Scalars['String']>;
  readonly gt?: Maybe<Scalars['String']>;
  readonly gte?: Maybe<Scalars['String']>;
  readonly contains?: Maybe<Scalars['String']>;
  readonly startsWith?: Maybe<Scalars['String']>;
  readonly endsWith?: Maybe<Scalars['String']>;
};

export type Order = {
  readonly __typename?: 'Order';
  readonly id: Scalars['String'];
  readonly stockPortfolio: StockPortfolio;
  readonly ticker: Scalars['String'];
  readonly quantity: Scalars['Int'];
  readonly type: OrderType;
  readonly side: OrderSide;
  readonly status: OrderStatus;
  readonly timeInForce: TimeInForce;
  readonly limitPrice?: Maybe<Scalars['Float']>;
  readonly stopPrice?: Maybe<Scalars['Float']>;
  readonly avgFilledPrice?: Maybe<Scalars['Float']>;
  readonly createdAt: Scalars['DateTime'];
  readonly filledAt?: Maybe<Scalars['DateTime']>;
  readonly cancelledAt?: Maybe<Scalars['DateTime']>;
  readonly failedAt?: Maybe<Scalars['DateTime']>;
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc'
}

export type OrderCreateInput = {
  readonly ticker: Scalars['String'];
  readonly quantity: Scalars['Int'];
  readonly side: OrderSide;
  readonly type?: Maybe<OrderType>;
  readonly timeInForce?: Maybe<TimeInForce>;
  readonly limitPrice?: Maybe<Scalars['Float']>;
  readonly stopPrice?: Maybe<Scalars['Float']>;
  readonly stockPortfolio: StockPortfolioCreateOneWithoutOrderInput;
};

export type OrderDetailInput = {
  readonly type: OrderDetailType;
  readonly id: Scalars['String'];
  readonly quantity?: Maybe<Scalars['Int']>;
};

export enum OrderDetailType {
  PriceBundle = 'PriceBundle'
}

export type OrderEventFilter = {
  readonly every?: Maybe<OrderEventWhereInput>;
  readonly some?: Maybe<OrderEventWhereInput>;
  readonly none?: Maybe<OrderEventWhereInput>;
};

export enum OrderEventType {
  CloseExpiredOrders = 'CloseExpiredOrders',
  DeleteInvalidOrders = 'DeleteInvalidOrders',
  ExecuteOpenOrders = 'ExecuteOpenOrders'
}

export type OrderEventWhereInput = {
  readonly scheduledEventId?: Maybe<StringFilter>;
  readonly type?: Maybe<OrderEventType>;
  readonly AND?: Maybe<ReadonlyArray<OrderEventWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<OrderEventWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<OrderEventWhereInput>>;
  readonly scheduledEvent?: Maybe<ScheduledEventWhereInput>;
};

export type OrderFilter = {
  readonly every?: Maybe<OrderWhereInput>;
  readonly some?: Maybe<OrderWhereInput>;
  readonly none?: Maybe<OrderWhereInput>;
};

export type OrderOrderByInput = {
  readonly ticker?: Maybe<OrderByArg>;
  readonly quantity?: Maybe<OrderByArg>;
  readonly type?: Maybe<OrderByArg>;
  readonly side?: Maybe<OrderByArg>;
  readonly status?: Maybe<OrderByArg>;
  readonly limitPrice?: Maybe<OrderByArg>;
  readonly stopPrice?: Maybe<OrderByArg>;
  readonly avgFilledPrice?: Maybe<OrderByArg>;
  readonly timeInForce?: Maybe<OrderByArg>;
  readonly createdAt?: Maybe<OrderByArg>;
  readonly filledAt?: Maybe<OrderByArg>;
  readonly cancelledAt?: Maybe<OrderByArg>;
  readonly failedAt?: Maybe<OrderByArg>;
};

export enum OrderSide {
  Buy = 'Buy',
  Sell = 'Sell'
}

export enum OrderStatus {
  Open = 'Open',
  Closed = 'Closed'
}

export enum OrderType {
  Market = 'Market',
  Limit = 'Limit',
  Stop = 'Stop',
  StopLimit = 'StopLimit'
}

export type OrderWhereInput = {
  readonly id?: Maybe<StringFilter>;
  readonly stockPortfolioId?: Maybe<StringFilter>;
  readonly ticker?: Maybe<StringFilter>;
  readonly quantity?: Maybe<IntFilter>;
  readonly type?: Maybe<OrderType>;
  readonly side?: Maybe<OrderSide>;
  readonly status?: Maybe<OrderStatus>;
  readonly limitPrice?: Maybe<NullableFloatFilter>;
  readonly stopPrice?: Maybe<NullableFloatFilter>;
  readonly avgFilledPrice?: Maybe<NullableFloatFilter>;
  readonly timeInForce?: Maybe<TimeInForce>;
  readonly createdAt?: Maybe<DateTimeFilter>;
  readonly filledAt?: Maybe<NullableDateTimeFilter>;
  readonly cancelledAt?: Maybe<NullableDateTimeFilter>;
  readonly failedAt?: Maybe<NullableDateTimeFilter>;
  readonly stockPortfolio?: Maybe<StockPortfolioWhereInput>;
  readonly AND?: Maybe<ReadonlyArray<OrderWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<OrderWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<OrderWhereInput>>;
};

export type OrderWhereUniqueInput = {
  readonly id?: Maybe<Scalars['String']>;
};

export type PaymentTransaction = {
  readonly __typename?: 'PaymentTransaction';
  readonly id: Scalars['String'];
  readonly creditsBefore: Scalars['Int'];
  readonly creditsTransacted: Scalars['Int'];
  readonly paymentIntentId?: Maybe<Scalars['String']>;
  readonly paymentIntent?: Maybe<StripePaymentIntent>;
  readonly user: User;
};

export type PaymentTransactionFilter = {
  readonly every?: Maybe<PaymentTransactionWhereInput>;
  readonly some?: Maybe<PaymentTransactionWhereInput>;
  readonly none?: Maybe<PaymentTransactionWhereInput>;
};

export type PaymentTransactionOrderByInput = {
  readonly creditsBefore?: Maybe<OrderByArg>;
  readonly creditsTransacted?: Maybe<OrderByArg>;
  readonly createdAt?: Maybe<OrderByArg>;
};

export enum PaymentTransactionStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Succeeded = 'SUCCEEDED'
}

export type PaymentTransactionWhereInput = {
  readonly id?: Maybe<StringFilter>;
  readonly userId?: Maybe<StringFilter>;
  readonly creditsBefore?: Maybe<IntFilter>;
  readonly creditsTransacted?: Maybe<IntFilter>;
  readonly createdAt?: Maybe<DateTimeFilter>;
  readonly paymentIntentId?: Maybe<NullableStringFilter>;
  readonly status?: Maybe<PaymentTransactionStatus>;
  readonly AND?: Maybe<ReadonlyArray<PaymentTransactionWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<PaymentTransactionWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<PaymentTransactionWhereInput>>;
  readonly user?: Maybe<UserWhereInput>;
};

export type PaymentTransactionWhereUniqueInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly paymentIntentId?: Maybe<Scalars['String']>;
};

export type PaymentTransactionWhereWithoutUserInput = {
  readonly id?: Maybe<StringFilter>;
  readonly creditsBefore?: Maybe<IntFilter>;
  readonly creditsTransacted?: Maybe<IntFilter>;
  readonly createdAt?: Maybe<DateTimeFilter>;
  readonly paymentIntentId?: Maybe<NullableStringFilter>;
  readonly status?: Maybe<PaymentTransactionStatus>;
  readonly AND?: Maybe<ReadonlyArray<PaymentTransactionWhereWithoutUserInput>>;
  readonly OR?: Maybe<ReadonlyArray<PaymentTransactionWhereWithoutUserInput>>;
  readonly NOT?: Maybe<ReadonlyArray<PaymentTransactionWhereWithoutUserInput>>;
};

export type Position = {
  readonly __typename?: 'Position';
  readonly id: Scalars['String'];
  readonly stockPortfolio: StockPortfolio;
  readonly ticker: Scalars['String'];
  readonly quantity: Scalars['Int'];
  readonly avgEntryPrice: Scalars['Float'];
  readonly costBasis: Scalars['Float'];
};

export type PositionFilter = {
  readonly every?: Maybe<PositionWhereInput>;
  readonly some?: Maybe<PositionWhereInput>;
  readonly none?: Maybe<PositionWhereInput>;
};

export type PositionWhereInput = {
  readonly id?: Maybe<StringFilter>;
  readonly stockPortfolioId?: Maybe<StringFilter>;
  readonly ticker?: Maybe<StringFilter>;
  readonly quantity?: Maybe<IntFilter>;
  readonly avgEntryPrice?: Maybe<FloatFilter>;
  readonly costBasis?: Maybe<FloatFilter>;
  readonly AND?: Maybe<ReadonlyArray<PositionWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<PositionWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<PositionWhereInput>>;
  readonly stockPortfolio?: Maybe<StockPortfolioWhereInput>;
};

export type PriceBundle = {
  readonly __typename?: 'PriceBundle';
  readonly id: Scalars['String'];
  readonly price: Scalars['Float'];
  readonly credits: Scalars['Int'];
};

/** Root query type */
export type Query = RequestRoot & {
  readonly __typename?: 'Query';
  readonly balance?: Maybe<Balance>;
  /** Retrieves the list of data key options for a stock portfolio header. All filters are 		OR'ed. */
  readonly dataKeyOptions: ReadonlyArray<DataKeyOption>;
  readonly featurePricing: FeaturePricing;
  readonly modal: Scalars['Boolean'];
  readonly order?: Maybe<Order>;
  readonly orders: ReadonlyArray<Order>;
  readonly paymentTransaction?: Maybe<PaymentTransaction>;
  readonly paymentTransactions: ReadonlyArray<PaymentTransaction>;
  readonly priceBundles: ReadonlyArray<PriceBundle>;
  readonly snapshot?: Maybe<Snapshot>;
  readonly snapshotCount: Scalars['Int'];
  readonly snapshots: ReadonlyArray<Snapshot>;
  /**
   * Query version of the mutation `getStockData`. The `StockData` type inherently
   * results in data mutations. As a result, this operation exists both as a query and mutation.
   */
  readonly stockData?: Maybe<StockData>;
  readonly stockPortfolio?: Maybe<StockPortfolio>;
  readonly stockPortfolioCount?: Maybe<Scalars['Int']>;
  readonly stockPortfolioEvent?: Maybe<StockPortfolioEvent>;
  readonly stockPortfolios: ReadonlyArray<StockPortfolio>;
  readonly stockSymbols: ReadonlyArray<StockDataSearch>;
  readonly toasts: ReadonlyArray<Toast>;
  readonly user?: Maybe<User>;
  /** The viewer of this request */
  readonly viewer?: Maybe<User>;
  readonly webhook?: Maybe<Webhook>;
  readonly webhookCount: Scalars['Int'];
  readonly webhooks: ReadonlyArray<Webhook>;
};


/** Root query type */
export type QueryBalanceArgs = {
  where: BalanceWhereUniqueInput;
};


/** Root query type */
export type QueryDataKeyOptionsArgs = {
  name?: Maybe<Scalars['String']>;
  dataKey?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
};


/** Root query type */
export type QueryOrderArgs = {
  where: OrderWhereUniqueInput;
};


/** Root query type */
export type QueryOrdersArgs = {
  where?: Maybe<OrderWhereInput>;
  orderBy?: Maybe<OrderOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<OrderWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
};


/** Root query type */
export type QueryPaymentTransactionArgs = {
  where: PaymentTransactionWhereUniqueInput;
};


/** Root query type */
export type QueryPaymentTransactionsArgs = {
  where?: Maybe<PaymentTransactionWhereWithoutUserInput>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<PaymentTransactionWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
};


/** Root query type */
export type QuerySnapshotArgs = {
  where: SnapshotWhereUniqueInput;
};


/** Root query type */
export type QuerySnapshotCountArgs = {
  where?: Maybe<SnapshotWhereInput>;
};


/** Root query type */
export type QuerySnapshotsArgs = {
  where?: Maybe<SnapshotWhereInput>;
  orderBy?: Maybe<SnapshotOrderByInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<SnapshotWhereUniqueInput>;
};


/** Root query type */
export type QueryStockDataArgs = {
  where: StockDataWhereUniqueInput;
};


/** Root query type */
export type QueryStockPortfolioArgs = {
  where: StockPortfolioWhereUniqueInput;
};


/** Root query type */
export type QueryStockPortfolioCountArgs = {
  where?: Maybe<StockPortfolioWhereInput>;
  query?: Maybe<Scalars['String']>;
};


/** Root query type */
export type QueryStockPortfolioEventArgs = {
  where: StockPortfolioEventWhereUniqueInput;
};


/** Root query type */
export type QueryStockPortfoliosArgs = {
  cursor?: Maybe<StockPortfolioWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<StockPortfolioOrderByInput>;
  where?: Maybe<StockPortfolioWhereInput>;
  query?: Maybe<Scalars['String']>;
};


/** Root query type */
export type QueryStockSymbolsArgs = {
  text: Scalars['String'];
};


/** Root query type */
export type QueryWebhookArgs = {
  where: WebhookWhereUniqueInput;
};


/** Root query type */
export type QueryWebhookCountArgs = {
  where?: Maybe<WebhookWhereInput>;
};


/** Root query type */
export type QueryWebhooksArgs = {
  where?: Maybe<WebhookWhereInput>;
  orderBy?: Maybe<WebhookOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<WebhookWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
};

export enum Recurrence {
  Once = 'Once',
  Weekly = 'Weekly',
  Daily = 'Daily'
}

export type RefreshAccessTokenInput = {
  /** The refresh token, that is used to refresh the access token */
  readonly refreshToken: Scalars['String'];
};

export type RegisterLocalUserInput = {
  /** (Unique) The user's email */
  readonly email: Scalars['EmailAddress'];
  /** The user's decrypted password */
  readonly password: Scalars['UserPassword'];
  /** (Unique) The user's username */
  readonly username: Scalars['String'];
};

/** The response object from a local register user request */
export type RegisterLocalUserPayload = {
  readonly __typename?: 'RegisterLocalUserPayload';
  /** Whether the registration successfully created a user or not */
  readonly success: Scalars['Boolean'];
  /** An error will be described if success is false */
  readonly error?: Maybe<Scalars['String']>;
  /** The user object */
  readonly user?: Maybe<User>;
};

/** Common properties for Query, Mutation and Subscription types */
export type RequestRoot = {
  /** The viewer of this request */
  readonly viewer?: Maybe<User>;
};

/** The response object from a resend verify email request */
export type ResendVerifyEmailPayload = {
  readonly __typename?: 'ResendVerifyEmailPayload';
  /** Status, on whether the email was successfully resent */
  readonly success: Scalars['Boolean'];
};

export type RunScheduledEvent = {
  readonly __typename?: 'RunScheduledEvent';
  readonly scheduledEvents: ReadonlyArray<ScheduledEvent>;
  readonly startTime: Scalars['DateTime'];
  /** Update orders that are expired (no longer valid to be executed) */
  readonly closeExpiredOrders: Scalars['Int'];
  /** Deletes invalid orders (e.g. limit-orders without a limit-price, or stop-orders without a stop-price) */
  readonly deleteInvalidOrders: Scalars['Int'];
  readonly executeOpenOrders?: Maybe<Scalars['Int']>;
  /** Retrieves stock-data for stock-portfolios that have polling configured, and generates snapshots for each one. */
  readonly stockDataRetrieved?: Maybe<ReadonlyArray<StockPortfolioEvent>>;
};

export type ScheduledEvent = {
  readonly __typename?: 'ScheduledEvent';
  readonly id: Scalars['String'];
  readonly user?: Maybe<User>;
  readonly recurrence?: Maybe<Recurrence>;
  readonly days: ReadonlyArray<Day>;
  readonly hour: Scalars['Int'];
  readonly minute: Scalars['Int'];
  readonly interval?: Maybe<Scalars['Int']>;
  readonly next: Scalars['DateTime'];
  readonly stockPortfolioEvent?: Maybe<StockPortfolioEvent>;
};

export type ScheduledEventCreatedaysInput = {
  readonly set?: Maybe<ReadonlyArray<Day>>;
};

export type ScheduledEventCreateOneWithoutStockPortfolioEventInput = {
  readonly create: ScheduledEventCreateWithoutStockPortfolioEventInput;
};

export type ScheduledEventCreateWithoutStockPortfolioEventInput = {
  readonly interval?: Maybe<Scalars['Int']>;
  readonly recurrence?: Maybe<Recurrence>;
  readonly days?: Maybe<ScheduledEventCreatedaysInput>;
  readonly hour?: Maybe<Scalars['Int']>;
  readonly minute?: Maybe<Scalars['Int']>;
};

export type ScheduledEventFilter = {
  readonly every?: Maybe<ScheduledEventWhereInput>;
  readonly some?: Maybe<ScheduledEventWhereInput>;
  readonly none?: Maybe<ScheduledEventWhereInput>;
};

export type ScheduledEventUpdatedaysInput = {
  readonly set?: Maybe<ReadonlyArray<Day>>;
};

export type ScheduledEventUpdateOneRequiredWithoutStockPortfolioEventInput = {
  readonly update: ScheduledEventUpdateWithoutStockPortfolioEventDataInput;
};

export type ScheduledEventUpdateWithoutStockPortfolioEventDataInput = {
  readonly interval?: Maybe<Scalars['Int']>;
  readonly recurrence?: Maybe<Recurrence>;
  readonly days?: Maybe<ScheduledEventUpdatedaysInput>;
  readonly hour?: Maybe<Scalars['Int']>;
  readonly minute?: Maybe<Scalars['Int']>;
};

export type ScheduledEventWhereInput = {
  readonly id?: Maybe<StringFilter>;
  readonly userId?: Maybe<NullableStringFilter>;
  readonly recurrence?: Maybe<Recurrence>;
  readonly hour?: Maybe<IntFilter>;
  readonly minute?: Maybe<IntFilter>;
  readonly interval?: Maybe<NullableIntFilter>;
  readonly next?: Maybe<DateTimeFilter>;
  readonly StockPortfolioEvent?: Maybe<StockPortfolioEventFilter>;
  readonly OrderEvent?: Maybe<OrderEventFilter>;
  readonly AND?: Maybe<ReadonlyArray<ScheduledEventWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<ScheduledEventWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<ScheduledEventWhereInput>>;
  readonly user?: Maybe<UserWhereInput>;
};

export type Snapshot = {
  readonly __typename?: 'Snapshot';
  readonly id: Scalars['String'];
  readonly stockPortfolio: StockPortfolio;
  readonly tickers: ReadonlyArray<Scalars['String']>;
  readonly createdAt: Scalars['DateTime'];
  readonly headers: ReadonlyArray<SnapshotHeader>;
  readonly data: ReadonlyArray<Scalars['Json']>;
};

export type SnapshotFilter = {
  readonly every?: Maybe<SnapshotWhereInput>;
  readonly some?: Maybe<SnapshotWhereInput>;
  readonly none?: Maybe<SnapshotWhereInput>;
};

export type SnapshotHeader = StockPortfolioDataHeader & {
  readonly __typename?: 'SnapshotHeader';
  readonly name: Scalars['String'];
  readonly dataKey: Scalars['String'];
};

export type SnapshotOrderByInput = {
  readonly id?: Maybe<OrderByArg>;
  readonly stockPortfolioId?: Maybe<OrderByArg>;
  readonly createdAt?: Maybe<OrderByArg>;
};

export type SnapshotWhereInput = {
  readonly id?: Maybe<StringFilter>;
  readonly stockPortfolioId?: Maybe<StringFilter>;
  readonly createdAt?: Maybe<DateTimeFilter>;
  readonly LatestSnapshot?: Maybe<LatestSnapshotFilter>;
  readonly AND?: Maybe<ReadonlyArray<SnapshotWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<SnapshotWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<SnapshotWhereInput>>;
  readonly stockPortfolio?: Maybe<StockPortfolioWhereInput>;
};

export type SnapshotWhereUniqueInput = {
  readonly id?: Maybe<Scalars['String']>;
};

/**
 * The data for a stock-portfolio, derived from its headers and tickers. Accessing
 * the `data` prop of this type will incur a transaction for the `viewer` of this request
 */
export type StockData = {
  readonly __typename?: 'StockData';
  /**
   * The stock portfolio for which this data is being generated for. If provided,
   * 				snapshots may be created depending on the stock-portfolio's settings.
   */
  readonly stockPortfolio: StockPortfolio;
  /** The amount in credits, that a data-refresh would cost */
  readonly refreshCost: Scalars['Int'];
  /** The data for this stock-portfolio. Accessing this property incurs a transaction for the viewer of this request */
  readonly data?: Maybe<ReadonlyArray<Scalars['JSONObject']>>;
};


/**
 * The data for a stock-portfolio, derived from its headers and tickers. Accessing
 * the `data` prop of this type will incur a transaction for the `viewer` of this request
 */
export type StockDataRefreshCostArgs = {
  enableSnapshots?: Maybe<Scalars['Boolean']>;
};

export type StockDataSearch = {
  readonly __typename?: 'StockDataSearch';
  readonly symbol: Scalars['String'];
  readonly securityName: Scalars['String'];
  readonly securityType: Scalars['String'];
  readonly region: Scalars['String'];
  readonly exchange: Scalars['String'];
};

export type StockDataWhereUniqueInput = {
  readonly stockPortfolioId: Scalars['String'];
};

/** StockPortfolio entity. This is what gets shown on the data grid */
export type StockPortfolio = {
  readonly __typename?: 'StockPortfolio';
  readonly id: Scalars['String'];
  readonly user: User;
  readonly userId: Scalars['String'];
  readonly name: Scalars['String'];
  readonly buyingPower: Scalars['Float'];
  readonly settings: StockPortfolioSettings;
  readonly tickers: ReadonlyArray<Scalars['String']>;
  readonly headers: ReadonlyArray<StockPortfolioHeader>;
  /** The data that gets resolved based on headers and tickers */
  readonly stockData: StockData;
  readonly latestSnapshot?: Maybe<Snapshot>;
  readonly orders: ReadonlyArray<Order>;
  readonly snapshots: ReadonlyArray<Snapshot>;
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
};


/** StockPortfolio entity. This is what gets shown on the data grid */
export type StockPortfolioOrdersArgs = {
  where?: Maybe<OrderWhereInput>;
  orderBy?: Maybe<OrderOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<OrderWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
};


/** StockPortfolio entity. This is what gets shown on the data grid */
export type StockPortfolioSnapshotsArgs = {
  where?: Maybe<SnapshotWhereInput>;
  orderBy?: Maybe<SnapshotOrderByInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<SnapshotWhereUniqueInput>;
};

export type StockPortfolioCreateInput = {
  readonly name: Scalars['String'];
};

export type StockPortfolioCreateOneWithoutOrderInput = {
  readonly connect?: Maybe<StockPortfolioWhereUniqueInput>;
};

export type StockPortfolioCreateOneWithoutStockPortfolioEventInput = {
  readonly connect: StockPortfolioWhereUniqueInput;
};

export type StockPortfolioCreateOneWithoutWebhookInput = {
  readonly connect: StockPortfolioWhereUniqueInput;
};

export type StockPortfolioDataHeader = {
  readonly name: Scalars['String'];
  readonly dataKey: Scalars['String'];
};

export type StockPortfolioEvent = {
  readonly __typename?: 'StockPortfolioEvent';
  readonly scheduledEvent: ScheduledEvent;
  readonly scheduledEventId: Scalars['String'];
  readonly stockPortfolio: StockPortfolio;
  readonly type: StockPortfolioEventType;
};

export type StockPortfolioEventCreateInput = {
  readonly type: StockPortfolioEventType;
  readonly scheduledEvent: ScheduledEventCreateOneWithoutStockPortfolioEventInput;
  readonly stockPortfolio: StockPortfolioCreateOneWithoutStockPortfolioEventInput;
};

export type StockPortfolioEventFilter = {
  readonly every?: Maybe<StockPortfolioEventWhereInput>;
  readonly some?: Maybe<StockPortfolioEventWhereInput>;
  readonly none?: Maybe<StockPortfolioEventWhereInput>;
};

export enum StockPortfolioEventType {
  DataRetrieved = 'DataRetrieved'
}

export type StockPortfolioEventUpdateInput = {
  readonly type?: Maybe<StockPortfolioEventType>;
  readonly scheduledEvent?: Maybe<ScheduledEventUpdateOneRequiredWithoutStockPortfolioEventInput>;
};

export type StockPortfolioEventWhereInput = {
  readonly scheduledEventId?: Maybe<StringFilter>;
  readonly type?: Maybe<StockPortfolioEventType>;
  readonly stockPortfolioId?: Maybe<StringFilter>;
  readonly AND?: Maybe<ReadonlyArray<StockPortfolioEventWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<StockPortfolioEventWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<StockPortfolioEventWhereInput>>;
  readonly scheduledEvent?: Maybe<ScheduledEventWhereInput>;
  readonly stockPortfolio?: Maybe<StockPortfolioWhereInput>;
};

export type StockPortfolioEventWhereUniqueInput = {
  readonly scheduledEventId?: Maybe<Scalars['String']>;
  readonly stockPortfolioId_type?: Maybe<StockPortfolioIdTypeCompoundUniqueInput>;
};

export type StockPortfolioFilter = {
  readonly every?: Maybe<StockPortfolioWhereInput>;
  readonly some?: Maybe<StockPortfolioWhereInput>;
  readonly none?: Maybe<StockPortfolioWhereInput>;
};

export type StockPortfolioHeader = StockPortfolioDataHeader & {
  readonly __typename?: 'StockPortfolioHeader';
  readonly name: Scalars['String'];
  readonly dataKey: Scalars['String'];
  readonly frozen: Scalars['Boolean'];
  readonly resizable: Scalars['Boolean'];
  readonly width: Scalars['Int'];
};

export type StockPortfolioHeaderInput = {
  readonly name: Scalars['String'];
  readonly dataKey: Scalars['String'];
  readonly width: Scalars['Int'];
  readonly frozen: Scalars['Boolean'];
  readonly resizable: Scalars['Boolean'];
};

export type StockPortfolioIdTypeCompoundUniqueInput = {
  readonly stockPortfolioId: Scalars['String'];
  readonly type: StockPortfolioEventType;
};

export type StockPortfolioOrderByInput = {
  readonly id?: Maybe<OrderByArg>;
  readonly userId?: Maybe<OrderByArg>;
  readonly name?: Maybe<OrderByArg>;
  readonly buyingPower?: Maybe<OrderByArg>;
  readonly createdAt?: Maybe<OrderByArg>;
  readonly updatedAt?: Maybe<OrderByArg>;
};

export type StockPortfolioSettings = {
  readonly __typename?: 'StockPortfolioSettings';
  readonly stockPortfolio: StockPortfolio;
  readonly enableSnapshots: Scalars['Boolean'];
};

export type StockPortfolioSettingsUpdateInput = {
  /** Whether snapshots should be saved per-data-refresh of this stock-portfolio */
  readonly enableSnapshots?: Maybe<Scalars['Boolean']>;
};

export type StockPortfolioSettingsWhereInput = {
  readonly stockPortfolioId?: Maybe<StringFilter>;
  readonly enableSnapshots?: Maybe<BooleanFilter>;
  readonly AND?: Maybe<ReadonlyArray<StockPortfolioSettingsWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<StockPortfolioSettingsWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<StockPortfolioSettingsWhereInput>>;
  readonly stockPortfolio?: Maybe<StockPortfolioWhereInput>;
};

export type StockPortfolioSettingsWhereUniqueInput = {
  readonly stockPortfolioId: Scalars['String'];
};

export type StockPortfolioUpdateInput = {
  readonly name?: Maybe<Scalars['String']>;
  readonly headers?: Maybe<ReadonlyArray<StockPortfolioHeaderInput>>;
  readonly tickers?: Maybe<ReadonlyArray<Scalars['String']>>;
};

export type StockPortfolioWhereInput = {
  readonly id?: Maybe<StringFilter>;
  readonly userId?: Maybe<StringFilter>;
  readonly name?: Maybe<StringFilter>;
  readonly snapshots?: Maybe<SnapshotFilter>;
  readonly orders?: Maybe<OrderFilter>;
  readonly buyingPower?: Maybe<FloatFilter>;
  readonly createdAt?: Maybe<DateTimeFilter>;
  readonly updatedAt?: Maybe<DateTimeFilter>;
  readonly Position?: Maybe<PositionFilter>;
  readonly Webhook?: Maybe<WebhookFilter>;
  readonly StockPortfolioEvent?: Maybe<StockPortfolioEventFilter>;
  readonly AND?: Maybe<ReadonlyArray<StockPortfolioWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<StockPortfolioWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<StockPortfolioWhereInput>>;
  readonly user?: Maybe<UserWhereInput>;
  readonly settings?: Maybe<StockPortfolioSettingsWhereInput>;
  readonly latestSnapshot?: Maybe<LatestSnapshotWhereInput>;
};

export type StockPortfolioWhereUniqueInput = {
  readonly id?: Maybe<Scalars['String']>;
  readonly userId_name?: Maybe<UserIdNameCompoundUniqueInput>;
};

export type StockPortfolioWhereWithoutUserInput = {
  readonly id?: Maybe<StringFilter>;
  readonly createdAt?: Maybe<DateTimeFilter>;
  readonly updatedAt?: Maybe<DateTimeFilter>;
  readonly webhook?: Maybe<WebhookFilter>;
  readonly AND?: Maybe<ReadonlyArray<StockPortfolioWhereWithoutUserInput>>;
  readonly OR?: Maybe<ReadonlyArray<StockPortfolioWhereWithoutUserInput>>;
  readonly NOT?: Maybe<ReadonlyArray<StockPortfolioWhereWithoutUserInput>>;
};

export type StringFilter = {
  readonly equals?: Maybe<Scalars['String']>;
  readonly not?: Maybe<Scalars['String']>;
  readonly in?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly notIn?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly lt?: Maybe<Scalars['String']>;
  readonly lte?: Maybe<Scalars['String']>;
  readonly gt?: Maybe<Scalars['String']>;
  readonly gte?: Maybe<Scalars['String']>;
  readonly contains?: Maybe<Scalars['String']>;
  readonly startsWith?: Maybe<Scalars['String']>;
  readonly endsWith?: Maybe<Scalars['String']>;
};

export type StripeCard = {
  readonly __typename?: 'StripeCard';
  readonly brand: Scalars['String'];
  readonly fingerprint?: Maybe<Scalars['String']>;
  readonly last4: Scalars['String'];
  readonly exp_month: Scalars['Int'];
  readonly exp_year: Scalars['Int'];
};

export type StripeDetailsWhereInput = {
  readonly userId?: Maybe<StringFilter>;
  readonly customerId?: Maybe<StringFilter>;
  readonly AND?: Maybe<ReadonlyArray<StripeDetailsWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<StripeDetailsWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<StripeDetailsWhereInput>>;
  readonly user?: Maybe<UserWhereInput>;
};

export type StripePaymentIntent = {
  readonly __typename?: 'StripePaymentIntent';
  readonly id: Scalars['String'];
  readonly amount?: Maybe<Scalars['Float']>;
  readonly client_secret?: Maybe<Scalars['String']>;
  readonly currency?: Maybe<Scalars['String']>;
  readonly created: Scalars['Int'];
  readonly payment_method?: Maybe<StripePaymentMethod>;
};

export type StripePaymentMethod = {
  readonly __typename?: 'StripePaymentMethod';
  readonly id: Scalars['String'];
  readonly card?: Maybe<StripeCard>;
  readonly created: Scalars['Int'];
};

export type StripeSetupIntent = {
  readonly __typename?: 'StripeSetupIntent';
  readonly id: Scalars['String'];
  readonly client_secret?: Maybe<Scalars['String']>;
  readonly payment_method?: Maybe<StripePaymentMethod>;
  readonly created: Scalars['Int'];
};

export enum TimeInForce {
  Day = 'Day',
  Gtc = 'GTC',
  Opg = 'OPG',
  Cls = 'CLS',
  Ioc = 'IOC',
  Fok = 'FOK'
}

export type Toast = {
  readonly __typename?: 'Toast';
  readonly intent?: Maybe<Scalars['String']>;
  readonly message: Scalars['String'];
};

export type ToastInput = {
  readonly intent?: Maybe<Scalars['String']>;
  readonly message: Scalars['String'];
};

/** The response from a successful login or token refresh request */
export type TokenPayload = {
  readonly __typename?: 'TokenPayload';
  /** JSON web token to authenticate API requests */
  readonly token: Scalars['String'];
  /** JSON web token to refresh the token */
  readonly refreshToken: Scalars['String'];
};

/** Basic user of the application */
export type User = {
  readonly __typename?: 'User';
  readonly id: Scalars['String'];
  readonly email: Scalars['EmailAddress'];
  readonly emailVerified: Scalars['Boolean'];
  readonly username: Scalars['String'];
  readonly balance?: Maybe<Balance>;
  readonly stockPortfolios: ReadonlyArray<StockPortfolio>;
  readonly timezone: Scalars['String'];
  readonly createdAt: Scalars['DateTime'];
  readonly updatedAt: Scalars['DateTime'];
};


/** Basic user of the application */
export type UserStockPortfoliosArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<StockPortfolioWhereUniqueInput>;
};

export type UserIdNameCompoundUniqueInput = {
  readonly userId: Scalars['String'];
  readonly name: Scalars['String'];
};


export type UserWhereInput = {
  readonly id?: Maybe<StringFilter>;
  readonly email?: Maybe<StringFilter>;
  readonly emailVerified?: Maybe<BooleanFilter>;
  readonly password?: Maybe<StringFilter>;
  readonly username?: Maybe<StringFilter>;
  readonly timezone?: Maybe<StringFilter>;
  readonly stockPortfolios?: Maybe<StockPortfolioFilter>;
  readonly createdAt?: Maybe<DateTimeFilter>;
  readonly updatedAt?: Maybe<DateTimeFilter>;
  readonly PaymentTransaction?: Maybe<PaymentTransactionFilter>;
  readonly ScheduledEvent?: Maybe<ScheduledEventFilter>;
  readonly AND?: Maybe<ReadonlyArray<UserWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<UserWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<UserWhereInput>>;
  readonly balance?: Maybe<BalanceWhereInput>;
  readonly stripeDetails?: Maybe<StripeDetailsWhereInput>;
};

export type Webhook = {
  readonly __typename?: 'Webhook';
  readonly id: Scalars['String'];
  readonly stockPortfolio: StockPortfolio;
  readonly timeout: Scalars['Int'];
  readonly type: WebhookType;
  readonly url: Scalars['String'];
  readonly query?: Maybe<Scalars['String']>;
  readonly secret?: Maybe<Scalars['String']>;
  readonly createdAt: Scalars['DateTime'];
};

export type WebhookCreateInput = {
  readonly type: WebhookType;
  readonly query?: Maybe<Scalars['String']>;
  readonly secret?: Maybe<Scalars['String']>;
  readonly url: Scalars['String'];
  readonly timeout?: Maybe<Scalars['Int']>;
  readonly stockPortfolio: StockPortfolioCreateOneWithoutWebhookInput;
};

export type WebhookFilter = {
  readonly every?: Maybe<WebhookWhereInput>;
  readonly some?: Maybe<WebhookWhereInput>;
  readonly none?: Maybe<WebhookWhereInput>;
};

export type WebhookOrderByInput = {
  readonly createdAt?: Maybe<OrderByArg>;
};

export enum WebhookType {
  StockDataRetrieved = 'StockDataRetrieved'
}

export type WebhookUpdateInput = {
  readonly type?: Maybe<WebhookType>;
  readonly query?: Maybe<Scalars['String']>;
  readonly secret?: Maybe<Scalars['String']>;
  readonly url?: Maybe<Scalars['String']>;
  readonly timeout?: Maybe<Scalars['Int']>;
};

export type WebhookWhereInput = {
  readonly id?: Maybe<StringFilter>;
  readonly stockPortfolioId?: Maybe<StringFilter>;
  readonly type?: Maybe<WebhookType>;
  readonly url?: Maybe<StringFilter>;
  readonly timeout?: Maybe<IntFilter>;
  readonly createdAt?: Maybe<DateTimeFilter>;
  readonly AND?: Maybe<ReadonlyArray<WebhookWhereInput>>;
  readonly OR?: Maybe<ReadonlyArray<WebhookWhereInput>>;
  readonly NOT?: Maybe<ReadonlyArray<WebhookWhereInput>>;
  readonly stockPortfolio?: Maybe<StockPortfolioWhereWithoutUserInput>;
};

export type WebhookWhereUniqueInput = {
  readonly id?: Maybe<Scalars['String']>;
};

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = (
  { readonly __typename?: 'Query' }
  & Pick<Query, 'modal'>
  & { readonly toasts: ReadonlyArray<(
    { readonly __typename?: 'Toast' }
    & Pick<Toast, 'intent' | 'message'>
  )>, readonly user?: Maybe<(
    { readonly __typename?: 'User' }
    & Pick<User, 'id'>
  )> }
);

export type ApplySucceededTransactionMutationVariables = Exact<{
  paymentIntentId: Scalars['String'];
}>;


export type ApplySucceededTransactionMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly applySucceededTransaction?: Maybe<(
    { readonly __typename?: 'Balance' }
    & Pick<Balance, 'credits'>
  )> }
);

export type CancelStripeSetupIntentMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type CancelStripeSetupIntentMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly cancelStripeSetupIntent?: Maybe<(
    { readonly __typename?: 'StripeSetupIntent' }
    & { readonly payment_method?: Maybe<(
      { readonly __typename?: 'StripePaymentMethod' }
      & { readonly card?: Maybe<(
        { readonly __typename?: 'StripeCard' }
        & Pick<StripeCard, 'brand' | 'fingerprint' | 'last4' | 'exp_month' | 'exp_year'>
      )> }
    )> }
  )> }
);

export type CreateStockPortfolioMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateStockPortfolioMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly createOneStockPortfolio: (
    { readonly __typename?: 'StockPortfolio' }
    & Pick<StockPortfolio, 'id' | 'name'>
  ) }
);

export type CreateStripePaymentIntentMutationVariables = Exact<{
  orderDetails: ReadonlyArray<OrderDetailInput>;
  paymentMethodId: Scalars['String'];
}>;


export type CreateStripePaymentIntentMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly createStripePaymentIntent?: Maybe<(
    { readonly __typename?: 'StripePaymentIntent' }
    & Pick<StripePaymentIntent, 'amount' | 'client_secret'>
    & { readonly payment_method?: Maybe<(
      { readonly __typename?: 'StripePaymentMethod' }
      & { readonly card?: Maybe<(
        { readonly __typename?: 'StripeCard' }
        & Pick<StripeCard, 'brand' | 'fingerprint' | 'last4' | 'exp_month' | 'exp_year'>
      )> }
    )> }
  )> }
);

export type CreateStripeSetupIntentMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateStripeSetupIntentMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly createStripeSetupIntent?: Maybe<(
    { readonly __typename?: 'StripeSetupIntent' }
    & Pick<StripeSetupIntent, 'id' | 'client_secret'>
  )> }
);

export type CreateWebhookMutationVariables = Exact<{
  data: WebhookCreateInput;
}>;


export type CreateWebhookMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly webhook: (
    { readonly __typename?: 'Webhook' }
    & Pick<Webhook, 'id'>
  ) }
);

export type DeleteDataRetrievedEventMutationVariables = Exact<{
  where: StockPortfolioEventWhereUniqueInput;
}>;


export type DeleteDataRetrievedEventMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly deleteOneStockPortfolioEvent?: Maybe<(
    { readonly __typename?: 'StockPortfolioEvent' }
    & Pick<StockPortfolioEvent, 'scheduledEventId'>
  )> }
);

export type DeleteStockPortfolioMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteStockPortfolioMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly deleteOneStockPortfolio?: Maybe<(
    { readonly __typename?: 'StockPortfolio' }
    & Pick<StockPortfolio, 'id' | 'name'>
  )> }
);

export type DeleteWebhookMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteWebhookMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly webhook?: Maybe<(
    { readonly __typename?: 'Webhook' }
    & Pick<Webhook, 'id'>
  )> }
);

export type GetStockDataMutationVariables = Exact<{
  where: StockDataWhereUniqueInput;
}>;


export type GetStockDataMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly getStockData?: Maybe<(
    { readonly __typename?: 'StockData' }
    & Pick<StockData, 'data'>
  )> }
);

export type LoginLocalUserMutationVariables = Exact<{
  input: LoginLocalUserInput;
}>;


export type LoginLocalUserMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly loginLocalUser?: Maybe<(
    { readonly __typename?: 'TokenPayload' }
    & Pick<TokenPayload, 'token' | 'refreshToken'>
  )> }
);

export type RefreshAccessTokenMutationVariables = Exact<{
  input: RefreshAccessTokenInput;
}>;


export type RefreshAccessTokenMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly refreshAccessToken?: Maybe<(
    { readonly __typename?: 'TokenPayload' }
    & Pick<TokenPayload, 'token' | 'refreshToken'>
  )> }
);

export type RegisterLocalUserMutationVariables = Exact<{
  input: RegisterLocalUserInput;
}>;


export type RegisterLocalUserMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly registerLocalUser?: Maybe<(
    { readonly __typename?: 'RegisterLocalUserPayload' }
    & Pick<RegisterLocalUserPayload, 'success' | 'error'>
    & { readonly user?: Maybe<(
      { readonly __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'emailVerified' | 'username'>
    )> }
  )> }
);

export type ResendVerifyEmailMutationVariables = Exact<{ [key: string]: never; }>;


export type ResendVerifyEmailMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly resendVerifyEmail?: Maybe<(
    { readonly __typename?: 'ResendVerifyEmailPayload' }
    & Pick<ResendVerifyEmailPayload, 'success'>
  )> }
);

export type SetToastsMutationVariables = Exact<{
  toasts: ReadonlyArray<ToastInput>;
}>;


export type SetToastsMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly setToasts: ReadonlyArray<(
    { readonly __typename?: 'Toast' }
    & Pick<Toast, 'message'>
  )> }
);

export type SetUserMutationVariables = Exact<{ [key: string]: never; }>;


export type SetUserMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly setUser?: Maybe<(
    { readonly __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'emailVerified' | 'username'>
    & { readonly balance?: Maybe<(
      { readonly __typename?: 'Balance' }
      & Pick<Balance, 'credits'>
    )> }
  )> }
);

export type ToggleModalMutationVariables = Exact<{
  force?: Maybe<Scalars['Boolean']>;
}>;


export type ToggleModalMutation = (
  { readonly __typename?: 'Mutation' }
  & Pick<Mutation, 'toggleModal'>
);

export type UpdateOneStockPortfolioMutationVariables = Exact<{
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  tickers?: Maybe<ReadonlyArray<Scalars['String']>>;
  headers?: Maybe<ReadonlyArray<StockPortfolioHeaderInput>>;
}>;


export type UpdateOneStockPortfolioMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly updateOneStockPortfolio?: Maybe<(
    { readonly __typename?: 'StockPortfolio' }
    & Pick<StockPortfolio, 'id' | 'name'>
  )> }
);

export type UpdateStockPortfolioSettingsMutationVariables = Exact<{
  where: StockPortfolioSettingsWhereUniqueInput;
  data: StockPortfolioSettingsUpdateInput;
}>;


export type UpdateStockPortfolioSettingsMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly updateOneStockPortfolioSettings?: Maybe<(
    { readonly __typename?: 'StockPortfolioSettings' }
    & Pick<StockPortfolioSettings, 'enableSnapshots'>
    & { readonly stockPortfolio: (
      { readonly __typename?: 'StockPortfolio' }
      & Pick<StockPortfolio, 'id' | 'name'>
    ) }
  )> }
);

export type UpdateWebhookMutationVariables = Exact<{
  where: WebhookWhereUniqueInput;
  data: WebhookUpdateInput;
}>;


export type UpdateWebhookMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly webhook?: Maybe<(
    { readonly __typename?: 'Webhook' }
    & Pick<Webhook, 'id'>
  )> }
);

export type UpsertDataRetrievedEventMutationVariables = Exact<{
  type: StockPortfolioEventType;
  interval?: Maybe<Scalars['Int']>;
  recurrence?: Maybe<Recurrence>;
  days?: Maybe<ReadonlyArray<Day>>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  stockPortfolioId: Scalars['String'];
}>;


export type UpsertDataRetrievedEventMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly upsertOneStockPortfolioEvent: (
    { readonly __typename?: 'StockPortfolioEvent' }
    & Pick<StockPortfolioEvent, 'scheduledEventId' | 'type'>
  ) }
);

export type UpsertWebhookMutationVariables = Exact<{
  id?: Maybe<Scalars['String']>;
  query?: Maybe<Scalars['String']>;
  secret?: Maybe<Scalars['String']>;
  type: WebhookType;
  url: Scalars['String'];
  stockPortfolioId: Scalars['String'];
}>;


export type UpsertWebhookMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly webhook: (
    { readonly __typename?: 'Webhook' }
    & Pick<Webhook, 'id'>
  ) }
);

export type GetDataKeyOptionsQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  dataKey?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
}>;


export type GetDataKeyOptionsQuery = (
  { readonly __typename?: 'Query' }
  & { readonly dataKeyOptions: ReadonlyArray<(
    { readonly __typename?: 'DataKeyOption' }
    & Pick<DataKeyOption, 'name' | 'dataKey' | 'provider'>
  )> }
);

export type GetFeaturePricingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeaturePricingQuery = (
  { readonly __typename?: 'Query' }
  & { readonly featurePricing: (
    { readonly __typename?: 'FeaturePricing' }
    & { readonly snapshot: (
      { readonly __typename?: 'FeaturePricingConfig' }
      & Pick<FeaturePricingConfig, 'price'>
    ) }
  ) }
);

export type GetInitialAppLoadQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInitialAppLoadQuery = (
  { readonly __typename?: 'Query' }
  & { readonly toasts: ReadonlyArray<(
    { readonly __typename?: 'Toast' }
    & Pick<Toast, 'intent' | 'message'>
  )> }
);

export type GetManyStockPortfoliosQueryVariables = Exact<{
  take?: Maybe<Scalars['Int']>;
  cursor?: Maybe<StockPortfolioWhereUniqueInput>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<StockPortfolioWhereInput>;
  query?: Maybe<Scalars['String']>;
}>;


export type GetManyStockPortfoliosQuery = (
  { readonly __typename?: 'Query' }
  & { count: Query['stockPortfolioCount'] }
  & { readonly stockPortfolios: ReadonlyArray<(
    { readonly __typename?: 'StockPortfolio' }
    & Pick<StockPortfolio, 'id' | 'name' | 'updatedAt'>
  )> }
);

export type GetModalQueryVariables = Exact<{ [key: string]: never; }>;


export type GetModalQuery = (
  { readonly __typename?: 'Query' }
  & Pick<Query, 'modal'>
);

export type GetOneStockPortfolioQueryVariables = Exact<{
  where: StockPortfolioWhereUniqueInput;
}>;


export type GetOneStockPortfolioQuery = (
  { readonly __typename?: 'Query' }
  & { readonly stockPortfolio?: Maybe<(
    { readonly __typename?: 'StockPortfolio' }
    & Pick<StockPortfolio, 'id' | 'name' | 'tickers' | 'createdAt' | 'updatedAt'>
    & { readonly headers: ReadonlyArray<(
      { readonly __typename?: 'StockPortfolioHeader' }
      & Pick<StockPortfolioHeader, 'name' | 'dataKey' | 'frozen' | 'resizable' | 'width'>
    )>, readonly latestSnapshot?: Maybe<(
      { readonly __typename?: 'Snapshot' }
      & Pick<Snapshot, 'data' | 'createdAt'>
    )>, readonly stockData: (
      { readonly __typename?: 'StockData' }
      & Pick<StockData, 'refreshCost'>
    ), readonly user: (
      { readonly __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), readonly settings: (
      { readonly __typename?: 'StockPortfolioSettings' }
      & Pick<StockPortfolioSettings, 'enableSnapshots'>
    ) }
  )> }
);

export type GetPriceBundlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPriceBundlesQuery = (
  { readonly __typename?: 'Query' }
  & { readonly priceBundles: ReadonlyArray<(
    { readonly __typename?: 'PriceBundle' }
    & Pick<PriceBundle, 'id' | 'price' | 'credits'>
  )> }
);

export type GetSnapshotQueryVariables = Exact<{
  where: SnapshotWhereUniqueInput;
}>;


export type GetSnapshotQuery = (
  { readonly __typename?: 'Query' }
  & { readonly snapshot?: Maybe<(
    { readonly __typename?: 'Snapshot' }
    & Pick<Snapshot, 'id' | 'tickers' | 'data' | 'createdAt'>
    & { readonly headers: ReadonlyArray<(
      { readonly __typename?: 'SnapshotHeader' }
      & Pick<SnapshotHeader, 'dataKey' | 'name'>
    )> }
  )> }
);

export type GetSnapshotsQueryVariables = Exact<{
  where: SnapshotWhereInput;
  orderBy?: Maybe<SnapshotOrderByInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type GetSnapshotsQuery = (
  { readonly __typename?: 'Query' }
  & { count: Query['snapshotCount'] }
  & { readonly snapshots: ReadonlyArray<(
    { readonly __typename?: 'Snapshot' }
    & Pick<Snapshot, 'id' | 'createdAt'>
  )> }
);

export type GetStockPortfolioEventQueryVariables = Exact<{
  where: StockPortfolioEventWhereUniqueInput;
}>;


export type GetStockPortfolioEventQuery = (
  { readonly __typename?: 'Query' }
  & { readonly stockPortfolioEvent?: Maybe<(
    { readonly __typename?: 'StockPortfolioEvent' }
    & Pick<StockPortfolioEvent, 'scheduledEventId' | 'type'>
    & { readonly scheduledEvent: (
      { readonly __typename?: 'ScheduledEvent' }
      & Pick<ScheduledEvent, 'id' | 'interval' | 'recurrence' | 'days' | 'hour' | 'minute'>
    ), readonly stockPortfolio: (
      { readonly __typename?: 'StockPortfolio' }
      & Pick<StockPortfolio, 'id'>
    ) }
  )> }
);

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = (
  { readonly __typename?: 'Query' }
  & { readonly user?: Maybe<(
    { readonly __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'emailVerified' | 'username'>
    & { readonly balance?: Maybe<(
      { readonly __typename?: 'Balance' }
      & Pick<Balance, 'credits'>
    )> }
  )> }
);

export type GetViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetViewerQuery = (
  { readonly __typename?: 'Query' }
  & { readonly viewer?: Maybe<(
    { readonly __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'emailVerified' | 'username'>
    & { readonly balance?: Maybe<(
      { readonly __typename?: 'Balance' }
      & Pick<Balance, 'credits'>
    )> }
  )> }
);

export type GetWebhookQueryVariables = Exact<{
  where: WebhookWhereUniqueInput;
}>;


export type GetWebhookQuery = (
  { readonly __typename?: 'Query' }
  & { readonly webhook?: Maybe<(
    { readonly __typename?: 'Webhook' }
    & Pick<Webhook, 'id' | 'query' | 'secret' | 'type' | 'url'>
    & { readonly stockPortfolio: (
      { readonly __typename?: 'StockPortfolio' }
      & Pick<StockPortfolio, 'id' | 'name'>
      & { readonly user: (
        { readonly __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    ) }
  )> }
);

export type GetWebhooksQueryVariables = Exact<{
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  cursor?: Maybe<WebhookWhereUniqueInput>;
  where?: Maybe<WebhookWhereInput>;
}>;


export type GetWebhooksQuery = (
  { readonly __typename?: 'Query' }
  & { count: Query['webhookCount'] }
  & { readonly webhooks: ReadonlyArray<(
    { readonly __typename?: 'Webhook' }
    & Pick<Webhook, 'id' | 'type' | 'url' | 'createdAt'>
  )> }
);

export type SearchStockSymbolsQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type SearchStockSymbolsQuery = (
  { readonly __typename?: 'Query' }
  & { readonly stockSymbols: ReadonlyArray<(
    { readonly __typename?: 'StockDataSearch' }
    & Pick<StockDataSearch, 'symbol' | 'securityName'>
  )> }
);

export type Unnamed_2_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_2_Query = (
  { readonly __typename?: 'Query' }
  & { readonly toasts: ReadonlyArray<(
    { readonly __typename?: 'Toast' }
    & Pick<Toast, 'intent' | 'message'>
  )> }
);


export const ApplySucceededTransactionDocument = gql`
    mutation ApplySucceededTransaction($paymentIntentId: String!) {
  applySucceededTransaction(paymentIntentId: $paymentIntentId) {
    credits
  }
}
    `;
export type ApplySucceededTransactionMutationFn = ApolloReactCommon.MutationFunction<ApplySucceededTransactionMutation, ApplySucceededTransactionMutationVariables>;

/**
 * __useApplySucceededTransactionMutation__
 *
 * To run a mutation, you first call `useApplySucceededTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplySucceededTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applySucceededTransactionMutation, { data, loading, error }] = useApplySucceededTransactionMutation({
 *   variables: {
 *      paymentIntentId: // value for 'paymentIntentId'
 *   },
 * });
 */
export function useApplySucceededTransactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ApplySucceededTransactionMutation, ApplySucceededTransactionMutationVariables>) {
        return ApolloReactHooks.useMutation<ApplySucceededTransactionMutation, ApplySucceededTransactionMutationVariables>(ApplySucceededTransactionDocument, baseOptions);
      }
export type ApplySucceededTransactionMutationHookResult = ReturnType<typeof useApplySucceededTransactionMutation>;
export type ApplySucceededTransactionMutationResult = ApolloReactCommon.MutationResult<ApplySucceededTransactionMutation>;
export type ApplySucceededTransactionMutationOptions = ApolloReactCommon.BaseMutationOptions<ApplySucceededTransactionMutation, ApplySucceededTransactionMutationVariables>;
export const CancelStripeSetupIntentDocument = gql`
    mutation CancelStripeSetupIntent($id: String!) {
  cancelStripeSetupIntent(id: $id) {
    payment_method {
      card {
        brand
        fingerprint
        last4
        exp_month
        exp_year
      }
    }
  }
}
    `;
export type CancelStripeSetupIntentMutationFn = ApolloReactCommon.MutationFunction<CancelStripeSetupIntentMutation, CancelStripeSetupIntentMutationVariables>;

/**
 * __useCancelStripeSetupIntentMutation__
 *
 * To run a mutation, you first call `useCancelStripeSetupIntentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelStripeSetupIntentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelStripeSetupIntentMutation, { data, loading, error }] = useCancelStripeSetupIntentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCancelStripeSetupIntentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelStripeSetupIntentMutation, CancelStripeSetupIntentMutationVariables>) {
        return ApolloReactHooks.useMutation<CancelStripeSetupIntentMutation, CancelStripeSetupIntentMutationVariables>(CancelStripeSetupIntentDocument, baseOptions);
      }
export type CancelStripeSetupIntentMutationHookResult = ReturnType<typeof useCancelStripeSetupIntentMutation>;
export type CancelStripeSetupIntentMutationResult = ApolloReactCommon.MutationResult<CancelStripeSetupIntentMutation>;
export type CancelStripeSetupIntentMutationOptions = ApolloReactCommon.BaseMutationOptions<CancelStripeSetupIntentMutation, CancelStripeSetupIntentMutationVariables>;
export const CreateStockPortfolioDocument = gql`
    mutation CreateStockPortfolio($name: String!) {
  createOneStockPortfolio(data: {name: $name}) {
    id
    name
  }
}
    `;
export type CreateStockPortfolioMutationFn = ApolloReactCommon.MutationFunction<CreateStockPortfolioMutation, CreateStockPortfolioMutationVariables>;

/**
 * __useCreateStockPortfolioMutation__
 *
 * To run a mutation, you first call `useCreateStockPortfolioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStockPortfolioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStockPortfolioMutation, { data, loading, error }] = useCreateStockPortfolioMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateStockPortfolioMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateStockPortfolioMutation, CreateStockPortfolioMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateStockPortfolioMutation, CreateStockPortfolioMutationVariables>(CreateStockPortfolioDocument, baseOptions);
      }
export type CreateStockPortfolioMutationHookResult = ReturnType<typeof useCreateStockPortfolioMutation>;
export type CreateStockPortfolioMutationResult = ApolloReactCommon.MutationResult<CreateStockPortfolioMutation>;
export type CreateStockPortfolioMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateStockPortfolioMutation, CreateStockPortfolioMutationVariables>;
export const CreateStripePaymentIntentDocument = gql`
    mutation CreateStripePaymentIntent($orderDetails: [OrderDetailInput!]!, $paymentMethodId: String!) {
  createStripePaymentIntent(orderDetails: $orderDetails, paymentMethodId: $paymentMethodId) {
    amount
    client_secret
    payment_method {
      card {
        brand
        fingerprint
        last4
        exp_month
        exp_year
      }
    }
  }
}
    `;
export type CreateStripePaymentIntentMutationFn = ApolloReactCommon.MutationFunction<CreateStripePaymentIntentMutation, CreateStripePaymentIntentMutationVariables>;

/**
 * __useCreateStripePaymentIntentMutation__
 *
 * To run a mutation, you first call `useCreateStripePaymentIntentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStripePaymentIntentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStripePaymentIntentMutation, { data, loading, error }] = useCreateStripePaymentIntentMutation({
 *   variables: {
 *      orderDetails: // value for 'orderDetails'
 *      paymentMethodId: // value for 'paymentMethodId'
 *   },
 * });
 */
export function useCreateStripePaymentIntentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateStripePaymentIntentMutation, CreateStripePaymentIntentMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateStripePaymentIntentMutation, CreateStripePaymentIntentMutationVariables>(CreateStripePaymentIntentDocument, baseOptions);
      }
export type CreateStripePaymentIntentMutationHookResult = ReturnType<typeof useCreateStripePaymentIntentMutation>;
export type CreateStripePaymentIntentMutationResult = ApolloReactCommon.MutationResult<CreateStripePaymentIntentMutation>;
export type CreateStripePaymentIntentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateStripePaymentIntentMutation, CreateStripePaymentIntentMutationVariables>;
export const CreateStripeSetupIntentDocument = gql`
    mutation CreateStripeSetupIntent {
  createStripeSetupIntent {
    id
    client_secret
  }
}
    `;
export type CreateStripeSetupIntentMutationFn = ApolloReactCommon.MutationFunction<CreateStripeSetupIntentMutation, CreateStripeSetupIntentMutationVariables>;

/**
 * __useCreateStripeSetupIntentMutation__
 *
 * To run a mutation, you first call `useCreateStripeSetupIntentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStripeSetupIntentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStripeSetupIntentMutation, { data, loading, error }] = useCreateStripeSetupIntentMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateStripeSetupIntentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateStripeSetupIntentMutation, CreateStripeSetupIntentMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateStripeSetupIntentMutation, CreateStripeSetupIntentMutationVariables>(CreateStripeSetupIntentDocument, baseOptions);
      }
export type CreateStripeSetupIntentMutationHookResult = ReturnType<typeof useCreateStripeSetupIntentMutation>;
export type CreateStripeSetupIntentMutationResult = ApolloReactCommon.MutationResult<CreateStripeSetupIntentMutation>;
export type CreateStripeSetupIntentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateStripeSetupIntentMutation, CreateStripeSetupIntentMutationVariables>;
export const CreateWebhookDocument = gql`
    mutation CreateWebhook($data: WebhookCreateInput!) {
  webhook: createOneWebhook(data: $data) {
    id
  }
}
    `;
export type CreateWebhookMutationFn = ApolloReactCommon.MutationFunction<CreateWebhookMutation, CreateWebhookMutationVariables>;

/**
 * __useCreateWebhookMutation__
 *
 * To run a mutation, you first call `useCreateWebhookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWebhookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWebhookMutation, { data, loading, error }] = useCreateWebhookMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateWebhookMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateWebhookMutation, CreateWebhookMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateWebhookMutation, CreateWebhookMutationVariables>(CreateWebhookDocument, baseOptions);
      }
export type CreateWebhookMutationHookResult = ReturnType<typeof useCreateWebhookMutation>;
export type CreateWebhookMutationResult = ApolloReactCommon.MutationResult<CreateWebhookMutation>;
export type CreateWebhookMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateWebhookMutation, CreateWebhookMutationVariables>;
export const DeleteDataRetrievedEventDocument = gql`
    mutation DeleteDataRetrievedEvent($where: StockPortfolioEventWhereUniqueInput!) {
  deleteOneStockPortfolioEvent(where: $where) {
    scheduledEventId
  }
}
    `;
export type DeleteDataRetrievedEventMutationFn = ApolloReactCommon.MutationFunction<DeleteDataRetrievedEventMutation, DeleteDataRetrievedEventMutationVariables>;

/**
 * __useDeleteDataRetrievedEventMutation__
 *
 * To run a mutation, you first call `useDeleteDataRetrievedEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDataRetrievedEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDataRetrievedEventMutation, { data, loading, error }] = useDeleteDataRetrievedEventMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteDataRetrievedEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteDataRetrievedEventMutation, DeleteDataRetrievedEventMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteDataRetrievedEventMutation, DeleteDataRetrievedEventMutationVariables>(DeleteDataRetrievedEventDocument, baseOptions);
      }
export type DeleteDataRetrievedEventMutationHookResult = ReturnType<typeof useDeleteDataRetrievedEventMutation>;
export type DeleteDataRetrievedEventMutationResult = ApolloReactCommon.MutationResult<DeleteDataRetrievedEventMutation>;
export type DeleteDataRetrievedEventMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteDataRetrievedEventMutation, DeleteDataRetrievedEventMutationVariables>;
export const DeleteStockPortfolioDocument = gql`
    mutation DeleteStockPortfolio($id: String!) {
  deleteOneStockPortfolio(where: {id: $id}) {
    id
    name
  }
}
    `;
export type DeleteStockPortfolioMutationFn = ApolloReactCommon.MutationFunction<DeleteStockPortfolioMutation, DeleteStockPortfolioMutationVariables>;

/**
 * __useDeleteStockPortfolioMutation__
 *
 * To run a mutation, you first call `useDeleteStockPortfolioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStockPortfolioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStockPortfolioMutation, { data, loading, error }] = useDeleteStockPortfolioMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStockPortfolioMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteStockPortfolioMutation, DeleteStockPortfolioMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteStockPortfolioMutation, DeleteStockPortfolioMutationVariables>(DeleteStockPortfolioDocument, baseOptions);
      }
export type DeleteStockPortfolioMutationHookResult = ReturnType<typeof useDeleteStockPortfolioMutation>;
export type DeleteStockPortfolioMutationResult = ApolloReactCommon.MutationResult<DeleteStockPortfolioMutation>;
export type DeleteStockPortfolioMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteStockPortfolioMutation, DeleteStockPortfolioMutationVariables>;
export const DeleteWebhookDocument = gql`
    mutation DeleteWebhook($id: String!) {
  webhook: deleteOneWebhook(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteWebhookMutationFn = ApolloReactCommon.MutationFunction<DeleteWebhookMutation, DeleteWebhookMutationVariables>;

/**
 * __useDeleteWebhookMutation__
 *
 * To run a mutation, you first call `useDeleteWebhookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWebhookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWebhookMutation, { data, loading, error }] = useDeleteWebhookMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWebhookMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteWebhookMutation, DeleteWebhookMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteWebhookMutation, DeleteWebhookMutationVariables>(DeleteWebhookDocument, baseOptions);
      }
export type DeleteWebhookMutationHookResult = ReturnType<typeof useDeleteWebhookMutation>;
export type DeleteWebhookMutationResult = ApolloReactCommon.MutationResult<DeleteWebhookMutation>;
export type DeleteWebhookMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteWebhookMutation, DeleteWebhookMutationVariables>;
export const GetStockDataDocument = gql`
    mutation GetStockData($where: StockDataWhereUniqueInput!) {
  getStockData(where: $where) {
    data
  }
}
    `;
export type GetStockDataMutationFn = ApolloReactCommon.MutationFunction<GetStockDataMutation, GetStockDataMutationVariables>;

/**
 * __useGetStockDataMutation__
 *
 * To run a mutation, you first call `useGetStockDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetStockDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getStockDataMutation, { data, loading, error }] = useGetStockDataMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetStockDataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetStockDataMutation, GetStockDataMutationVariables>) {
        return ApolloReactHooks.useMutation<GetStockDataMutation, GetStockDataMutationVariables>(GetStockDataDocument, baseOptions);
      }
export type GetStockDataMutationHookResult = ReturnType<typeof useGetStockDataMutation>;
export type GetStockDataMutationResult = ApolloReactCommon.MutationResult<GetStockDataMutation>;
export type GetStockDataMutationOptions = ApolloReactCommon.BaseMutationOptions<GetStockDataMutation, GetStockDataMutationVariables>;
export const LoginLocalUserDocument = gql`
    mutation LoginLocalUser($input: LoginLocalUserInput!) {
  loginLocalUser(input: $input) {
    token
    refreshToken
  }
}
    `;
export type LoginLocalUserMutationFn = ApolloReactCommon.MutationFunction<LoginLocalUserMutation, LoginLocalUserMutationVariables>;

/**
 * __useLoginLocalUserMutation__
 *
 * To run a mutation, you first call `useLoginLocalUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginLocalUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginLocalUserMutation, { data, loading, error }] = useLoginLocalUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginLocalUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginLocalUserMutation, LoginLocalUserMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginLocalUserMutation, LoginLocalUserMutationVariables>(LoginLocalUserDocument, baseOptions);
      }
export type LoginLocalUserMutationHookResult = ReturnType<typeof useLoginLocalUserMutation>;
export type LoginLocalUserMutationResult = ApolloReactCommon.MutationResult<LoginLocalUserMutation>;
export type LoginLocalUserMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginLocalUserMutation, LoginLocalUserMutationVariables>;
export const RefreshAccessTokenDocument = gql`
    mutation RefreshAccessToken($input: RefreshAccessTokenInput!) {
  refreshAccessToken(input: $input) {
    token
    refreshToken
  }
}
    `;
export type RefreshAccessTokenMutationFn = ApolloReactCommon.MutationFunction<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;

/**
 * __useRefreshAccessTokenMutation__
 *
 * To run a mutation, you first call `useRefreshAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshAccessTokenMutation, { data, loading, error }] = useRefreshAccessTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRefreshAccessTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>) {
        return ApolloReactHooks.useMutation<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>(RefreshAccessTokenDocument, baseOptions);
      }
export type RefreshAccessTokenMutationHookResult = ReturnType<typeof useRefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationResult = ApolloReactCommon.MutationResult<RefreshAccessTokenMutation>;
export type RefreshAccessTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<RefreshAccessTokenMutation, RefreshAccessTokenMutationVariables>;
export const RegisterLocalUserDocument = gql`
    mutation RegisterLocalUser($input: RegisterLocalUserInput!) {
  registerLocalUser(input: $input) {
    success
    error
    user {
      id
      email
      emailVerified
      username
    }
  }
}
    `;
export type RegisterLocalUserMutationFn = ApolloReactCommon.MutationFunction<RegisterLocalUserMutation, RegisterLocalUserMutationVariables>;

/**
 * __useRegisterLocalUserMutation__
 *
 * To run a mutation, you first call `useRegisterLocalUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterLocalUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerLocalUserMutation, { data, loading, error }] = useRegisterLocalUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterLocalUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterLocalUserMutation, RegisterLocalUserMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterLocalUserMutation, RegisterLocalUserMutationVariables>(RegisterLocalUserDocument, baseOptions);
      }
export type RegisterLocalUserMutationHookResult = ReturnType<typeof useRegisterLocalUserMutation>;
export type RegisterLocalUserMutationResult = ApolloReactCommon.MutationResult<RegisterLocalUserMutation>;
export type RegisterLocalUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterLocalUserMutation, RegisterLocalUserMutationVariables>;
export const ResendVerifyEmailDocument = gql`
    mutation ResendVerifyEmail {
  resendVerifyEmail {
    success
  }
}
    `;
export type ResendVerifyEmailMutationFn = ApolloReactCommon.MutationFunction<ResendVerifyEmailMutation, ResendVerifyEmailMutationVariables>;

/**
 * __useResendVerifyEmailMutation__
 *
 * To run a mutation, you first call `useResendVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendVerifyEmailMutation, { data, loading, error }] = useResendVerifyEmailMutation({
 *   variables: {
 *   },
 * });
 */
export function useResendVerifyEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResendVerifyEmailMutation, ResendVerifyEmailMutationVariables>) {
        return ApolloReactHooks.useMutation<ResendVerifyEmailMutation, ResendVerifyEmailMutationVariables>(ResendVerifyEmailDocument, baseOptions);
      }
export type ResendVerifyEmailMutationHookResult = ReturnType<typeof useResendVerifyEmailMutation>;
export type ResendVerifyEmailMutationResult = ApolloReactCommon.MutationResult<ResendVerifyEmailMutation>;
export type ResendVerifyEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<ResendVerifyEmailMutation, ResendVerifyEmailMutationVariables>;
export const SetToastsDocument = gql`
    mutation SetToasts($toasts: [ToastInput!]!) {
  setToasts(toasts: $toasts) @client {
    message
  }
}
    `;
export type SetToastsMutationFn = ApolloReactCommon.MutationFunction<SetToastsMutation, SetToastsMutationVariables>;

/**
 * __useSetToastsMutation__
 *
 * To run a mutation, you first call `useSetToastsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetToastsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setToastsMutation, { data, loading, error }] = useSetToastsMutation({
 *   variables: {
 *      toasts: // value for 'toasts'
 *   },
 * });
 */
export function useSetToastsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetToastsMutation, SetToastsMutationVariables>) {
        return ApolloReactHooks.useMutation<SetToastsMutation, SetToastsMutationVariables>(SetToastsDocument, baseOptions);
      }
export type SetToastsMutationHookResult = ReturnType<typeof useSetToastsMutation>;
export type SetToastsMutationResult = ApolloReactCommon.MutationResult<SetToastsMutation>;
export type SetToastsMutationOptions = ApolloReactCommon.BaseMutationOptions<SetToastsMutation, SetToastsMutationVariables>;
export const SetUserDocument = gql`
    mutation SetUser {
  setUser @client {
    id
    balance {
      credits
    }
    email
    emailVerified
    username
  }
}
    `;
export type SetUserMutationFn = ApolloReactCommon.MutationFunction<SetUserMutation, SetUserMutationVariables>;

/**
 * __useSetUserMutation__
 *
 * To run a mutation, you first call `useSetUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserMutation, { data, loading, error }] = useSetUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useSetUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetUserMutation, SetUserMutationVariables>) {
        return ApolloReactHooks.useMutation<SetUserMutation, SetUserMutationVariables>(SetUserDocument, baseOptions);
      }
export type SetUserMutationHookResult = ReturnType<typeof useSetUserMutation>;
export type SetUserMutationResult = ApolloReactCommon.MutationResult<SetUserMutation>;
export type SetUserMutationOptions = ApolloReactCommon.BaseMutationOptions<SetUserMutation, SetUserMutationVariables>;
export const ToggleModalDocument = gql`
    mutation ToggleModal($force: Boolean) {
  toggleModal(force: $force) @client
}
    `;
export type ToggleModalMutationFn = ApolloReactCommon.MutationFunction<ToggleModalMutation, ToggleModalMutationVariables>;

/**
 * __useToggleModalMutation__
 *
 * To run a mutation, you first call `useToggleModalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleModalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleModalMutation, { data, loading, error }] = useToggleModalMutation({
 *   variables: {
 *      force: // value for 'force'
 *   },
 * });
 */
export function useToggleModalMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToggleModalMutation, ToggleModalMutationVariables>) {
        return ApolloReactHooks.useMutation<ToggleModalMutation, ToggleModalMutationVariables>(ToggleModalDocument, baseOptions);
      }
export type ToggleModalMutationHookResult = ReturnType<typeof useToggleModalMutation>;
export type ToggleModalMutationResult = ApolloReactCommon.MutationResult<ToggleModalMutation>;
export type ToggleModalMutationOptions = ApolloReactCommon.BaseMutationOptions<ToggleModalMutation, ToggleModalMutationVariables>;
export const UpdateOneStockPortfolioDocument = gql`
    mutation UpdateOneStockPortfolio($id: String!, $name: String, $tickers: [String!] = [], $headers: [StockPortfolioHeaderInput!]) {
  updateOneStockPortfolio(data: {name: $name, tickers: $tickers, headers: $headers}, where: {id: $id}) {
    id
    name
  }
}
    `;
export type UpdateOneStockPortfolioMutationFn = ApolloReactCommon.MutationFunction<UpdateOneStockPortfolioMutation, UpdateOneStockPortfolioMutationVariables>;

/**
 * __useUpdateOneStockPortfolioMutation__
 *
 * To run a mutation, you first call `useUpdateOneStockPortfolioMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneStockPortfolioMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneStockPortfolioMutation, { data, loading, error }] = useUpdateOneStockPortfolioMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      tickers: // value for 'tickers'
 *      headers: // value for 'headers'
 *   },
 * });
 */
export function useUpdateOneStockPortfolioMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOneStockPortfolioMutation, UpdateOneStockPortfolioMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateOneStockPortfolioMutation, UpdateOneStockPortfolioMutationVariables>(UpdateOneStockPortfolioDocument, baseOptions);
      }
export type UpdateOneStockPortfolioMutationHookResult = ReturnType<typeof useUpdateOneStockPortfolioMutation>;
export type UpdateOneStockPortfolioMutationResult = ApolloReactCommon.MutationResult<UpdateOneStockPortfolioMutation>;
export type UpdateOneStockPortfolioMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOneStockPortfolioMutation, UpdateOneStockPortfolioMutationVariables>;
export const UpdateStockPortfolioSettingsDocument = gql`
    mutation UpdateStockPortfolioSettings($where: StockPortfolioSettingsWhereUniqueInput!, $data: StockPortfolioSettingsUpdateInput!) {
  updateOneStockPortfolioSettings(where: $where, data: $data) {
    stockPortfolio {
      id
      name
    }
    enableSnapshots
  }
}
    `;
export type UpdateStockPortfolioSettingsMutationFn = ApolloReactCommon.MutationFunction<UpdateStockPortfolioSettingsMutation, UpdateStockPortfolioSettingsMutationVariables>;

/**
 * __useUpdateStockPortfolioSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateStockPortfolioSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStockPortfolioSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStockPortfolioSettingsMutation, { data, loading, error }] = useUpdateStockPortfolioSettingsMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateStockPortfolioSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateStockPortfolioSettingsMutation, UpdateStockPortfolioSettingsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateStockPortfolioSettingsMutation, UpdateStockPortfolioSettingsMutationVariables>(UpdateStockPortfolioSettingsDocument, baseOptions);
      }
export type UpdateStockPortfolioSettingsMutationHookResult = ReturnType<typeof useUpdateStockPortfolioSettingsMutation>;
export type UpdateStockPortfolioSettingsMutationResult = ApolloReactCommon.MutationResult<UpdateStockPortfolioSettingsMutation>;
export type UpdateStockPortfolioSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateStockPortfolioSettingsMutation, UpdateStockPortfolioSettingsMutationVariables>;
export const UpdateWebhookDocument = gql`
    mutation UpdateWebhook($where: WebhookWhereUniqueInput!, $data: WebhookUpdateInput!) {
  webhook: updateOneWebhook(where: $where, data: $data) {
    id
  }
}
    `;
export type UpdateWebhookMutationFn = ApolloReactCommon.MutationFunction<UpdateWebhookMutation, UpdateWebhookMutationVariables>;

/**
 * __useUpdateWebhookMutation__
 *
 * To run a mutation, you first call `useUpdateWebhookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWebhookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWebhookMutation, { data, loading, error }] = useUpdateWebhookMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateWebhookMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateWebhookMutation, UpdateWebhookMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateWebhookMutation, UpdateWebhookMutationVariables>(UpdateWebhookDocument, baseOptions);
      }
export type UpdateWebhookMutationHookResult = ReturnType<typeof useUpdateWebhookMutation>;
export type UpdateWebhookMutationResult = ApolloReactCommon.MutationResult<UpdateWebhookMutation>;
export type UpdateWebhookMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateWebhookMutation, UpdateWebhookMutationVariables>;
export const UpsertDataRetrievedEventDocument = gql`
    mutation UpsertDataRetrievedEvent($type: StockPortfolioEventType!, $interval: Int, $recurrence: Recurrence, $days: [Day!], $hour: Int, $minute: Int, $stockPortfolioId: String!) {
  upsertOneStockPortfolioEvent(where: {stockPortfolioId_type: {stockPortfolioId: $stockPortfolioId, type: $type}}, create: {type: $type, scheduledEvent: {create: {interval: $interval, recurrence: $recurrence, days: {set: $days}, hour: $hour, minute: $minute}}, stockPortfolio: {connect: {id: $stockPortfolioId}}}, update: {type: $type, scheduledEvent: {update: {interval: $interval, recurrence: $recurrence, days: {set: $days}, hour: $hour, minute: $minute}}}) {
    scheduledEventId
    type
  }
}
    `;
export type UpsertDataRetrievedEventMutationFn = ApolloReactCommon.MutationFunction<UpsertDataRetrievedEventMutation, UpsertDataRetrievedEventMutationVariables>;

/**
 * __useUpsertDataRetrievedEventMutation__
 *
 * To run a mutation, you first call `useUpsertDataRetrievedEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertDataRetrievedEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertDataRetrievedEventMutation, { data, loading, error }] = useUpsertDataRetrievedEventMutation({
 *   variables: {
 *      type: // value for 'type'
 *      interval: // value for 'interval'
 *      recurrence: // value for 'recurrence'
 *      days: // value for 'days'
 *      hour: // value for 'hour'
 *      minute: // value for 'minute'
 *      stockPortfolioId: // value for 'stockPortfolioId'
 *   },
 * });
 */
export function useUpsertDataRetrievedEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpsertDataRetrievedEventMutation, UpsertDataRetrievedEventMutationVariables>) {
        return ApolloReactHooks.useMutation<UpsertDataRetrievedEventMutation, UpsertDataRetrievedEventMutationVariables>(UpsertDataRetrievedEventDocument, baseOptions);
      }
export type UpsertDataRetrievedEventMutationHookResult = ReturnType<typeof useUpsertDataRetrievedEventMutation>;
export type UpsertDataRetrievedEventMutationResult = ApolloReactCommon.MutationResult<UpsertDataRetrievedEventMutation>;
export type UpsertDataRetrievedEventMutationOptions = ApolloReactCommon.BaseMutationOptions<UpsertDataRetrievedEventMutation, UpsertDataRetrievedEventMutationVariables>;
export const UpsertWebhookDocument = gql`
    mutation UpsertWebhook($id: String, $query: String, $secret: String, $type: WebhookType!, $url: String!, $stockPortfolioId: String!) {
  webhook: upsertOneWebhook(where: {id: $id}, create: {query: $query, secret: $secret, type: $type, url: $url, stockPortfolio: {connect: {id: $stockPortfolioId}}}, update: {query: $query, secret: $secret, type: $type, url: $url}) {
    id
  }
}
    `;
export type UpsertWebhookMutationFn = ApolloReactCommon.MutationFunction<UpsertWebhookMutation, UpsertWebhookMutationVariables>;

/**
 * __useUpsertWebhookMutation__
 *
 * To run a mutation, you first call `useUpsertWebhookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertWebhookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertWebhookMutation, { data, loading, error }] = useUpsertWebhookMutation({
 *   variables: {
 *      id: // value for 'id'
 *      query: // value for 'query'
 *      secret: // value for 'secret'
 *      type: // value for 'type'
 *      url: // value for 'url'
 *      stockPortfolioId: // value for 'stockPortfolioId'
 *   },
 * });
 */
export function useUpsertWebhookMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpsertWebhookMutation, UpsertWebhookMutationVariables>) {
        return ApolloReactHooks.useMutation<UpsertWebhookMutation, UpsertWebhookMutationVariables>(UpsertWebhookDocument, baseOptions);
      }
export type UpsertWebhookMutationHookResult = ReturnType<typeof useUpsertWebhookMutation>;
export type UpsertWebhookMutationResult = ApolloReactCommon.MutationResult<UpsertWebhookMutation>;
export type UpsertWebhookMutationOptions = ApolloReactCommon.BaseMutationOptions<UpsertWebhookMutation, UpsertWebhookMutationVariables>;
export const GetDataKeyOptionsDocument = gql`
    query GetDataKeyOptions($name: String, $dataKey: String, $provider: String) {
  dataKeyOptions(name: $name, dataKey: $dataKey, provider: $provider) {
    name
    dataKey
    provider
  }
}
    `;

/**
 * __useGetDataKeyOptionsQuery__
 *
 * To run a query within a React component, call `useGetDataKeyOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataKeyOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataKeyOptionsQuery({
 *   variables: {
 *      name: // value for 'name'
 *      dataKey: // value for 'dataKey'
 *      provider: // value for 'provider'
 *   },
 * });
 */
export function useGetDataKeyOptionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetDataKeyOptionsQuery, GetDataKeyOptionsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetDataKeyOptionsQuery, GetDataKeyOptionsQueryVariables>(GetDataKeyOptionsDocument, baseOptions);
      }
export function useGetDataKeyOptionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDataKeyOptionsQuery, GetDataKeyOptionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetDataKeyOptionsQuery, GetDataKeyOptionsQueryVariables>(GetDataKeyOptionsDocument, baseOptions);
        }
export type GetDataKeyOptionsQueryHookResult = ReturnType<typeof useGetDataKeyOptionsQuery>;
export type GetDataKeyOptionsLazyQueryHookResult = ReturnType<typeof useGetDataKeyOptionsLazyQuery>;
export type GetDataKeyOptionsQueryResult = ApolloReactCommon.QueryResult<GetDataKeyOptionsQuery, GetDataKeyOptionsQueryVariables>;
export const GetFeaturePricingDocument = gql`
    query GetFeaturePricing {
  featurePricing {
    snapshot {
      price
    }
  }
}
    `;

/**
 * __useGetFeaturePricingQuery__
 *
 * To run a query within a React component, call `useGetFeaturePricingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeaturePricingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeaturePricingQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFeaturePricingQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetFeaturePricingQuery, GetFeaturePricingQueryVariables>) {
        return ApolloReactHooks.useQuery<GetFeaturePricingQuery, GetFeaturePricingQueryVariables>(GetFeaturePricingDocument, baseOptions);
      }
export function useGetFeaturePricingLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetFeaturePricingQuery, GetFeaturePricingQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetFeaturePricingQuery, GetFeaturePricingQueryVariables>(GetFeaturePricingDocument, baseOptions);
        }
export type GetFeaturePricingQueryHookResult = ReturnType<typeof useGetFeaturePricingQuery>;
export type GetFeaturePricingLazyQueryHookResult = ReturnType<typeof useGetFeaturePricingLazyQuery>;
export type GetFeaturePricingQueryResult = ApolloReactCommon.QueryResult<GetFeaturePricingQuery, GetFeaturePricingQueryVariables>;
export const GetInitialAppLoadDocument = gql`
    query GetInitialAppLoad {
  toasts @client {
    intent
    message
  }
}
    `;

/**
 * __useGetInitialAppLoadQuery__
 *
 * To run a query within a React component, call `useGetInitialAppLoadQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInitialAppLoadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInitialAppLoadQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInitialAppLoadQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetInitialAppLoadQuery, GetInitialAppLoadQueryVariables>) {
        return ApolloReactHooks.useQuery<GetInitialAppLoadQuery, GetInitialAppLoadQueryVariables>(GetInitialAppLoadDocument, baseOptions);
      }
export function useGetInitialAppLoadLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetInitialAppLoadQuery, GetInitialAppLoadQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetInitialAppLoadQuery, GetInitialAppLoadQueryVariables>(GetInitialAppLoadDocument, baseOptions);
        }
export type GetInitialAppLoadQueryHookResult = ReturnType<typeof useGetInitialAppLoadQuery>;
export type GetInitialAppLoadLazyQueryHookResult = ReturnType<typeof useGetInitialAppLoadLazyQuery>;
export type GetInitialAppLoadQueryResult = ApolloReactCommon.QueryResult<GetInitialAppLoadQuery, GetInitialAppLoadQueryVariables>;
export const GetManyStockPortfoliosDocument = gql`
    query GetManyStockPortfolios($take: Int, $cursor: StockPortfolioWhereUniqueInput, $skip: Int, $where: StockPortfolioWhereInput, $query: String) {
  stockPortfolios(take: $take, cursor: $cursor, skip: $skip, where: $where, query: $query) {
    id
    name
    updatedAt
  }
  count: stockPortfolioCount(where: $where, query: $query)
}
    `;

/**
 * __useGetManyStockPortfoliosQuery__
 *
 * To run a query within a React component, call `useGetManyStockPortfoliosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManyStockPortfoliosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManyStockPortfoliosQuery({
 *   variables: {
 *      take: // value for 'take'
 *      cursor: // value for 'cursor'
 *      skip: // value for 'skip'
 *      where: // value for 'where'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetManyStockPortfoliosQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetManyStockPortfoliosQuery, GetManyStockPortfoliosQueryVariables>) {
        return ApolloReactHooks.useQuery<GetManyStockPortfoliosQuery, GetManyStockPortfoliosQueryVariables>(GetManyStockPortfoliosDocument, baseOptions);
      }
export function useGetManyStockPortfoliosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetManyStockPortfoliosQuery, GetManyStockPortfoliosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetManyStockPortfoliosQuery, GetManyStockPortfoliosQueryVariables>(GetManyStockPortfoliosDocument, baseOptions);
        }
export type GetManyStockPortfoliosQueryHookResult = ReturnType<typeof useGetManyStockPortfoliosQuery>;
export type GetManyStockPortfoliosLazyQueryHookResult = ReturnType<typeof useGetManyStockPortfoliosLazyQuery>;
export type GetManyStockPortfoliosQueryResult = ApolloReactCommon.QueryResult<GetManyStockPortfoliosQuery, GetManyStockPortfoliosQueryVariables>;
export const GetModalDocument = gql`
    query GetModal {
  modal @client
}
    `;

/**
 * __useGetModalQuery__
 *
 * To run a query within a React component, call `useGetModalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetModalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetModalQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetModalQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetModalQuery, GetModalQueryVariables>) {
        return ApolloReactHooks.useQuery<GetModalQuery, GetModalQueryVariables>(GetModalDocument, baseOptions);
      }
export function useGetModalLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetModalQuery, GetModalQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetModalQuery, GetModalQueryVariables>(GetModalDocument, baseOptions);
        }
export type GetModalQueryHookResult = ReturnType<typeof useGetModalQuery>;
export type GetModalLazyQueryHookResult = ReturnType<typeof useGetModalLazyQuery>;
export type GetModalQueryResult = ApolloReactCommon.QueryResult<GetModalQuery, GetModalQueryVariables>;
export const GetOneStockPortfolioDocument = gql`
    query GetOneStockPortfolio($where: StockPortfolioWhereUniqueInput!) {
  stockPortfolio(where: $where) {
    id
    name
    headers {
      name
      dataKey
      frozen
      resizable
      width
    }
    tickers
    createdAt
    updatedAt
    latestSnapshot {
      data
      createdAt
    }
    stockData {
      refreshCost
    }
    user {
      id
      username
    }
    settings {
      enableSnapshots
    }
  }
}
    `;

/**
 * __useGetOneStockPortfolioQuery__
 *
 * To run a query within a React component, call `useGetOneStockPortfolioQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneStockPortfolioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneStockPortfolioQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetOneStockPortfolioQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetOneStockPortfolioQuery, GetOneStockPortfolioQueryVariables>) {
        return ApolloReactHooks.useQuery<GetOneStockPortfolioQuery, GetOneStockPortfolioQueryVariables>(GetOneStockPortfolioDocument, baseOptions);
      }
export function useGetOneStockPortfolioLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOneStockPortfolioQuery, GetOneStockPortfolioQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetOneStockPortfolioQuery, GetOneStockPortfolioQueryVariables>(GetOneStockPortfolioDocument, baseOptions);
        }
export type GetOneStockPortfolioQueryHookResult = ReturnType<typeof useGetOneStockPortfolioQuery>;
export type GetOneStockPortfolioLazyQueryHookResult = ReturnType<typeof useGetOneStockPortfolioLazyQuery>;
export type GetOneStockPortfolioQueryResult = ApolloReactCommon.QueryResult<GetOneStockPortfolioQuery, GetOneStockPortfolioQueryVariables>;
export const GetPriceBundlesDocument = gql`
    query GetPriceBundles {
  priceBundles {
    id
    price
    credits
  }
}
    `;

/**
 * __useGetPriceBundlesQuery__
 *
 * To run a query within a React component, call `useGetPriceBundlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPriceBundlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPriceBundlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPriceBundlesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPriceBundlesQuery, GetPriceBundlesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPriceBundlesQuery, GetPriceBundlesQueryVariables>(GetPriceBundlesDocument, baseOptions);
      }
export function useGetPriceBundlesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPriceBundlesQuery, GetPriceBundlesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPriceBundlesQuery, GetPriceBundlesQueryVariables>(GetPriceBundlesDocument, baseOptions);
        }
export type GetPriceBundlesQueryHookResult = ReturnType<typeof useGetPriceBundlesQuery>;
export type GetPriceBundlesLazyQueryHookResult = ReturnType<typeof useGetPriceBundlesLazyQuery>;
export type GetPriceBundlesQueryResult = ApolloReactCommon.QueryResult<GetPriceBundlesQuery, GetPriceBundlesQueryVariables>;
export const GetSnapshotDocument = gql`
    query GetSnapshot($where: SnapshotWhereUniqueInput!) {
  snapshot(where: $where) {
    id
    headers {
      dataKey
      name
    }
    tickers
    data
    createdAt
  }
}
    `;

/**
 * __useGetSnapshotQuery__
 *
 * To run a query within a React component, call `useGetSnapshotQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSnapshotQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSnapshotQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetSnapshotQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSnapshotQuery, GetSnapshotQueryVariables>) {
        return ApolloReactHooks.useQuery<GetSnapshotQuery, GetSnapshotQueryVariables>(GetSnapshotDocument, baseOptions);
      }
export function useGetSnapshotLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSnapshotQuery, GetSnapshotQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetSnapshotQuery, GetSnapshotQueryVariables>(GetSnapshotDocument, baseOptions);
        }
export type GetSnapshotQueryHookResult = ReturnType<typeof useGetSnapshotQuery>;
export type GetSnapshotLazyQueryHookResult = ReturnType<typeof useGetSnapshotLazyQuery>;
export type GetSnapshotQueryResult = ApolloReactCommon.QueryResult<GetSnapshotQuery, GetSnapshotQueryVariables>;
export const GetSnapshotsDocument = gql`
    query GetSnapshots($where: SnapshotWhereInput!, $orderBy: SnapshotOrderByInput, $take: Int, $skip: Int) {
  snapshots(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
    id
    createdAt
  }
  count: snapshotCount(where: $where)
}
    `;

/**
 * __useGetSnapshotsQuery__
 *
 * To run a query within a React component, call `useGetSnapshotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSnapshotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSnapshotsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetSnapshotsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSnapshotsQuery, GetSnapshotsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetSnapshotsQuery, GetSnapshotsQueryVariables>(GetSnapshotsDocument, baseOptions);
      }
export function useGetSnapshotsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSnapshotsQuery, GetSnapshotsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetSnapshotsQuery, GetSnapshotsQueryVariables>(GetSnapshotsDocument, baseOptions);
        }
export type GetSnapshotsQueryHookResult = ReturnType<typeof useGetSnapshotsQuery>;
export type GetSnapshotsLazyQueryHookResult = ReturnType<typeof useGetSnapshotsLazyQuery>;
export type GetSnapshotsQueryResult = ApolloReactCommon.QueryResult<GetSnapshotsQuery, GetSnapshotsQueryVariables>;
export const GetStockPortfolioEventDocument = gql`
    query GetStockPortfolioEvent($where: StockPortfolioEventWhereUniqueInput!) {
  stockPortfolioEvent(where: $where) {
    scheduledEventId
    type
    scheduledEvent {
      id
      interval
      recurrence
      days
      hour
      minute
    }
    stockPortfolio {
      id
    }
  }
}
    `;

/**
 * __useGetStockPortfolioEventQuery__
 *
 * To run a query within a React component, call `useGetStockPortfolioEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStockPortfolioEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStockPortfolioEventQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetStockPortfolioEventQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetStockPortfolioEventQuery, GetStockPortfolioEventQueryVariables>) {
        return ApolloReactHooks.useQuery<GetStockPortfolioEventQuery, GetStockPortfolioEventQueryVariables>(GetStockPortfolioEventDocument, baseOptions);
      }
export function useGetStockPortfolioEventLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetStockPortfolioEventQuery, GetStockPortfolioEventQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetStockPortfolioEventQuery, GetStockPortfolioEventQueryVariables>(GetStockPortfolioEventDocument, baseOptions);
        }
export type GetStockPortfolioEventQueryHookResult = ReturnType<typeof useGetStockPortfolioEventQuery>;
export type GetStockPortfolioEventLazyQueryHookResult = ReturnType<typeof useGetStockPortfolioEventLazyQuery>;
export type GetStockPortfolioEventQueryResult = ApolloReactCommon.QueryResult<GetStockPortfolioEventQuery, GetStockPortfolioEventQueryVariables>;
export const GetUserDocument = gql`
    query GetUser {
  user @client {
    id
    balance {
      credits
    }
    email
    emailVerified
    username
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetViewerDocument = gql`
    query GetViewer {
  viewer {
    id
    balance {
      credits
    }
    email
    emailVerified
    username
  }
}
    `;

/**
 * __useGetViewerQuery__
 *
 * To run a query within a React component, call `useGetViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetViewerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetViewerQuery, GetViewerQueryVariables>) {
        return ApolloReactHooks.useQuery<GetViewerQuery, GetViewerQueryVariables>(GetViewerDocument, baseOptions);
      }
export function useGetViewerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetViewerQuery, GetViewerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetViewerQuery, GetViewerQueryVariables>(GetViewerDocument, baseOptions);
        }
export type GetViewerQueryHookResult = ReturnType<typeof useGetViewerQuery>;
export type GetViewerLazyQueryHookResult = ReturnType<typeof useGetViewerLazyQuery>;
export type GetViewerQueryResult = ApolloReactCommon.QueryResult<GetViewerQuery, GetViewerQueryVariables>;
export const GetWebhookDocument = gql`
    query GetWebhook($where: WebhookWhereUniqueInput!) {
  webhook(where: $where) {
    id
    query
    secret
    type
    url
    stockPortfolio {
      id
      name
      user {
        id
        username
      }
    }
  }
}
    `;

/**
 * __useGetWebhookQuery__
 *
 * To run a query within a React component, call `useGetWebhookQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWebhookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWebhookQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWebhookQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetWebhookQuery, GetWebhookQueryVariables>) {
        return ApolloReactHooks.useQuery<GetWebhookQuery, GetWebhookQueryVariables>(GetWebhookDocument, baseOptions);
      }
export function useGetWebhookLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetWebhookQuery, GetWebhookQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetWebhookQuery, GetWebhookQueryVariables>(GetWebhookDocument, baseOptions);
        }
export type GetWebhookQueryHookResult = ReturnType<typeof useGetWebhookQuery>;
export type GetWebhookLazyQueryHookResult = ReturnType<typeof useGetWebhookLazyQuery>;
export type GetWebhookQueryResult = ApolloReactCommon.QueryResult<GetWebhookQuery, GetWebhookQueryVariables>;
export const GetWebhooksDocument = gql`
    query GetWebhooks($take: Int, $skip: Int, $cursor: WebhookWhereUniqueInput, $where: WebhookWhereInput) {
  webhooks(take: $take, skip: $skip, cursor: $cursor, where: $where) {
    id
    type
    url
    createdAt
  }
  count: webhookCount(where: $where)
}
    `;

/**
 * __useGetWebhooksQuery__
 *
 * To run a query within a React component, call `useGetWebhooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWebhooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWebhooksQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      cursor: // value for 'cursor'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWebhooksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetWebhooksQuery, GetWebhooksQueryVariables>) {
        return ApolloReactHooks.useQuery<GetWebhooksQuery, GetWebhooksQueryVariables>(GetWebhooksDocument, baseOptions);
      }
export function useGetWebhooksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetWebhooksQuery, GetWebhooksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetWebhooksQuery, GetWebhooksQueryVariables>(GetWebhooksDocument, baseOptions);
        }
export type GetWebhooksQueryHookResult = ReturnType<typeof useGetWebhooksQuery>;
export type GetWebhooksLazyQueryHookResult = ReturnType<typeof useGetWebhooksLazyQuery>;
export type GetWebhooksQueryResult = ApolloReactCommon.QueryResult<GetWebhooksQuery, GetWebhooksQueryVariables>;
export const SearchStockSymbolsDocument = gql`
    query SearchStockSymbols($text: String!) {
  stockSymbols(text: $text) {
    symbol
    securityName
  }
}
    `;

/**
 * __useSearchStockSymbolsQuery__
 *
 * To run a query within a React component, call `useSearchStockSymbolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchStockSymbolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchStockSymbolsQuery({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useSearchStockSymbolsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchStockSymbolsQuery, SearchStockSymbolsQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchStockSymbolsQuery, SearchStockSymbolsQueryVariables>(SearchStockSymbolsDocument, baseOptions);
      }
export function useSearchStockSymbolsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchStockSymbolsQuery, SearchStockSymbolsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchStockSymbolsQuery, SearchStockSymbolsQueryVariables>(SearchStockSymbolsDocument, baseOptions);
        }
export type SearchStockSymbolsQueryHookResult = ReturnType<typeof useSearchStockSymbolsQuery>;
export type SearchStockSymbolsLazyQueryHookResult = ReturnType<typeof useSearchStockSymbolsLazyQuery>;
export type SearchStockSymbolsQueryResult = ApolloReactCommon.QueryResult<SearchStockSymbolsQuery, SearchStockSymbolsQueryVariables>;