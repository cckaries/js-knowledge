class Object { // aka hash table
  constructor(size) {
    this.data = new Array(size);
  }

  _hash(key) { // T: O(1) because it runs very fast
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }

  set(key, value) { // T: O(1)
    let address = this._hash(key);
    if(!this.data[address]) {
      this.data[address] = [];
    }
    this.data[address].push([key, value]);
    console.log(this.data);
    return this.data;
  }

  get(key) { // T: O(1) if no collisions, O(n) for worst cases
    let address = this._hash(key);
    const currentBucket = this.data[address];
    if(currentBucket) {
      for(let i = 0; i < currentBucket.length; i++) {
        if(currentBucket[i][0] === key) {
          return currentBucket[i][1];
        }
      }
    }
  }

  keys() { // T: O(n) for average, O(a * b) for worst cases
    if (!this.data.length) {
      return undefined;
    }

    const res = [];
    for(let i = 0; i < this.data.length; i++) {
      if(this.data[i] && this.data[i].length) {
        if(this.data[i].length > 1) {
          for (let j = 0; j < this.data[i].length; j++) {
            res.push(this.data[i][j][0]);
          }
        } else {
          res.push(this.data[i][0][0]);
        }
      }
    }

    return res;
  }
}

/* use cases */

const myObject = new Object(2);
myObject.set('grapes', 1000);
myObject.set('apples', 123);
myObject.get('grapes');
console.log(JSON.stringify(myObject))
console.log(myObject.keys());