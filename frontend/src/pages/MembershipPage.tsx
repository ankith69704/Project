import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder, reset } from '../store/paymentSlice';
import { RootState, AppDispatch } from '../store/store';
import { toast } from 'react-toastify';

declare const Razorpay: any;

function MembershipPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { order, isError, message } = useSelector(
    (state: RootState) => state.payments
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (order) {
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Rotary Club of Calicut South',
        description: 'Membership Fee',
        order_id: order.id,
        handler: function (response: any) {
          const form = document.getElementById('razorpay-form') as HTMLFormElement;
          (document.getElementById('razorpay_payment_id') as HTMLInputElement).value = response.razorpay_payment_id;
          (document.getElementById('razorpay_order_id') as HTMLInputElement).value = response.razorpay_order_id;
          (document.getElementById('razorpay_signature') as HTMLInputElement).value = response.razorpay_signature;
          form.submit();
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: '#3399cc',
        },
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
    }

    return () => {
      dispatch(reset());
    };
  }, [order, isError, message, dispatch, user]);

  const onPay = () => {
    const orderData = {
      amount: 5000, // Example amount
      currency: 'INR',
      receipt: 'receipt#1',
    };
    dispatch(createOrder(orderData));
  };

  return (
    <>
      <section className='heading'>
        <h1>Membership</h1>
        <p>Manage your membership</p>
      </section>
      <section className='content'>
        <h2>Membership Status: {user.membershipStatus}</h2>
        <p>Last Payment Date: {new Date(user.lastPaymentDate).toLocaleDateString()}</p>
        <button className='btn' onClick={onPay}>
          Pay Now
        </button>
      </section>
      <form id='razorpay-form' action='/api/v1/payments/verify' method='POST' style={{ display: 'none' }}>
        <input type='hidden' name='razorpay_payment_id' id='razorpay_payment_id' />
        <input type='hidden' name='razorpay_order_id' id='razorpay_order_id' />
        <input type='hidden' name='razorpay_signature' id='razorpay_signature' />
      </form>
    </>
  );
}

export default MembershipPage;
