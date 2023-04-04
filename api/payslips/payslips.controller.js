const { create,getPayslips,getById } = require("./payslips.model")

module.exports={
    createPayslip:(req,res)=>{
        let data=req.body
        create(data,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:'Unable to create payslip'
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    getAllPayslips:(req,res)=>{
        getPayslips((err,results)=>{
            if(err){
                return res.status(404).json({
                    success:0,
                    message:'payslip didnt found'
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    getPayslipById:(req,res)=>{
        const id=req.params.id
        getById(id,(err,results)=>{
            if(err){
                return res.status(404).json({
                    success:0,
                    message:'Payslip not found'
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    }
}