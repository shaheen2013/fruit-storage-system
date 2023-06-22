const mongoose = require('mongoose');

const FruitSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: { type: String, maxlength: 30 },
  limit: Number,
});

const FruitModel = mongoose.model('Fruit', FruitSchema);

module.exports = FruitModel;
