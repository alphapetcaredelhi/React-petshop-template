// Daniel da Rocha Fróes 10255956
// Gabriel Santos Nicolau 10684600
// Kaio Tadeu Rodrigues 7561083
import React from 'react';
import axios from 'axios';

import './AdminInventoryConsult.scss';
import './AdminInventoryConsult2.scss';

import ProductCardInventory from '../../components/ProductCardInventory/ProductCardInventory';
import { SERVER_URL } from '../../variables';

export default class AdminRegisterServices extends React.Component {
  constructor() {
    super();
    this.state = {
        allproducts: []
    };
    this.fetchProducts();
  }

  //Requisição para pegar os produtos do servidor
  fetchProducts = async () => {
    let res = await axios({
        method: 'GET',
        url: `${SERVER_URL}/products`
    });

    this.setState({
        allproducts: res.data
    });
  }

  render() {
  return (
    <div class="admin-inventory-consult">
      <div class="banner " id="catalog">
        <div id="product-grid" class="column">
            <h2>Products Catalog</h2>
            <div class="columns is-multiline">
                {this.state.allproducts.map((product, index) => {
                    return (
                        <div class="column is-one-third">
                            <ProductCardInventory product={product} key={index} />
                        </div>
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  );
  }
}