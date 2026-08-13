import React from 'react';
import Navbar from '../../components/header/Navbar';
import Footer from '../../components/footer/Footer';
import Appointment from '../../components/appointment/Appointment';

const Bookings = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Appointment></Appointment>

            <Footer></Footer>
            
        </div>
    );
};

export default Bookings;