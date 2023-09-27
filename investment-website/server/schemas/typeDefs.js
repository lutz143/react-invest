const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    totalPlayTime: Int
    games: [Game]
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    search: [Valuation]
    valuation(valuationId: ID!): Valuation
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }


  type Valuation {
    id: ID!
    Ticker: String!
    Assessment_Date: String!
    previousClose: Float!
    marketCap: Float
    sharesOutstanding: Float
    Terminal_Rate: Float
    WACC: Float
    TerminalValue_CAGR: Float
    NPV_Total_CAGR: Float
    TerminalValue_NOM: Float
    NPV_Total_NOM: Float
    TerminalValue_CON: Float
    NPV_Total_CON: Float
    CAGR_CPS: Float
    NOM_CPS: Float
    CON_CPS: Float
    Swing_NOM: Float
    Swing_CAGR: Float
    CONF_NOM: Float
    CONF_CAGR: Float
  }

  type Query {
    getValuations: [Valuation]
    stock(stockId: ID!): Valuation
  }
`;

module.exports = typeDefs;