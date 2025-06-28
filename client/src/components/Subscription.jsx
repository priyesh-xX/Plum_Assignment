import React from 'react';

function Subscriptions() {
  const plans = [
    {
      name: "Basic",
      price: "₹10/mo",
      features: ["Basic access", "Limited Categories", "Community support", "Quaterly Newsletter"],
      highlight: false,
    },
    {
      name: "Pro",
      price: "₹99/mo",
      features: ["Unlimited topics", "Detailed analytics", "Priority support", "Monthly Newsletter"],
      highlight: true,
    },
    {
      name: "Elite",
      price: "₹199/mo",
      features: ["Everything in Pro", "1-on-1 mentorship", "Early feature access", "Monthly Newsletter"],
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 px-6">
      <h1 className="text-4xl font-bold text-center py-7 mb-10">Choose Your Plan</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl border shadow-lg transition-transform transform hover:scale-105 ${
              plan.highlight
                ? 'bg-purple-800 border-purple-500'
                : 'bg-gray-800 border-gray-600'
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">{plan.name}</h2>
            <p className="text-center text-yellow-400 text-xl font-semibold mb-6">{plan.price}</p>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-gray-200 flex items-center gap-2">
                  ✅ {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2 rounded font-semibold ${
                plan.highlight
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                  : 'bg-purple-700 hover:bg-purple-600'
              }`}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;
