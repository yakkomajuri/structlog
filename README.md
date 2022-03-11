# structlog

A lightweight structured logging tool for Node.js without any dependencies.

## Example

By default this tool will generate logs like the following:

```
2022-03-09T19:57:48.962Z [error] i'm an error [/structlog/foo.js:5] thread=MAIN logId=017f705b-4200-0002-1101-720541fa117c 
2022-03-09T19:57:48.963Z [warn] i'm a warning [/structlog/foo.js:6] thread=MAIN logId=017f705b-4200-0000-e4a6-f1df2ca4f248
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
| `logFormat` | `'{timestamp} [{type}] {message} [{path}] {tags}'` | Any `string` | Log format to use `{}` to define variables. Accepted variables: `timestamp`, `type`, `message`, `path`, `tags`. |
| `pathFormat` | `'{filePath}:{lineNumber}'` | Any `string` | Format to use for the `path` component of the log. Use `{}` to define variables. Accepted variables: `filePath`, `lineNumber`, `functionName`, `methodName`, `typeName`. |
| `useColors` | `false` | `true`, `false` | Whether logs should be printed with colors according to the type (e.g. error = red). |
| `useThreadTagsExtension` | `false` | `true`, `false` | An extension that automatically adds a `thread` tag to the log specifying what thread the log happened in. |
| `useLogIdExtension` | `false` | `true`, `false` | An extension that automatically adds a `logId` tag to the log, with a unique ID as its value. |
| `pathStackDepth` | `0` | Any `number` | (_Advanced_) Level of depth to determine the path portion of the log from. For example, if you write a wrapper over the logger, set this to 1 so that the path will reflect the code that called your wrapper, rather than the wrapper itself.  |
