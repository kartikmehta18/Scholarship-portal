import React, { useState } from 'react';

const Card = () => {
  const [stateName, setStateName] = useState('');
  const [schemes, setSchemes] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputState = stateName.trim(); // Use the trimmed input state name

    // Prepare the data to send to the API
    const data = {
      message: inputState, // Pass the state name as "message"
    };
    console.log(data);

    try {
      const res = await fetch('https://gallant-antonelli-beautiful.lemme.cloud/api/cbd5c479-8093-460f-9904-f3ab66423f6a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the state as part of the POST request
      });

      // Log the response status for debugging
      console.log("Response status:", res.status);
      console.log("Response headers:", res.headers);

      // Check if the response is ok
      if (!res.ok) {
        const errorMessage = await res.text();
        console.error('API Error:', errorMessage); // Log error response body
        throw new Error('Error while fetching data from the API');
      }

      const result = await res.json();
      console.log('API response:', result); // Log the result for debugging

      // Assuming the API returns a list of schemes directly under "res"
      setSchemes(result.res || []); // Set the schemes array from API response
      setError(null); // Reset the error state

    } catch (err) {
      console.error('Caught error:', err); // Log the caught error
      setError(err.message);
      setSchemes([]); // Clear previous schemes if any
    }
  };

  return (
    <div className="p-5 border-4 border-black rounded-xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Find Scholarships in your State <span className='text-sm text-gray-500'>(Built using Lemmebuild)</span></h1>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">Enter State Name:</label>
          <input
            type="text"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            required
            placeholder="Enter state (e.g., Rajasthan)"
            className="p-2 border border-black rounded-md bg-transparent text-black placeholder-black"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-all"
        >
          Submit
        </button>
      </form>

      {/* Display scheme cards */}
      <div className="scheme-list text-black grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {schemes.length > 0 ? (
          schemes.map((scheme, index) => (
            <div
              key={index}
              className="border flex flex-col gap-5 p-3 shadow-lg mt-4 bg-white rounded-md hover:scale-105 transition-transform duration-300 hover:shadow-xl border-blue-600"
            >
              <div className="scheme-info">
                <h2 className="font-bold text-xl text-blue-800">{scheme.scheme}</h2>
                <h2 className="text-sm text-gray-500">📍 {scheme.state}</h2>
                <h2 className="font-sm text-gray-700 mt-2">💰 Start Date: {scheme.fromstartdate}</h2>
                <h2 className="font-medium text-orange-600 mt-2">
                  🔗 <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-800">Learn more</a>
                </h2>
              </div>
            </div>
          ))
        ) : (
          <div>
            {error && (
              <div className="text-red-500 mt-4">
                <h2 className="font-semibold">Error:</h2>
                <p>{error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;