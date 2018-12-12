# Node.js Webpack Boilerplate 

## Required

- Node.js 8.x up

## Feature

- ES6/ES7 supported

## Global Variables/Functions

### log

> Function

Display a colorful log in console.

**Arguments**

- 1st argument(required): Any(Object, Array, String, Boolean), text to show.
- 2nd argument(optional): String, log style, this following is all style(default is cyan).
  - white
  - red
  - green
  - yellow
  - cyan
  - magenta 

**Example**

```javascript
log('foobar')

log('foobar', 'green')
```
  
### now

> Function

Log current time

### args

> Object

All node.js process arguments.

If you enter the command like this following.

```bash
node app.js --text=hi --foo=bar
```

Your args variable will be like this

```json
{
  "text": "hi",
  "foo": "bar"
}
```