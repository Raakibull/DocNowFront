import React from 'react';
import doctor from '../material/success-doctor.png'
import review from '../material/success-review.png'
import patient from '../material/success-patients.png'
import staff from '../material/success-staffs.png'

import AnimatedNumber from '../AnimatedNumber/AnimatedNumber'

const Foot = () => {
    return (
        <section className=''>
            <div className="j-exb text-[40px] text-center mt-10 mb-2">We Provide Best Medical Services</div>
            <div className="j-r text-[16px] opacity-60 text-center mb-10">Our platform connects you with verified, experienced doctors across various specialties — all at your convenience. </div>
           
           <div className="flex justify-center mb-20 mt-5">
            <div className="stats stats-vertical lg:stats-horizontal shadow flex gap-6  items-center max-[555px]:inline max-[555px]:mx-20 ">
  <div className="stat bg-white p-8 rounded-2xl">
    <img className='w-[64px] h-[64px] mb-4' src={doctor} alt="" />
    <div className="stat-value j-exb text-6xl mb-4"><AnimatedNumber target={199}/></div>
    <div className="stat-desc text-black j-b text-2xl opacity-55">Total Doctors</div>
  </div>

  <div className="stat bg-white p-8 rounded-2xl max-[555px]:mt-2">
    <img className='w-[64px] h-[64px] mb-4' src={review} alt="" />
    <div className="stat-value j-exb text-6xl mb-4"><AnimatedNumber target={467}/></div>
    <div className="stat-desc text-black j-b text-2xl opacity-55">Total Reviews</div>
  </div>

  <div className="stat bg-white p-8 rounded-2xl max-[555px]:mt-2">
    <img className='w-[64px] h-[64px] mb-4' src={patient} alt="" />
    <div className="stat-value j-exb text-6xl mb-4"><AnimatedNumber target={1900}/></div>
    <div className="stat-desc text-black j-b text-2xl opacity-55">Patients</div>
  </div>

  <div className="stat bg-white p-8 rounded-2xl max-[555px]:mt-2">
    <img className='w-[64px] h-[64px] mb-4' src={staff} alt="" />
    <div className="stat-value j-exb text-6xl mb-4"><AnimatedNumber target={300}/></div>
    <div className="stat-desc text-black j-b text-2xl opacity-55">Total Stuffs</div>
  </div>
            </div>
            </div>


        </section>
    );
};

export default Foot;