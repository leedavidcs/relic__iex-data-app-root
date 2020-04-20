import { Icon, IconName } from "@blueprintjs/core";
import classnames from "classnames";
import React, { FC, memo, ReactNodeArray, ReactText, useMemo } from "react";
import { ResourcePathContext } from "./context";
import { IResourcePathPart, ResourcePathPart } from "./resource-path-part.component";
import { useStyles } from "./styles";

interface IProps {
	activePath?: ReactText;
	children: ReactNodeArray;
	className?: string;
	icon?: IconName;
}

interface IWithStaticProps {
	Part: FC<IResourcePathPart>;
}

const _ResourcePath: FC<IProps> = memo(({ activePath, children, className, icon }) => {
	const classes = useStyles();

	const value = useMemo(() => ({ activePath }), [activePath]);

	return (
		<ResourcePathContext.Provider value={value}>
			<h1 className={classnames(classes.root, className)}>
				{icon && <Icon className={classes.icon} icon={icon} />}
				{children}
			</h1>
		</ResourcePathContext.Provider>
	);
});

_ResourcePath.displayName = "ResourcePath";

(_ResourcePath as FC<IProps> & IWithStaticProps).Part = ResourcePathPart;

export const ResourcePath = _ResourcePath as FC<IProps> & IWithStaticProps;
