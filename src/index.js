const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
  Query: {
    info: () => `Todoapp API`,
    tasks: (root, args, context, info) => {
      return context.prisma.tasks();
    }
  },
  Mutation: {
    createTask: (root, args, context) => {
      return context.prisma.createTask({
        title: args.title,
        editing: args.editing,
        completed: args.completed
      });
    },
    updateTask: (root, args, context) => {
      return context.prisma.updateTask({
        where: { id: args.id },
        data: {
          title: args.title,
          editing: args.editing,
          completed: args.completed
        }
      });
    },
    deleteTask: (root, args, context) => {
      return context.prisma.deleteTask({
        id: args.id
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
