import React, { useEffect } from 'react'
import Navbar from '../../components/navbar'
import Slider from '../../components/carousel'
import mr from '../mainpage/mainpage.module.css'
import { Grid } from '@mui/material'
import nike from '../mainpage/assets/nike.png'
import adidas from '../mainpage/assets/adidas.png'
import puma from '../mainpage/assets/puma.png'
import clarks from '../mainpage/assets/clarks.png'
import nt from '../mainpage/assets/notwoways.png'
import reebok from '../mainpage/assets/reebok.png'
import sketch from '../mainpage/assets/sketcher.png'
import lee from '../mainpage/assets/leecooper.png'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import logo from '../../assets/logo.png'
import { Col, Container, Row } from 'react-bootstrap'
import top from '../mainpage/assets/topimg.jpg'
import below from '../mainpage/assets/bottomimg.jpg'
import Footer from '../../components/footer'

export default function Mainpage() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: false, // whether animation should happen only once - while scrolling down
      mirror: true, // whether elements should animate out while scrolling past them
    });
  }, []);
  return (
    <div>
      <Navbar/>
      <Slider/>
      <h2 className={mr.uorbrand}>OUR TOP BRANDS</h2>
      <div className={mr.uorbrandline}></div>
      <div style={{marginTop:'50px',marginBottom:'50px'}} data-aos="fade-up" >
      <Grid container rowSpacing={10} columnSpacing={10}> 
      <Grid item xs={3} >
        <div  className={mr.imagecontainer}  title='nike' >
          <img src={nike} alt="" />
        </div>
      </Grid>
      <Grid item xs={3}>
      <div  className={mr.imagecontainer} title='adidas' >
      <img src={adidas} alt="" />
      </div>
      </Grid>
      <Grid item xs={3}>
      <div  className={mr.imagecontainer} title='puma'  >
      <img src={puma} alt="" />
      </div>
      </Grid>
      <Grid item xs={3}>
      <div  className={mr.imagecontainer} title='clarks' >
      <img src={clarks} style={{paddingTop:'30px'}} alt="" />
      </div>
      </Grid>
      <Grid item xs={3}>
      <div  className={mr.imagecontainer}  title='notwoways'>
      <img src={nt} style={{paddingTop:'30px'}} alt="" />
      </div>
      </Grid>
      <Grid  item xs={3}>
      <div  className={mr.imagecontainer} title='reebok' >
      <img src={reebok} style={{paddingTop:'30px'}} alt="" />
      </div>
      </Grid>
      <Grid  item xs={3}>
      <div  className={mr.imagecontainer} title='sketcher'  >
      <img src={sketch} alt="" />
      </div>
      </Grid>
      <Grid  item xs={3}>
      <div  className={mr.imagecontainer} title='leecooper'  >
      <img src={lee} style={{paddingTop:'30px'}} alt="" />
      </div>
      </Grid>
      </Grid>
      </div>
      <div className={mr.secondline}>
      </div>
      <div className={mr.logo}>
      <img src={logo} alt="" />
      </div>
      <div className={mr.banner} data-aos="fade-up"
     data-aos-anchor-placement="top-bottom">

      </div>
      <Container fluid>
        <Row>
          <Col data-aos="fade-right"><p className={mr.para}>Welcome to THE SHOW STORE, your premier 
             destination for sneakers and formal shoes! 
               Our website features an extensive collection 
                  of footwear from the world's most renowned 
                  brands. Whether you're seeking the latest in 
                  trendy sneakers or timeless, elegant formal 
                  shoes, we have something for every occasion 
                  and style. Our curated selection ensures 
                  you'll find the perfect pair to elevate your 
                  wardrobe and meet your needs. Enjoy a 
                  seamless shopping experience, explore the 
                  latest trends, and step confidently into any 
                  setting with THE SHOE STORE. Happy 
                  shopping!</p></Col>
          <Col>
          <Row className={mr.topimage} data-aos="fade-down">
            <img src={top} alt="" />
          </Row>
          <Row className={mr.bottomimg} data-aos="fade-up" >
              <img src={below} alt="" />
          </Row>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  )
}
