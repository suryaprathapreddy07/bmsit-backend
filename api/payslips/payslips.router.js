const express=require('express')
const { createPayslip, getAllPayslips, getPayslipById } = require('./payslips.controller')
const { checkToken } = require('../../middlewares/auth/tokenValidation')
const {adminMiddleware}=require('../../middlewares/RBAC/permissions')
const router=express.Router()



/**
 * @swagger
 * components:
 *   schemas:
 *     payslips:
 *       type: object
 *       required:
 *         - id
 *         - pay_emp_id
 *         - month
 *         - year
 *         - base_pay
 *         - deductions
 *         - allowances
 *         - net_pay
 *       properties:
 *         id:
 *           type: int
 *           description: Auto-generated unique ID of the payslip
 *         pay_emp_id:
 *           type: int
 *           description: id of employee
 *         month:
 *           type: int
 *           description: month of payslip
 *         year:
 *           type: int
 *           description: year if payslip
 *         base_pay:
 *           type: Decimal(5,0)
 *           description: base pay
 *         
 *         deductions:
 *           type: Decimal(5,0)
 *           description: deductions
 *         allowances:
 *           type: Decimal(5,0)
 *           description: allowances
 *         net_pay:
 *           type: Decimal(5,0)
 *           description: net pay
 *
 * /payslips:
 *   post:
 *     summary: create new payslip
 *     tags: [Payslips]
 *     requestBody:
 *       description: Payslip details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pay_emp_id:
 *                 type: int
 *                 example: 1
 *               month:
 *                 type: int
 *                 example: 1
 *               year:
 *                 type: int
 *                 example: 2023
 *               base_pay:
 *                 type: Decimal(5,0)
 *                 example: 10000
 *               deductions:
 *                 type: Decimal(5,0)
 *                 example: 1000
 *               allowances:
 *                 type: Decimal(5,0)
 *                 example: 1000
 *               net_pay:
 *                 type: Decimal(5,0)
 *                 example: 10000
 *     responses:
 *       '200':
 *         description: Returns a success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: int
 *                   example: 1
 *     
 *      
 *   get:
 *     summary: Get a list of all payslips
 *     tags: [Payslips]
 *     responses:
 *       '200':
 *         description: Returns a success message and an array of employee objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: int
 *                   example: 1
 *                 pay_emp_id:
 *                   type: int
 *                   example: 1
 *                 month:
 *                   type: int
 *                   example: 1
 *                 year:
 *                   type: int
 *                   example: 2023
 *                 base_pay:
 *                   type: Decimal(5,0)
 *                   example: 10000
 *                 deductions:
 *                   type: Decimal(5,0)
 *                   example: 1000
 *                 allowances:
 *                   type: Decimal(5,0)
 *                   example: 1000
 *                 net_pay:
 *                   type: Decimal(5,0)
 *                   example: 10000
 *                
 *
 * /payslips/{id}:
 *   get:
 *     summary: getting payslip by id
 *     tags: [Payslips]
 *     description: Get payslip by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the payslip to get to get payslip
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Returns a success message and an array of payslip object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: int
 *                   example: 1
 *                 pay_emp_id:
 *                   type: int
 *                   example: 1
 *                 month:
 *                   type: int
 *                   example: 1
 *                 year:
 *                   type: int
 *                   example: 2023
 *                 base_pay:
 *                   type: Decimal(5,0)
 *                   example: 10000
 *                 deductions:
 *                   type: Decimal(5,0)
 *                   example: 1000
 *                 allowances:
 *                   type: Decimal(5,0)
 *                   example: 1000
 *                 net_pay:
 *                   type: Decimal(5,0)
 *                   example: 10000
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */





// endpoint to create payslip
router.post('/',checkToken,adminMiddleware,createPayslip)
// endpoint to get all payslips
router.get('/',checkToken,adminMiddleware,getAllPayslips)
// endpoint to get single payslip
router.get('/:id',checkToken,getPayslipById)

module.exports=router