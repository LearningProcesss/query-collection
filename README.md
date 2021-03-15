# query-collection

Goal is to create a simple but powerful way to search within a collection of object using a query that relflects MongoDB syntax.
  
## Installation

```bash
npm i query-collection
```

then:

```javascript
import { find } from "query-collection";
```

## Implementation

### Comparison operators

- [x] $eq
- [x] $gt
- [x] $gte
- [x] $in
- [x] $lt
- [x] $lte
- [x] $ne
- [x] $nin

### Logical operators

- [x] $or
- [x] $and

### Collection functions

- [x] find

## Usage

**simplest query:**

```javascript
const query = {
    text: "string value"
}
```

**implicit $and on multiple field:**

```javascript
const query = {
    text: "string value",
    total: 187,
    isRed: false
}
```

### Comparison

#### $eq

```javascript
const query = {
        text: {
          $eq: "strict equal string value"
        }
      };

```

#### $gt

```javascript
const query = {
        total: {
          $gt: 47
        }
      };

```

#### $gte

```javascript
const query = {
        total: {
          $gte: 47
        }
      };

```

#### $in

```javascript
const query = {
        text: {
          $in: ["strict value A", "strict value B", "strict value C"]
        }
      };

```

#### $lt

```javascript
const query = {
        total: {
          $lt: 47
        }
      };

```

#### $lte

```javascript
const query = {
        total: {
          $lte: 60
        }
      };

```

#### $ne

```javascript
const query = {
        text: {
          $ne: "string value"
        }
      };

```

#### $nin

```javascript
const query = {
        total: {
          $nin: [47, 50, 90]
        }
      };

```

### Logical

#### $or

```javascript
const query = {
        $or: [
          {
            total: {
              $gte: 50
            }
          },
          {
            text: {
              $regex: /lue/i
            }
          },
          { isRed: true }
        ]
      };

```

#### $and

```javascript
const query = {
        $and: [
          {
            total: {
              $in: [50, 92, 46]
            }
          },
          {
            text: {
              $regex: /lue/i
            }
          },
          { isRed: true }
        ]
      };

```

### collection functions

## find

```javascript
const peopleArray = [
    {

    },
    {

    }
]

find(peopleArray, query)
```
