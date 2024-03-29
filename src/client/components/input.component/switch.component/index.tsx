import type { Alignment } from "@blueprintjs/core";
import { Switch as BpSwitch } from "@blueprintjs/core";
import classnames from "classnames";
import React, { FC, FormEventHandler, ReactElement, ReactNode } from "react";
import { Control, Controller } from "react-hook-form";
import { useStyles } from "./styles";

interface IProps {
	align?: Alignment;
	checked?: boolean;
	className?: string;
	control?: Control<any>;
	defaultChecked?: boolean;
	disabled?: boolean;
	label?: ReactNode;
	large?: boolean;
	info?: string | ReactElement;
	inline?: boolean;
	name?: string;
	onChange?: FormEventHandler<HTMLInputElement>;
}

const BaseSwitch: FC<IProps> = ({
	align,
	checked,
	className,
	disabled,
	label,
	large,
	info,
	inline,
	name,
	onChange
}) => {
	const classes = useStyles();

	return (
		<BpSwitch
			className={classnames(classes.root, className)}
			alignIndicator={align}
			checked={checked}
			disabled={disabled}
			labelElement={
				<>
					{label}
					{info && <span className={classes.info}>{info}</span>}
				</>
			}
			large={large}
			inline={inline}
			name={name}
			onChange={onChange}
		/>
	);
};

export const Switch: FC<IProps> = (props) => {
	const {
		checked,
		control,
		defaultChecked = false,
		name,
		onChange: _onChange,
		...restProps
	} = props;

	if (control) {
		if (!name) {
			throw new Error("Switch is used in a form without a name!");
		}

		return (
			<Controller
				control={control}
				name={name}
				render={({ onChange, value }) => (
					<BaseSwitch
						{...restProps}
						onChange={(event) => {
							_onChange?.(event);
							onChange(event.currentTarget.checked);
						}}
						checked={value}
					/>
				)}
				defaultValue={defaultChecked}
			/>
		);
	}

	return <BaseSwitch {...props} />;
};
