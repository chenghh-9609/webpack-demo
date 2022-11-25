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
    name: 'c loader',
    baseDataPath: 'options',
  });

  console.log('c loader',source);
  return source;
}
