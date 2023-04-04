const express=require('express')
const app=express()
const sql=require('mysql2')
const employeeRouter=require('./api/employees/employees.router')
const leavesRouter=require('./api/leaves/leaves.router')
const documentsRouter=require('./api/documents/documents.router')
const payslipRouter=require('./api/payslips/payslips.router')

require('dotenv').config()
const { setupPayslipCronJob } = require('./api/payslips/payslipcron')
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))



// middlewares
app.use(express.json())
app.use(express.urlencoded())

// test endpoint
app.get('/api',(req,res)=>{
    res.json({success:1,message:'Data form the api'})
})

// using employee router
app.use('/api/employees',employeeRouter)
// using leaves router
app.use('/api/leaves',leavesRouter)
// using documents router
app.use('/api/documents',documentsRouter)
// using payslips router
app.use('/api/payslips',payslipRouter)

// method which calls cron job
setupPayslipCronJob()


const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
      info: {
        title: 'Razor payroll rest api',
        version: '1.0.0',
        description: 'Documentation for Rest API',
      },
    },
    apis: ['./api/**/*.js'],
    servers: [
        {
          url: 'http://localhost:4200',
          description: 'Development server',
        },
      ],
  };

  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// listening to server
app.listen(
    process.env.APP_PORT,()=>{console.log(`server is running at port ${process.env.APP_PORT}`)

}
)