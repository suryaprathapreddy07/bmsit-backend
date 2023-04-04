const express=require('express')
const { createLeave, getALlLeaves, getLeaveById, updateLeave,getLeavesByEmpId } = require('./leaves.controller')
const { checkToken } = require('../../middlewares/auth/tokenValidation')
const {adminMiddleware}=require('../../middlewares/RBAC/permissions')
const router=express.Router()

// endpoint to create new leave
router.post('/create',checkToken,createLeave)
// endpoin to get all leaves
router.get('/',checkToken,getALlLeaves)
// endpoint to get all leaves of a employee
router.post('/empLeaves',checkToken,getLeavesByEmpId)
// endpoint to get leave by id
router.get('/:id',checkToken,getLeaveById)
// endpoint to update leave
router.post('/update',checkToken,adminMiddleware,updateLeave)

module.exports=router