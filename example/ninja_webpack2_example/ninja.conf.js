module.exports = {
	template: "swig", // whatever template engine you like
	mock: "/mock/mock.json", // dir for mock data
	webpack: true, // flag for using webpack or not
	proxy: {
		route: "/api",
		origin: "http://xueer.muxixyz.com"
	},
	staticDir: "/static",
	templateDir: "/template",
}
