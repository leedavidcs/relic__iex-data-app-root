import { DateRangeInput, ISelectItemType, Menu, Select } from "@/client/components";
import { InfiniteLoaderList } from "@/client/components/infinite-loader-list.component";
import {
	GetSnapshotDocument,
	GetSnapshotQuery,
	GetSnapshotQueryVariables,
	OrderByArg,
	Snapshot as _Snapshot,
	SnapshotWhereInput,
	useGetSnapshotsQuery
} from "@/client/graphql";
import { Button, Spinner } from "@blueprintjs/core";
import { DateRange } from "@blueprintjs/datetime";
import { ItemListRenderer } from "@blueprintjs/select";
import classnames from "classnames";
import { format } from "date-fns";
import ms from "ms";
import React, { FC, ReactNodeArray, useCallback, useMemo, useState } from "react";
import { useApolloClient } from "react-apollo";
import { useStyles } from "./styles";

const ITEM_HEIGHT = 30;

type Snapshot = Pick<_Snapshot, "id" | "createdAt">;
type ResultSnapshot = Pick<_Snapshot, "id" | "tickers" | "headers" | "data" | "createdAt">;

interface IProps {
	className?: string;
	onChange?: (snapshot: ResultSnapshot) => void;
	selected?: Snapshot | null;
	stockPortfolioId: string;
}

const SnapshotSelect = Select.ofType<Snapshot>();

const TypedLoaderList = InfiniteLoaderList.ofType<ISelectItemType<Snapshot>>();

const itemKey = ({ id }: Snapshot) => id;
const itemName = ({ createdAt }: Snapshot) => format(new Date(createdAt), "PPp");

export const SnapshotLookup: FC<IProps> = ({
	className,
	onChange = () => undefined,
	selected = null,
	stockPortfolioId
}) => {
	const classes = useStyles();

	const [snapshots, setSnapshots] = useState<readonly Snapshot[]>([]);
	const [dateRange, setDateRange] = useState<DateRange>([null, null]);

	const where: SnapshotWhereInput = useMemo(
		() => ({
			stockPortfolioId: { equals: stockPortfolioId },
			createdAt: { gte: dateRange[0] ?? undefined, lte: dateRange[1] ?? undefined }
		}),
		[dateRange, stockPortfolioId]
	);

	const apolloClient = useApolloClient();
	const { called, data, loading, refetch } = useGetSnapshotsQuery({
		variables: {
			where,
			orderBy: { createdAt: OrderByArg.Desc },
			first: 50
		},
		pollInterval: ms("2m"),
		onCompleted: (result) => setSnapshots(result.snapshots)
	});

	const count: number = data?.count ?? 0;

	const onLoadMore = useCallback(
		async (skip: number, first: number) => {
			const result = await refetch({
				where,
				orderBy: { createdAt: OrderByArg.Desc },
				first,
				skip
			});

			setSnapshots([...snapshots.slice(0, skip), ...result.data.snapshots]);
		},
		[refetch, snapshots, where]
	);

	const itemListRenderer: ItemListRenderer<ISelectItemType<Snapshot>> = useCallback(
		({ items, itemsParentRef, renderItem }) => (
			<>
				<DateRangeInput
					className={classes.dateInputs}
					inlineInputs={false}
					minimal={true}
					onChange={setDateRange}
					value={dateRange}
				/>
				<TypedLoaderList
					className={classes.list}
					count={count}
					innerElementType={({ children }) => (
						<Menu ulRef={itemsParentRef}>{children as ReactNodeArray}</Menu>
					)}
					itemRenderer={renderItem}
					items={items}
					itemSize={ITEM_HEIGHT}
					onLoadMore={onLoadMore}
					style={{ height: count * ITEM_HEIGHT }}
				/>
			</>
		),
		[classes.dateInputs, classes.list, count, dateRange, onLoadMore]
	);

	const onItemSelect = useCallback(
		async ({ id }: Snapshot) => {
			const results = await apolloClient.query<GetSnapshotQuery, GetSnapshotQueryVariables>({
				query: GetSnapshotDocument,
				variables: { where: { id } }
			});

			const snapshot: Maybe<ResultSnapshot> = results.data?.snapshot;

			if (snapshot) {
				onChange?.(snapshot);
			}
		},
		[apolloClient, onChange]
	);

	return (
		<SnapshotSelect
			className={classnames(classes.root, className)}
			activeItem={selected}
			filterable={false}
			itemKey={itemKey}
			itemListRenderer={itemListRenderer}
			itemName={itemName}
			items={snapshots}
			minimal={true}
			onItemSelect={onItemSelect}
			noResults={
				!called || loading ? (
					<Spinner size={Spinner.SIZE_SMALL} />
				) : (
					<Menu.Item disabled={true} text="No snapshots" />
				)
			}
			usePortal={false}
		>
			<Button
				className={classes.btn}
				text={selected ? itemName(selected) : "Select Snapshot"}
			/>
		</SnapshotSelect>
	);
};
