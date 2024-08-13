const { create, getAll, getById } = require("./clubs.model");

module.exports = {
  createClub: async (req, res) => {
    try {
      console.log(req.body,'---------------------------------------------------------')
      const results = await create(req.body);
      return res.status(200).json({
        success: 1,
        message: 'Club created successfully',
        data: results
      });
    } catch (err) {
      return res.status(500).json({
        success: 0,
        message: 'Unable to create club'
      });
    }
  },

  getAllClubs: async (req, res) => {
    try {
      const results = await getAll();
      return res.status(200).json({
        success: 1,
        data: results
      });
    } catch (err) {
      return res.status(404).json({
        success: 0,
        message: 'Clubs not found'
      });
    }
  },

  getClubById: async (req, res) => {
    try {
      const id = req.params.id;
      const results = await getById(id);
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Club not found'
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    } catch (err) {
      return res.status(500).json({
        success: 0,
        message: 'Unable to retrieve club'
      });
    }
  }
};