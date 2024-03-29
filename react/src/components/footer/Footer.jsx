import React from 'react'

const Footer = () => {
  return (
    <footer className=' text-gray-6k 00 p-20 grid grid-cols-1 '>
    <div className=" grid grid-cols-4 justify-items-center">
      <div className="contact-info">
        <h4>Contact Us</h4>
        <ul>
            
        <li>123 Main Street, City, Country</li>
        <li>Email: info@example.com</li>
        <li>Phone: +1 (555) 123-4567</li>
        </ul>
      </div>
      
      <div className="quick-links">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#providers">Providers</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </div>
      
      <div className="legal-info">
        <h4>Legal</h4>
        <ul>
          <li><a href="#terms">Terms of Service</a></li>
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><a href="#disclaimer">Disclaimer</a></li>
        </ul>
      </div>
      
      <div className="social-media">
        <h4>Connect With Us</h4>
        <ul>
            <li>

        <a href="#" target="_blank" title="Follow us on Facebook"><img src="" alt="Facebook"/></a>
            </li>
            <li>

        <a href="#" target="_blank" title="Follow us on Twitter"><img src="" alt="Twitter"/></a>

            </li>
        </ul>
      </div>
    </div>
    
    <div className=''>
      <h4 className='mb-5 text-orange-400'>Subscribe to Our Newsletter</h4>
      <form action="#" method="post">
        <input type="email" name="email" placeholder="Your email address" required className='p-2 rounded-l-md w-[400px]'/>
        <button type="submit" className=' bg-orange-600 text-white p-2 w-[200px] rounded-r-lg'>SUBSCRIBE</button>
      </form>
    </div>
  
    <div className='mt-8'>
      <p className='text-center'>&copy; 2023 Your Company. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer