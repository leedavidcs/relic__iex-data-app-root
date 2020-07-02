import * as prisma from '@prisma/client';
import { core } from '@nexus/schema';
import { GraphQLResolveInfo } from 'graphql';

// Types helpers
type IsModelNameExistsInGraphQLTypes<ReturnType> =
  ReturnType extends core.GetGen<'objectNames'>
    ? true
    : false

type NexusPrismaScalarOpts = {
  alias?: string
}

type Pagination = {
  first?: boolean
  last?: boolean
  before?: boolean
  after?: boolean
  skip?: boolean
}

type RootObjectTypes = Pick<core.GetGen<'rootTypes'>, core.GetGen<'objectNames'>>

/**
 * Determine if `B` is a subset (or equivalent to) of `A`.
*/
type IsSubset<A, B> =
  keyof A extends never ? false :
  B extends A           ? true  :
                          false

type OmitByValue<T, ValueType> =
  Pick<T, { [Key in keyof T]: T[Key] extends ValueType ? never : Key }[keyof T]>

type GetSubsetTypes<ModelName extends string> =
  keyof OmitByValue<
    {
      [P in keyof RootObjectTypes]:
        // if
        ModelName extends keyof ModelTypes
        ? IsSubset<RootObjectTypes[P], ModelTypes[ModelName]> extends true
        // else if
        ? RootObjectTypes[P]
        : never
        // else
        : never
    },
    never
  >

type SubsetTypes<ModelName extends string> =
  GetSubsetTypes<ModelName> extends never
    ? `ERROR: No subset types are available. Please make sure that one of your GraphQL type is a subset of your t.model('<ModelName>')`
    : GetSubsetTypes<ModelName>

type DynamicRequiredType<ReturnType extends string> =
  IsModelNameExistsInGraphQLTypes<ReturnType> extends true
    ? { type?: SubsetTypes<ReturnType> }
    : { type: SubsetTypes<ReturnType> }

type GetNexusPrismaInput<
  ModelName extends string,
  MethodName extends string,
  InputName extends 'filtering' | 'ordering'
> =
  ModelName extends keyof NexusPrismaInputs
    ? MethodName extends keyof NexusPrismaInputs[ModelName]
      ? InputName extends keyof NexusPrismaInputs[ModelName][MethodName]
        ? NexusPrismaInputs[ModelName][MethodName][InputName] & string
        : never
      : never
    : never

/**
 *  Represents arguments required by Prisma Client JS that will
 *  be derived from a request's input (args, context, and info)
 *  and omitted from the GraphQL API. The object itself maps the
 *  names of these args to a function that takes an object representing
 *  the request's input and returns the value to pass to the prisma
 *  arg of the same name.
 */
export type LocalComputedInputs<MethodName extends string> =
  Record<
    string,
    (params: LocalMutationResolverParams<MethodName>) => unknown
  >

export type GlobalComputedInputs =
  Record<
    string,
    (params: GlobalMutationResolverParams) => unknown
  >

type BaseMutationResolverParams = {
  info: GraphQLResolveInfo
  ctx: Context
}

export type GlobalMutationResolverParams =
  BaseMutationResolverParams & {
    args: Record<string, any> & { data: unknown }
  }

export type LocalMutationResolverParams<MethodName extends string> =
  BaseMutationResolverParams & {
    args: MethodName extends keyof core.GetGen2<'argTypes', 'Mutation'>
      ? core.GetGen3<'argTypes', 'Mutation', MethodName>
      : any
  }

export type Context = core.GetGen<'context'>

type BaseRelationOptions<MethodName extends string, ReturnType extends string> =
  DynamicRequiredType<ReturnType> & {
    alias?: string
    computedInputs?: LocalComputedInputs<MethodName>
  }

