## Usage

Size limited loading cache.

```
    import { PamCache } from 'pampu';

    let cache = new PamCache<string, number>({
      size: 2,
      loader: (key: string) => 10
    });

    cache.get('10') // 10
    cache.has('10') // true
    cache.get('9') // 10
    cache.size() // 2
    // 10 evicted
    cache.get('8') // 10
    cache.has('10') // false
    cache.size() // 2
    cache.get('10') // 10 loader for '10' is called again.
    
```
