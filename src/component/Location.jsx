import React, { useEffect, useState } from "react";

const Location = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");

  const [states, setStates] = useState([]);
  const [state, setState] = useState("");

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");

  const fetchCountry = () => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  const fecthState = () => {
    fetch(
      `https://crio-location-selector.onrender.com/country=${country}/states`
    )
      .then((res) => res.json())
      .then((data) => {
        setStates(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fecthState();
  }, [country]);

  const fetchCity = () => {
    fetch(
      `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCities(data);
      });
  };

  useEffect(() => {
    fetchCity();
  }, [state]);

  return (
    <div className="container">
      <h1>Select Location</h1>
      <div className="inputs">
        <div className="countryInput">
          <select
            name=""
            id=""
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setState("");
              setCity("");
            }}
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => {
              return (
                <option value={country} key={index}>
                  {country}
                </option>
              );
            })}
          </select>
        </div>

        <div className="stateInput">
          <select
            name=""
            id=""
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setCity("");
            }}
            disabled={!country}
          >
            <option value="">Select State</option>
            {states.map((state, index) => {
              return (
                <option value={state} key={index}>
                  {state}
                </option>
              );
            })}
          </select>
        </div>

        <div className="cityInput">
          <select
            name=""
            id=""
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            disabled={!state}
          >
            <option value="">Select City</option>
            {cities.map((city, index) => {
              return (
                <option key={index} value={city}>
                  {city}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {city && (
        <div className="text">
          <p style={{ fontSize: "larger" }}>
            You Selected{" "}
            <span style={{ fontSize: "xx-large" }}>
              {city}, {state} {country}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Location;
