import { CustomTheme } from "@/client/themes";
import { createUseStyles } from "react-jss";

const styles = (theme: CustomTheme) => ({
	root: {
		backgroundColor: [theme.dialogBackground, "!important"],
		color: [theme.onSurface, "!important"],

		"& > .bp3-dialog-header": {
			backgroundColor: theme.dialogHeader,

			"& > *": {
				color: theme.onSurface
			}
		}
	},
	backdrop: {
		backgroundColor: theme.backdrop
	}
});

export const useStyles = createUseStyles<CustomTheme, keyof ReturnType<typeof styles>>(styles, {
	link: true
});
