import { createStore, combineReducers } from 'redux';
import decorator from './libs/decorator';
import { ReservedName } from './libs/enums';

const flags = { inited: false, Store: {} };

const Store = {};

const Actions = {};

export const Types = {};

export const register = (config) => {
  if (flags.inited) {
    throw new Error('[store-decorator] Please register before call `create`');
  }
  if (typeof config === 'function') {
    config.namespace = config.namespace || config.name;
  }
  if (Store[config.namespace]) {
    throw new Error(`[store-decorator] Duplicate namespace: ${config.namespace}`);
  }
  if (ReservedName.includes(config.namespace)) {
    throw new Error(`[store-decorator] Reserved namespace: ${config.namespace}`);
  }

  const { actions, methods, types } = decorator(config);

  Object.assign(Types, types);

  Store[config.namespace] = methods;

  Actions[config.namespace] = actions;
};

export const combine = (configs) => {
  Object.keys(configs).forEach((name) => {
    const config = configs[name];
    config.namespace = config.namespace || name;

    register(config);
  });
};

export const create = (reducers, preloadedState, enhancer) => {
  if (flags.inited) {
    return flags.Store;
  }

  if (!enhancer) {
    if (!preloadedState) {
      enhancer = reducers;
      reducers = undefined;
      preloadedState = {};
    } else {
      enhancer = preloadedState;
      preloadedState = reducers;
      reducers = undefined;
    }
  }

  const combined = typeof reducers === 'function' ? reducers(combineReducers(Actions)) : combineReducers({ ...Actions, ...reducers });

  const store = createStore(combineReducers({ ...Actions, ...reducers }), preloadedState, enhancer);

  Object.defineProperties(store, Object.keys(Store).reduce((total, namespace) => {
    total[namespace] = {
      configurable: false,
      enumerable: false,
      value: Store[namespace],
    };
    return total;
  }, {}));

  flags.inited = true;
  flags.Store = store;

  return store;
};

export default () => {
  return flags.Store;
};
