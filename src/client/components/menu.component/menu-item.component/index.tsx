import { MenuContext } from "@/client/components/menu.component/context";
import { IconName, MenuItem as BpMenuItem } from "@blueprintjs/core";
import classnames from "classnames";
import Link from "next/link";
import React, { FC, Fragment, memo, ReactNode, ReactText, useContext } from "react";
import { useStyles } from "./styles";

export interface IMenuItemProps {
	className?: string;
	href?: string;
	icon?: IconName;
	id?: ReactText;
	text?: ReactNode;
}

export const MenuItem: FC<IMenuItemProps> = memo(
	({ className, href, icon, id = href ?? "", text }) => {
		const classes = useStyles();

		const { activeItem } = useContext(MenuContext);

		const isActive: boolean = id === activeItem;

		return React.createElement<any>(
			href ? Link : Fragment,
			href ? { href, passHref: true } : {},
			<BpMenuItem
				className={classnames({ [classes.href]: Boolean(href) }, className)}
				active={isActive}
				icon={icon}
				text={text}
			/>
		);
	}
);

MenuItem.displayName = "MenuItem";