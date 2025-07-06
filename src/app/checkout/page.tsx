'use client';
import { useEffect, useState } from 'react';
import { apiServices } from '@/service/apiService';
import Script from 'next/script';

export default function CheckoutPage() {
  const [orderId, setOrderId] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // apiServices().createRazorpayOrder()
    //   .then(res => {
    //     setOrderId(res.data.razorpayOrderId);
    //     setAmount(res.data.amount);
    //   })
    //   .finally(() => setLoading(false));
  }, []);

  const handlePayment = () => {
    if (!orderId) return;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      amount: amount.toString(),
      currency: 'INR',
      name: 'Modtif',
      description: 'Purchase Items',
      order_id: orderId,
      handler: async function (response: any) {
        // await apiServices().verifyPayment({
        //   orderId: options.order_id,
        //   paymentId: response.razorpay_payment_id,
        //   signature: response.razorpay_signature,
        // });
        window.location.href = '/order/success';
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      theme: {
        color: '#000',
      },
    };
    const rp = new (window as any).Razorpay(options);
    rp.open();
  };

  if (loading) return <p className="text-center py-10">Preparing payment …</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="max-w-md mx-auto bg-gray-50 p-6 rounded shadow">
        <p className="mb-4">Amount to pay:</p>
        <div className="text-2xl font-semibold">${(amount / 100).toFixed(2)}</div>
        <button
          onClick={handlePayment}
          className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Pay with Razorpay
        </button>
      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
}
