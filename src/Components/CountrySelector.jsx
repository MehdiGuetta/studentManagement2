import { useState, useEffect } from "react";

const CountrySelector = ({ value, onChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common).sort();
        setCountries(countryNames);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  return (
    <select
      className="w-96 py-3 px-4 border-none outline-none bg-[#eee] text-black rounded-md"
      value={value}
      onChange={onChange}
      required
    >
      <option value="">Select a Country</option>
      {countries.map((country, index) => (
        <option key={index} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
