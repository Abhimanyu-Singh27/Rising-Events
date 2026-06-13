
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err))

const feedbackSchema = new mongoose.Schema({
  name: String,
  eventType: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Feedback = mongoose.model('Feedback', feedbackSchema)

app.get("/", (req, res) => {
  res.send("Rising Events backend is running")
})

app.get('/api/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 })
    res.json(feedbacks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch feedback' })
  }
})

app.post('/api/feedback', async (req, res) => {
  try {
    const { name, eventType, message } = req.body

    if (!name || !message) {
      return res.status(400).json({ error: 'Name and feedback are required' })
    }

    const feedback = await Feedback.create({
      name,
      eventType: eventType || 'Event',
      message
    })

    res.json({ ok: true, feedback })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to save feedback' })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Rising Events backend running on port ${PORT}`)
})