const express=require('express')
const { checkToken } = require('../../middlewares/auth/tokenValidation')
const {adminMiddleware}=require('../../middlewares/RBAC/permissions')
const router=express.Router()
const {createEmployee,getEmployees, getUserByEmail, getUserById, login}=require('./employees.controller')


// swagger docs
/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - dob
 *         - role_id
 *       properties:
 *         id:
 *           type: int
 *           description: Auto-generated unique ID of the employee
 *         name:
 *           type: string
 *           description: Name of the employee
 *         email:
 *           type: string
 *           description: Email of the employee
 *         password:
 *           type: string
 *           description: password of the employee
 *         
 *         role_id:
 *           type: int
 *           description: Role of the employee
 *         dob:
 *           type: date
 *           description: Dae of birth
 *
 * /employee/signup:
 *   post:
 *     summary: Signup for a new employee
 *     tags: [Employee]
 *     requestBody:
 *       description: Employee details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: 1990-01-01
 *               role_id:
 *                 type: string
 *                 example: 5dd659c69b69be9990720113
 *     responses:
 *       '200':
 *         description: Returns a success message and employee details
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
 
 * /employee/login:
 *   post:
 *     summary: Login for an employee
 *     tags: [Employee]
 *     requestBody:
 *       description: Email and password of the employee
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       '200':
 *         description: Returns the employee details and token with success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoiNWRkNjU5YzY5YjY5YmU5OTkwNzIwMTEzIiwiaWF0IjoxNTE2MjM5MDIyfQ.f7qzckEwZp7_TZvbIiZTtTtx-KtDGCA04sD2GYOzOaA
 *                 employee:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: int
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john@example.com
 *                     role_id:
 *                       type: int
 *                       example: 1
 *                     dob:
 *                       type: date
 *                       example: 1
 
 * /employee:
 *   get:
 *     summary: Get a list of all employees
 *     tags: [Employee]
 *     responses:
 *       '200':
 *         description: Returns a success message and an array of employee objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: int
 *                   example: 1
 *                 employees:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: int
 *                         example: 10
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john@example.com
 *                       dob:
 *                         type: string
 *                         format: date
 *                         example: 1990-01-01
 *                       role_id:
 *                         type: int
 *                         example: 1
 
 *
 * /employees/{id}:
 *   get:
 *     summary: getting employee by id
 *     tags: [Employee]
 *     description: Get an employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to get
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Returns a success message and an array of employee objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: int
 *                   example: 1
 *                 employees:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: int
 *                         example: 10
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john@example.com
 *                       dob:
 *                         type: string
 *                         format: date
 *                         example: 1990-01-01
 *                       role_id:
 *                         type: string
 *                         example: 5dd659c69b69be9990720113
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */








// endpoint to create account in database

router.post('/signup',createEmployee)
// endpoint for user login
router.post('/login',login)
// endpoint to get all users
router.get('/',checkToken,getEmployees)
// endpoint to get user by email
router.post('/user',checkToken,getUserByEmail)
// endpoin to get user by id
router.get('/:id',checkToken,getUserById)


module.exports=router