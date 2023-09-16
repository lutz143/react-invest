const Valuation = require('../models/Valuation');

const resolvers = {
  Query: {
    getValuations: async () => {
      try {
        const valuations = await Valuation.findAll();
        return valuations;
      } catch (error) {
        throw new Error('Failed to fetch valuations');
      }
    },
    stock: async (parent, { stockId }) => {
      return Valuation.findOne({ _id: stockId });
    }
  },
};

module.exports = resolvers;
