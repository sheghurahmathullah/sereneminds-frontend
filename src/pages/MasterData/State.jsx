import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiDownload,
  FiMaximize2,
  FiFilter,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import "./Styles/State.css";

import{Country, State} from 'country-state-city';

const API_URL = "http://localhost:5000/api/states";
const SERVER_URL = "https://sereneminds-backend-oucl.onrender.com/api/states"; // Update with your actual server URL


const States = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", countryId: "" });

  const [states, setStates] = useState([]);
  const [countryStates, setCountryStates] = useState([]);
  const [countries, setCountries] = useState([]);

  
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [allStates, setAllStates] = useState([]);
  
  const fetchCountries = async () => {
    try {
      const res = await Country.getAllCountries();
      console.log(res);
      setCountries(res);

    } catch (err) {
      setError("Failed to fetch countries");
    }
  };

  const fetchStates = async () => {
  try {
    setLoading(true);
    const res = await axios.get(SERVER_URL);
    setAllStates(res.data);
    setLoading(false);
  } catch (error) {
    setError("Failed to fetch states");
    setLoading(false);
  }
};

  useEffect(() => {
    fetchStates();
    fetchCountries();
  }, []);


  const handleCreate = async () => {
    console.log(selectedCountry, selectedState);
     const selectedCountryObj = countries.find(
    (c) => c.isoCode === selectedCountry
  );
  console.log(selectedCountryObj.name);

  if (!form.name || !form.name) {
    setError("Please select both country and state.");
    return;
  }
  try {
    await axios.post(SERVER_URL, {
      country: selectedCountryObj.name,
      state: selectedState,
    });
    fetchStates(); // Refresh the state list
      setShowModal(false);
    setError("");
    // Optionally, refresh state list or close modal here
  } catch (err) {
    setError("Failed to send country and state.");
  }
};

  const handleCreateOrUpdate = async () => {
    // if (!form.name || !form.country) return;
     const selectedCountryObj = countries.find(
    (c) => c.isoCode === selectedCountry
      );
    
    try {
      if (editingId !== null) {
        await axios.put(`${SERVER_URL}/${editingId}`, {
      country: selectedCountryObj.name,
      state: selectedState,
      });

      } else {
        await axios.post(SERVER_URL, {
      country: selectedCountryObj.name,
      state: selectedState,
      });
    }

      fetchStates(); // Refresh the state list
      setShowModal(false);
      setForm({ name: "", countryId: "" });
      setEditingId(null);
      setError("");
    } catch (err) {
      setError("Failed to save state");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this state?")) return;
    try {
      await axios.delete(`${SERVER_URL}/${id}`);
      fetchStates(); // Refresh the state list
      setError("");
    } catch (err) {
      setError("Failed to delete state");
    }
  };

  const toggleStatus = async (id) => {
    try {
      const res = await axios.patch(`${SERVER_URL}/${id}/toggle-status`);
      const data = res.data;

      setAllStates((prev) => // for smooth update
        prev.map((p) => (p.id === id ? data : p))
      );

      setError("");
    } catch (err) {
      setError("Failed to toggle status");
    }
  };

  const startEditing = (state) => {
    setForm({
      state: state.name,
      country: state.countryId,
    });
    setEditingId(state.id);
    setShowModal(true);
  };

  const filteredStates = allStates.filter(
    (state) =>
      (state.country &&
        state.state
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="state-container">
    {showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <h3 className="modal-title">
        {editingId !== null ? "Edit State" : "Add New State"}
      </h3>

      {/* Country dropdown first */}
        
            <select
                  className="modal-input"
                  name="country"
                  value={form.countryId}
                  onChange={(e) => {
                    const countryId = e.target.value;
                    setSelectedCountry(countryId);
                    setForm({ ...form, countryId, name: "" }); // Reset state name
                    setSelectedState(""); // Reset selectedState as well
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
                {/* States rendered based on selected country */}
                <select
                  className="modal-input"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setSelectedState(e.target.value);
                  }}
                  required
                  disabled={countryStates.length === 0}
                >
                  <option value="">Select State</option>
                  {countryStates.map((state) => (
                    <option key={state.isoCode} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
     

      

      <div className="modal-actions">
        <button
          className="modal-cancel"
          onClick={() => {
            setShowModal(false);
            setForm({ name: "", countryId: "" });
            setEditingId(null);
          }}
        >
          Cancel
        </button>
        <button className="modal-submit" onClick={handleCreateOrUpdate}>
          {editingId !== null ? "Update" : "Submit"}
        </button>
      </div>
    </div>
  </div>
)}

      <div className="state-controls">
        <select className="dropdown">
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>

        <input
          type="text"
          className="search-input"
          placeholder="Search states..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="actions">
          <button
            className="create-btn"
            onClick={() => {
              setForm({ name: "", countryId: "" });
              setEditingId(null);
              setShowModal(true);
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
        <table className="state-table">
          <thead>
            <tr>
              <th>State Name</th>
              <th>Country Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStates.length > 0 ? (
              filteredStates.map((state) => (
                <tr key={state.id}>
                  <td className="state-name">{state.state}</td>
                  <td className="country-name">{state.country}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={state.status}
                        onChange={() => toggleStatus(state.id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => startEditing(state)}
                      title="Edit state"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      className="edit-btn"
                      style={{ color: "red", marginLeft: 8 }}
                      onClick={() => handleDelete(state.id)}
                      title="Delete state"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-results">
                  {searchTerm
                    ? "No matching states found"
                    : "No states available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <span>{`Showing 1 to ${filteredStates.length} of ${filteredStates.length} entries`}</span>
        <div className="pages">
          <button>{"<"}</button>
          <button className="active">1</button>
          <button>{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default States;
