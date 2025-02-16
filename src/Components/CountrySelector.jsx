import { useEffect, useState } from "react";
import countriesData from "../assets/all_countries.json"; // Import the JSON file

const CountrySelector = ({ name, onChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    setCountries(countriesData);
  }, []);
  return (
    <div>
      <select
        name={name}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select Country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
            
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
