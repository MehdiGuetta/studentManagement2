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
        className="w-full py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
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
