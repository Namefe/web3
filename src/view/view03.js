import React from 'react'

const View03 = () => {
  return (
    <section id="section03" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + '/board.jpg'})`,
      // backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat : 'no-repeat',
      position: 'relative',
    }} className="w-screen h-[300vh]">

    </section>
  )
}

export default View03