import Link from 'next/link'
import React from 'react'
import Input from '../controls/Input/Input'
import SearchIcon from '../Icons/SearchIcon'
import ListIcon from '../Icons/ListIcon'

export default function NavBar() {
    return (
        <nav className='sticky top-0 h-16 p-2 bg-zinc-300 border-b border-b-solid border-b-zinc-500 flex justify-between'>
            <div className='px-2.5 bg-zinc-400 text-zinc-800 flex items-center gap-10'>
                Aromas Duty Free Logo
                <Input display='hidden lg:flex' className='w-36 lg:w-48 pl-8' type="text" icon={SearchIcon} />
            </div>
            <div className='hidden lg:flex px-10 lg:px-20 bg-zinc-400 flex justify-between items-center gap-x-10'>
                <Link className='text-zinc-700 hover:text-zinc-800 hover:underline' href={"/fragancias"}>Fragancias</Link>
                <Link className='text-zinc-700 hover:text-zinc-800 hover:underline' href={"/skincare"}>Skincare</Link>
                <Link className='text-zinc-700 hover:text-zinc-800 hover:underline' href={"/bodycare"}>Bodycare</Link>
                <Link className='text-zinc-700 hover:text-zinc-800 hover:underline' href={"/bodycare"}>Otros</Link>
            </div>
            <button style={{width: "48px", height: "48px"}} className='hover:bg-zinc-400 active:bg-zinc-500 flex lg:hidden justify-center items-center'>
                <ListIcon className='fill-zinc-600 hover:fill-zinc-700 active:fill-zinc-800 scale-300'/>
            </button>
        </nav>
    )
}
