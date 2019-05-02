const { makeExecutableSchema } = require('graphql-tools');
const { mergeTypes } = require('merge-graphql-schemas');
const resolvers = require('./resolvers');

const typeBoard = {
  schema: `
   type Board {
    _id: ID!
    title: String!
    list: [String]
   }
   type Query {
    getBoard(_id: ID!): Board
    allBoards: [Board]
   }
   input BoardInput {
    title: String!
    list: [String]
   }
   type Mutation {
    createBoard(input: BoardInput) : Board
    updateBoard(_id: ID!, input: BoardInput): Board
    deleteBoard(_id: ID!) : Board
   }
  `
};

const typeList = {
  schema: `
   type List {
    _id: ID!
    title: String!
    order: String!
    task: [String]
   }
   type Query {
    getList(_id: ID!): List
    allLists: [List]
   }
   input ListInput {
    title: String!
    order: String!
    task: [String]
   }
   type Mutation {
    createList(input: ListInput) : List
    updateList(_id: ID!, input: ListInput): List
    deleteList(_id: ID!) : List
   }
  `
};

const typeTask = {
  schema: `
   type Task {
    _id: ID!
    title: String!
    order: String!
    description: String!
    assignee: [String]
   }
   type Query {
    getTask(_id: ID!): Task
    allTasks: [Task]
   }
   input TaskInput {
    title: String!
    order: String!
    description: String!
    assignee: [String]
   }
   type Mutation {
    createTask(input: TaskInput) : Task
    updateTask(_id: ID!, input: TaskInput): Task
    deleteTask(_id: ID!) : Task
   }
  `
};

const schemas = [typeBoard, typeList, typeTask];

const allSchema = makeExecutableSchema({
  typeDefs: mergeTypes(schemas.map(({schema}) => schema)),
  resolvers
});

module.exports = allSchema;
