# Quartzite

Lightweight relative date/time formatter without external dependencies.
The formatter offers two styles - *normal* and *short*. *Normal* produces the 
same date outputs as seen in Instagram and *short* is Twitter-like.

## Installation

Using npm

```sh
$ npm install quartzite
```

Using cdn

```html
<script src="https://unpkg.com/quartzite/dist/quartzite.js"></script>
```

## Usage

```javascript
import * as quartzite from 'quartzite';

let date = new Date();

// Create date in the past
let yesterday = quartzite.dateByAdding('hours', date, -25);

// Create date in the future
let someday = quartzite.dateByAdding('days', date, 5);

// Format date using normal style
// Will return 'Just now', '5 hours ago', 'Tomorrow at 7:00'
console.log(quartzite.formatDate(yesterday));
console.log(quartzite.formatDate(someday, 'normal'));

// Format date using short style
// Will return '20m', '2d', 'Feb 7', '8 Aug 2017'
console.log(quartzite.formatDate(someday, 'short'));
```

## Roadmap

- L10n and i18n

## License

Licensed under the [MIT](LICENSE) License.
