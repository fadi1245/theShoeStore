import Carousel from 'react-bootstrap/Carousel';
import cr from '../components/styles/carousel.module.css'
import shoe1 from '../components/componentsassets/blazer.png'
import shoe2 from '../components/componentsassets/air2.png'
import shoe3 from '../components/componentsassets/jordan.png'
function Slider() {
  return (
    <Carousel>
      <Carousel.Item interval={1000} className={cr.main}>
      <div className={cr.Carousel}>
      <img className={cr.shoeimage} src={shoe1} alt="" />
        <h1 className={cr.shoename}> Nike Blazer Mid '77 Vintage</h1>
        <button className={cr.shoebutton}>Buy now</button>
      </div>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      <div className={cr.Carousel}>
      <img className={cr.shoeimage} src={shoe2} alt="" />
        <h1 className={cr.shoename}> Nike Air Force 1 '07 EasyOn</h1>
        <button className={cr.shoebutton}>Buy now</button>
      </div>
     <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <div className={cr.Carousel}>
      <img className={cr.shoeimage} src={shoe3} alt="" />
        <h1 className={cr.shoename}> Air Jordan 1 Zoom CMFT 2</h1>
        <button className={cr.shoebutton}>Buy now</button>
      </div>
      <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;