import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/Country.css";
import API_BASE_URL from "../../config/api";

import {
  FiEdit,
  FiDownload,
  FiMaximize2,
  FiFilter,
  FiTrash2,
  FiCloudLightning,
} from "react-icons/fi";

import {Country} from 'country-state-city';

const API_URL = `${API_BASE_URL}/countries`;

const Count = () => {

  const [selectedCountry, setSelectedCountry] = useState("");;

  const [countries, setCountries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ countryName: "", status: false });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);



 
   const fetchAllCountries = async () => {
      try {
        const res = await Country.getAllCountries();
        console.log(res);
        setCountries(res);
  
      } catch (err) {
        setError("Failed to fetch countries");
      }
   };


  const fetchCountries = async () => {
    setLoading(true);
    try {
      const allCountries = await Country.getAllCountries();
      console.log(allCountries);
      const res = await axios.get(API_URL);
      setCountries(res.data);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to fetch countries");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCountries();
    fetchCountries();
  }, []);

  const handleCreateOrUpdate = async () => {

    if (!form.countryName) return;
    try {
      if (editingId !== null) {
        await axios.put(`${API_URL}/${editingId}`, form);
      } else {
        await axios.post(API_URL, form);
      }
      // fetchCountries();
      setShowModal(false);
      setForm({ countryName: "", status: false });
      setEditingId(null);
      setError("");
    } catch (err) {
      setError("Failed to save country");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this country?"))
      return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCountries();
      setError("");
    } catch (err) {
      setError("Failed to delete country");
    }
  };

  const toggleStatus = async (country) => {
    console.log("called")
    try {
      const res =  await axios.patch(`${API_URL}/${country.id}/status`, {
        status: !country.status,
      });
      // fetchCountries();
      console.log(country);
      console.log(country.id)
      const updatedCountry = res.data;
      console.log(updatedCountry);

      setCountries((prev) => 
        prev.map((imp ) => (imp.id === country.id) ? updatedCountry : imp) 
      );

      // setImpacts((prev) =>
      //   prev.map((impact) => (impact.id === id ? updatedImpact : impact))
      // );

      

      setError("");
    } catch (err) {
      setError("Failed to toggle status");
    }
  };

  const startEditing = (country) => {
    setForm({
      countryName: country.countryName,
      status: country.status,
    });
    setEditingId(country.id);
    setShowModal(true);
  };

  const filteredCountries = countries.filter((c) => 
    c.countryName
  );

  const totalEntries = filteredCountries.length;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const paginatedCountries = filteredCountries.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="country-container"> 


      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">
              {editingId !== null ? "Edit Country" : "Add New Country"}
            </h3>
            
              

                 <select
                  className="modal-input"
                  name="country"
                  value={form.countryId}
                  onChange={(e) => {
                    const country = e.target.value;
                    setForm({ ...form, country, name: "" }); // Reset state name
  
                  }}
                  required
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.isoCode} value={country.name}>
                      {country.name && country.name.trim() !== "" ? country.name : "(Unnamed Country)"}
                    </option>
                  ))}
                </select>

            {/* Status dropdown with label */}
            <div className="modal-status-group">
              <label htmlFor="status-select" className="modal-status-label">
                Status
              </label>
              <select
                id="status-select"
                className="modal-status-select"
                value={form.status ? "active" : "inactive"}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value === "active" })
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={() => {
                  setShowModal(false);
                  setForm({ countryName: "", status: false });
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

      <div className="country-header">
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
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="actions">
          <button
            className="create-btn"
            onClick={() => {
              setForm({ countryName: "", status: false });
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
        <table className="country-table">
          <thead>
            <tr>
              <th>Country Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCountries.length > 0 ? (
              paginatedCountries.map((country) => (
                <tr key={country.id}>
                  <td className="country-name">{country.countryName}</td>
                  <td>
                    <label className="country-switch">
                      <input
                        type="checkbox"
                        checked={country.status}
                        onChange={() => toggleStatus(country)}
                      />
                      <span className="country-slider round"></span>
                    </label>
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => startEditing(country)}
                      title="Edit country"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      className="edit-btn"
                      style={{ color: "red", marginLeft: 8 }}
                      onClick={() => handleDelete(country.id)}
                      title="Delete country"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-results">
                  {searchTerm
                    ? "No matching countries found"
                    : "No countries available"}
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

export default Count;
