import React from 'react';
import { NavLink } from 'react-router';

const erorr = () => {
    return (
        <div className='text-center'>
            <div className="j-b text-[250px] text-red-400  ">404</div>
            <div className="">You are navigating in to wrong page</div>
            <NavLink 
            to='/'>
            <div className="btn  bg-red-400 p-5 mt-5 j-b text-[15px] text-white">Click to go main page</div>
            </NavLink>
        </div>
    );
};

export default erorr;