const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  instagram: {
    type: String,
    required: false,
    default: null
  },
  linkedin: {
    type: String,
    required: false,
    default: null
  },
  facebook: {
    type: String,
    required: false,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Club = mongoose.model('Club', clubSchema);

module.exports = {
  create: async (data) => {
    try {
      const club = new Club(data);
      const result = await club.save();
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getAll: async () => {
    try {
      const results = await Club.find();
      return results;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getById: async (id) => {
    try {
      const result = await Club.findById(id);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};