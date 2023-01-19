import 'express-async-errors'
import expres from "express"
import morgan from 'morgan'


const app  = expres()
const port = process.env.PORT || 5000


import dotenv from 'dotenv'
dotenv.config()


// middleWAre//
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"

// db and authentication user//
import connectDB from "./dbfolder/connect.js"

// routes//
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'


/// morgan//
if(process.env.NODE_ENV !== 'production'){
  app.use(morgan('dev'))
}

app.get('/',(req,res) => {
  res.json({msg : "Welcome"})
})

app.get('/api/v1',(req,res) => {
    res.json({msg : "API"})
})

app.use(expres.json())

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',jobsRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware)

const start = async() =>{
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port,() => {
        console.log(`Serving in listening in port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()


