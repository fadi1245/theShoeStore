import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Card, Col, Container, Row } from 'react-bootstrap';
import pr from '../productpage/product.module.css';
import Filter from '../../components/filter';
import { Link } from 'react-router-dom';
import { Cartstate } from '../../context/context';

export default function Productpage() {
  // Accessing global state from context
  const { state, dispatch } = Cartstate();

  console.log(state.products); // This should log the products

  return (
    <div>
      <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <Navbar />
      </div>
      <div style={{ display: 'flex', marginTop: '150px' }}>
        <div className={pr.leftside}>
          <Filter />
        </div>
        <div className={pr.rigthside}>
          <Container fluid className='mb-3'>
            <Row>
              {state.products.map((product) => (
                <Col key={product._id}>
                  <Link to={`/shopage/${product._id}`} className={pr.atag}>
                    <Card className={pr.card}>
                      <Card.Img variant='top' src={product.productimgone}></Card.Img>
                      <Card.Body>
                        <Card.Title>{product.productname}</Card.Title>
                        <Card.Text>{product.productprice}</Card.Text>
                        {/* <button
                          className={pr.button}
                          onClick={() => {
                            dispatch({
                              type: 'ADD_TO_CART',
                              payload: product,
                            });
                          }}
                        >
                          Add to cart
                        </button> */}
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
      <div className={pr.rigthside}>
        <Footer />
      </div>
    </div>
  );
}
