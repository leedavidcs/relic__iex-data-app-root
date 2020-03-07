import { Popover as BpPopover, PopoverPosition, PopperModifiers } from "@blueprintjs/core";
import classnames from "classnames";
import React, { FC, memo, ReactElement, SyntheticEvent } from "react";
import { useStyles } from "./styles";

interface IProps {
	arrow?: boolean;
	children: ReactElement;
	className?: string;
	content: Maybe<ReactElement>;
	disabled?: boolean;
	flip?: boolean;
	isOpen?: boolean;
	minimal?: boolean;
	onClose?: (event?: SyntheticEvent<HTMLElement>) => void;
	popoverClassName?: string;
	position?: PopoverPosition;
	preventOverflow?: boolean;
}

export const Popover: FC<IProps> = memo(
	({
		arrow = false,
		children,
		className,
		content,
		disabled,
		flip = true,
		isOpen,
		minimal,
		onClose,
		popoverClassName,
		position,
		preventOverflow = true
	}) => {
		const classes = useStyles();

		const modifiers: PopperModifiers = {
			arrow: { enabled: Boolean(arrow) },
			flip: { enabled: flip },
			preventOverflow: { enabled: preventOverflow }
		};

		return (
			<BpPopover
				canEscapeKeyClose={true}
				className={classnames(classes.root, className)}
				content={content || undefined}
				disabled={disabled}
				isOpen={isOpen}
				minimal={minimal}
				modifiers={modifiers}
				onClose={onClose}
				popoverClassName={classnames(classes.popover, popoverClassName)}
				position={position}
			>
				{children}
			</BpPopover>
		);
	}
);

Popover.displayName = "Popover";