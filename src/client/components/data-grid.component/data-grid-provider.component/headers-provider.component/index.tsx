import { IHeaderConfig, IHeaderOption } from "@/client/components/data-grid.component";
import { ArrayUtil } from "@/client/utils";
import arrayMove from "array-move";
import React, { FC, memo, ReactNode, useCallback, useMemo } from "react";
import { HeadersContext } from "./headers.context";

export * from "./headers.context";

interface IProps {
	children: ReactNode;
	headers: readonly IHeaderConfig[];
	onHeadersChange?: (headers: readonly IHeaderConfig[]) => void;
	onHeadersError?: (
		message: string,
		lastHeaders: readonly IHeaderConfig[],
		badHeaders: readonly IHeaderConfig[]
	) => void;
}

export const HeadersProvider: FC<IProps> = memo(
	({ children, headers, onHeadersChange, onHeadersError }) => {
		const moveHeaderItem = useCallback(
			(oldIndex: number, newIndex: number) => {
				const newHeaders: IHeaderConfig[] = headers.slice();

				const sortedHeaders: readonly IHeaderConfig[] = arrayMove(
					newHeaders,
					oldIndex,
					newIndex
				);

				onHeadersChange?.(sortedHeaders);
			},
			[headers, onHeadersChange]
		);

		const removeHeaderItem = useCallback(
			(index: number) => {
				const newHeaders: IHeaderConfig[] = headers.slice();

				newHeaders.splice(index, 1);

				onHeadersChange?.(newHeaders);
			},
			[headers, onHeadersChange]
		);

		const setHeaderFreeze = useCallback(
			(freeze: boolean, index: number) => {
				const oldHeader: IHeaderConfig = headers[index];

				if (oldHeader.frozen === freeze) {
					return;
				}

				/**
				 * @description If we are going to unfreeze, the index of the first available
				 *     unfrozen column will shift by -1
				 * @author David Lee
				 * @date January 21, 2020
				 */
				const indexLastFrozen: number = headers.findIndex(({ frozen }) => !frozen);
				const toMoveIndex: number = indexLastFrozen - Number(!freeze);

				const updatedHeader: IHeaderConfig = { ...oldHeader, frozen: freeze };
				const withUpdate: readonly IHeaderConfig[] = ArrayUtil.replace(
					headers,
					index,
					updatedHeader
				);
				const newHeaders: readonly IHeaderConfig[] = arrayMove(
					withUpdate,
					index,
					toMoveIndex
				);

				onHeadersChange?.(newHeaders);
			},
			[headers, onHeadersChange]
		);

		const setHeaderLabel = useCallback(
			(label: string, index: number) => {
				const isUnchangedLabel: boolean = headers[index].label === label;

				if (isUnchangedLabel) {
					return;
				}

				const isDuplicateLabel = Boolean(headers.find((header) => label === header.label));

				const updatedHeader: IHeaderConfig = { ...headers[index], label };
				const newHeaders: readonly IHeaderConfig[] = ArrayUtil.replace(
					headers,
					index,
					updatedHeader
				);

				if (isDuplicateLabel) {
					onHeadersError?.(
						"Cannot add column with non-unique label",
						headers,
						newHeaders
					);

					return;
				}

				onHeadersChange?.(newHeaders);
			},
			[headers, onHeadersChange, onHeadersError]
		);

		const setHeaderOption = useCallback(
			(option: IHeaderOption, index: number) => {
				const oldHeader = headers[index];

				const isUnchangedOption: boolean =
					oldHeader.label === option.label && oldHeader.value === option.value;

				if (isUnchangedOption) {
					return;
				}

				const isDuplicateLabel = Boolean(
					headers.find((header) => option.label === header.label)
				);

				const updatedHeader: IHeaderConfig = { ...oldHeader, ...option };
				const newHeaders: readonly IHeaderConfig[] = ArrayUtil.replace(
					headers,
					index,
					updatedHeader
				);

				if (isDuplicateLabel) {
					onHeadersError?.(
						"Cannot set column to have a non-unique label",
						headers,
						newHeaders
					);

					return;
				}

				onHeadersChange?.(newHeaders);
			},
			[headers, onHeadersChange, onHeadersError]
		);

		const setHeaderWidth = useCallback(
			(width: number, index: number) => {
				const updatedHeader: IHeaderConfig = { ...headers[index], width };
				const newHeaders: readonly IHeaderConfig[] = ArrayUtil.replace(
					headers,
					index,
					updatedHeader
				);

				onHeadersChange?.(newHeaders);
			},
			[headers, onHeadersChange]
		);

		const value = useMemo(
			() => ({
				headers,
				moveHeaderItem,
				onHeadersChange,
				removeHeaderItem,
				setHeaderFreeze,
				setHeaderLabel,
				setHeaderOption,
				setHeaderWidth
			}),
			[
				headers,
				moveHeaderItem,
				onHeadersChange,
				removeHeaderItem,
				setHeaderFreeze,
				setHeaderLabel,
				setHeaderOption,
				setHeaderWidth
			]
		);

		return <HeadersContext.Provider value={value}>{children}</HeadersContext.Provider>;
	}
);

HeadersProvider.displayName = "HeadersProvider";
