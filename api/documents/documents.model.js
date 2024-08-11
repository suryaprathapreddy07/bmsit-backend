const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  doc_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  club_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Club'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  file: {
    type: Buffer,
    required: true
  }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = {
  upload: async (data) => {
    try {
      const document = new Document({
        doc_user_id: data.body.doc_user_id,
        club_id: data.body.club_id,
        name: data.body.name,
        description: data.body.description,
        createdDate: new Date(+data.body.createdDate),
        file: data.file.buffer
      });
      const result = await document.save();
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getAll: async () => {
    try {
      const results = await Document.find().populate('doc_user_id').populate('club_id');
      return results;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getAllById: async (id) => {
    try {
      const results = await Document.find({ doc_user_id: id }).select('-file').populate('club_id');
      return results;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getById: async (id) => {
    try {
      const result = await Document.findById(id).populate('club_id');
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  getAllByClubId: async (clubId) => {
    try {
      const results = await Document.find({ club_id: clubId }).populate('doc_user_id');
      return results;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};