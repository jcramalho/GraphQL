var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var axios = require('axios');

var api = 'https://clav-api.dglab.gov.pt/v2/entidades'
var apikey = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjFmM2FkYTA2OGRlMDAxMzNjODE3OSIsImlhdCI6MTYyNzk4Mzg5MywiZXhwIjoxNjMwNTc1ODkzfQ.brRq9mDR7_gQDDq0Wxcn5BEsLOnDmsPJ4fQm3weg_xzJkkxzjpZ6D5QuL7ax-0WzrcI5EzTpzwRUoBiaxsKtcMhk1lAhIURH1Vr8UNmfT88VOcvHR-rRfNXY3viT2549KuYVOiuRfMaarO0GPMbr1HuApxdfrmyEKEKrF6VDlGJJTXRxFp98euYsAwM2UOT0kcvfQGwrCN-MVEOQ2EGzF_2y0xzBIa-rl-E8vJEN50vAFLjFNTykqYrhJTt9iNc3YhLvIQ4OmxAdY5brn30OVXbIHvPt7KYF4F6HzRBrdRpD-WlWsCDtCXOq4XVjxjL5u7nqMENoJjJMSQdAUq2Rhg";


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Entidade {
    designacao: String
    estado: String
    id: String
    internacional: String
    sigla: String
    sioe: String
  } 

  type Query {
    all: [Entidade]
    active: [Entidade]
    inactive: [Entidade]
    harmony: [Entidade]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  all: async () => {
      try{
        var dados = await axios.get(api + '?apikey=' + apikey)
        //console.log("Recebi " + dados.data.length + " entidades.")
        return dados.data
      }
      catch(e){
        console.log("Erro: " + erro)
      }
  },

  active: async () => {
    try{
      var dados = await axios.get(api + '?apikey=' + apikey + '&estado=Ativa')
      //console.log("Recebi " + dados.data.length + " entidades.")
      return dados.data
    }
    catch(e){
      console.log("Erro: " + erro)
    }
  },

  inactive: async () => {
    try{
      var dados = await axios.get(api + '?apikey=' + apikey + '&estado=Inativa')
      //console.log("Recebi " + dados.data.length + " entidades.")
      return dados.data
    }
    catch(e){
      console.log("Erro: " + erro)
    }
  },

  harmony: async () => {
    try{
      var dados = await axios.get(api + '?apikey=' + apikey + '&estado=Harmoniza%C3%A7%C3%A3o')
      //console.log("Recebi " + dados.data.length + " entidades.")
      return dados.data
    }
    catch(e){
      console.log("Erro: " + erro)
    }
  }

};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');