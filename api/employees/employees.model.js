let pool=require('../../config/database')

module.exports={
    // create method used in signup section
    create:(data,callback)=>{
        pool.getConnection((err,connection)=>{
            if(err) throw err
            connection.query("INSERT INTO EMPLOYEES (name,email,password,role_id,dob) VALUES(?,?,?,?,?)",[data.name,data.email,data.password,data.role_id,new Date(data.dob)],(err,results)=>{
                if(err)return callback(err,null)
                return callback(null,results)
            })
        })
    },

    // method to get all employees from the database
    getEmployees:(callback)=>{
        pool.query("SELECT * FROM EMPLOYEES",[],(err,results)=>{
            if(err) return callback(err)
            return callback(null,results)
        })
    },

    // method to get employee by id
    getById:(id,callback)=>{
        pool.query("SELECT * FROM EMPLOYEES WHERE id=?",id,(err,results)=>{
            if(err) return callback(err)
            return callback(null,results[0])
        })
    },
    getByEmail:(email,callback)=>{
        pool.query("SELECT * FROM EMPLOYEES WHERE email=?",email,(err,results)=>{
            if(err) return callback(err)
            return callback(null,results[0])
        })
    },
    // method for cron job
    getAllEmployees:async (callback)=>{
       pool.getConnection((err,connection)=>{
        connection.query('SELECT * FROM EMPLOYEES',[],(err,results)=>{
            if(err)return err;
            // console.log(results)
            return (callback(results))
        })
       })
    },

    

}