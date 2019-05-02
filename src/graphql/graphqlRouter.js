const express = require('express');
const graphqlRouter = express.Router();
const allSchema = require('./schema');
const expressGraphQL = require('express-graphql');

graphqlRouter.use(
  expressGraphQL({
    schema: allSchema,
    graphiql: true
  })
);

module.exports = graphqlRouter;
