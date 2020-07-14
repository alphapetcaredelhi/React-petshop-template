import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

// Importing pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Cart from './pages/Cart/Cart';
import MyAccount from './pages/MyAccount/MyAccount';
import Register from './pages/Register/Register';
import Calendar from './pages/Calendar/Calendar';
import PetDetails from './pages/PetDetails/PetDetails';
import Payment from './pages/Payment/Payment';
import AddPet from './pages/AddPet/AddPet';
import ChangeAccountInfo from './pages/ChangeAccountInfo/ChangeAccountInfo';
import AdminActions from './pages/AdminActions/AdminActions';
import Catalog from './pages/Catalog/Catalog';
import Product from './pages/Product/Product';

// Importing Components
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';

export default class App extends React.Component {
  render() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/myaccount' component={MyAccount} /> 
        <Route path='/login' component={Login} /> 
        <Route path='/cart' component={Cart} /> 
        <Route path='/register' component={Register} /> 
        <Route path='/calendar' component={Calendar} /> 
        <Route path='/petdetails' component={PetDetails} /> 
        <Route path='/payment' component={Payment} /> 
        <Route path='/addpet' component={AddPet} /> 
        <Route path='/changeaccountinfo' component={ChangeAccountInfo} /> 
        <Route path='/admin' component={AdminActions} /> 
        <Route exact path='/catalog' component={Catalog} /> 
        {/* <Route exact path='/catalog/product' component={Product} />  */}
        <Route path='/catalog/product/:productslug' component={Product} /> 
      </Switch>
      <Footer />
    </div>
  );
  }
}

//Nested routes --> https://ui.dev/react-router-v4-nested-routes/