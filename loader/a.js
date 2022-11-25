const { validate } = require('schema-utils');

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
    },
  },
};

module.exports = function(source) {
  const options = this.getOptions();
  validate(schema, options, {
    name: 'a loader',
    baseDataPath: 'options',
  });

  console.log('a loader', source);
  return source;
};
