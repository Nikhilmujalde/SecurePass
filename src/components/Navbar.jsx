import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 '>
      <div className="container flex justify-between items-center  px-4 h-16 w-full  text-white">

        <div className="logo font-bold  text-2xl">
          <span className='text-green-400'>&lt;</span>
          <span className=''>Secure</span>
          <span className='text-green-400'>Pass/&gt;</span>
        </div>
        <button className='flex w-18 justify-between gap-4 items-center'>
          <span>GitHub</span>
          <img className='w-8 invert' src="/icons/github.svg" alt="" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
