const express=require('express')
const { uploadFile, getAllFiles, getFileById, getAllFilesById } = require('./documents.controller')
const { checkToken } = require('../../middlewares/auth/tokenValidation')
const {adminMiddleware}=require('../../middlewares/RBAC/permissions')
const router=express.Router()
const multer = require('multer');
const upload = multer();






/**
 * @swagger
 * components:
 *   schemas:
 *     Documents:
 *       type: object
 *       required:
 *         - doc_emp_id
 *         - name
 *         - description
 *         - file
 *         - createdDate
 *       properties:
 *         id:
 *           type: int
 *           description: Auto-generated unique ID of the document
 *         doc_emp_id:
 *           type: int
 *           description: id of the employee
 *         name:
 *           type: string
 *           description: Name of the document
 *         file:
 *           type: Blob
 *           description: buffer file of the document
 *         description:
 *           type: string
 *           description: d of the document
 *         
 *         createdDate:
 *           type: date
 *           description: created date of document
 * 
 * /document/upload:
 *   post:
 *     summary: Send a document
 *     tags: [Documents]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               doc_emp_id:
 *                 type: string
 *                 description: The ID of the employee associated with the document
 *               name:
 *                 type: string
 *                 description: The name of the document
 *               description:
 *                 type: string
 *                 description: A description of the document
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to be uploaded
 *               createdDate:
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
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Document uploaded successfully
 *                 document:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: int
 *                       example: 1
 *                     doc_emp_id:
 *                       type: int
 *                       example: 2
 *                     name:
 *                       type: string
 *                       example: My Document
 *                     description:
 *                       type: string
 *                       example: This is my document
 *                     file:
 *                       type: string
 *                       example: document.pdf
 *                     createdDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-04-05T08:30:00.000Z
 * /documents:
 *   get:
 *     summary: Get a list of all documents
 *     tags: [Documents]
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
 *                       doc_emp_id:
 *                         type: int
 *                         example: 10
 *                       name:
 *                         type: string
 *                         example: aadhar
 *                       description:
 *                         type: string
 *                         example: aadhar card
 *                       file:
 *                         type: file
 *                         example: aadhar.pdf
 *                       createdDate:
 *                         type: date
 *                         example: 04/07/2023
 * 
 * /documents/{id}:
 *   get:
 *     summary: fetches single document
 *     tags: [Documents]
 *     description: Get an document by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the document to get
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
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: int
 *                         example: 10
 *                       doc_emp_id:
 *                         type: int
 *                         example: 10
 *                       name:
 *                         type: string
 *                         example: aadhar
 *                       description:
 *                         type: string
 *                         example: aadhar
 *                       createdDate:
 *                         type: string
 *                         format: date
 *                         example: 1990-01-01
 *                       file:
 *                         type: file
 *                         example: aadhar.pdf
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 * 
 * /documents/empdocs:
 *   post:
 *     summary: fetches all documents of a specific employee
 *     tags: [Documents]
 *     description: Get all documents by employee id
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
 *                       doc_emp_id:
 *                         type: int
 *                         example: 10
 *                       name:
 *                         type: string
 *                         example: aadhar
 *                       description:
 *                         type: string
 *                         example: aadhar
 *                       createdDate:
 *                         type: string
 *                         format: date
 *                         example: 1990-01-01
 *                       file:
 *                         type: file
 *                         example: aadhar.pdf
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */












router.post('/upload',upload.single('file'),checkToken,uploadFile)
// endpoint to get all documents
router.get('/',checkToken,getAllFiles)
// endpoint to get all the docs of specific employee
router.post('/empdocs',checkToken,getAllFilesById)
// endpoint to get document by id
router.get('/:id',checkToken,getFileById)



module.exports=router