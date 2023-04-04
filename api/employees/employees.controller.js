const {create,getEmployees, getByEmail, getById}=require('./employees.model')
const {genSaltSync,hashSync, compareSync}=require('bcrypt')
const {sign}=require('jsonwebtoken')

module.exports={
    createEmployee:(req,res)=>{
        let body=req.body
        let salt=genSaltSync(10)
        body.password=hashSync(body.password,salt)
        create(body,(err,results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message:'Unable to create account'
                })

            }
            return res.status(201).json({
                success:1,
                data:results
            })
        })

    },
    getEmployees:(req,res)=>{
        console.log(req.method)
        getEmployees((err,results)=>{
            if(err){
                return res.status(404).json({
                    success:0,
                    message:'Users didnt found'
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    getUserByEmail:(req,res)=>{
        const email=req.body.email;
        getByEmail(email,(err,results)=>{
            if(err){
                return res.status(404).json({
                    success:0,
                    message:'User not found'
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    getUserById:(req,res)=>{
        const id=req.params.id
        getById(id,(err,results)=>{
            if(err){
                return res.status(404).json({
                    success:0,
                    message:'User not found'
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    login:(req,res)=>{
        const body=req.body
        getByEmail(body.email,(err,results)=>{
            if(err){
                console.log(err)
                return res.status(404).json({
                    success:0,
                    message:'Invalid credentials'
                })
            }
            if(!results){
                return res.status(404).json({
                    success:0,
                    message:'Invalid credentials'
                })
            }
            console.log(results)
            const result=compareSync(body.password,results.password)
            console.log(result)
            if(result){
                results.password=undefined
                const jwt=sign({result:results},'jwt123',{expiresIn:'10h'})
                return res.json({
                    success:1,
                    message:'login successful',
                    token:jwt,
                    user:results
                })
            }

            return res.json({
                success:0,
                message:'Invalid credentials'
            })
        })
    }
}