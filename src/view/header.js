import React from 'react'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-[100px] z-[9999] bg-transparent flex items-center justify-between px-6">
      <div>
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" className="w-[50px] sm:w-[65px] md:w-[80px] lg:w-[100px] xl:w-[120px] 2xl:w-[150px]
          h-[40px] sm:h-[50px] md:h-[60px] lg:h-[70px] xl:h-[85px] 2xl:h-[100px]" />
                </div>

                <div className="flex gap-4 2xl:gap-20 mr-2 2xl:mr-8 text-black">
                  <a href="#" className="relative inline-block group text-white font-fowell text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] xl:text-[22px] 2xl:text-[25px]
          ">
          ABOUT
          <svg
            className="absolute top-1/2 left-1/2 max-w-[150px] max-h-[60px] w-full h-full -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            viewBox="0 0 168 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M135.61 47.9067C98.8453 47.9067 62.0871 47.3795 26.9771 37.9677C17.3669 35.3915 3.01122 30.611 2.03958 21.5912C0.716281 9.30688 32.9449 6.37061 42.9847 5.17945C73.9175 1.50944 106.31 1.42382 137.51 2.88038C144.271 3.19606 157.935 3.05207 164.11 6.66521C168.821 9.42111 163.497 15.3923 161.402 17.4863C141.435 37.4716 102.892 45.0244 71.8647 49.6045C55.7226 51.9873 39.1895 53 22.7496 53"
              stroke="#F9E200"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="999"
              strokeDashoffset="999"
              className="group-hover:animate-PathDraw"
            />
          </svg>
        </a>

        <a href="#" className="relative inline-block group text-white font-fowell text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] xl:text-[22px] 2xl:text-[25px]
">
          CONTACT
          <svg
            className="absolute top-1/2 left-1/2 w-full h-[100%] -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            viewBox="0 0 168 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M135.61 47.9067C98.8453 47.9067 62.0871 47.3795 26.9771 37.9677C17.3669 35.3915 3.01122 30.611 2.03958 21.5912C0.716281 9.30688 32.9449 6.37061 42.9847 5.17945C73.9175 1.50944 106.31 1.42382 137.51 2.88038C144.271 3.19606 157.935 3.05207 164.11 6.66521C168.821 9.42111 163.497 15.3923 161.402 17.4863C141.435 37.4716 102.892 45.0244 71.8647 49.6045C55.7226 51.9873 39.1895 53 22.7496 53"
              stroke="#F9E200"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="999"
              strokeDashoffset="999"
              className="group-hover:animate-PathDraw"
            />
          </svg>
        </a>
      </div>
    </header>
  )
}

export default Header
