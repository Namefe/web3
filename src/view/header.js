import React from 'react'

const Header = () => {
  return (
<header className="fixed top-0 left-0 w-full h-[80px] z-50 bg-transparent flex items-center justify-between px-6">
  {/* 왼쪽: 로고 */}
  <div>
    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" className='w-[100px] h-[60px]' />
  </div>

  {/* 오른쪽: 메뉴 */}
  <div className='flex gap-20 mr-8 text-black'>

<a href="#" className="relative text-white font-bold text-[25px] inline-block group">
  ABOUT
</a>

<a href="#" className="relative text-white font-bold text-[25px] inline-block group">
  CONTACT

</a>
    </div>

</header>

  )
}

export default Header