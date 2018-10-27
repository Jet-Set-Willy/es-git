# mix

This is part of the [ES-Git](https://github.com/es-git/es-git) project.

## Install

```bash
npm install --save @rs4/es-git-mix
```

## Usage

This package provides a helper method for applying multiple mixins to a repo, working well with TypeScript.

```js
import objectsMixin from '@rs4/es-git-objects-mixin';
import walkersMixin from '@rs4/es-git-mix';
import MemoryRepo from '@rs4/es-git-memory-repo';

const Repo = mix(MemoryRepo)
            .with(objectsMixin)
            .with(walkersMixin)
            .with(pushMixin, fetch);
```
