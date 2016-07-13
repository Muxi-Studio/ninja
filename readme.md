# Ninja

Ninja powered front-end development server. 

## Features
+ **Generate routes automatically**
+ **Interpret Nodejs template**
+ **Jinja syntax supported(swig)**
+ **Livereload for HTML&CSS**
+ **Proxy mode**
+ **Webpack compatible**


## Install
```
npm install -g ninja_cli
```

## Configue using CLI 

For example

```
ninja --template "swig" --webpack true --templateDir "/template"
```

## Configue using file

Ninja will find `ninja.conf.js` under the working directory.
`ninja.conf.js` is a CommonJS file like:

```
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

```


## Options

```
  Usage: ninja [options]

  Options:

    -h, --help                 output usage information
    -p, --port [port]          Set the port of the server, defalut set to 3000
    -t, --template [item]      Set template engine, defalut set to swig
    -m, --mock [dir]           Set the source of mock data
    -w, --webpack [flag]       Serving static file using webpack or not, defalut set to false
    -o, --proxyOrigin [route]  Proxy origin configuration
    -r, --proxyRoute [url]     Proxy route configuration
    -s, --staticDir [dir]      Location of static file
    -d, --templateDir [dir]    Location of templates
    -b, --browser [item]       Set the defalut browser, defalut set to google chrome

```
## Examples

Take a look at the `examples` folder.

1.Use ninja with webpack

Under the ninja_webpack_example:

**install**
``` bash
$ npm install
```

**run**
``` bash
$ ninja
```

2.1.Use ninja with gulp

Under the ninja_webpack_example:

**install**
``` bash
$ npm install
```

**run**
You need open two Command line process,respectively run:

``` bash
$ gulp
```

``` bash
$ ninja
```

## License
MIT 2016@MuxiStudio: check LICENSE file for detail.
