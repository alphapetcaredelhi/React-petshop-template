// Daniel da Rocha Fróes 10255956
// Gabriel Santos Nicolau 10684600
// Kaio Tadeu Rodrigues 7561083
import React from 'react';
import axios from 'axios';

import './EarningsScreen.scss';
import '../AdminInventoryConsult/AdminInventoryConsult2.scss';

import ProductCardEarnings from '../../components/ProductCardEarnings/ProductCardEarnings';
import ServiceCardEarnings from '../../components/ServiceCardEarnings/ServiceCardEarnings';
import { SERVER_URL } from '../../variables';

export default class EarningsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      filteredOrders: [],
      filteredServices: [],
      totalProfit: 0
    };

    this.fetchOrders();
    this.fetchServices();
  }

  //Junta a quantidade  dos produtos iguais comprados pelos usuários
  filterOrders = async (orders) => {
    let filteredOrders = [];
    orders.forEach((order, index) => {
      order.items.forEach((item, index) => {
        if (item === null || item === undefined || item.product === null || item.product === undefined) return;
        let indexPosition = this.indexOfObjAttr(filteredOrders, 'productid', item.product._id);
        if (indexPosition !== -1) {
          //If it's inside the array
          filteredOrders[indexPosition].quantity += item.quantity;
        } else {
          //If it isn't in the array yet
          let newFilteredOrder = {
            productid: item.product._id,
            quantity: item.quantity,
            title: item.product.title,
            price: item.product.price,
            img: item.product.img
          };
          filteredOrders.push(newFilteredOrder);
        }
      });
    });
    return filteredOrders;
  }
  //Junta a quantidade  dos serviços iguais comprados pelos usuários
  filterServices = (services) => {
    let filteredServices = [];
    services
    .filter((service, index) => {
      if (service.paid === true) return service;
    })
    .forEach((service, index) => {
      let indexPosition = this.indexOfObjAttr(filteredServices, 'type', service.type);
      if (indexPosition !== -1) {
        filteredServices[indexPosition].quantity += 1;
        filteredServices[indexPosition].totalProfit += service.price;
      } else {
        let newFilteredService = {
          type: service.type,
          img: service.img,
          totalProfit: service.price,
          quantity: 1,
        };
        filteredServices.push(newFilteredService);
      }
    });
    return filteredServices;
  }

  //Requisição para pegar itens que foram comprados
  fetchOrders = async () => {
    const res = await axios({
        method: 'GET',
        url: `${SERVER_URL}/orders`
    });

    const filteredOrders = await this.filterOrders(res.data);
    await this.setState({filteredOrders: filteredOrders});
    this.calculateTotalProfit();
  }

  //requisição para pegar os serviços
  fetchServices = async () => {
    const res = await axios({
      method: 'GET',
      url: `${SERVER_URL}/services`
    });

    const filteredServices = await this.filterServices(res.data);
    await this.setState({filteredServices: filteredServices});
    this.calculateTotalProfit();
  }

  indexOfObjAttr = (array, attr, value) => {
    for(let i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1; //There is no such element
  }

  calculateTotalProfit = () => {
    let sum = 0;
    this.state.filteredOrders.forEach((item, index) => {
      sum += item.quantity * item.price
    });
    this.state.filteredServices.forEach((item, index) => [
      sum += item.totalProfit
    ]);
    this.setState({
      totalProfit: sum
    });
  }

  render() {
  return (
    <div class="admin-inventory-consult">
      <div class="banner " id="catalog">
        <div id="product-grid" class="column">
            <h2>Total Products Sold: {this.state.filteredOrders.length}</h2>
            <div class="columns is-multiline">
                {this.state.filteredOrders.map((order, index) => {
                    return (
                        <div class="column is-one-fifth">
                            <ProductCardEarnings product={order} key={index} />
                        </div>
                    );
                })}
            </div>
            <h2>Total Services Sold: {this.state.filteredServices.length}</h2>
            <div class="columns is-multiline">
                {this.state.filteredServices.map((service, index) => {
                    return (
                        <div class="column is-one-fifth">
                            <ServiceCardEarnings service={service} key={index} />
                        </div>
                    );
                })}
            </div>
            <h2>Total Profit: R$ {(this.state.totalProfit.toFixed(2))}</h2>
        </div>
      </div>
    </div>
  );
  }
}