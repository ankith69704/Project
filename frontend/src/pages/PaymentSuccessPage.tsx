import { useSearchParams } from 'react-router-dom';

function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const referenceNum = searchParams.get('reference');

  return (
    <>
      <section className='heading'>
        <h1>Payment Successful</h1>
      </section>
      <section className='content'>
        <p>Your payment was successful!</p>
        <p>Reference Number: {referenceNum}</p>
      </section>
    </>
  );
}

export default PaymentSuccessPage;
