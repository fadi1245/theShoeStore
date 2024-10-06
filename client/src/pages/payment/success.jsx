import React from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { Link } from 'react-router-dom'

export default function Success() {
  return (
    <div>
      <Navbar/>
      <h1>Thankyou!</h1>
      <p>We are getting started on you order right and you will recieve an order conformation email shortly to you email. In the meantime , explore the latest fashion get get inspied </p>
      <Link to={'/products'}><button>BACK TO SHOP</button></Link>
      <Footer/>
    </div>
  )
}
