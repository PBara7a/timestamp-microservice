const isValidDate = (date) => date instanceof Date && !isNaN(date);

module.exports = {
  isValidDate,
};