// If GetNexusPrismaInput returns never, it means there are no filtering/ordering args for it.
type NexusPrismaRelationOpts<ModelName extends string, MethodName extends string, ReturnType extends string> =
  GetNexusPrismaInput<ModelName, MethodName, 'filtering'> extends never
  ? BaseRelationOptions<MethodName, ReturnType>
  // else if
  : GetNexusPrismaInput<ModelName, MethodName, 'ordering'> extends never
  ? BaseRelationOptions<MethodName, ReturnType>
  // else
  : BaseRelationOptions<MethodName, ReturnType> & {
      filtering?:
        | boolean
        | Partial<Record<GetNexusPrismaInput<ModelName, MethodName, 'filtering'>, boolean>>
      ordering?:
        | boolean
        | Partial<Record<GetNexusPrismaInput<ModelName, MethodName, 'ordering'>, boolean>>
      pagination?: boolean | Pagination
    }

type IsScalar<TypeName extends string> = TypeName extends core.GetGen<'scalarNames'>
  ? true
  : false;

type IsObject<Name extends string> = Name extends core.GetGen<'objectNames'>
  ? true
  : false

type IsEnum<Name extends string> = Name extends core.GetGen<'enumNames'>
  ? true
  : false

type IsInputObject<Name extends string> = Name extends core.GetGen<'inputNames'>
  ? true
  : false

/**
 * The kind that a GraphQL type may be.
 */
type Kind = 'Enum' | 'Object' | 'Scalar' | 'InputObject'

/**
 * Helper to safely reference a Kind type. For example instead of the following
 * which would admit a typo:
 *
 * ```ts
 * type Foo = Bar extends 'scalar' ? ...
 * ```
 *
 * You can do this which guarantees a correct reference:
 *
 * ```ts
 * type Foo = Bar extends AKind<'Scalar'> ? ...
 * ```
 *
 */
type AKind<T extends Kind> = T

type GetKind<Name extends string> =
  IsEnum<Name> extends true
  ? 'Enum'
  // else if
  : IsScalar<Name> extends true
  ? 'Scalar'
  // else if
  : IsObject<Name> extends true
  ? 'Object'
  // else if
  : IsInputObject<Name> extends true
  ? 'InputObject'
  // else
  // FIXME should be `never`, but GQL objects named differently
  // than backing type fall into this branch
  : 'Object'

type NexusPrismaFields<ModelName extends keyof NexusPrismaTypes & string> = {
  [MethodName in keyof NexusPrismaTypes[ModelName] & string]:
    NexusPrismaMethod<
      ModelName,
      MethodName,
      GetKind<NexusPrismaTypes[ModelName][MethodName] & string> // Is the return type a scalar?
    >
}

type NexusPrismaMethod<
  ModelName extends keyof NexusPrismaTypes,
  MethodName extends keyof NexusPrismaTypes[ModelName] & string,
  ThisKind extends Kind,
  ReturnType extends string = NexusPrismaTypes[ModelName][MethodName] & string
> =
  ThisKind extends AKind<'Enum'>
  ? () => NexusPrismaFields<ModelName>
  // else if
  // if scalar return scalar opts
  : ThisKind extends AKind<'Scalar'>
  ? (opts?: NexusPrismaScalarOpts) => NexusPrismaFields<ModelName>
  // else if
  // if model name has a mapped graphql types then make opts optional
  : IsModelNameExistsInGraphQLTypes<ReturnType> extends true
  ? (opts?: NexusPrismaRelationOpts<ModelName, MethodName, ReturnType>) => NexusPrismaFields<ModelName>
  // else
  // force use input the related graphql type -> { type: '...' }
  : (opts: NexusPrismaRelationOpts<ModelName, MethodName, ReturnType>) => NexusPrismaFields<ModelName>

type GetNexusPrismaMethod<TypeName extends string> = TypeName extends keyof NexusPrismaMethods
  ? NexusPrismaMethods[TypeName]
  : <CustomTypeName extends keyof ModelTypes>(typeName: CustomTypeName) => NexusPrismaMethods[CustomTypeName]

type GetNexusPrisma<TypeName extends string, ModelOrCrud extends 'model' | 'crud'> =
  ModelOrCrud extends 'model'
    ? TypeName extends 'Mutation'
      ? never
      : TypeName extends 'Query'
        ? never
        : GetNexusPrismaMethod<TypeName>
    : ModelOrCrud extends 'crud'
      ? TypeName extends 'Mutation'
        ? GetNexusPrismaMethod<TypeName>
        : TypeName extends 'Query'
          ? GetNexusPrismaMethod<TypeName>
          : never
      : never

