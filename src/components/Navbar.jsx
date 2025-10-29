import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 '>
        <div className='flex justify-around items-centre p-4 h-14'>

        <div className="logo font-bold text-white text-2xl">
            <span className='text-green-500'> &lt;</span>
            <span>Pass</span><span className='text-green-700'>OP/&gt;</span>
        </div>
        <ul>
            {/* <li className='text-white flex gap-4'>
                <a className="hover:font-bold" href="/">Home</a>
                <a className="hover:font-bold" href="#">About</a>
                <a className="hover:font-bold" href="#">Contact</a>
            </li> */}
        </ul>
        <button className='text-white bg-green-700 rounded-full flex justify-between item-center ring-white ring-1'>
          <img className='invert px-2' src="icons/github.jpeg" alt="github logo" />
          <span className="font-bold px-2"> Github</span>
        </button>
        </div>
    </nav>
  )
}

export default Navbar
