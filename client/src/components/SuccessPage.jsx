import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function SuccessPage() {
  const navigate = useNavigate();
  const toastShown = useRef(false); // 🔒 Ensures toast is shown only once

  useEffect(() => {
    if (!toastShown.current) {
      toast.success("✅ Payment successful! Redirecting to home...");
      toastShown.current = true;
    }

    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="text-xl">⏳ Please wait...</div>
    </div>
  );
}

export default SuccessPage;
