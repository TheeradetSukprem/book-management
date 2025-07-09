import express from 'express'
import cors from 'cors'
import bookRoutes from './routes/bookRoutes'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use('/api', bookRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})