import { handleActions } from 'redux-actions';
import Store from '../index';

const _ = {
  uniq: require('lodash.uniq'),
  snakeCase: require('lodash.snakecase'),
  typeCase: (namespace) => {
    return (type) => {
      return _.snakeCase(`${namespace}_${type}`).toUpperCase();
    };
  }
};

const actionDecorator = (type) => {
  return (payload) => {
    Store().dispatch({
      type,
      ...payload
    });
  };
};

const decorator = ({ namespace, state, actions = {}, effects = {} }) => {
  const typeCase = _.typeCase(namespace);
  const that = {};

  const actionKeys = Object.keys(actions);
  const sagaKeys = Object.keys(effects).map((key) => `${key}_effect`);

  const types = [].concat(actionKeys, sagaKeys).reduce((total, key) => {
    if (total[key]) {
      console.error(`Duplicate type: ${key}, do not use with 'effect' in actions`);
    }
    total[key] = typeCase(key);
    return total;
  }, {});

  const handledActions = handleActions(Object.keys(actions).reduce((total, key) => {
    if (typeof actions[key] === 'function') {
      total[types[key]] = actions[key];
      that[key] = actionDecorator(types[key]);
    } else {
      console.error(`Action method must be 'function': ${key}`);
    }

    return total;
  }, {}), state);

  Object.keys(effects).forEach((key) => {
    const method = effects[key];
    if (typeof method !== 'function') {
      console.error(`Effect method must be 'function': ${key}`);
    }
    // const type = types[`${key}_effect`];

    that[that[key] ? `${key}Effect` : key] = (...props) => {
      console.log(props);
      return method.call(that, ...props);
    };
  });

  return {
    actions: handledActions,
    methods: that,
    types
  };
};

export default decorator;
