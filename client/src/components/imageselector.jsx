import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import ir from '../components/styles/imgselector.module.css'
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function Imageselector({imgone, imgtwo , imgthree}) {
  const [mainimg, setMainimg]=useState(imgone)


  useEffect(() => {
    setMainimg(imgone)  // Update mainimg when imgone changes
  }, [imgone])

  const changeimg = (image) => {
    setMainimg(image)
  }
  return (
    <div>
      <Box className={ir.mainbox}>
        <div className={ir.thumbnailgroup}>
            <img src={imgone} alt=""  className={ir.thumbnails} onClick={()=>changeimg(imgone)} />
            <br />
            <img src={imgtwo} alt="" className={ir.thumbnails} onClick={()=>changeimg(imgtwo)}  />
            <br />
            <img src={imgthree} alt="" className={ir.thumbnails}  onClick={()=>changeimg(imgthree)} />
        </div>
        <div className={ir.mainimgcontainer}>
          <Zoom >
            <img src={mainimg}  className={`${ir.mainimage} ${ir['img-fluid']}`} alt="" />
            </Zoom>
        </div>
      </Box>
    </div>
  )
}
