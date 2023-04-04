module.exports={
    adminMiddleware: (req, res, next) => {
        const { role_id } = req.employee.result;
        console.log(role_id)
        if (role_id !== 2) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        next();
      }
}
