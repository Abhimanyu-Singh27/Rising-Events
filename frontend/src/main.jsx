import emailjs from '@emailjs/browser'
import { FaWhatsapp, FaInstagram } from "react-icons/fa6";
import React from 'react'
import { createRoot } from 'react-dom/client'
import { User,Phone, Mail, MapPin, Instagram, MessageCircle, Send, Sparkles, Clock, Gem, Palette, PartyPopper, ChevronUp } from 'lucide-react'
import './styles.css'
import bgImage from "./assets/bg_gallery/sample-1.png";
import logo from './assets/logo.png'
import logo_img from './assets/logo_img.png'
import img2 from './assets/gallery/sample-2.png'
import img3 from './assets/gallery/sample-3.png'
import img4 from './assets/gallery/sample-4.png'
import img5 from './assets/gallery/sample-5.png'
import img6 from './assets/gallery/sample-6.png'
import img7 from './assets/gallery/sample-7.png'
import img8 from './assets/gallery/sample-8.png'
import img9 from './assets/gallery/sample-9.png'
import img10 from './assets/gallery/sample-10.png'


const EMAILJS_SERVICE_ID = 'service_u1zgucd' 
const EMAILJS_TEMPLATE_ID = 'template_6fyv819' 
const EMAILJS_PUBLIC_KEY = '8OwvOF5n0zanpIAis' 
const photos = Object.values(
  import.meta.glob('./assets/gallery/*.{png,jpg,jpeg,webp,JPG,JPEG,PNG,WEBP,HEIC}', {
    eager: true,
    import: 'default'
  })
)
const business = {
  name: 'Rising Events',
  tagline: 'Luxury event decoration crafted for unforgettable celebrations',
  phone: '+91 8824949675',
  whatsapp: '+91 8824949675',
  email: 'rising.events.27@gmail.com',
  address: 'Shekhawati Nagar VKI Area Jaipur',
  city: 'Jaipur'
}

const services = [
  ['Wedding Decoration', 'Elegant mandap, stage, entry walkway, floral and lighting decoration for beautiful wedding celebrations.', img3],
  ['Birthday Decoration', 'Theme-based balloon decoration, cake table setup, photo backdrop and kids party decoration.', img4],
  ['Stage Decoration', 'Premium stage setups with flowers, drapes, lights, seating and customized backdrops.', img5],
  ['Balloon Decoration', 'Stylish balloon arches, wall backdrops, ring setups and indoor/outdoor party decoration.', img8],
  ['Venue Entrance Decoration', 'Fresh and artificial flower styling for entrances, tables, stages, mandaps and photo corners.', img2],
  ['Corporate Event Decoration', 'Professional decoration for seminars, launches, office parties and corporate celebrations.', img6],
  ['Engagement Decoration', 'Romantic engagement stage, ring ceremony backdrop and couple seating decoration.', img7],
  ['Custom Theme Decoration', 'Fully customized decoration according to your theme, venue, color and budget.', img9]
]

function scrollToId(id){ document.getElementById(id)?.scrollIntoView({behavior:'smooth'}) }


