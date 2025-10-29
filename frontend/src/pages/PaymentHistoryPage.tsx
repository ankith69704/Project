import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyPayments, reset } from '../store/paymentSlice';
import { RootState, AppDispatch } from '../store/store';
import PaymentHistoryItem from '../components/PaymentHistoryItem';

function PaymentHistoryPage() {
  const { payments, isLoading, isError, message } = useSelector(
    (state: RootState) => state.payments
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getMyPayments());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <section className='heading'>
        <h1>Payment History</h1>
      </section>
      <section className='content'>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <PaymentHistoryItem key={payment._id} payment={payment} />
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default PaymentHistoryPage;
