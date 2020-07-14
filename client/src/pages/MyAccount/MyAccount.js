import React from 'react';
import { Link } from 'react-router-dom';

import './MyAccount.css';

import neopets4 from '../../images/neopets-pngs-4.png';
import neopets6 from '../../images/neopets-pngs-6.png';
import neopets2 from '../../images/neopets-pngs-2.png';
import shoopingCart from '../../images/shopping_cart.png';
import neopets1 from '../../images/neopets-pngs-1.png';

export default class MyAccount extends React.Component {
    render() {
  return (
    <div class="wrapper">
        {/* <!-- Schedule time banner --> */}
        <Link class="catalog_link" to='/calendar'>
            <div id="section-time">
                <img src={neopets4} alt="cute animal picture"/>
                <p>Schedule time</p>
                <img src={neopets6} alt="cute animal picture"/>
            </div>
        </Link>
        <hr />
        {/* <!-- Product catalog banner --> */}
        <Link class="catalog_link" to="/catalog">
            <div id="section-catalog">
                <img src={neopets2} alt="dog holding shopping cart"/>
                <p>Check out our product catalog</p>
                <img id="shopping_cart" src={shoopingCart} alt="dog holding shopping cart"/>
            </div>
        </Link>
        <hr />

        {/* <!-- List and egister new pet--> */}
        <div id="section-double">
            <Link class="catalog_link" to='/addpet'>
                <div id="uActSect-newpet">
                    <p> Add new pet</p>
                </div>
            </Link>

            <Link class="catalog_link" to='/petdetails'>
                <div id="uActSect_petlisting">
                    <p>Your pets</p>
                </div>
            </Link>

        </div>
        <hr />
        {/* <!-- Edit your contact info--> */}
        <Link class="catalog_link" to="/changeaccountinfo">
            <div id="uActSect-editContact">
                <img src={neopets1} alt="dog holding shopping cart"/>
                <p>Change your contact info</p>
            </div>
        </Link>


    </div>
  );
    }
}