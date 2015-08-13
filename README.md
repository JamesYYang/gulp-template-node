gulp-template-node
===================

A gulp file templates for using gulp build backend node.js project using coffee script.

Current this templates include these task:

* Remove files in output folder.
* Compile coffee scripts.
* Copy other project files to output folder.
* Replace source code with command line arguments.
* Start program and auto restart when file changed.

## How to Use

Install [Gulp](http://gulpjs.com/)


Copy gulpfile.js files to your project:

Install npm packages

```
npm install del --save-dev
npm install gulp-coffee --save-dev
npm install gulp-develop-server --save-dev
npm install run-sequence --save-dev
npm install gulp-util --save-dev
npm install gulp-replace --save-dev
npm install yargs --save-dev
```

Modify task scripts if something differents. 

Run task in command line:

```
gulp --port=8888
```

## License

MIT

