const express=require('express')
const { createPayslip, getAllPayslips, getPayslipById } = require('./payslips.controller')
const { checkToken } = require('../../middlewares/auth/tokenValidation')
const {adminMiddleware}=require('../../middlewares/RBAC/permissions')
const router=express.Router()

// endpoint to create payslip
router.post('/',checkToken,adminMiddleware,createPayslip)
// endpoint to get all payslips
router.get('/',checkToken,adminMiddleware,getAllPayslips)
// endpoint to get single payslip
router.get('/:id',checkToken,getPayslipById)

module.exports=router