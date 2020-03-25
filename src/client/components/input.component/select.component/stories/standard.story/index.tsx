import { ISelectItemType, Select } from "@/client/components/input.component/select.component";
import { Button } from "@blueprintjs/core";
import { action } from "@storybook/addon-actions";
import Faker from "faker";
import { range } from "lodash";
import React, { FC, useCallback, useState } from "react";

const ITEMS_SIZE = 50;

const MOCK_ITEMS: readonly ISelectItemType[] = range(ITEMS_SIZE).map(() => ({
	key: `${Faker.name.firstName()} ${Faker.name.lastName()}`
}));

export const StandardStory: FC = () => {
	const [selected, setSelected] = useState<Maybe<ISelectItemType>>(null);

	const onItemSelect = useCallback((item: ISelectItemType) => {
		setSelected(item);
		action("onItemSelect")(item);
	}, []);

	return (
		<Select items={MOCK_ITEMS} minimal={true} onItemSelect={onItemSelect}>
			<Button text={selected ? selected.key : "Select an item"} />
		</Select>
	);
};
