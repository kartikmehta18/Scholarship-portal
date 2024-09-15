import React from 'react';



const GovernmentOfficerView = ({ requests, verifyRequest }) => {
  return (
    <>
      {/* <div>
        <h3 className='text-black'>Government Officer View: Verify Documents</h3>

        <div className='border-4 border-black rounded-lg'>
          <div className='grid grid-cols-3 justify-between items-center text-center gap-4 '>
            <span className='border-r-2 border-black'>Student Wallet</span>
            <span className='border-r-2 border-black'>Document</span>
            <span>Action</span>
          </div>

          {requests.map((request, index) => (
            <div key={index} className="grid grid-cols-3 justify-between gap-4 text-center items-center">
              <span className='border-r-2 border-black mx-2'>{request.walletAddress}</span>
              <span className='border-r-2 border-black'>{request.document}</span>
              <span>
                <button onClick={() => verifyRequest(index)}>Verify</button>
              </span>
            </div>
          ))}

        </div>


        <table className='border-2 border-black rounded-lg'>
          <thead className='border-4 border-black '>
            <tr>
              <th className='text-black'>Student Wallet</th>
              <th className='text-black'>Document</th>
              <th className='text-black'>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index}>
                <td>{request.walletAddress}</td>
                <td>{request.document}</td>
                <td>
                  <button onClick={() => verifyRequest(index)}>Verify</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}



  

      <div className="overflow-x-auto my-10 ">
        <table className="min-w-full divide-y-2 divide-black text-sm border-2 border-black rounded-xl">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2  text-gray-900 font-bold">Student Wallet</th>
              <th className="whitespace-nowrap px-4 py-2  text-gray-900 font-bold">Document</th>
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
                  onClick={() => verifyRequest(index)}
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  Verify
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

export default GovernmentOfficerView;
