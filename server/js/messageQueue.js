module.exports.messages = []; // the storage unit for messages

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  module.exports.messages.push(message);
};

module.exports.dequeue = () => {
  // returns undefined if messages array is empty
  return module.exports.messages.shift();
};

