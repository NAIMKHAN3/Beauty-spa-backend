import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './router'
import errorHandler, { notfoundandler } from './middleware/errorHandler'

const app: Application = express()

app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({
    success: true,
    message: 'Beauty Spa Server is Running'
  })
})
app.use('/api/v1', router)

app.use(notfoundandler)
app.use(errorHandler)


export default app