// Generated
interface ModelTypes {
  User: prisma.User
  StockPortfolio: prisma.StockPortfolio
  Position: prisma.Position
  Order: prisma.Order
  StockPortfolioSettings: prisma.StockPortfolioSettings
  Balance: prisma.Balance
  Transaction: prisma.Transaction
  StripeDetails: prisma.StripeDetails
  Webhook: prisma.Webhook
  Snapshot: prisma.Snapshot
  LatestSnapshot: prisma.LatestSnapshot
  ScheduledEvent: prisma.ScheduledEvent
  StockPortfolioEvent: prisma.StockPortfolioEvent
  OrderEvent: prisma.OrderEvent
}
  
interface NexusPrismaInputs {
  Query: {
    users: {
  filtering: 'id' | 'email' | 'emailVerified' | 'password' | 'username' | 'timezone' | 'stockPortfolios' | 'createdAt' | 'updatedAt' | 'Transaction' | 'ScheduledEvent' | 'AND' | 'OR' | 'NOT' | 'balance' | 'stripeDetails'
  ordering: 'id' | 'email' | 'emailVerified' | 'password' | 'username' | 'timezone' | 'createdAt' | 'updatedAt'
}
    stockPortfolios: {
  filtering: 'id' | 'userId' | 'name' | 'snapshots' | 'orders' | 'buyingPower' | 'createdAt' | 'updatedAt' | 'Position' | 'Webhook' | 'StockPortfolioEvent' | 'AND' | 'OR' | 'NOT' | 'user' | 'settings' | 'latestSnapshot'
  ordering: 'id' | 'userId' | 'name' | 'buyingPower' | 'createdAt' | 'updatedAt'
}
    positions: {
  filtering: 'id' | 'stockPortfolioId' | 'ticker' | 'quantity' | 'avgEntryPrice' | 'costBasis' | 'AND' | 'OR' | 'NOT' | 'stockPortfolio'
  ordering: 'id' | 'stockPortfolioId' | 'ticker' | 'quantity' | 'avgEntryPrice' | 'costBasis'
}
    orders: {
  filtering: 'id' | 'stockPortfolioId' | 'ticker' | 'quantity' | 'filledQuantity' | 'type' | 'side' | 'status' | 'limitPrice' | 'stopPrice' | 'avgFilledPrice' | 'timeInForce' | 'createdAt' | 'filledAt' | 'cancelledAt' | 'failedAt' | 'AND' | 'OR' | 'NOT' | 'stockPortfolio'
  ordering: 'id' | 'stockPortfolioId' | 'ticker' | 'quantity' | 'filledQuantity' | 'type' | 'side' | 'status' | 'limitPrice' | 'stopPrice' | 'avgFilledPrice' | 'timeInForce' | 'createdAt' | 'filledAt' | 'cancelledAt' | 'failedAt'
}
    stockPortfolioSettings: {
  filtering: 'stockPortfolioId' | 'enableSnapshots' | 'AND' | 'OR' | 'NOT' | 'stockPortfolio'
  ordering: 'stockPortfolioId' | 'enableSnapshots'
}
    balances: {
  filtering: 'userId' | 'credits' | 'AND' | 'OR' | 'NOT' | 'user'
  ordering: 'userId' | 'credits'
}
    transactions: {
  filtering: 'id' | 'userId' | 'creditsBefore' | 'creditsTransacted' | 'createdAt' | 'paymentIntentId' | 'status' | 'AND' | 'OR' | 'NOT' | 'user'
  ordering: 'id' | 'userId' | 'creditsBefore' | 'creditsTransacted' | 'createdAt' | 'paymentIntentId' | 'status'
}
    stripeDetails: {
  filtering: 'userId' | 'customerId' | 'AND' | 'OR' | 'NOT' | 'user'
  ordering: 'userId' | 'customerId'
}
    webhooks: {
  filtering: 'id' | 'stockPortfolioId' | 'query' | 'secret' | 'type' | 'url' | 'timeout' | 'createdAt' | 'AND' | 'OR' | 'NOT' | 'stockPortfolio'
  ordering: 'id' | 'stockPortfolioId' | 'query' | 'secret' | 'type' | 'url' | 'timeout' | 'createdAt'
}
    snapshots: {
  filtering: 'id' | 'stockPortfolioId' | 'createdAt' | 'LatestSnapshot' | 'AND' | 'OR' | 'NOT' | 'stockPortfolio'
  ordering: 'id' | 'stockPortfolioId' | 'createdAt'
}
    latestSnapshots: {
  filtering: 'snapshotId' | 'stockPortfolioId' | 'updatedAt' | 'AND' | 'OR' | 'NOT' | 'snapshot' | 'stockPortfolio'
  ordering: 'snapshotId' | 'stockPortfolioId' | 'updatedAt'
}
    scheduledEvents: {
  filtering: 'id' | 'userId' | 'recurrence' | 'hour' | 'minute' | 'interval' | 'next' | 'StockPortfolioEvent' | 'OrderEvent' | 'AND' | 'OR' | 'NOT' | 'user'
  ordering: 'id' | 'userId' | 'recurrence' | 'hour' | 'minute' | 'interval' | 'next'
}
    stockPortfolioEvents: {
  filtering: 'scheduledEventId' | 'type' | 'stockPortfolioId' | 'AND' | 'OR' | 'NOT' | 'scheduledEvent' | 'stockPortfolio'
  ordering: 'scheduledEventId' | 'type' | 'stockPortfolioId'
}
    orderEvents: {
  filtering: 'scheduledEventId' | 'type' | 'AND' | 'OR' | 'NOT' | 'scheduledEvent'
  ordering: 'scheduledEventId' | 'type'
}

  },
    User: {
    stockPortfolios: {
  filtering: 'id' | 'userId' | 'name' | 'snapshots' | 'orders' | 'buyingPower' | 'createdAt' | 'updatedAt' | 'Position' | 'Webhook' | 'StockPortfolioEvent' | 'AND' | 'OR' | 'NOT' | 'user' | 'settings' | 'latestSnapshot'
  ordering: 'id' | 'userId' | 'name' | 'buyingPower' | 'createdAt' | 'updatedAt'
}
    Transaction: {
  filtering: 'id' | 'userId' | 'creditsBefore' | 'creditsTransacted' | 'createdAt' | 'paymentIntentId' | 'status' | 'AND' | 'OR' | 'NOT' | 'user'
  ordering: 'id' | 'userId' | 'creditsBefore' | 'creditsTransacted' | 'createdAt' | 'paymentIntentId' | 'status'
}
    ScheduledEvent: {
  filtering: 'id' | 'userId' | 'recurrence' | 'hour' | 'minute' | 'interval' | 'next' | 'StockPortfolioEvent' | 'OrderEvent' | 'AND' | 'OR' | 'NOT' | 'user'
  ordering: 'id' | 'userId' | 'recurrence' | 'hour' | 'minute' | 'interval' | 'next'
}

  },  StockPortfolio: {
    snapshots: {
  filtering: 'id' | 'stockPortfolioId' | 'createdAt' | 'LatestSnapshot' | 'AND' | 'OR' | 'NOT' | 'stockPortfolio'
  ordering: 'id' | 'stockPortfolioId' | 'createdAt'
}
    orders: {
  filtering: 'id' | 'stockPortfolioId' | 'ticker' | 'quantity' | 'filledQuantity' | 'type' | 'side' | 'status' | 'limitPrice' | 'stopPrice' | 'avgFilledPrice' | 'timeInForce' | 'createdAt' | 'filledAt' | 'cancelledAt' | 'failedAt' | 'AND' | 'OR' | 'NOT' | 'stockPortfolio'
  ordering: 'id' | 'stockPortfolioId' | 'ticker' | 'quantity' | 'filledQuantity' | 'type' | 'side' | 'status' | 'limitPrice' | 'stopPrice' | 'avgFilledPrice' | 'timeInForce' | 'createdAt' | 'filledAt' | 'cancelledAt' | 'failedAt'
}
    Position: {
  filtering: 'id' | 'stockPortfolioId' | 'ticker' | 'quantity' | 'avgEntryPrice' | 'costBasis' | 'AND' | 'OR' | 'NOT' | 'stockPortfolio'
  ordering: 'id' | 'stockPortfolioId' | 'ticker' | 'quantity' | 'avgEntryPrice' | 'costBasis'
}
    Webhook: {
  filtering: 'id' | 'stockPortfolioId' | 'query' | 'secret' | 'type' | 'url' | 'timeout' | 'createdAt' | 'AND' | 'OR' | 'NOT' | 'stockPortfolio'
  ordering: 'id' | 'stockPortfolioId' | 'query' | 'secret' | 'type' | 'url' | 'timeout' | 'createdAt'
}
    StockPortfolioEvent: {
  filtering: 'scheduledEventId' | 'type' | 'stockPortfolioId' | 'AND' | 'OR' | 'NOT' | 'scheduledEvent' | 'stockPortfolio'
  ordering: 'scheduledEventId' | 'type' | 'stockPortfolioId'
}

  },  Position: {


  },  Order: {


  },  StockPortfolioSettings: {


  },  Balance: {


  },  Transaction: {


  },  StripeDetails: {


  },  Webhook: {


  },  Snapshot: {
    LatestSnapshot: {
  filtering: 'snapshotId' | 'stockPortfolioId' | 'updatedAt' | 'AND' | 'OR' | 'NOT' | 'snapshot' | 'stockPortfolio'
  ordering: 'snapshotId' | 'stockPortfolioId' | 'updatedAt'
}

  },  LatestSnapshot: {


  },  ScheduledEvent: {
    StockPortfolioEvent: {
  filtering: 'scheduledEventId' | 'type' | 'stockPortfolioId' | 'AND' | 'OR' | 'NOT' | 'scheduledEvent' | 'stockPortfolio'
  ordering: 'scheduledEventId' | 'type' | 'stockPortfolioId'
}
    OrderEvent: {
  filtering: 'scheduledEventId' | 'type' | 'AND' | 'OR' | 'NOT' | 'scheduledEvent'
  ordering: 'scheduledEventId' | 'type'
}

  },  StockPortfolioEvent: {


  },  OrderEvent: {


  }
}

