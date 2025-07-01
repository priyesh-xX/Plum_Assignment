import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

function CancelPage() {
  useEffect(() => {
    toast.error("❌ Payment cancelled. You can try again.");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="text-xl">You cancelled the payment. Try again anytime!</div>
    </div>
  );
}

export default CancelPage;
