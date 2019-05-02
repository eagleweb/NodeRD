const { mergeResolvers } = require('merge-graphql-schemas');
const Board = require('../models/board');
const List = require('../models/list');
const Task = require('../models/task');

const BoardResolver = {
  Query : {
    async getBoard(root, {_id}){
      return await Board.findById(_id);
    },
    async allBoards(){
      return await Board.find();
    }
  },
  Mutation: {
    async createBoard(root, {input}){
      return await Board.create(input);
    },
    async updateBoard(root, {_id, input}){
      return await Board.findOneAndUpdate({_id},input,{new: true})
    },
    async deleteBoard(root, {_id}){
      return await Board.findOneAndRemove({_id});
    }
  }
};

const ListResolver = {
  Query : {
    async getList(root, {_id}){
      return await List.findById(_id);
    },
    async allLists(){
      return await List.find();
    }
  },
  Mutation: {
    async createList(root, {input}){
      return await List.create(input);
    },
    async updateList(root, {_id, input}){
      return await List.findOneAndUpdate({_id},input,{new: true})
    },
    async deleteList(root, {_id}){
      return await List.findOneAndRemove({_id});
    }
  }
};

const TaskResolver = {
  Query : {
    async getTask(root, {_id}){
      return await Task.findById(_id);
    },
    async allTasks(){
      return await Task.find();
    }
  },
  Mutation: {
    async createTask(root, {input}){
      return await List.create(input);
    },
    async updateTask(root, {_id, input}){
      return await Task.findOneAndUpdate({_id},input,{new: true})
    },
    async deleteTask(root, {_id}){
      return await Task.findOneAndRemove({_id});
    }
  }
};

const resolvers = mergeResolvers([BoardResolver, ListResolver, TaskResolver]);

module.exports = resolvers;
