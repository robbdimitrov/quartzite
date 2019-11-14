# Quartzite

Lightweight relative date/time formatter without external dependencies.  
The formatter offers three styles - `short`, `medium` and `long`.

## Styles

| Short | Medium | Long |
| --- | --- | --- |
| now | Just now | Today, 18:00 |
| 25s | 25 seconds ago | Today, 18:00 |
| 30m | 30 minutes ago | Today, 17:30 |
| 18h | Today | Today 00:00 |
| 2d | Yesterday | Yesterday, 07:00 |
| 5d | November 7 | Thursday, November 7th |
| Oct 8, 2018 | October 8, 2018 | October 8th, 2018 |
| In 25s | In 25 seconds | Today, 10:00 |
| In 30m | In 30 minutes | Today, 10:30 |
| In 18h | Tomorrow | Tomorrow, 04:00 |
| In 2d | Thursday | Thursday, 10:00 |
| In 5d | November 17 | Sunday, November 17th |
| Dec 16, 2020 | December 16, 2020 | December 16th, 2020 |

## Installation

Using npm

```sh
$ npm install quartzite
```

Using cdn

```html
<script src="https://unpkg.com/quartzite/dist/quartzite.js"></script>
```

## Example

Importing as ES6 module

```javascript
import * as quartzite from 'quartzite';
```

or using CommonJS

```javascript
const quartzite = require('quartzite');
```

Create date in the past

```javascript
const date = new Date();
const yesterday = quartzite.dateByAdding('hours', date, -25);
```

Create date in the future

```javascript
const date = new Date();
const someday = quartzite.dateByAdding('days', date, 5);
```

Format date using `medium` style

```javascript
console.log(quartzite.dateString(yesterday)); // Medium is the default option
console.log(quartzite.dateString(someday, 'medium'));
```

Format date using `short` style

```javascript
console.log(quartzite.dateString(someday, 'short'));
```

Format date using `long` style

```javascript
console.log(quartzite.dateString(someday, 'long'));
```

## License

Licensed under the [MIT](LICENSE) License.
