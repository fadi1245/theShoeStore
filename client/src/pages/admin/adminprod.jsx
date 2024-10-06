import React from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { Cartstate } from '../../context/context'
import ar from '../admin/adminprod.module.css'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function Adminprod() {
  const {state, dispatch} = Cartstate();
  const navigate = useNavigate()

  const deleteproduct = (productid)=>{
    axios.delete(`http://localhost:7000/product/deletprod/${productid}`).then(res=>{
      alert ("product deleted")
    })
    .catch(err=>{
      console.log("error",err)
      alert("product deleting failed")
    })
  }



  return (
    <div>
      <Navbar/>
      <div>
        <div className={ar.topdiv}>
          <div style={{display:'flex'}}>
          <input type="search" />
          <button> Search</button>
          </div>
          <div>
         <Link to={'/addprod'}> <button>Add product</button></Link>
          </div>
        </div>
        <TableContainer component={Paper}>
            <Table sx={{minWidth:650}}>
                <TableHead>
                  <TableRow>
                    <TableCell>Product name</TableCell>
                    <TableCell>Product Price</TableCell>
                    <TableCell>Product brand</TableCell>
                    <TableCell>Product desc</TableCell>
                    <TableCell>Product img1</TableCell>
                    <TableCell>Product img2</TableCell>
                    <TableCell>Product img3</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {state.products.map((product)=>(
                  <TableRow key={product._id}>
                   <TableCell>{product.productname}</TableCell>
                   <TableCell>{product.productprice}</TableCell>
                   <TableCell>{product.productbrand}</TableCell>
                   <TableCell>{product.productdescription}</TableCell>
                   <TableCell><img className={ar.images} src={product.productimgone} alt="" /></TableCell>
                   <TableCell><img className={ar.images} src={product.productimgtwo} alt="" /></TableCell>
                   <TableCell><img className={ar.images}   src={product.productimgthree} alt="" /></TableCell>
                   <TableCell><Link to={`/editprod/${product._id}`}><button className={ar.editbutton}>EDIT</button></Link><button className={ar.deletebutton} onClick={()=>{deleteproduct(product._id)}}>DELETE</button></TableCell>
                  </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
      </div>
      <Footer/>
    </div>
  )
}
