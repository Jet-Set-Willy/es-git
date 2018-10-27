import test from 'ava';
import { IRawRepo, Type, Mode } from '@rs4/es-git-core';

import objectMixin, {
  GitObject
} from './index';

test('save and load blob', async t => {
  const objectRepo = new ObjectRepo();
  const hash = await objectRepo.saveObject({
    type: Type.blob,
    body: new Uint8Array(0)
  });
  t.is(hash, 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391');
  const object = await objectRepo.loadObject(hash);
  if(object == null){
    t.fail('object is null');
    return;
  }
  if(object.type != Type.blob){
    t.fail('type is ' + object.type);
    return;
  }
  t.is(object.body.length, 0);
});

test('save and load tree', async t => {
  const objectRepo = new ObjectRepo();
  const object : GitObject = {
    type: Type.tree,
    body: {
      'file': {
        mode: Mode.file,
        hash: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391'
      }
    }
  };
  const hash = await objectRepo.saveObject(object);
  t.is(hash, 'df2b8fc99e1c1d4dbc0a854d9f72157f1d6ea078');
  const result = await objectRepo.loadObject(hash);
  if(result == null){
    t.fail('object is null');
    return;
  }
  if(result.type != Type.tree){
    t.fail('type is ' + result.type);
    return;
  }
  t.deepEqual(result, object);
});

test('save and load commit', async t => {
  const objectRepo = new ObjectRepo();
  const object : GitObject = {
    type: Type.commit,
    body: {
      tree: 'df2b8fc99e1c1d4dbc0a854d9f72157f1d6ea078',
      parents: [],
      author: {
        name: 'Marius Gundersen',
        email: 'me@mariusgundersen.net',
        date: {
          seconds: 1500840368,
          offset: -2*60
        }
      },
      committer: {
        name: 'Marius Gundersen',
        email: 'me@mariusgundersen.net',
        date: {
          seconds: 1500840368,
          offset: -2*60
        }
      },
      message: 'test\n'
    }
  };
  const hash = await objectRepo.saveObject(object);
  t.is(hash, '1a2ee41d9600863b43e7be9f9b69ccdd0436f3bd');
  const result = await objectRepo.loadObject(hash);
  if(result == null){
    t.fail('object is null');
    return;
  }
  if(result.type != Type.commit){
    t.fail('type is ' + result.type);
    return;
  }
  t.deepEqual(result, object);
});

test('save and load tag', async t => {
  const objectRepo = new ObjectRepo();
  const object : GitObject = {
    type: Type.tag,
    body: {
      object: '1a2ee41d9600863b43e7be9f9b69ccdd0436f3bd',
      type: Type.commit,
      tag: 'test',
      tagger: {
        name: 'Marius Gundersen',
        email: 'me@mariusgundersen.net',
        date: {
          seconds: 1500841617,
          offset: -2*60
        }
      },
      message: 'test\n'
    }
  };
  const hash = await objectRepo.saveObject(object);
  t.is(hash, '68de69ef5c1be77fbf31a39d251d277295174897');
  const result = await objectRepo.loadObject(hash);
  if(result == null){
    t.fail('object is null');
    return;
  }
  if(result.type != Type.tag){
    t.fail('type is ' + result.type);
    return;
  }
  t.deepEqual(result, object);
});

const ObjectRepo = objectMixin(class Repo implements IRawRepo {
  private readonly map: Map<string, Uint8Array>;
  constructor(){
    this.map = new Map<string, Uint8Array>();
  }
  async saveRaw(hash : string, object : Uint8Array){
    this.map.set(hash, object);
  }
  async loadRaw(hash : string){
    return this.map.get(hash);
  }
  listRefs(): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  getRef(ref: string): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }
  setRef(ref: string, hash: string | undefined): Promise<void> {
    throw new Error("Method not implemented.");
  }
  hasObject(hash: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  saveMetadata(name: string, value: Uint8Array): Promise<void> {
    throw new Error("Method not implemented.");
  }
  loadMetadata(name: string): Promise<Uint8Array | undefined> {
    throw new Error("Method not implemented.");
  }
});
