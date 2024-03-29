import { Icon } from "@/client/components/icon.component";
import { NumberInput } from "@/client/components/input.component";
import { Interactable } from "@/client/components/interactable.component";
import { Tooltip } from "@/client/components/tooltip.component";
import classnames from "classnames";
import { head, initial, isUndefined, last, range } from "lodash";
import React, { FC, Fragment, useCallback, useMemo } from "react";
import { getCurrentPage, getPageCount, getSkipFromPage } from "./get-page-info";
import { PageSearch } from "./page-search.component";
import { useStyles } from "./styles";

const DEFAULT_INNER_PAGE_RANGE = 5;
const DEFAULT_MARGIN_PAGE_RANGE = 2;

const MAX_PAGE_LIMIT = 100;

export interface IPaginationProps {
	count: number;
	first?: number;
	/** `take` is the same as `first`. This was added to support prisma pagination */
	take?: number;
	skip: number;
}

export type OnPageProps = Omit<IPaginationProps, "first" | "take"> & {
	first: number;
	take: number;
};

interface IRangeOptions {
	/** The minimum number of pages that are shown, centered around the current page. */
	innerRange: number;
	/** The minimum number of pages that are shown at the ends of the paginator. */
	marginRange: number;
}

interface IProps extends IPaginationProps, Partial<IRangeOptions> {
	className?: string;
	onPage?: (props: OnPageProps) => void;
	showLimitConfig?: boolean;
}

interface IGetPageRangesProps extends IRangeOptions {
	currentPage: number;
	pageCount: number;
}

const doesOverlap = (firstRange: readonly number[], secondRange: readonly number[]): boolean => {
	const largestOfFirst = last(firstRange);
	const smallestOfSecond = head(secondRange);

	if (isUndefined(largestOfFirst) || isUndefined(smallestOfSecond)) {
		return false;
	}

	return largestOfFirst + 1 >= smallestOfSecond;
};

const mergeOverlap = (
	firstRange: readonly number[],
	secondRange: readonly number[]
): readonly number[] => {
	const largestOfFirst = last(firstRange);

	if (isUndefined(largestOfFirst)) {
		return secondRange;
	}

	return firstRange.concat(secondRange.filter((num) => num > largestOfFirst));
};

const mergeAllRangeOverlaps = (
	pageRanges: readonly (readonly number[])[]
): readonly (readonly number[])[] => {
	return pageRanges.reduce((acc, currentRange) => {
		const previousRange = last(acc);

		if (isUndefined(previousRange)) {
			return [currentRange];
		}

		if (!doesOverlap(previousRange, currentRange)) {
			return [...acc, currentRange];
		}

		return [...initial(acc), mergeOverlap(previousRange, currentRange)];
	}, [] as readonly (readonly number[])[]);
};

/**
 * @description Returns page ranges such that if there are any gaps between margin pages and inner
 *     pages, ellipsis are shown.
 */
const getPageRanges = ({
	pageCount,
	currentPage,
	innerRange,
	marginRange
}: IGetPageRangesProps): readonly (readonly number[])[] => {
	if (pageCount === 0) {
		return [];
	}

	const innerOffset: number = (innerRange - 1) / 2;

	const startRange: readonly number[] = range(0, Math.min(marginRange, pageCount));
	const centerRange: readonly number[] = range(
		Math.max(0, currentPage - Math.floor(innerOffset)),
		Math.min(currentPage + Math.ceil(innerOffset + 1), pageCount)
	);
	const endRange: readonly number[] = range(Math.max(0, pageCount - marginRange), pageCount);

	const pageRanges: readonly (readonly number[])[] = [startRange, centerRange, endRange];

	return mergeAllRangeOverlaps(pageRanges);
};

export const Pagination: FC<IProps> = ({
	className,
	count,
	first: _first,
	take: _take = _first,
	skip,
	innerRange = DEFAULT_INNER_PAGE_RANGE,
	marginRange = DEFAULT_MARGIN_PAGE_RANGE,
	onPage = () => undefined,
	showLimitConfig
}) => {
	const first: number | undefined = _take;
	const take: number | undefined = _take;

	if (typeof first !== "number" || typeof take !== "number") {
		throw new Error("Must define either first or take in Pagination component!");
	}

	const classes = useStyles();

	const pageCount: number = useMemo(() => getPageCount({ count, first }), [count, first]);
	const currentPage: number = useMemo(() => getCurrentPage({ first, skip }), [first, skip]);

	const pageRanges: readonly (readonly number[])[] = useMemo(
		() => getPageRanges({ pageCount, currentPage, innerRange, marginRange }),
		[pageCount, currentPage, innerRange, marginRange]
	);

	const isLastRange = useCallback((i: number) => i === pageRanges.length - 1, [pageRanges]);
	const isFirstPage: boolean = currentPage === 0;
	const isLastPage: boolean = currentPage === pageCount - 1;

	const onClickPage = useCallback(
		(page: number) => () =>
			onPage?.({ count, first, take, skip: getSkipFromPage(page, first) }),
		[onPage, count, first, take]
	);

	const onPreviousPage = useCallback(
		() => onPage?.({ count, first, take, skip: getSkipFromPage(currentPage - 1, first) }),
		[onPage, count, first, take, currentPage]
	);

	const onNextPage = useCallback(
		() => onPage?.({ count, first, take, skip: getSkipFromPage(currentPage + 1, first) }),
		[onPage, count, first, take, currentPage]
	);

	const onLimitChange = useCallback(
		(value: number) => onPage?.({ count, first: value, take: value, skip }),
		[onPage, count, skip]
	);

	if (pageCount === 1) {
		return null;
	}

	return (
		<div className={classnames(classes.root, className)}>
			<div className={classes.pagination}>
				{!isFirstPage && (
					<Interactable onClick={onPreviousPage}>
						<Icon icon="chevron-left" />
					</Interactable>
				)}
				{pageRanges.map((pageRange, i) => (
					<Fragment key={i}>
						{pageRange.map((page) => (
							<Interactable
								key={page}
								active={currentPage === page}
								onClick={onClickPage(page)}
							>
								{page + 1}
							</Interactable>
						))}
						{!isLastRange(i) && (
							<PageSearch
								count={count}
								first={first}
								take={take}
								skip={skip}
								onPage={onPage}
							/>
						)}
					</Fragment>
				))}
				{!isLastPage && (
					<Interactable onClick={onNextPage}>
						<Icon icon="chevron-right" />
					</Interactable>
				)}
			</div>
			{showLimitConfig && (
				<Tooltip content={<p>Items per page</p>} position="bottom">
					<NumberInput
						className={classes.limitConfig}
						max={MAX_PAGE_LIMIT}
						min={1}
						onValueChange={onLimitChange}
						value={first}
					/>
				</Tooltip>
			)}
		</div>
	);
};
