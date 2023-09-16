import { gql } from "@apollo/client";

export const QUERY_SINGLE_STOCK = gql`
  query getSingleStock($stockId: ID!) {
    stock(stockId: $stockId) {
      Ticker
      Assessment_Date
      previousClose
    }
  }
`