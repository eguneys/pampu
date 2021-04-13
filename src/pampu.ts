export type Loader<Key, Value> = (key: Key) => Value

export type PamCacheConfig<Key, Value> = {
  size?: number,
  loader: Loader<Key, Value>
};

export default class PamCache<Key, Value> {

  data: Map<Key, Value>
  maxSize: number
  loader: Loader<Key, Value>
  
  constructor(options: PamCacheConfig<Key, Value>) {

    this.maxSize = options.size || 5;
    this.loader = options.loader;
    
    this.data = new Map<Key, Value>();
  }

  has(k: Key) { return this.data.has(k); }

  size() { return this.data.size };

  delete(k: Key) { return this.data.delete(k); }

  get(k: Key) {
    let v = this.data.get(k);

    if (v !== undefined) {
      return v;
    } else {
      let _v = this.loader(k);
      this.data.set(k, _v);

      this.clean();
      return _v;
    }
  }

  deleteAll() { this.data = new Map<Key, Value>() };

  private clean() {
    for (let key of this.data.keys()) {
      if (this.size() <= this.maxSize) {
        break;
      }
      this.data.delete(key);
    }
  }

  
}
