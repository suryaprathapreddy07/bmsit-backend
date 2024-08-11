const express=require('express')
const app=express()
const employeeRouter=require('./api/users/users.router')
const documentsRouter=require('./api/documents/documents.router')
const clubsRouter=require('./api/clubs/clubs.router')
const connectDB = require('./config/database');

require('dotenv').config()
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
app.use('/api/users',employeeRouter)
// using documents router
app.use('/api/documents',documentsRouter)
// using clubs router
app.use('/api/clubs',clubsRouter)



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

// connecting to database
connectDB();

// listening to server
app.listen(
    process.env.APP_PORT,()=>{console.log(`server is running at port ${process.env.APP_PORT}`)

}
)