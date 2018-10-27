# cache-objects-mixin

This is part of the [ES-Git](https://github.com/es-git/es-git) project.

## Install

```bash
npm install --save @rs4/es-git-cache-objects-mixin
```

## Usage

Mix this in with the [IObjectRepo](https://www.npmjs.com/package/@rs4/es-git-object-mixin#IObjectRepo). By storing objects in a cache, loading and saving the same object multiple times will be faster.

```js
import cacheObjectsMixin from '@rs4/es-git-cache-objects-mixin';
import objectsMixin from '@rs4/es-git-objects-mixin';
import MemoryRepo from '@rs4/es-git-memory-repo';

const Repo = mix(MemoryRepo)
            .with(objectsMixin)
            .with(cacheObjectsMixin);

const repo = new Repo({
  max: 1000,
  maxAge: 1000*60*5
});
```

## Interfaces

The repo is the same as the [object-mixin](https://www.npmjs.com/package/@rs4/es-git-object-mixin) repo, but the constructor takes one parameter, `options`:

### Options

```js
interface Options {
  max? : number,
  maxAge? : number
};
```

* `max` is the number of objects to store in the cache
* `maxAge` is the duration, in milliseconds, to store the objects in the cache