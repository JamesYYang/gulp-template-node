gulp-template-node
===================

A gulp file templates for using gulp build backend node.js project using coffee script.

Current this templates include these task:

* Remove files in output folder.
* Compile coffee scripts.
* Copy other project files to output folder.
* Start program and auto restart when file changed.

## How to Use

Install [Gulp](http://gulpjs.com/)


Copy gulpfile.js files to your project:

Install npm packages

```
npm install del --save-dev
npm install gulp-coffee --save-dev
npm install gulp-nodemon --save-dev
npm install gulp-notify --save-dev
npm install gulp-util --save-dev
```

Modify task scripts if something differents. 

Run task in command line:

```
gulp
```

In debug mode


```
gulp --debug
```

## License

MIT

