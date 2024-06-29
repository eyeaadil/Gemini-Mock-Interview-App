"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
// import React from 'react'

const Header = () => {
    const path = usePathname();

    useEffect(()=>{
        // console.log(path)
    },[])
  return (
    <div className='flex p-4 items-center justify-between shadow-md bg-white'>
        <Image src='/interview-logo-Photoroom.png' width={60} height={70} alt='Logo' />
        <ul className='flex gap-12'>

          <Link href={'/dashboard'}>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard'&& 'text-primary font-bold'}`}>Dashboard</li>
          </Link>


            {/* <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>Questions</li> */}
            {/* <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>upgrade</li> */}
            {/* <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>How it works?</li> */}
        </ul>
        
        <UserButton className='h-96'/>
    </div>
  )
}

export default Header