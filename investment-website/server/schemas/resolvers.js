const User = require('./models/user'); // Import your Sequelize User model

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        throw new Error('Failed to fetch users');
      }
    },
  },
};

module.exports = resolvers;
