import React from 'react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/header/Navbar';
import DocBook from '../../components/Docbook/DocBook';


const Bookdoc = () => {
    return (
        <div>
            <Navbar></Navbar>
            <DocBook></DocBook>
            <Footer></Footer>
        </div>
    );
}

export default Bookdoc;