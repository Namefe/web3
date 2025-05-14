import React from 'react'

const Header = () => {
  return (
<header className='w-full h-16 bg-transparent flex items-center justify-between px-6'>
  {/* 왼쪽: 로고 */}
  <div>
    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" className='w-[100px] h-[60px]' />
  </div>

  {/* 오른쪽: 메뉴 */}
  <div className='flex gap-20 mr-8 text-black'>

<a href="#" class="relative inline-block group">
  ABOUT
  <svg class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full group-hover:opacity-100 opacity-0 transition-opacity duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40">
    <path class="path" fill="none" stroke="#F9E200" stroke-width="2" d="M30,20 A10,10 0 1,1 90,20 A10,10 0 1,1 30,20" />
  </svg>
</a>
    <div>
<a href="#" class="relative inline-block group">
  CONTACT

  <svg class="w-10 h-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <circle cx="12" cy="12" r="10" stroke="#F9E200" stroke-width="2" 
      stroke-dasharray="62.8" stroke-dashoffset="62.8" class="circle-path"/>
  </svg>
</a>
    </div>
  </div>
</header>

  )
}

export default Header