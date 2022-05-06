import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetail(serviceId);
  const [user] = useAuthState(auth);
  // const [user] = useAuthState
  // const [user, setUser] = useState({
  //     name: 'Akber The Great',
  //     email: 'akber@momo.taj',
  //     address: 'Tajmohol Road Md.pur',
  //     phone: '0171111111',
  // })
  // const handelAddressChange = (e) => {

  //     const { address, ...rest } = user;
  //     const newAddress = e.target.value;
  //     const newUser = {address : newAddress, ...rest };

  //     console.log(address,rest);
  //     setUser(newUser)

  // }
  const handelOrder = (e) => {
    e.preventDefault();
    const order = {
      service: service.name,
      serviceId: serviceId,
      address: e.target.address.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
    };
    axios
      .post('https://infinite-spire-22635.herokuapp.com/order', order)
      .then((res) => {
        const { data } = res;
        if (data.insertedId) {
          toast('Your Order is booked');
          e.target.reset();
        }
      });
  };
  return (
    <div className="w-50 mx-auto">
      <h2>Please Order: {service.name}</h2>
      <form onSubmit={handelOrder}>
        <input
          className="mb-2 w-100"
          type="text"
          name="name"
          placeholder="name"
          value={user?.displayName}
          readOnly
          required
        />
        <br />
        <input
          className="mb-2 w-100"
          type="email"
          name="email"
          placeholder="email"
          value={user?.email}
          readOnly
          required
        />
        <br />
        <input
          className="mb-2 w-100"
          type="text"
          name="service"
          placeholder="service"
          value={service.name}
          readOnly
          required
        />
        <br />
        <input
          className="mb-2 w-100"
          type="text"
          name="address"
          placeholder="address"
          required
        />
        <br />
        <input
          className="mb-2 w-100"
          type="text"
          name="phone"
          placeholder="phone"
          required
        />
        <br />
        <input className="btn btn-primary" type="submit" value="Place Order" />
      </form>
    </div>
  );
};

export default Checkout;
