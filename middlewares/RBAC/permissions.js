module.exports={
    adminMiddleware: (req, res, next) => {
      console.log(req)
        const { role } = req.employee?.result;
        console.log(role)
        if (role !== 'admin') {
          return res.status(403).json({ message: 'Forbidden' });
        }
        next();
      }
}
