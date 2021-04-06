module.exports = {
	chainWebpack: (config) => {
		config.plugin("html").tap((args) => {
			args[0].title = "WordCounter";
			return args;
		});
	},
	publicPath: "/word-counter/",
};