function Header(){
  const [open, setOpen] = React.useState(false)

  return <header className="header">
    <div className="logo_div">
    <a className="brand" href="#home">
      <div><span className="logo">
        <img src={logo} alt="Rising Events Logo" className="header-logo" />
        </span></div>
      <span>{business.name}</span>
    </a>
      <span className="logo_signature">Crafting Moments, Creating Memories</span>
</div>
    <button className="menuBtn" onClick={() => setOpen(!open)}>
      ☰
    </button>

    <nav id="navbar" className={open ? "navMenu open" : "navMenu"}>
      {['Home','About','Services','Gallery','Featured','Contact'].map(x => 
        <a key={x} href={'#'+x.toLowerCase()} onClick={() => setOpen(false)}>
          {x}
        </a>
      )}
    </nav>

   <button className="goldBtn bookBtn" onClick={()=>scrollToId('contact')}>
  <span className="desktopText">Book Consult</span>
  <span className="mobileText">Book</span>
</button>
  </header>
}
function Hero(){
  return <section id="home" className="hero" style={{backgroundImage:`linear-gradient(90deg, rgba(0,0,0,.82), rgba(0,0,0,.38)), url(${bgImage})`}}>
    <div className="heroContent">
      <p className="eyebrow">Luxury Event Decoration Studio</p>
      <h1>{business.name}<br/><em>designed to impress.</em></h1>
      <p className="heroText">{business.tagline}</p>
      <div className="heroBtns">
        <button className="goldBtn big" onClick={()=>scrollToId('gallery')}>View Our Decorations</button>
        <button className="darkBtn big" onClick={()=>scrollToId('contact')}>Contact Us</button>
      </div>
    </div>
  </section>
}

function About(){
  return <section id="about" className="section aboutGrid">
    <div>
      <p className="eyebrow">About The Studio</p>
      <h2>Crafted moments,<br/><em>designed to linger.</em></h2>
      <p className="lead">At {business.name}, we design elegant and memorable decorations for weddings, birthdays, engagements, baby showers, corporate events and private celebrations.</p>
      <p>From intimate family functions to grand celebrations, every detail is carefully planned — flowers, lighting, fabric, stage, seating and theme styling — to create a beautiful experience your guests will remember.</p>
      <div className="stats">
        <b>500+<span>Events Designed</span></b>
        <b>7+<span>Years Experience</span></b>
        <b>5+<span>Cities Served</span></b>
        <b>100%<span>On-Time Setup</span></b>
      </div>
    </div>
    <div className="aboutImages"><img src={img2}/><img src={img10}/></div>
  </section>
}

function Services(){
  return <section id="services" className="section">
    <div className="splitTitle"><div><p className="eyebrow">What We Design</p><h2>Decoration services,<br/><em>tailored end-to-end.</em></h2></div><p>Signature service lines customized to your venue, theme and budget.</p></div>
    <div className="serviceGrid">
      {services.map((s,i)=><article className="serviceCard" key={s[0]}>
        <span className="num">{String(i+1).padStart(2,'0')}</span><img src={s[2]} alt={s[0]}/><h3>{s[0]}</h3><p>{s[1]}</p>
      </article>)}
    </div>
  </section>
}


function Gallery(){
  const [showAllGallery, setShowAllGallery] = React.useState(false)
  const visiblePhotos = showAllGallery ? photos : photos.slice(0, 6)
  const [selectedImage, setSelectedImage] = React.useState(null)

  return <section id="gallery" className="section">
    <div className="splitTitle">
      <div>
        <p className="eyebrow">Portfolio</p>
        <h2>A gallery of<br/><em>recent celebrations.</em></h2>
      </div>
      <p>Browse selected work from real events.</p>
    </div>

    <div className="galleryGrid">
      {visiblePhotos.map((p,i)=>
        // <img key={i} src={p} alt={`Rising Events decoration work ${i+1}`}/>
        <img
  key={i}
  src={p}
  alt={`Rising Events decoration work ${i+1}`}
  onClick={() => setSelectedImage(p)}
/>
      )}
    </div>

    {photos.length > 6 && (
      <button className="goldBtn showBtn" onClick={() => setShowAllGallery(!showAllGallery)}>
        {showAllGallery ? 'Show Less' : 'Show More'}
      </button>
    )}
   {selectedImage && (
  <div className="lightbox" onClick={() => setSelectedImage(null)}>
    <button className="lightboxClose">×</button>
    <img
      src={selectedImage}
      alt="Selected decoration"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
)}
  </section>
}

