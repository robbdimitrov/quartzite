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

const date = new Date();

// Create date in the past
const yesterday = quartzite.dateByAdding('hours', date, -25);

// Create date in the future
const someday = quartzite.dateByAdding('days', date, 5);

// Format date using medium style
// Will return 'Just now', '5 hours ago', 'Yesterday'
console.log(quartzite.dateString(yesterday));
console.log(quartzite.dateString(someday, 'medium'));

// Format date using short style
// Will return '20m', '2d', 'Feb 7', '8 Aug 2017'
console.log(quartzite.dateString(someday, 'short'));

// Format date using long style
// Will return 'Today, 20:15', 'Friday, 22:30', 'Tuesday, November 5th'
console.log(quartzite.dateString(someday, 'long'));
```

## License

Licensed under the [MIT](LICENSE) License.
