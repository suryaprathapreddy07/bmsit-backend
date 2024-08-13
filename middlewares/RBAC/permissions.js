module.exports={
    adminMiddleware: (req, res, next) => {
        const { role } = req.employee?.result;
        if (role !== 'admin') {
          return res.status(403).json({ message: 'Forbidden' });
        }
        next();
      }
}
