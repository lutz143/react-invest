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
    getValuation: async (_, { id }) => {
      try {
        const valuation = await Valuation.findByPk(id);
        if (!valuation) {
          throw new Error('Valuation not found');
        }
        return valuation;
      } catch (error) {
        throw new Error('Failed to fetch valuation');
      }
    },
  },
};

module.exports = resolvers;
