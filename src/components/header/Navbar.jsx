import React from 'react';
import logo from '../material/logo.png'
import { Link } from 'react-router';
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        
        <nav className="mx-40 flex  place-content-between my-6 max-[555px]:mx-0 ">
            <div className=" flex gap-2.5">
                <img src={logo} alt="" />
                <div className=" text-4xl j-exb j-exb ">DocNow</div>
                

            </div>
            <div className=" flex gap-[50px]">

            <NavLink
  to="/"
  end
  className={({ isActive }) =>
    `text-xl j-m items-center pt-3 max-[555px]:hidden  ${isActive ? 'text-blue-600  j-exb rounded-3xl p-1' : 'opacity-60'}`
  }
>
  Home
</NavLink >

                
<NavLink
  to="/Bookings"
  className={({ isActive }) =>
    `text-xl j-m items-center pt-3 max-[555px]:hidden ${isActive ? 'text-blue-600  j-exb rounded-3xl p-1' : 'opacity-60'}`
  }
>
  My-Bookings
</NavLink>

<NavLink
  to="/Blogs"
  className={({ isActive }) =>
    `text-xl j-m items-center pt-3 max-[555px]:hidden ${isActive ? 'text-blue-600  j-exb rounded-3xl p-1' : 'opacity-60'}`
  }
>
  Blogs
</NavLink>
                <div className="text-xl j-m items-center pt-3 opacity-60 max-[555px]:hidden">Contact Us</div>

            </div>
            <button className="btn btn-primary bg-[#176AE5] py-[15px] px-[30px] text-xl rounded-3xl j-b mt-2">Emergency</button>
            
        </nav>
    );
};

export default Navbar;
