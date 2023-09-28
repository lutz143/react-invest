// const { AuthenticationError } = require("apollo-server-express");
// const { User, Valuation } = require("../models");
// const { signToken } = require("../utils/auth");

// const resolvers = {
//   Query: {
//     me: async (parent, args, context) => {
//       if (context.user) {
//         const userData = await User.findOne({ _id: context.user._id }).select(
//           "-__v -password"
//         );

//         return userData;
//       }
//       throw new AuthenticationError('You need to be logged in!');
//     },
//     getValuations: async () => {
//       try {
//         const valuations = await Valuation.findAll();
//         return valuations;
//       } catch (error) {
//         throw new Error('Failed to fetch valuations');
//       }
//     },
//     stock: async (parent, { stockId }) => {
//       return Valuation.findOne({ _id: stockId });
//     }
//   },

//   Mutation: {
//     // mutation queries to handle CRUD operations
//     addUser: async (parent, { username, email, password }) => {
//       const user = await User.create({ username, email, password });
//       const token = signToken(user);

//       return { token, user };
//     },
//     login: async (parent, { email, password }) => {
//       const user = await user.findOne({ email });

//       if (!user) {
//         throw new AuthenticationError('No profile with this email found!');
//       }

//       const correctPw = await user.isCorrectPassword(password);

//       if (!correctPw) {
//         throw new AuthenticationError('Incorrect password!');
//       }

//       const token = signToken(user);
//       return { token, user };
//     },
//   },
// };

// module.exports = resolvers;
