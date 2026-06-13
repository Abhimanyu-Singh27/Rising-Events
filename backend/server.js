import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

dotenv.config()
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())
const feedbackFile = path.join(__dirname, 'feedback.json')

function readFeedback() {
  if (!fs.existsSync(feedbackFile)) return []
  return JSON.parse(fs.readFileSync(feedbackFile, 'utf8'))
}

function saveFeedback(feedbacks) {
  fs.writeFileSync(feedbackFile, JSON.stringify(feedbacks, null, 2))
}
app.get("/", (req, res) => {
  res.send("Rising Events backend is running")
})

app.get('/api/feedback', (req, res) => {
  res.json(readFeedback())
})

app.post('/api/feedback', (req, res) => {
  const { name, eventType, message } = req.body

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and feedback are required' })
  }

  const feedbacks = readFeedback()

  const newFeedback = {
    id: Date.now(),
    name,
    eventType: eventType || 'Event',
    message,
    createdAt: new Date().toISOString()
  }

  feedbacks.unshift(newFeedback)
  saveFeedback(feedbacks)

  res.json({ ok: true, feedback: newFeedback })
})

app.post('/api/contact', async (req, res) => {
  const { name, phone, eventType, eventDate, message } = req.body || {}
  if (!name || !phone || !message) return res.status(400).json({ error: 'Name, phone and message are required' })

  const enquiry = `
New event enquiry

Name: ${name}
Phone: ${phone}
Event Type: ${eventType || 'Not specified'}
Event Date: ${eventDate || 'Not specified'}

Message:
${message}
`

  try {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      })
      await transporter.sendMail({
        from: process.env.FROM_EMAIL || process.env.SMTP_USER,
        to: process.env.TO_EMAIL || process.env.SMTP_USER,
        subject: `New enquiry from ${name}`,
        text: enquiry
      })
    } else {
      console.log(enquiry)
    }
    res.json({ ok: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Email sending failed' })
  }
})

// const frontendDist = path.join(__dirname, '../frontend/dist')
// app.use(express.static(frontendDist))
// app.get('*', (req, res) => res.sendFile(path.join(frontendDist, 'index.html')))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Rising Events backend running on port ${PORT}`))
