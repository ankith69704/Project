import axios from 'axios';

const API_URL = '/api/v1/payments/';

// Create new payment order
const createOrder = async (orderData: any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + 'order', orderData, config);
  return response.data;
};

// Get my payments
const getMyPayments = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'mypayments', config);
  return response.data;
};

const paymentService = {
  createOrder,
  getMyPayments,
};

export default paymentService;
