import React, { useState } from 'react';
// import mtnLogo from '../../assets/images/mtn.jpeg';  // Replace with actual path
// import orangeLogo from '../../assets/images/orange.jpeg'; // Replace with actual path
import logo from "../../../assets/images/headphone-5-svgrepo-com.svg";
import Swal from 'sweetalert2';

export const MakePayment = () => {
  const [receiverNumber, setReceiverNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [senderNumber, setSenderNumber] = useState('');
  const [payFees, setPayFees] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Payment made successfully!',
      text:(`Payment of ${amount} to ${receiverNumber} processed!`),
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  return (
    <div className="flex justify-center items-center h-[90vh] bg-[whitesmoke]">
      <div className="flex w-full max-w-6xl p-8 bg-[#FEF9F8] rounded-lg shadow-2xl">
        <div className="flex-1">
          <img src={logo} alt="Logo" className="h-8 mb-4" />
          <span className='text-black text-lg font-bold'>GlobalSpeak</span>
          <h2 className="text-2xl font-bold text-black text-center mb-4">OM ⇄ MOMO</h2>
          <p className="text-center text-[rgba(239,146,115,1)] mb-4">Pay your team with ease</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="receiverNumber" className="block text-black text-sm font-medium">Receiver phone number</label>
              <div className="flex items-center border border-[#BEBEBE] rounded-md bg-white">
                <input
                  type="tel"
                  id="receiverNumber"
                  value={receiverNumber}
                  onChange={(e) => setReceiverNumber(e.target.value)}
                  placeholder="786076544"
                  required
                  className="mt-1 block w-full bg-transparent p-3 text-black placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm text-black font-medium">Amount (Franc CFA)</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="500"
                required
                className="mt-1 block w-full border border-[#BEBEBE] rounded-md bg-white p-3 text-black placeholder-gray-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="payFees"
                checked={payFees}
                onChange={() => setPayFees(!payFees)}
                className="mr-2"
              />
              <label htmlFor="payFees" className="text-sm text-black">I pay the cash-out fees</label>
            </div>

            <div>
              <label htmlFor="senderNumber" className="block text-sm font-medium">Sender phone number</label>
              <input
                type="tel"
                id="senderNumber"
                value={senderNumber}
                onChange={(e) => setSenderNumber(e.target.value)}
                placeholder="656690000"
                required
                className="mt-1 block w-full border border-[#BEBEBE] rounded-md bg-white p-3 text-black placeholder-gray-400 focus:outline-none"
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3 px-4 text-white font-semibold bg-[rgba(239,146,115,1)] rounded-md hover:bg-[rgba(240,148,118,1)] transition duration-200"
            >
              Next
            </button>
          </form>
        </div>

        {/* Right Side Image */}
        {/* <div className="flex items-center justify-center">
          <img src={orangeLogo} alt="Orange Money Logo" className="w-32 mx-auto" />
        </div> */}
      </div>
    </div>
  );
};



export default MakePayment;