module.exports = {
    client: {
      incldes:["./src/utils/resolvers/**"],
      service: {
        name: 'JASM Apollo Server',
        // url: "https://jasm-apollo-server.herokuapp.com/graphql",
        url: "http://localhost:4000/graphql",
        endpoint:{
          url: "http://localhost:4000/graphql",
          // url: "https://jasm-apollo-server.herokuapp.com/graphql",
        },
        WebSocket:{
          // url:"wss://jasm-apollo-server.herokuapp.com/graphql"
          url:"ws://localhost:4000/graphql"
        }
      }
    }
  };
  