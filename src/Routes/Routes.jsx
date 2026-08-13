import React from 'react';

import {
    createBrowserRouter,
    
  } from "react-router";

  import root from '../pages/root/roott';
  import DocDetail from '../pages/doctor/DocDetail';
  import Bookings from '../pages/bookings/Bookings';
  import Blogs from '../pages/Blogs/Blogs';
  import AdminDashboard from '../pages/admin/AdminDashboard';
  import error from '../pages/erorr/erorr'



  
  
  
export const router = createBrowserRouter([
    {path: '/',Component:root},
    { path:'/doctor/:id',  Component: DocDetail     },
    { path:'/Bookings',    Component:Bookings       },
    { path:'/Blogs',       Component:Blogs          },
    { path:'/admin',       Component:AdminDashboard },
    { path:'/*',           Component:error          },

    


    
  ]);
  ``