function Featured(){
  const items = [
    ['Signature Wedding','A graceful wedding setup with premium lighting, floral design and luxurious seating.', img3],
    ['Stage Spectacle','A grand stage decoration created for beautiful photography and memorable ceremonies.', img5],
    ['Floral Couture','A refined floral backdrop with soft lights and elegant theme styling.', img7]
  ]
  return <section id="featured" className="section">
    <p className="eyebrow">Featured Work</p><h2>Designs we love most.</h2>
    <div className="featuredList">{items.map((it,i)=><div className="feature" key={it[0]}>
      <img src={it[2]}/><div><span className="num">0{i+1} / 03</span><h3>{it[0]}</h3><p>{it[1]}</p><button className="linkBtn" onClick={()=>scrollToId('contact')}>Enquire ↗</button></div>
    </div>)}</div>
  </section>
}


function Testimonials(){
  const defaultReviews = [
    {
      name: 'Ayush Singh',
      eventType: 'Wedding',
      message: 'The decoration was beautiful and exactly as we wanted. The setup was completed on time and looked premium.'
    },
    {
      name: 'Srishti Singh',
      eventType: 'Birthday',
      message: 'Our birthday event looked amazing. The balloon and backdrop decoration made the celebration special.'
    },
    {
      name: 'Karna Singh',
      eventType: 'Corporate Event',
      message: 'Very professional team. They handled the entire decoration with great finishing and attention to detail.'
    }
  ]

  const [reviews, setReviews] = React.useState(defaultReviews)

const [showAllReviews, setShowAllReviews] = React.useState(false)
const [feedbackStatus, setFeedbackStatus] = React.useState('')
const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3)

  React.useEffect(() => {
    fetch('https://rising-events.onrender.com/api/feedback')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews([...data, ...defaultReviews])
        }
      })
      .catch(() => {})
  }, [])

  async function submitFeedback(e){
    e.preventDefault()
    setFeedbackStatus('Submitting...')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch('https://rising-events.onrender.com/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await res.json()

      if (res.ok && result.ok) {
        setReviews([result.feedback, ...reviews])
        setFeedbackStatus('Thank you! Your feedback has been added.')
        form.reset()
      } else {
        setFeedbackStatus('Could not add feedback. Please try again.')
      }
    } catch (err) {
      setFeedbackStatus('Could not connect to server.')
    }
  }

  return <section className="section testimonials">
    <p className="eyebrow">Kind Words</p>
    <h2>From hosts who<br/><em>trusted us.</em></h2>




  <div className="reviewGrid">
  {visibleReviews.map((r, i) =>
    <article className="review" key={r.id || i}>
      <b>”</b>
      <p>“{r.message}”</p>
      <h4>{r.name}</h4>
      <span>{r.eventType}</span>
    </article>
  )}
</div>

{reviews.length > 3 && (
  <button
    className="goldBtn showBtn"
    onClick={() => setShowAllReviews(!showAllReviews)}
  >
    {showAllReviews ? 'Show Less' : 'Show More'}
  </button>
)}

    <form className="feedbackForm" onSubmit={submitFeedback}>
      <h3>Share Your Feedback</h3>
      <input name="name" placeholder="Your Name" required />
      <input name="eventType" placeholder="Event Type, e.g. Wedding / Birthday" />
      <textarea name="message" placeholder="Write your feedback here..." required></textarea>
      <button className="goldBtn" type="submit">Submit Feedback</button>
      <p className="status">{feedbackStatus}</p>
    </form>
  </section>
}

function WhyChoose(){
  const points = [['Creative Decoration Ideas',Sparkles],['Professional Setup',PartyPopper],['Affordable Packages',Gem],['On-Time Delivery',Clock],['Customized Themes',Palette],['High-Quality Materials',Gem]]
  return <section className="section why">
    <p className="eyebrow">Why Choose Us</p><h2>Six reasons clients<br/><em>stay with us.</em></h2>
    <p>We treat every event like a private commission — planned carefully, decorated beautifully and delivered on time.</p>
    <div className="whyGrid">{points.map(([t,Icon],i)=><div className="whyItem" key={t}><Icon size={20}/><span>{String(i+1).padStart(2,'0')}</span><h3>{t}</h3></div>)}</div>
  </section>
}

