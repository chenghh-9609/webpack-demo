const { validate } = require('schema-utils');

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
    },
  },
};

module.exports =  function(source) {
  const options = this.getOptions();
  validate(schema, options, {
    name: 'b loader',
    baseDataPath: 'options',
  });

  console.log('b loader',source);
  return source;
}
