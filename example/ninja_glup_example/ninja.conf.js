module.exports = {
	template: "swig", // whatever template engine you like
	mock: "/mock/mock.json", // dir for mock data
	webpack: false, // flag for using webpack or not
	proxy: {
		route: "/api",
		origin: "http://xueer.muxixyz.com"
	},
	staticDir: "/",
	templateDir: "/template",
}
