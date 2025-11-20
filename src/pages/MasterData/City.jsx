import React, { useState, useEffect } from "react";
import axios from "axios";
import "./City.css";
import {
  FiEdit,
  FiDownload,
  FiMaximize2,
  FiFilter,
  FiTrash2,
} from "react-icons/fi";
import { API_ENDPOINTS } from "../../config/api";

import{Country, State, City} from 'country-state-city';


const API_URL = "http://localhost:5000/api/cities";
const STATE_API_URL = "https://localhost:5000/api/states";
const COUNTRY_API_URL =
  "https://localhost:5000/api/countries";

const Cities = () => {

  const [countries, setCountries] = useState([]);
const [cities, setCities] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    city: "",
    state: "",
    country: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [stateCities, setStateCities] = useState([]);

   
const [selectedCountry, setSelectedCountry] = useState("");
const [selectedState, setSelectedState] = useState("");
const [countryStates, setCountryStates] = useState([]);
    
const selectedCountryObj = countries.find(c => c.isoCode === form.countryId);
const selectedStateObj = countryStates.find(s => s.isoCode === form.stateId);
const selectedCityObj = stateCities.find(c => c.name === form.cityName);

const countryName = selectedCountryObj ? selectedCountryObj.name : "";
const stateName = selectedStateObj ? selectedStateObj.name : "";
const cityName = selectedCityObj ? selectedCityObj.name : "";

  

  const fetchCities = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_ENDPOINTS.CITIES);
      setCities(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch cities");
    }
    setLoading(false);
  };

 

  const fetchCountries = async () => {
     try {
      const res = await Country.getAllCountries();
      setCountries(res);

    } catch (err) {
      setError("Failed to fetch countries");
    }
  };

  useEffect(() => {
    fetchCities();
    fetchCountries();
  }, []);


  // Handle create 
  const handleCreateOrUpdate = async () => {
    if (!form.cityName || !form.stateId || !form.countryId) {
      setError("All fields are required");
      return;
    }
    // Ensure IDs are integers
    const payload = {
      ...form,
      stateId: parseInt(form.stateId, 10),
      countryId: parseInt(form.countryId, 10),
    };
    console.log("Submitting payload:", payload);
    try {
      if (editingId !== null) {
        await axios.put(`${API_ENDPOINTS.CITIES}/${editingId}`, {
          country: countryName,
          state: stateName,
          city: cityName,
        });
        
      } else {
        console.log(countryName, stateName, cityName);
        await axios.post(API_ENDPOINTS.CITIES, {
          country: countryName,
          state: stateName,
          city: cityName,
        });
      }
      fetchCities();
      setShowModal(false);
      setForm({ city: "", state: "", country: "" });
      setEditingId(null);
      setError("");
    } catch (err) {
      console.error("Save city error:", err.response?.data || err.message);
      setError(
        "Failed to save city: " + (err.response?.data?.error || err.message)
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this city?")) return;
    try {
      await axios.delete(`${API_ENDPOINTS.CITIES}/${id}`);
      fetchCities();
      setError("");
    } catch (err) {
      setError("Failed to delete city");
    }
  };

  const toggleStatus = async (id) => {
    try {
     const res =  await axios.patch(`${API_ENDPOINTS.CITIES}/${id}/toggle-status`);
     const data = res.data;
     
      setCities((prev) => // for smooth update
        prev.map((p) => (p.id === id ? data : p))
      );
      setError("");
    } catch (err) {
      setError("Failed to toggle status");
    }
  };

  const startEditing = (city) => {
    setForm({
      cityName: city.cityName,
      stateId: city.stateId,
      countryId: city.countryId,
    });
    setEditingId(city.id);
    setShowModal(true);
  };

  const filteredCities = cities.filter(
    (city) =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (city.State &&
        city.state.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (city.country &&
        city.country
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  const totalEntries = filteredCities.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const paginatedCities = filteredCities.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="city-container">
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">
              {editingId !== null ? "Edit City" : "Add New City"}
            </h3>
            {/* Country dropdown first */}
             





                <select
  className="modal-input"
  name="country"
  value={form.countryId}
  onChange={(e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    setForm({ ...form, countryId, stateId: "", cityName: "" }); // Reset state and city
    setSelectedState("");
    setStateCities([]);
    if (countryId) {
      const states = State.getStatesOfCountry(countryId);
      setCountryStates(states);
    } else {
      setCountryStates([]);
    }
  }}
  required
>
  <option value="">Select Country</option>
  {countries.map((country) => (
    <option key={country.isoCode} value={country.isoCode}>
      {country.name && country.name.trim() !== "" ? country.name : "(Unnamed Country)"}
    </option>
  ))}
</select>

{/* State dropdown */}
<select
  className="modal-input"
  name="state"
  value={form.stateId}
  onChange={(e) => {
    const stateId = e.target.value;
    setForm({ ...form, stateId, cityName: "" }); // Reset city
    setSelectedState(stateId);
    if (stateId) {
      const selectedStateObj = countryStates.find(
        (state) => state.isoCode === stateId
      );
      if (selectedStateObj) {
        const cities = City.getCitiesOfState(selectedCountry, selectedStateObj.isoCode);
        setStateCities(cities);
      } else {
        setStateCities([]);
      }
    } else {
      setStateCities([]);
    }
  }}
  required
  disabled={countryStates.length === 0}
>
  <option value="">Select State</option>
  {countryStates.map((state) => (
    <option key={state.isoCode} value={state.isoCode}>
      {state.name}
    </option>
  ))}
</select>

{/* City dropdown */}
<select
  className="modal-input"
  name="city"
  value={form.cityName}
  onChange={(e) => setForm({ ...form, cityName: e.target.value })}
  required
  disabled={stateCities.length === 0}
>
  <option value="">Select City</option>
  {stateCities.map((city) => (
    <option key={city.name} value={city.name}>
      {city.name}
    </option>
  ))}
</select>
            
            
            
            
            
            
            
            
            
            
            
            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={() => {
                  setShowModal(false);
                  setForm({ cityName: "", stateId: "", countryId: "" });
                  setEditingId(null);
                  setError("");
                }}
              >
                Cancel
              </button>
              <button className="modal-submit" onClick={handleCreateOrUpdate}>
                {editingId !== null ? "Update" : "Submit"}
              </button>
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      )}

      <div className="city-header">
        <select
          className="dropdown"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <input
          type="text"
          className="search-input"
          placeholder="Search cities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="actions">
          <button
            className="create-btn"
            onClick={() => {
              setForm({ cityName: "", stateId: "", countryId: "" });
              setEditingId(null);
              setShowModal(true);
              setError("");
            }}
          >
            + Create
          </button>
          <button className="icon-btn">
            <FiDownload />
          </button>
          <button className="icon-btn">
            <FiMaximize2 />
          </button>
          <button className="icon-btn">
            <FiFilter />
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="city-table">
          <thead>
            <tr>
              <th>City Name</th>
              <th>State</th>
              <th>Country</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCities.length > 0 ? (
              paginatedCities.map((city) => (
                <tr key={city.id}>
                  <td className="city-name">{city.city}</td>
                  <td className="state-name">{city.state}</td>
                  <td className="country-name">{city.country}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={city.status}
                        onChange={() => toggleStatus(city.id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => startEditing(city)}
                      title="Edit city"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      className="edit-btn"
                      style={{ color: "red", marginLeft: 8 }}
                      onClick={() => handleDelete(city.id)}
                      title="Delete city"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-results">
                  {searchTerm
                    ? "No matching cities found"
                    : "No cities available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <div className="pagination">
        <span>
          {`Showing ${totalEntries === 0 ? 0 : (page - 1) * pageSize + 1} to ${
            page * pageSize > totalEntries ? totalEntries : page * pageSize
          } of ${totalEntries} entries`}
        </span>
        <div className="pages">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            {"<"}
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              className={page === idx + 1 ? "active" : ""}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cities;
