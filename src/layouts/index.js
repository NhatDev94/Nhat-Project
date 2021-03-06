import React from 'react'
import Pages from '../pages'

const Layout = () => {

    return (
        <div className=''>
            <div className='w-full h-20 bg-gray-200'>Header</div>
            <div className='main w-full h-screen flex'>
                <div className='w-[320px] border-r border-black/10 py-10'>Side Bar</div>
                <div className='w-full p-5'>
                    <Pages />
                </div>
            </div>
            <div className=' w-full h-20 bg-gray-200'>Footer</div>
        </div>
    )
}

export default Layout