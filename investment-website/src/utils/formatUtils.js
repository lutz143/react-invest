// formatModel.js

const formatModel = {
  formatCurrency: function(amount) {
    // Implement your currency formatting logic here
    // You can use libraries like numeral.js or Intl.NumberFormat for more advanced formatting
    return `$${amount.toFixed(2)}`;
  },

  formatPercentage: function(percentage) {
    // Implement your percentage formatting logic here
    return `${(percentage * 100).toFixed(1)}%`;
  },

  formatInteger: function(integer) {
    return integer.toLocaleString("en-US");
  },

  formatDecimal: function(decimal) {
    return parseFloat(decimal).toFixed(2);
  },

  formatDate: function(dateString) {
    // Implement your date formatting logic here
    // You can use libraries like date-fns or moment.js for more advanced formatting
    const date = new Date(dateString);
    return date.toLocaleDateString();
  },
};

module.exports = formatModel;
