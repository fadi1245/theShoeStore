import React from 'react'
import fr from '../components/styles/footer.module.css'
import { Box } from '@mui/material'
import logo from '../assets/logo.png'
import x from '../components/componentsassets/twitter.png'
import insta from '../components/componentsassets/instagram.png'
import googleplay from '../components/componentsassets/google-play.png'
export default function Footer() {
  return (
    <div>
      <div className={fr.firstline}></div>
      <div>
        <Box className={fr.box}>
            <div className={fr.leftside}>
                <img className={fr.logoo} src={logo} alt="" />
                <br />
                <button>Shop now</button>
                <div className={fr.links}>
                    <img src={x} alt="" />
                    <img src={insta} alt="" />
                    <img src={googleplay} alt="" />
                </div>
            </div>
            <div className={fr.rightside}>
              <div>
                <p className={fr.head}>Company</p>
                <p>Career</p>
                <p>Blogs</p>
                <p>Pricing</p>
              </div>
              <div>
                <p className={fr.head}>Resources</p>
                <p>Documentation</p>
                <p>papers</p>
              </div>
              <div>
                <p className={fr.head}>Legal</p>
                <p>Terms and services</p>
                <p>Privacy policy</p>
                <p>Cookies</p>
                <p>Data processing</p>
              </div>
            </div>
        </Box>
      </div>
      <div className={fr.final}>
      2024 THE SHOE STORE Inc . All rights is reserved
      </div>
    </div>
  )
}
