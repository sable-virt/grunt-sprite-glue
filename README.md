# grunt-sprite-glue

> Sprite generator with Glue & Grunt.  
!! Beta version yet.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```js
grunt.loadNpmTasks('grunt-sprite-glue');
```

## The "spglue" task

### Overview
In your project's Gruntfile, add a section named `spglue` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  spglue: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      files: {
        '/path/to/': '/path/images/'
      }
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options



### Usage Examples
