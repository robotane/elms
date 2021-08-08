const permissions = require('../permissions');
const resolvers = require('../resolvers');
const { applyMiddleware } = require('graphql-middleware');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = require('./typeDefs');

module.exports = applyMiddleware(
    buildFederatedSchema([{ typeDefs, resolvers }]),
    permissions
);
