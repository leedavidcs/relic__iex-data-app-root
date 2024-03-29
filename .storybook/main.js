const path = require("path");
const flow = require("lodash/flow");
const webpackCraOverrides = require("./webpack-cra-overrides");

module.exports = {
	addons: [
		"@storybook/addon-actions",
		"@storybook/addon-docs",
		"@storybook/addon-knobs",
		"@storybook/addon-viewport",
		{
			name: "@storybook/preset-create-react-app",
			options: {
				tsDocgenLoaderOptions: {
					tsconfigPath: path.resolve(__dirname, "../tsconfig.json")
				}
			}
		}
	],
	webpackFinal: async (config) => {
		const tmpConfig = flow.apply(null, webpackCraOverrides)(config);

		tmpConfig.node = { ...tmpConfig.node, fs: "empty" };
		tmpConfig.resolve.extensions.push(".mdx");

		return tmpConfig;
	}
};
