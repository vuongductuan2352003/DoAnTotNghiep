import React from 'react'
import Footer from '../components/Footer'
import HeaderAdd from '../components/HeaderAdd'
function AddDataLayout({ children }) {
  return (
    <div>
    <HeaderAdd/>
    { children }
 
    </div>
  )
}

export default AddDataLayout