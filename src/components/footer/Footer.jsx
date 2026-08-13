import React from 'react';
import logo from '../material/logo.png'
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className=' flex flex-col gap-11 items-center py-25 bg-white mt-2'>
            <div className=" flex gap-2.5">
                            <img className='w-11 h-11' src={logo} alt="" />
                            <div className=" text-3xl j-exb j-exb ">DocNow</div>
            
                        </div>


            <div className=" flex gap-7 ">
                
            <NavLink
  to="/"
  end
  className={({ isActive }) =>
    `text-xl j-m items-center mt-3  ${isActive ? 'text-blue-600  j-exb rounded-3xl p-1' : 'opacity-60'}`
  }
>
  Home
</NavLink>

<NavLink
  to="/bookings"
  className={({ isActive }) =>
    `text-xl j-m items-center pt-3 ${isActive ? 'text-blue-600  j-exb rounded-3xl p-1' : 'opacity-60'}`
  }
>
  My-Bookings
</NavLink>

<NavLink
  to="/Blogs"
  className={({ isActive }) =>
    `text-xl j-m items-center pt-3 ${isActive ? 'text-blue-600  j-exb rounded-3xl p-1' : 'opacity-60'}`
  }
>
  Blogs
</NavLink>
                <div className="text-xl j-m items-center pt-3 opacity-60">Contact Us</div>



            </div>
            <div className=" flex"> 
                <a href="https://youtu.be/xvFZjo5PgG0?si=Z78GP-05zFcpo2C2 "   target="_blank">
                <img className='w-9 h-9' src="https://static.vecteezy.com/system/resources/thumbnails/023/986/704/small_2x/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png" alt="" /></a>


                <a href="https://github.com/Raakibull "   target="_blank">
                <img className='w-9 h-9' src="https://static.vecteezy.com/system/resources/previews/046/437/248/non_2x/github-logo-transparent-background-free-png.png" alt="" /></a>

                <a href="https://www.instagram.com/rakiibul_?igsh=MWFqejdycDYza2kxbg==
"   target="_blank">
                <img className='w-9 h-9' src="https://static.vecteezy.com/system/resources/previews/023/986/514/non_2x/instagram-logo-instagram-logo-transparent-instagram-icon-transparent-free-free-png.png" alt="" /></a>
                


            </div>


        </footer>
    );
};

export default Footer;