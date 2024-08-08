const { upload, getAll, getById, getAllById } = require("./documents.model");

module.exports = {
  uploadFile: async (req, res) => {
    try {
      const data = { body: req.body, file: req.file };
      const results = await upload(data);
      return res.status(200).json({
        success: 1,
        message: 'Document uploaded successfully',
        data: results
      });
    } catch (err) {
      return res.status(500).json({
        success: 0,
        message: 'Unable to upload file'
      });
    }
  },

  getAllFiles: async (req, res) => {
    try {
      const results = await getAll();
      return res.status(200).json({
        success: 1,
        data: results
      });
    } catch (err) {
      return res.status(404).json({
        success: 0,
        message: 'Unable to fetch documents'
      });
    }
  },

  getAllFilesById: async (req, res) => {
    try {
      const id = req.body.id;
      const results = await getAllById(id);
      return res.status(200).json({
        success: 1,
        data: results
      });
    } catch (err) {
      return res.status(404).json({
        success: 0,
        message: 'Unable to fetch documents'
      });
    }
  },

  getFileById: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await getById(id);
      if (!result) {
        return res.status(404).json({
          success: 0,
          message: 'Document not found'
        });
      }
      res.setHeader('Content-Disposition', `attachment; filename="${result.name}"`);
      res.setHeader('Content-Type', 'application/pdf');
      return res.send(result.file);
    } catch (err) {
      return res.status(404).json({
        success: 0,
        message: 'Unable to fetch document'
      });
    }
  }
};