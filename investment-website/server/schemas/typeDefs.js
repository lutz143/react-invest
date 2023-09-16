const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Game {
    _id: ID
    company: [String]
    description: String
    title: String
    image: String
    link: String
    comments: [Comment]
    upVotes: Int
    downVotes: Int
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