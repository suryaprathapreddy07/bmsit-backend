let pool = require("../../config/database");

module.exports = {
  // create method to insert payslip data into database
  create: (data, callback) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "INSERT INTO PAYSLIPS (pay_emp_id,month,year,base_pay,deductions,allowances,net_pay) VALUES(?,?,?,?,?,?,?)",
        [
          data.pay_emp_id,
          data.month,
          data.year,
          data.base_pay,
          data.deductions,
          data.allowances,
          data.net_pay,
        ],
        (err, results) => {
          if (err) return callback(err, null);
          return callback(null, results);
        }
      );
    });
  },

  // method to get all payslips from database
  getPayslips: (callback) => {
    pool.query("SELECT * FROM PAYSLIPS", [], (err, results) => {
      if (err) return callback(err);
      return callback(null, results);
    });
  },

  // method to get payslip by id
  getById: (id, callback) => {
    pool.query("SELECT * FROM PAYSLIPS WHERE pay_emp_id=?", id, (err, results) => {
      if (err) return callback(err);
      return callback(null, results[0]);
    });
  },
  // method for cron
  getPayslipById: async(id, callback) => {
    pool.query("SELECT * FROM PAYSLIPS WHERE pay_emp_id=?", id, (err, results) => {
      if (err) return callback(err);
      return callback(results);
    });
  },
};
