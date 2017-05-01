# Ninja

Ninja powered front-end development server. 

Check [this blog post](http://zxc0328.github.io/2016/07/05/ninja/) for more info about the development of Ninja.

## Features
+ **Generate routes automatically**
+ **Interpret Nodejs template**
+ **Jinja syntax supported(swig)**
+ **Livereload for HTML&CSS&JS**
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

## Change Log

### v0.5 2017-5-1

+ refactor proxy for bypassing CORS. 
+ all kinds of HTTP/HTTPS request are supported now.

### v0.4 2016-10-30

+ add body-parser for express server, fix POST proxy body data missing case 

### v0.3 2016-10-28

+ add HTTP method setting for mock API 

### v0.2 2016-07-13

+ add example for webpack&gulp users
+ support CSS&Javascript livereload

### v0.1 2016-07-02

+ initial commit

## Super powered by Ninja

### [Xueer Mobile Web Version](https://github.com/Muxi-Studio/Xueer_Moblie)

![xueer](https://occc3ev3l.qnssl.com/Screen%20Shot%202016-11-14%20at%2010.35.51%20PM.png)

### [Guisheng Mobile Web Version](https://github.com/Muxi-Studio/guisheng_fe)

![](https://occc3ev3l.qnssl.com/Screen%20Shot%202016-11-14%20at%2010.50.23%20PM.png)

### [FECademy](https://github.com/Muxi-Studio/Fecademy_fe)

![fecadamy](https://occc3ev3l.qnssl.com/Screen%20Shot%202016-11-14%20at%2010.35.03%20PM.png)

## License
MIT 2017@MuxiStudio: check `LICENSE` file for detail.
