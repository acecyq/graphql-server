const graphql = require("graphql");
const find = require("lodash/find");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLString
} = graphql;

const books = [
  {
    name: "name of the wind",
    genre: "fantasy",
    id: "1"
  },
  {
    name: "the final empire",
    genre: "fantasy",
    id: "2"
  },
  {
    name: "the long earth",
    genre: "sci-fi",
    id: "3"
  }
];

const authors = [
  {
    name: "Ace",
    age: 31,
    id: 1
  },
  {
    name: "Alena",
    age: 32,
    id: 2
  },
  {
    name: "Amrich",
    age: 2,
    id: 3
  }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    age: { type: GraphQLInt },
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        // code to get data from db or other source
        return find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          GraphQLID
        }
      },
      resolve(parents, args) {
        return find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
