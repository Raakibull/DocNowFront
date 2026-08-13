import React from 'react';
import Navbar from '../../components/header/Navbar';
import Footer from '../../components/footer/Footer';

const Blogs = () => {
    return (
        <div>
            <Navbar></Navbar>

            <div className="j-exb text-4xl text-center mt-6">Blogs</div>
            <div className="j-m text-xl text-center opacity-60 mt-3 ">Frequently asked question about uss</div>
            <div className="">
                <div className="bg-white mx-40 my-10 rounded-3xl p-4 max-[555px]:mx-0">
                    <div className="j-b text-2xl pb-2 "> How can I book a doctor appointment through DocNow?

                    </div>
                    <div className=" j-m text-[16px] border-t-2 border-dashed p-5"><span className='text-blue-600 '>Answer :</span>Booking an appointment is easy with DocNow. Simply search for a doctor based on specialty or location, choose a convenient time, and confirm your appointment online. You'll receive a confirmation immediately.

                    </div>
                    <div className="">

                    </div>

                </div>

                <div className="bg-white mx-40 my-10 rounded-3xl p-4 max-[555px]:mx-0">
                    <div className="j-b text-2xl pb-2 ">Is DocNow free to use?

                    </div>
                    <div className=" j-m text-[16px] border-t-2 border-dashed p-5"><span className='text-blue-600 '>Answer :</span>Yes! Searching for doctors and booking appointments through DocNow is completely free for patients. There are no hidden charges.

                    </div>
                    <div className="">

                    </div>

                </div>

                <div className="bg-white mx-40 my-10 rounded-3xl p-4 max-[555px]:mx-0">
                    <div className="j-b text-2xl pb-2 "> Can I book same-day appointments?

                    </div>
                    <div className=" j-m text-[16px] border-t-2 border-dashed p-5"><span className='text-blue-600 '>Answer :</span>Absolutely. Many doctors on DocNow offer same-day or next-day appointments. Simply filter your search to find doctors with immediate availability.
                    </div>
                    <div className="">

                    </div>

                </div>

                <div className="bg-white mx-40 my-10 rounded-3xl p-4 max-[555px]:mx-0">
                    <div className="j-b text-2xl pb-2 ">Are the doctors on DocNow verified?

                    </div>
                    <div className=" j-m text-[16px] border-t-2 border-dashed p-5"><span className='text-blue-600 '>Answer :</span> Yes, every doctor listed on DocNow is verified for credentials, experience, and patient reviews to ensure you receive the highest quality care.

                    </div>
                    <div className="">

                    </div>

                </div>

                <div className="bg-white mx-40 my-10 rounded-3xl p-4 max-[555px]:mx-0">
                    <div className="j-b text-2xl pb-2 ">Is my personal information safe with DocNow?

                    </div>
                    <div className=" j-m text-[16px] border-t-2 border-dashed p-5"><span className='text-blue-600 '>Answer :</span>We take your privacy very seriously. All your information is encrypted and protected following strict security standards.
                    </div>
                    <div className="">

                    </div>

                </div>



            </div>


            <Footer></Footer>
        </div>
    );
};

export default Blogs;