# query-collection
 
 My goal is to create a simple but powerful way to search within a collection of object using a query that relflects MongoDB syntax.
  
## Installation
  
npm i query-collection

then:
                                                                                                                   
```javascript
import { find } from "query-collection";
```

## Roadmap

**Logical operators**
- [x] $or
- [x] $and

**Collection functions**
- [x] find

## Usage

### query object

simplest query:
```javascript
const query = {
	propA: "some value"
}
```
for each element a strict equal condition is evaluated.
act as propA -> $eq -> "some value"

implicit $and on multiple field:

```javascript
const query = {
	propA: "some value",
	propB: 187
	propC: false
```

explicit $and condition:

```javascript
const query = {
	$and: [
		propA: "some value",
		propB: 187
		propC: false
	]
}
```
explicit $or condition:

```javascript
const query = {
	$or: [
		propA: "some value",
		propB: 187
		propC: false
	]
}
```

### collection functions

**find**

```javascript
find(collection, query)
```
