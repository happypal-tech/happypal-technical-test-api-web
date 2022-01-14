module.exports = {
  client: {
    includes: ['./src/**/*.gql'],
    service: {
      name: 'happypal-tt-graphql',
      localSchemaFile: 'src/graphql/generated/schema.json',
    },
  },
};