interface NexusPrismaTypes {
  Query: {
    user: 'User'
    users: 'User'
    stockPortfolio: 'StockPortfolio'
    stockPortfolios: 'StockPortfolio'
    position: 'Position'
    positions: 'Position'
    order: 'Order'
    orders: 'Order'
    stockPortfolioSettings: 'StockPortfolioSettings'
    stockPortfolioSettings: 'StockPortfolioSettings'
    balance: 'Balance'
    balances: 'Balance'
    transaction: 'Transaction'
    transactions: 'Transaction'
    stripeDetails: 'StripeDetails'
    stripeDetails: 'StripeDetails'
    webhook: 'Webhook'
    webhooks: 'Webhook'
    snapshot: 'Snapshot'
    snapshots: 'Snapshot'
    latestSnapshot: 'LatestSnapshot'
    latestSnapshots: 'LatestSnapshot'
    scheduledEvent: 'ScheduledEvent'
    scheduledEvents: 'ScheduledEvent'
    stockPortfolioEvent: 'StockPortfolioEvent'
    stockPortfolioEvents: 'StockPortfolioEvent'
    orderEvent: 'OrderEvent'
    orderEvents: 'OrderEvent'

  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
    createOneStockPortfolio: 'StockPortfolio'
    updateOneStockPortfolio: 'StockPortfolio'
    updateManyStockPortfolio: 'BatchPayload'
    deleteOneStockPortfolio: 'StockPortfolio'
    deleteManyStockPortfolio: 'BatchPayload'
    upsertOneStockPortfolio: 'StockPortfolio'
    createOnePosition: 'Position'
    updateOnePosition: 'Position'
    updateManyPosition: 'BatchPayload'
    deleteOnePosition: 'Position'
    deleteManyPosition: 'BatchPayload'
    upsertOnePosition: 'Position'
    createOneOrder: 'Order'
    updateOneOrder: 'Order'
    updateManyOrder: 'BatchPayload'
    deleteOneOrder: 'Order'
    deleteManyOrder: 'BatchPayload'
    upsertOneOrder: 'Order'
    createOneStockPortfolioSettings: 'StockPortfolioSettings'
    updateOneStockPortfolioSettings: 'StockPortfolioSettings'
    updateManyStockPortfolioSettings: 'BatchPayload'
    deleteOneStockPortfolioSettings: 'StockPortfolioSettings'
    deleteManyStockPortfolioSettings: 'BatchPayload'
    upsertOneStockPortfolioSettings: 'StockPortfolioSettings'
    createOneBalance: 'Balance'
    updateOneBalance: 'Balance'
    updateManyBalance: 'BatchPayload'
    deleteOneBalance: 'Balance'
    deleteManyBalance: 'BatchPayload'
    upsertOneBalance: 'Balance'
    createOneTransaction: 'Transaction'
    updateOneTransaction: 'Transaction'
    updateManyTransaction: 'BatchPayload'
    deleteOneTransaction: 'Transaction'
    deleteManyTransaction: 'BatchPayload'
    upsertOneTransaction: 'Transaction'
    createOneStripeDetails: 'StripeDetails'
    updateOneStripeDetails: 'StripeDetails'
    updateManyStripeDetails: 'BatchPayload'
    deleteOneStripeDetails: 'StripeDetails'
    deleteManyStripeDetails: 'BatchPayload'
    upsertOneStripeDetails: 'StripeDetails'
    createOneWebhook: 'Webhook'
    updateOneWebhook: 'Webhook'
    updateManyWebhook: 'BatchPayload'
    deleteOneWebhook: 'Webhook'
    deleteManyWebhook: 'BatchPayload'
    upsertOneWebhook: 'Webhook'
    createOneSnapshot: 'Snapshot'
    updateOneSnapshot: 'Snapshot'
    updateManySnapshot: 'BatchPayload'
    deleteOneSnapshot: 'Snapshot'
    deleteManySnapshot: 'BatchPayload'
    upsertOneSnapshot: 'Snapshot'
    createOneLatestSnapshot: 'LatestSnapshot'
    updateOneLatestSnapshot: 'LatestSnapshot'
    updateManyLatestSnapshot: 'BatchPayload'
    deleteOneLatestSnapshot: 'LatestSnapshot'
    deleteManyLatestSnapshot: 'BatchPayload'
    upsertOneLatestSnapshot: 'LatestSnapshot'
    createOneScheduledEvent: 'ScheduledEvent'
    updateOneScheduledEvent: 'ScheduledEvent'
    updateManyScheduledEvent: 'BatchPayload'
    deleteOneScheduledEvent: 'ScheduledEvent'
    deleteManyScheduledEvent: 'BatchPayload'
    upsertOneScheduledEvent: 'ScheduledEvent'
    createOneStockPortfolioEvent: 'StockPortfolioEvent'
    updateOneStockPortfolioEvent: 'StockPortfolioEvent'
    updateManyStockPortfolioEvent: 'BatchPayload'
    deleteOneStockPortfolioEvent: 'StockPortfolioEvent'
    deleteManyStockPortfolioEvent: 'BatchPayload'
    upsertOneStockPortfolioEvent: 'StockPortfolioEvent'
    createOneOrderEvent: 'OrderEvent'
    updateOneOrderEvent: 'OrderEvent'
    updateManyOrderEvent: 'BatchPayload'
    deleteOneOrderEvent: 'OrderEvent'
    deleteManyOrderEvent: 'BatchPayload'
    upsertOneOrderEvent: 'OrderEvent'

  },
  User: {
    id: 'String'
    email: 'String'
    emailVerified: 'Boolean'
    password: 'String'
    username: 'String'
    timezone: 'String'
    balance: 'Balance'
    stripeDetails: 'StripeDetails'
    stockPortfolios: 'StockPortfolio'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    Transaction: 'Transaction'
    ScheduledEvent: 'ScheduledEvent'

},  StockPortfolio: {
    id: 'String'
    user: 'User'
    userId: 'String'
    name: 'String'
    headers: 'String'
    tickers: 'String'
    settings: 'StockPortfolioSettings'
    snapshots: 'Snapshot'
    orders: 'Order'
    latestSnapshot: 'LatestSnapshot'
    buyingPower: 'Float'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    Position: 'Position'
    Webhook: 'Webhook'
    StockPortfolioEvent: 'StockPortfolioEvent'

},  Position: {
    id: 'String'
    stockPortfolio: 'StockPortfolio'
    stockPortfolioId: 'String'
    ticker: 'String'
    quantity: 'Int'
    avgEntryPrice: 'Float'
    costBasis: 'Float'

},  Order: {
    id: 'String'
    stockPortfolio: 'StockPortfolio'
    stockPortfolioId: 'String'
    ticker: 'String'
    quantity: 'Int'
    filledQuantity: 'Int'
    type: 'OrderType'
    side: 'OrderSide'
    status: 'OrderStatus'
    limitPrice: 'Float'
    stopPrice: 'Float'
    avgFilledPrice: 'Float'
    timeInForce: 'TimeInForce'
    createdAt: 'DateTime'
    filledAt: 'DateTime'
    cancelledAt: 'DateTime'
    failedAt: 'DateTime'

},  StockPortfolioSettings: {
    stockPortfolio: 'StockPortfolio'
    stockPortfolioId: 'String'
    enableSnapshots: 'Boolean'

},  Balance: {
    user: 'User'
    userId: 'String'
    credits: 'Int'

},  Transaction: {
    id: 'String'
    user: 'User'
    userId: 'String'
    creditsBefore: 'Int'
    creditsTransacted: 'Int'
    createdAt: 'DateTime'
    paymentIntentId: 'String'
    status: 'TransactionStatus'

},  StripeDetails: {
    user: 'User'
    userId: 'String'
    customerId: 'String'

},  Webhook: {
    id: 'String'
    stockPortfolio: 'StockPortfolio'
    stockPortfolioId: 'String'
    query: 'String'
    secret: 'String'
    type: 'WebhookType'
    url: 'String'
    timeout: 'Int'
    createdAt: 'DateTime'

},  Snapshot: {
    id: 'String'
    tickers: 'String'
    headers: 'String'
    stockPortfolio: 'StockPortfolio'
    stockPortfolioId: 'String'
    data: 'String'
    createdAt: 'DateTime'
    LatestSnapshot: 'LatestSnapshot'

},  LatestSnapshot: {
    snapshot: 'Snapshot'
    snapshotId: 'String'
    stockPortfolio: 'StockPortfolio'
    stockPortfolioId: 'String'
    updatedAt: 'DateTime'

},  ScheduledEvent: {
    id: 'String'
    user: 'User'
    userId: 'String'
    recurrence: 'Recurrence'
    days: 'Day'
    hour: 'Int'
    minute: 'Int'
    interval: 'Int'
    next: 'DateTime'
    StockPortfolioEvent: 'StockPortfolioEvent'
    OrderEvent: 'OrderEvent'

},  StockPortfolioEvent: {
    scheduledEvent: 'ScheduledEvent'
    scheduledEventId: 'String'
    type: 'StockPortfolioEventType'
    stockPortfolio: 'StockPortfolio'
    stockPortfolioId: 'String'

},  OrderEvent: {
    scheduledEvent: 'ScheduledEvent'
    scheduledEventId: 'String'
    type: 'OrderEventType'

}
}

interface NexusPrismaMethods {
  User: NexusPrismaFields<'User'>
  StockPortfolio: NexusPrismaFields<'StockPortfolio'>
  Position: NexusPrismaFields<'Position'>
  Order: NexusPrismaFields<'Order'>
  StockPortfolioSettings: NexusPrismaFields<'StockPortfolioSettings'>
  Balance: NexusPrismaFields<'Balance'>
  Transaction: NexusPrismaFields<'Transaction'>
  StripeDetails: NexusPrismaFields<'StripeDetails'>
  Webhook: NexusPrismaFields<'Webhook'>
  Snapshot: NexusPrismaFields<'Snapshot'>
  LatestSnapshot: NexusPrismaFields<'LatestSnapshot'>
  ScheduledEvent: NexusPrismaFields<'ScheduledEvent'>
  StockPortfolioEvent: NexusPrismaFields<'StockPortfolioEvent'>
  OrderEvent: NexusPrismaFields<'OrderEvent'>
  Query: NexusPrismaFields<'Query'>
  Mutation: NexusPrismaFields<'Mutation'>
}
  

declare global {
  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = GetNexusPrisma<TypeName, ModelOrCrud>;
}
  