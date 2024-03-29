import type { Alignment, IconName, Intent } from "@blueprintjs/core";
import { Button as BpButton } from "@blueprintjs/core";
import classnames from "classnames";
import React, { CSSProperties, FC, MouseEvent, ReactElement, ReactNode } from "react";
import { useStyles } from "./styles";

interface IProps {
	active?: boolean;
	alignText?: Alignment;
	className?: string;
	disabled?: boolean;
	icon?: IconName | Maybe<ReactElement>;
	intent?: Intent;
	loading?: boolean;
	minimal?: boolean;
	onClick?: (event: MouseEvent<HTMLElement>) => void;
	outlined?: boolean;
	rightIcon?: IconName | Maybe<ReactElement>;
	style?: CSSProperties;
	text?: ReactNode;
	type?: "submit" | "reset" | "button";
}

export const Button: FC<IProps> = ({
	active,
	alignText,
	children,
	className,
	disabled,
	icon,
	intent,
	loading,
	minimal,
	onClick,
	outlined,
	rightIcon,
	style,
	text,
	type = "button"
}) => {
	const classes = useStyles();

	return (
		<BpButton
			className={classnames(classes.root, className)}
			active={active}
			alignText={alignText}
			disabled={disabled}
			icon={icon}
			intent={intent}
			loading={loading}
			minimal={minimal}
			onClick={onClick}
			outlined={outlined}
			rightIcon={rightIcon}
			style={style}
			text={text}
			type={type}
		>
			{children}
		</BpButton>
	);
};
