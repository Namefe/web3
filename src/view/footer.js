import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full h-auto bg-black text-white flex items-center justify-between'>
      <div className='flex flex-col items-center justify-center'>
        <div>
          <img/>
        </div>
        <div className='flex gap-10'>
          <h3>CONTACT</h3>
          <p>어쩌고 저쩌고</p>
        </div>
        <div className='flex gap-10'>
          <h3>LOCATION</h3>
          <p>어쩌고 저쩌고</p>
        </div>
        <div className='flex gap-10'>
          <h3>E-MAIL</h3>
          <p>어쩌고 저쩌고</p>
        </div>
      </div>
      <div>
        <span>© 2023 Your Company. All rights reserved.</span>
        <div>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer