import React from 'react';

const FinancerView = ({ requests, sendTokens }) => {
  return (

    <>  
    <div>
      <h3 className='text-black'>Financer View: Release Funds</h3>
    </div>


<div className="overflow-x-auto my-10">
        <table className="min-w-full divide-y-2 divide-black text-sm border-2 border-black rounded-xl">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2  text-gray-900 font-bold">Student Wallet</th>
              <th className="whitespace-nowrap px-4 py-2  text-gray-900 font-bold">Verified Document</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-black">

          {requests.map((request, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{request.walletAddress}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900">{request.document}</td>
                <td className="whitespace-nowrap px-4 py-2">
                <button
                  onClick={() => sendTokens(index)}
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  Release Funds
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
</>
  );
};

export default FinancerView;
