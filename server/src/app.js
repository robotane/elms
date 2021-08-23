const { ApolloServer } = require('apollo-server');
const {
    ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');

const schema = require('./schema');
const { createContext } = require('./util/context');

// TODO: Add limits to students query and update the server to target req.url/graphql

// TODO Make role a list of roles

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req }) => createContext(req),
});

server.listen({ port: PORT }).then((req) => {
    console.log(`Server running at ${req.url}`);
});
