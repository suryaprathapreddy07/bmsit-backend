let pool = require("../../config/database");

module.exports = {
  upload: (data, callback) => {
    console.log(data.body)
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(
        "INSERT INTO DOCUMENTS (doc_emp_id,name,description,createdDate,file) VALUES(?,?,?,?,?)",
        [
          data.body["doc_emp_id"],
          data.body.name,
          data.body.description,
          new Date(+data.body["createdDate"]),
          data.file.buffer,
        ],
        (err, results) => {
          console.log(err)
          if (err) return callback(err, null);
          return callback(null, results);
        }
      );
    });
  },
  getAll:(callback)=>{
    pool.query("SELECT * FROM DOCUMENTS",[],(err,results)=>{
        if(err){
            return callback(err,null)
        }
        return callback(null,results)
    })
  },
  getAllById:(id,callback)=>{
    pool.query("SELECT * FROM DOCUMENTS where doc_emp_id=?",id,(err,results)=>{
        if(err){
            return callback(err,null)
        }
        let modifiedResults=results.map(ele=>{
          return {
            id:ele.id,
            doc_emp_id:ele.doc_emp_id,
            name:ele.name,
            description:ele.description,
            createdDate:ele.createdDate
          }

        })
        return callback(null,modifiedResults)
    })
  },
  getById:(id,callback)=>{
    pool.query("SELECT * FROM DOCUMENTS where id=?",id,(err,results)=>{
        if(err){
            return callback(err,null)
        }
        return callback(null,results)
    })
  }
};
