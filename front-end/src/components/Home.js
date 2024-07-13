import React from 'react'
import Nav from './nav'

export default function Home() {
  return (
    <div>
            <div className='full w-screen h-screen bg-[#0f0f0f] flex'>
                 <Nav />
                <div className='w-[80vw] h-[100vh]'>
                    <div className='h-[40%] w-[100%]   flex '>
                        <div className='w-[70%]  h-[100%] content-end '>
                            <div className='text-7xl text-white m-10 ' >Discover </div>
                            <div className='flex  m-10 ' >
                                <div className='inline-block text-white m-6 ml-0 opacity-50  ' >Popular</div>
                                <div className='inline-block text-white m-6 ml-0 opacity-50  ' >Popular</div>
                                <div className='inline-block text-white m-6 ml-0 opacity-50  ' >Popular</div>
                                <div className='inline-block text-white m-6 ml-0 opacity-50  ' >Popular</div>
                                <div className='inline-block text-white m-6 ml-0 opacity-50  ' >Popular</div>
                                <div className='inline-block text-white m-6 ml-0 opacity-50  ' >Popular</div>
                            </div>
                        </div>
                        <div className='text-white flex ml-[10%] mt-[5%]  ' >
                            <div className='w-[60px] h-[60px] border rounded-[50%] flex justify-center items-center  '   > 
                            <i class="fa-solid fa-user text-4xl "></i>
                            </div>
                            <div className=' h-[60px] flex flex-col justify-evenly items-center ml-4 '>
                                <p>Shivam</p>
                                <p>India</p>
                            </div>
                        </div>
                    </div>
                    <div className=' h-[60%] flex w-[100%]   '>
                    <div  className='w-[28%] border h-[88%] rounded-2xl m-8 flex  flex-col  items-center '   >
                        <div  className='box1 border w-[50%] h-[40%] mt-3 rounded-xl '></div>
                        <div className='border w-[80%] h-[50%] m-4'></div>
                    </div>
                    <div  className='w-[28%] border h-[88%] rounded-2xl m-8 flex flex-col   items-center'   >
                    <div  className='box1 border w-[50%] h-[40%] mt-3 rounded-xl '></div>
                    <div className='border w-[80%] h-[50%] m-4'></div>

                    </div>
                    <div  className='w-[28%] border h-[88%] rounded-2xl m-8 flex  flex-col  items-center'   >
                    <div  className='box1 border w-[50%] h-[40%] mt-3 rounded-xl '></div>
                    <div className='border w-[80%] h-[50%] m-4'></div>

                    </div>
                    </div>
                </div>
            </div>

    </div>
  )
}
