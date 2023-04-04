const {create, getLeaves, getById, update,getByEmpId} =require('./leaves.model')

module.exports={
    createLeave:(req,res)=>{
        const body=req.body
        create(body,(err,results)=>{
            console.log(err)
            if(err){
                return res.status(500).json({
                    success:0,
                    message:'unable to create leave'
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    getALlLeaves:(req,res)=>{
        getLeaves((err,results)=>{
            if(err){
                res.status(404).json({
                    success:0,
                    message:'Leaves not found'
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    getLeaveById:(req,res)=>{
        const id=req.params.id
        getById(id,(err,results)=>{
            if(err){
                return res.status(404).json({
                    success:0,
                    message:'leave not found'
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    getLeavesByEmpId:(req,res)=>{
        const id=req.body.id
        getByEmpId(id,(err,results)=>{
            if(err){
                return res.status(404).json({
                    success:0,
                    message:'leaves not found'
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        })
    },
    updateLeave:(req,res)=>{
        const body={id:req.body.id,status:req.body.status}
        update(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:'unable to update leave'
                })
            }
            return res.status(200).json({
                success:1,
                message:"leave updated successfully",
                data:results
            })
        })
    }
}