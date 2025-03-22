// src/components/ContactSection.tsx
'use client'
import { useState } from 'react'
import SectionHeading from './SectionHeading/SectionHeading'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }



  return (
    <section className="py-20 bg-primary relative overflow-hidden" id="contact">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="_contact-me"
          subtitle="Let's work together"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-fade-in">
            <h3 className="text-2xl font-medium text-white mb-6">Get in Touch</h3>
            <p className="text-primary mb-8">
              I'm currently available for freelance work and open to new opportunities.
              If you have a project that needs some creative work, or if you'd like to discuss
              potential collaborations, feel free to reach out!
            </p>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mr-4 border border-[#1E2D3D]">
                  <svg className="w-5 h-5 text-mint" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="text-primary">mdjobayerarafat@gmail.com</span>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mr-4 border border-[#1E2D3D]">
                  <svg className="w-5 h-5 text-mint" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-primary">Bangladesh</span>
              </div>
            </div>
          </div>

          <div className="bg-secondary rounded-lg border border-[#1E2D3D] p-6 animate-fade-in">
            <h3 className="text-xl font-medium text-white mb-6">Send me a message</h3>

            <form action="https://formsubmit.co/mdjobayerarafat@gmail.com" method="POST" >
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-primary border border-[#1E2D3D] rounded-lg px-4 py-3 text-primary placeholder:text-primary/60 focus:outline-none focus:ring-1 focus:ring-mint/50"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full bg-primary border border-[#1E2D3D] rounded-lg px-4 py-3 text-primary placeholder:text-primary/60 focus:outline-none focus:ring-1 focus:ring-mint/50"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full bg-primary border border-[#1E2D3D] rounded-lg px-4 py-3 text-primary placeholder:text-primary/60 focus:outline-none focus:ring-1 focus:ring-mint/50"
                  required
                />
              </div>

              <div className="mb-5">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Your Message"
                  className="w-full bg-primary border border-[#1E2D3D] rounded-lg px-4 py-3 text-primary placeholder:text-primary/60 focus:outline-none focus:ring-1 focus:ring-mint/50 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center bg-mint text-primary font-medium px-6 py-3 rounded-lg hover:bg-mint/90 transition-colors w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Send Message'}
              </button>


            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection