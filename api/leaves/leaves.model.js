let pool = require("../../config/database");

module.exports = {
  // method to create new leave
  create: (data, callback) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "INSERT INTO LEAVES (emp_id,leave_type,start_date,end_date,status,reason) VALUES(?,?,?,?,?,?)",
        [
          data.emp_id,
          data.leave_type,
          new Date(data.start_date),
          new Date(data.end_date),
          data.status,
          data.reason,
          data.manager_id,
        ],
        (err, results) => {
          if (err) return callback(err, null);
          return callback(null, results);
        }
      );
    });
  },

  // method to get all leaves
  getLeaves: (callback) => {
    pool.query("SELECT * FROM Leaves", [], (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  },

  // method to get leave by id
  getById: (id, callback) => {
    pool.query("SELECT * FROM leaves WHERE id=?", id, (err, results) => {
      if (err) return callback(err);
      return callback(null, results[0]);
    });
  },
  // method to get all leaves of a particular id
  getByEmpId: (id, callback) => {
    pool.query("SELECT * FROM leaves WHERE emp_id=?", id, (err, results) => {
      if (err) return callback(err);
      return callback(null, results[0]);
    });
  },
//   method to update leave
update:(data,callback)=>{
    pool.query("UPDATE leaves SET status = ? WHERE id = ?",[data.status,data.id],(err,results)=>{
        if(err)return callback(err)
        return callback(null,results)
    })
}
};
