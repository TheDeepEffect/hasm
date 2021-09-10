module.exports = {
    client: {
      incldes:["./src/utils/resolvers/**"],
      service: {
        name: 'JASM Apollo Server',
        url: "https://jasm-apollo-server.herokuapp.com/graphql",
        endpoint:{
          url: "https://jasm-apollo-server.herokuapp.com/graphql",
        }
      }
    }
  };
  