# grunt-html-improved [![npm package](https://badge.fury.io/js/grunt-html-improved.svg)](https://www.npmjs.com/package/grunt-html-improved)

Grunt plugin for [html-improved](https://github.com/nidorx/html-improved)

## Sample Project
[html-improved-sample](https://github.com/nidorx/html-improved-sample)


## htmlImproved task
_Run this task with the `grunt htmlImproved` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options


#### defaultVars
Type: `Object|Function`

Sets the variables passed to **Html Improved** during template compilation. Any data can be passed to the template.

```js
options: {
    defaultVars: {
        package: require('./package.json'),
        project: require('./project.json'),
        otherVar: 'value'
    }
}
```

This value also might be a function.

```js
options: {
    defaultVars: function() {
        return {
            package: require('./package.json'),
            project: require('./project.json'),
            otherVar: 'value'
        };
    }
}
```
