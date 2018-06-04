class Storage {
  constructor({
    state,
    storage,
    prefix, path,
  }) {
    this.__storage = storage;
    this.__path = path;
    this.__prefix = prefix;
    this.__cursor = state.cursor(path);
    this.__load();
  }

  __getStoragePath() {
    return this.__prefix + this.__path;
  }

  __load() {
    try {
      const data = this.__storage.getItem(this.__getStoragePath());
      this.__cursor.set(data === null ? undefined : JSON.parse(data));
    } catch (e) {
      console.error(e);
    }
  }

  __save() {
    try {
      const data = JSON.stringify(this.__cursor.get());
      this.__storage.setItem(this.__getStoragePath(), data);
    } catch (e) {
      console.error(e);
    }
  }

  get(...args) {
    return this.__cursor.get(...args);
  }

  set(...args) {
    this.__cursor.set(...args);
    this.__save();
  }
}

export const STORAGE = {
  local: 'local',
  session: 'session',
  memory: 'memory',
};

const STORAGE_MAP = {
  [STORAGE.local]: window.localStorage,
  [STORAGE.session]: window.sessionStorage,
};

export const createStorage = ({
  prefix = 'noflux_',
  path,
  state,
  storageType,
}) => {
  const storage = STORAGE_MAP[storageType];
  if (!storage) {
    throw new Error(`NofluxStorage.createStorage: illegal storageType=${storageType}`);
  }
  if (path === undefined) {
    throw new Error(`NofluxStorage.createStorage: illegal path=${path}`);
  }
  return new Storage({
    state,
    storage,
    path,
    prefix,
  });
};
