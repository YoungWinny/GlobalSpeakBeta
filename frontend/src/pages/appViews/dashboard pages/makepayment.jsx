import React, { useState } from 'react';
import Swal from 'sweetalert2';
import logo from "../../../assets/images/headphone-5-svgrepo-com.svg";

export const MakePayment = () => {
  const [formData, setFormData] = useState({
    receiverNumber: '',
    amount: '',
    senderNumber: '',
    payFees: false,
    network: 'mtn' // Default network
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      Swal.fire({
        title: 'Payment Successful!',
        html: `<div class="text-center">
                <p class="mb-2">You have successfully sent</p>
                <p class="text-2xl font-bold">${formData.amount} FCFA</p>
                <p class="mt-2">to ${formData.receiverNumber}</p>
              </div>`,
        icon: 'success',
        confirmButtonText: 'Done',
        confirmButtonColor: '#EF9273',
        customClass: {
          popup: 'rounded-lg shadow-xl'
        }
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Left Side - Form */}
          <div className="w-full p-8">
            <div className="flex items-center mb-6">
              <img src={logo} alt="GlobalSpeak Logo" className="h-8 mr-3" />
              <span className="text-xl font-bold text-gray-800">GlobalSpeak</span>
            </div>
            
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800">Mobile Money Transfer</h2>
              <p className="text-orange-400 mt-1">Pay your team with ease</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Network Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Network</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.network === 'mtn' ? 'border-orange-400 bg-orange-50' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input
                      type="radio"
                      name="network"
                      value="mtn"
                      checked={formData.network === 'mtn'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="font-medium">MTN Mobile Money</span>
                  </label>
                  <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${formData.network === 'orange' ? 'border-orange-400 bg-orange-50' : 'border-gray-300 hover:border-gray-400'}`}>
                    <input
                      type="radio"
                      name="network"
                      value="orange"
                      checked={formData.network === 'orange'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="font-medium">Orange Money</span>
                  </label>
                </div>
              </div>

              {/* Receiver Number */}
              <div>
                <label htmlFor="receiverNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Receiver's Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">+237</span>
                  </div>
                  <input
                    type="tel"
                    id="receiverNumber"
                    name="receiverNumber"
                    value={formData.receiverNumber}
                    onChange={handleChange}
                    placeholder="6XX XXX XXX"
                    required
                    className="block w-full pl-16 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (FCFA)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0"
                    min="100"
                    step="100"
                    required
                    className="block w-full pl-12 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-colors"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">FCFA</span>
                  </div>
                </div>
              </div>

              {/* Fees Option */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="payFees"
                  name="payFees"
                  checked={formData.payFees}
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-400 focus:ring-orange-400 border-gray-300 rounded"
                />
                <label htmlFor="payFees" className="ml-2 block text-sm text-gray-700">
                  I will pay the transaction fees
                </label>
              </div>

              {/* Sender Number */}
              <div>
                <label htmlFor="senderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">+237</span>
                  </div>
                  <input
                    type="tel"
                    id="senderNumber"
                    name="senderNumber"
                    value={formData.senderNumber}
                    onChange={handleChange}
                    placeholder="6XX XXX XXX"
                    required
                    className="block w-full pl-16 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;