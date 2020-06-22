# babel-plugin-global-string

## Instructions

npm i babel-plugin-global-string --save

babel.config.js
```
module.exports = {
    plugins: [
        ['global-string', {
            globalString: ['RouteNamesChain'],
        }],
    ],
}
```

## Example

Transforms
```js
const name = RouteNamesChain.Checkin.Profile
```

roughly to
```js
const name = 'Checkin-Prifile'
```

For more examples, please see the catalog test