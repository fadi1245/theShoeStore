import React from 'react'
import fr from '../components/styles/filter.module.css'
import filter from '../components/componentsassets/filter.png'
import { Accordion } from 'react-bootstrap'
import { Checkbox, FormControlLabel, FormGroup, Select } from '@mui/material'
export default function Filter() {
  return (
    <div>
      <div className={fr.box}>
        <div className={fr.heading}>
            <img src={filter} alt="" />
            <h2>Filter by</h2>
        </div>
        <div>
          <Accordion className='mt-3'>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Price</Accordion.Header>
              <Accordion.Body>
              <FormGroup>
               <FormControlLabel control={<Checkbox />} label="0-500" />
               <FormControlLabel control={<Checkbox />} label="500-1500" />
               <FormControlLabel control={<Checkbox />} label="1500-2500" />
               <FormControlLabel control={<Checkbox />} label="More than 2500" />
               </FormGroup>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Brand</Accordion.Header>
              <Accordion.Body>
                <div className={fr.options}>
                  Nike
                </div>
                <div className={fr.options}>
                  Adidas
                </div>
                <div className={fr.options}>
                  Puma
                </div>
                 <div className={fr.options}>
                  Sketchers
                </div>
                <div className={fr.options}>
                  No2Ways
                </div>
                <div className={fr.options}>
                  Clarks
                </div>
                <div className={fr.options}>
                  Lee Cooper
                </div>
                <div className={fr.options}>
                  Reebok
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div style={{marginTop:'20px'}}>
        <button  className={fr.button}>Apply</button>
        </div>
      </div>
    </div>
  )
}
