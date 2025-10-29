function PaymentHistoryItem({ payment }: { payment: any }) {
  return (
    <tr>
      <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
      <td>{payment.amount}</td>
      <td>{payment.status}</td>
      <td>{payment.razorpay_payment_id}</td>
    </tr>
  );
}

export default PaymentHistoryItem;
