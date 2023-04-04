const express=require('express')
const { createLeave, getALlLeaves, getLeaveById, updateLeave,getLeavesByEmpId } = require('./leaves.controller')
const { checkToken } = require('../../middlewares/auth/tokenValidation')
const {adminMiddleware}=require('../../middlewares/RBAC/permissions')
const router=express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     leaves:
 *       type: object
 *       required:
 *         - emp_id
 *         - leave_type
 *         - start_date
 *         - end-date
 *         - status
 *         - reason
 *       properties:
 *         id:
 *           type: int
 *           description: Auto-generated unique ID of the leave
 *         emp_id:
 *           type: int
 *           description: id of the employee
 *         status:
 *           type: string
 *           description: status of the leave
 *         reason:
 *           type: string
 *           description: reason for the leave
 *         leave_type:
 *           type: string
 *           description: type of leave
 *         
 *         start_date:
 *           type: date
 *           description: start date of leave
 *         end_date:
 *           type: date
 *           description: end date of leave
 * 
 * 
 * /leaves/create:
 *   post:
 *     summary: Creates new leave
 *     tags: [leaves]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emp_id:
 *                 type: int
 *                 description: The ID of the employee associated with the leave
 *               leave_type:
 *                 type: string
 *                 description: The type of leave
 *               status:
 *                 type: string
 *                 description: status of leave
 *               reason:
 *                 type: string
 *                 description: reason for leave
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 description: document created date
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 description: document created date
 *     responses:
 *       '200':
 *         description: Returns a success message and the document object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: int
 *                   example: 1
 * 
 * /leaves:
 *   get:
 *     summary: Get a list of all leaves
 *     tags: [leaves]
 *     responses:
 *       '200':
 *         description: Returns a success message and an array of leave objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: int
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: int
 *                         example: 10
 *                       emp_id:
 *                         type: int
 *                         example: 10
 *                       leave_type:
 *                         type: string
 *                         example: paid
 *                       status:
 *                         type: string
 *                         example: pending
 *                       reason:
 *                         type: string
 *                         example: health issues
 *                       start_date:
 *                         type: date
 *                         example: 04/07/2023
 *                       end_date:
 *                         type: date
 *                         example: 04/07/2023
 * 
 * /leaves/{id}:
 *   get:
 *     summary: fetches single leave
 *     tags: [leaves]
 *     description: Get an leave by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the leave to get
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Returns a success message and an array of leave objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: int
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: int
 *                         example: 10
 *                       emp_id:
 *                         type: int
 *                         example: 10
 *                       status:
 *                         type: string
 *                         example: pending
 *                       reason:
 *                         type: string
 *                         example: health issues
 *                       leave_type:
 *                         type: string
 *                         example: paid
 *                       start_date:
 *                         type: string
 *                         format: date
 *                         example: 1990-01-01
 *                       end_date:
 *                         type: string
 *                         format: date
 *                         example: 1990-01-01
 *       404:
 *         description: leave not found
 *       500:
 *         description: Server error
 * 
 * /leaves/empleaves:
 *   post:
 *     summary: fetches all leaves of a specific employee
 *     tags: [leaves]
 *     description: Get all leaves by employee id
 *     requestBody:
 *       description: Id the employee
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: int
 *                 example: 1
 *     responses:
 *       '200':
 *         description: Returns a success message and an array of document objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: int
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: int
 *                         example: 10
 *                       emp_id:
 *                         type: int
 *                         example: 10
 *                       status:
 *                         type: string
 *                         example: pending
 *                       reason:
 *                         type: string
 *                         example: health issues
 *                       start_date:
 *                         type: string
 *                         format: date
 *                         example: 1990-01-01
 *                       end_date:
 *                         type: string
 *                         format: date
 *                         example: 1990-01-01
 *                       leave_type:
 *                         type: string
 *                         example: paid
 *       404:
 *         description: leaves not found
 *       500:
 *         description: Server error
 */



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