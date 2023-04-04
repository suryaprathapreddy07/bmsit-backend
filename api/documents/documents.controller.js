const { upload, getAll, getById, getAllById } = require("./documents.model")

module.exports={
    uploadFile:(req,res)=>{
        data={body:req.body,file:req.file}
        upload(data,(err,results)=>{
            if(err){
                return res.status(500).json({
                    success:0,
                    message:'unable to upload file'
                })
            }
            return res.status(200).json({
                success:1,
                message:'document uploaded successfully',
                data:results
            })
        })
    },
    getAllFiles:(req,res)=>{
        getAll((err,results)=>{
            if(err){
               return res.status(404).json({
                    success:0,
                    message:'Unable to fetch documents'
                })
            }
    //         res.setHeader('Content-Disposition', `attachment; filename="${results.name}"`);
    //   res.setHeader('Content-Type', 'application/pdf');
      return res.status(200).json({
        success:1,
        data:results
      });
            
        })
       
    },
    getAllFilesById:(req,res)=>{
        const id=req.body.id
        getAllById(id,(err,results)=>{
            if(err){
               return res.status(404).json({
                    success:0,
                    message:'Unable to fetch documents'
                })
            }
      return res.status(200).json({
        success:1,
        data:results
      });
            
        })
       
    },

    getFileById:(req,res)=>{
        id=req.params.id
        getById(id,(err,results)=>{
            if(err){
                return res.status(404).json({
                    success:0,
                    message:'Unable to fetch documents'
                })
            }
            res.setHeader('Content-Disposition', `attachment; filename="${results.name}"`);
      res.setHeader('Content-Type', 'application/pdf');
      return res.send(results[0].file);

        })
    }
}