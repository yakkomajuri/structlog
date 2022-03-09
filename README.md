# structlog

A structured logging tool for Node.js.

## Example

By default this tool will generate logs like the following:

```
2022-03-09T19:57:48.962Z [error] i'm an error [/structlog/foo.js:5] 
2022-03-09T19:57:48.963Z [warn] i'm a warning [/structlog/foo.js:6] 
```

However, you can configure both the log and timestamp formats.
## Usage

To use this logging tool, all you need to do is install it:

```sh
yarn add structlog
```

And use it like so:

```js
import { logger } from 'structlog'

logger.error('error!')
```

Importing `logger` will give you a ready-made instance of `StructuredLogger` with the default config, so you don't need to instantiate a new logger instance each time or pass down references to an instance.

However, you can configure options by instantiating `StructuredLogger` yourself, like so:

```js
import { StructuredLogger } from 'structlog'

const logger = new StructuredLogger({ timestampFormat: 'unix' })
```

### Options 

You can configure the following options by passing them in an object as a parameter when creating `StructuredLogger` :

| Option | Default value | Accepted values | Description |
| :--: | :--: | :--: | :--: | 
| `timestampFormat` | `'iso'` | `'iso'` , `'gmt'`, `'unix'`, `'timestring'` ,`'localestring'` | Timestamp format to use. |
| `logFormat` | `'{timestamp} [{type}] {message} [{path}] {tags}'` | Any string. | Log format to use `{}` to define variables. Accepted variables: `timestamp`, `type`, `message`, `path`, `tags`. |
| `useColors` | `false` | `true`, `false` | Whether logs should be printed with colors according to the type (e.g. error = red). |
| `useThreadTagsExtension` | `false` | `true`, `false` | An extension that automatically adds a `thread` tag to the log specifying what thread the log happened in. |
| `useLogIdExtension` | `false` | `true`, `false` | An extension that automatically adds a `logId` tag to the log, with a unique ID as its value. |
