const express = require('express');
const router = express.Router();
const {
    createUser,
    getUserByEmail,
    getUserById,
    login,
    getUsers
} = require('./users.controller');

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
 *         - role_id
 *         - dob
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the employee
 *         name:
 *           type: string
 *           description: The name of the employee
 *         email:
 *           type: string
 *           description: The email of the employee
 *         password:
 *           type: string
 *           description: The password of the employee
 *         role_id:
 *           type: string
 *           description: The role id of the employee
 *         dob:
 *           type: string
 *           format: date
 *           description: The date of birth of the employee
 *       example:
 *         id: d5fE_asz
 *         name: John Doe
 *         email: johndoe@example.com
 *         password: password123
 *         role_id: 60d0fe4f5311236168a109ca
 *         dob: 1990-01-01
 */

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: The employees managing API
 */

/**
 * @swagger
 * /employees/signup:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: The employee was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Some server error
 */
router.post('/signup', createUser);

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Returns the list of all the employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: The list of the employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Users not found
 */
router.get('/', getUsers);

/**
 * @swagger
 * /employees/email:
 *   post:
 *     summary: Get an employee by email
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the employee
 *             example:
 *               email: johndoe@example.com
 *     responses:
 *       200:
 *         description: The employee description by email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: User not found
 */
router.post('/email', getUserByEmail);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by id
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee id
 *     responses:
 *       200:
 *         description: The employee description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: User not found
 */
router.get('/:id', getUserById);

/**
 * @swagger
 * /employees/login:
 *   post:
 *     summary: Login an employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the employee
 *               password:
 *                 type: string
 *                 description: The password of the employee
 *             example:
 *               email: johndoe@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *                 user:
 *                   $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Invalid credentials
 */
router.post('/login', login);

module.exports = router;