import React from 'react';
import banner from '../material/banner-img-1.png'

const Banner = () => {
    return (
        <div className="relative p-[2px] rounded-xl bg-gradient-to-b from-white to-gray-300 m-12 max-[555px]:m-0">
        <section className=' px-40 bg-gradient-to-b from-gray-300  to-white rounded-xl max-[555px]:px-0'>
            <div className="">
                <div className="j-exb text-5xl text-center pt-16 max-[555px]:text-4xl max-[555px]:pt- ">
                Dependable Care, Backed by Trusted <br className='max-[555px]:hidden'></br> Professionals.
                        
                </div>
                <div className="text-[16px] j-m text-center py-5">  
                Our platform connects you with verified, experienced doctors across various specialties — all at your convenience. Whether it's a <br className='max-[555px]:hidden'></br> routine checkup or urgent consultation, book appointments in minutes and receive quality care you can trust.    
                
                </div> 

            </div>
            <div className=" flex gap-5 justify-center"> 
            <input  type="text" placeholder="Search any doctor.." className="input bg-white rounded-4xl text-[14px] j-m pl-7 w-1/2 max-[555px]:pl-0  max-[555px]:w-full " />   
            <button className="btn btn-primary bg-[#176AE5] py-[15px] px-[30px] text-xl rounded-3xl j-b ">Search Now</button>


            </div>
            <div className=" flex gap-4 justify-center py-12  ">  
                <img src={banner} alt="" />
                <img className='max-[555px]:hidden' src={banner} alt="" />



            </div>




        </section></div>
    );
};

export default Banner;