function Contact(){
  const [status,setStatus]=React.useState('')

async function submit(e) {
  e.preventDefault()
  setStatus('Sending...')

  const form = e.currentTarget
  const data = Object.fromEntries(new FormData(form).entries())

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        name: data.name,
        phone: data.phone,
        event_type: data.eventType,
        event_date: data.eventDate,
        message: data.message
      },
      EMAILJS_PUBLIC_KEY
    )

    setStatus('Thank you! Your enquiry has been sent successfully.')
    form.reset()
  } catch (err) {
    console.error(err)
    setStatus('Sorry, enquiry was not sent. Please contact us on WhatsApp.')
  }
}
  return <section id="contact" className="section contact">
    <p className="eyebrow">Begin Your Event</p><h2>Let's design<br/><em>something timeless.</em></h2>
    <p>Tell us about your event. We will respond with a tailored proposal.</p>
    <div className="contactGrid">
      <div className="contactInfo">
        <p><User/> <span><small>Founder</small>Abhimanyu Singh</span></p>
        <p><Phone/> <span><small>Phone</small>{business.phone}</span></p>
        <p><Mail/> <span><small>Email</small>{business.email}</span></p>
        <p><MapPin/> <span><small>Studio</small>{business.address}</span></p>
        <p><MessageCircle/> <span><small>WhatsApp</small>{business.whatsapp}</span></p>
      </div>
      <form onSubmit={submit} className="form">
        <input name="name" placeholder="Your full name" required />
        <input name="phone" placeholder="WhatsApp Number" required />
        <select name="eventType" required><option value="">Select event type</option>{services.map(s=><option key={s[0]}>{s[0]}</option>)}</select>
        <input name="eventDate" type="date" />
        <textarea name="message" placeholder="Tell us about venue, theme, guest count and budget..." required></textarea>
        <button className="goldBtn" type="submit">Send Enquiry <Send size={16}/></button>
        <p className="status">{status}</p>
      </form>
    </div>
  </section>
}


function Footer() {
  return (
    <footer className="footer">
      <div className="footerclass">

        <div className="footer-brand">
          <img src={logo_img} alt="Rising Events Logo" className="footer-logo" />
          <h3>{business.name}</h3>
          <p>A luxury event decoration studio crafting unforgettable celebrations.
            <p className="footer-text">We Plan, You Celebrate</p>
          </p>
        </div>

        <div className="footer-nav-class">
          <div>
            <h4>Navigate</h4>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#gallery">Gallery</a>
            <a href="#contact">Contact</a>
          </div>

          <div>
            <h4>Services</h4>
            {services.slice(0, 6).map((s) => (
              <a href="#services" key={s[0]}>{s[0]}</a>
            ))}
          </div>
        </div>

      </div>

      <p className="copy">© 2026 {business.name}. All rights reserved.</p>
    </footer>
  );
}
function App(){
  const wa = business.whatsapp.replace(/\D/g,'') || '918824949675'
  React.useEffect(() => {
  fetch("https://rising-events.onrender.com")
    .catch(() => {})
}, [])
  return <><Header/><Hero/><About/><Services/><Gallery/><Featured/><Testimonials/><WhyChoose/><Contact/><Footer/>
    <a className="whatsapp" href={`https://wa.me/${wa}?text=Hello%20Rising%20Events,%20I%20want%20event%20decoration%20details`} target="_blank" rel="noreferrer"><FaWhatsapp size={27} /></a>
    <a
  className="instagram"
  href="https://www.instagram.com/abhii_manyu__"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaInstagram size={40} />
</a>
    <button className="top" onClick={()=>scrollToId('home')}><ChevronUp/></button>
  </>
}

createRoot(document.getElementById('root')).render(<App />)



export default App;