import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const Stations = () => {
  const [stations, setStations] = useState([]);
  const [newStation, setNewStation] = useState({
    stationname: '',
    latitude: '',
    longitude: '',
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStationID, setSelectedStationID] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get('http://vicenterc-001-site35.etempurl.com/API/D_Stations.php');
      setStations(response.data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const addStation = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://vicenterc-001-site35.etempurl.com/API/D_Stations.php', null, {
        params: {
          stationname: newStation.stationname,
          latitude: newStation.latitude,
          longitude: newStation.longitude,
        },
      });
      fetchStations();
      setShowAddModal(false);
      setNewStation({
        stationname: '',
        latitude: '',
        longitude: '',
      });
    } catch (error) {
      console.error('Error adding station:', error);
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [editedStation, setEditedStation] = useState({
    stationname: '',
    latitude: '',
    longitude: '',
  });

  const updateStation = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://vicenterc-001-site35.etempurl.com/API/D_Stations.php/${selectedStation.stationid}`,
        {
          stationname: editedStation.stationname,
          latitude: editedStation.latitude,
          longitude: editedStation.longitude,
        }
      );

      fetchStations();
      setShowEditModal(false);
      setSelectedStation(null);
    } catch (error) {
      console.error('Error updating station:', error);
    }
  };

  const deleteStation = async (stationID) => {
    try {
      await axios.delete(`http://vicenterc-001-site35.etempurl.com/API/D_Stations.php/${stationID}`, {
        data: { stationid: stationID },
      });
      fetchStations();
      setShowDeleteModal(false);
      setSelectedStationID(null);
    } catch (error) {
      console.error('Error deleting station:', error);
    }
  };

  const filteredStations = stations.filter((station) => {
    return station.stationname.toLowerCase().includes(searchFilter.toLowerCase());
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Stations Management</h1>
            </div>
          </div>
          <div className="container">
            <div style={{ textAlign: 'right' }}>
              <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                Add New Station
              </button>
            </div>

            {/* Add Station Modal */}
            <div
              className={`modal fade ${showAddModal ? 'show' : ''}`}
              style={{ display: showAddModal ? 'block' : 'none' }}
              id="addStationModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="addStationModalLabel"
              aria-hidden={!showAddModal}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addStationModalLabel">
                      Add Station
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setShowAddModal(false)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={addStation}>
                      
                      <div className="form-group">
                        <label htmlFor="stationname">Station Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="stationname"
                          value={newStation.stationname}
                          onChange={(e) => setNewStation({ ...newStation, stationname: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="latitude">Latitude:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="latitude"
                          value={newStation.latitude}
                          onChange={(e) => setNewStation({ ...newStation, latitude: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="longitude">Longitude:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="longitude"
                          value={newStation.longitude}
                          onChange={(e) => setNewStation({ ...newStation, longitude: e.target.value })}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">Add Station</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowAddModal(false)}>Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Station Table */}
            <div className="d-flex justify-content-between mb-3">
              <div>
                <label htmlFor="itemsPerPage">Items Per Page:</label>
                <select
                  id="itemsPerPage"
                  className="form-control"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
              <div>
                <label htmlFor="searchFilter">Search:</label>
                <input
                  type="text"
                  id="searchFilter"
                  className="form-control"
                  value={searchFilter}
                  onChange={handleSearchFilterChange}
                />
              </div>
            </div>
            <h5><b>Stations List</b></h5>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Station ID</th>
                  <th>Station Name</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStations
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((station) => (
                    <tr key={station.stationid}>
                      <td>{station.stationid}</td>
                      <td>{station.stationname}</td>
                      <td>{station.latitude}</td>
                      <td>{station.longitude}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setSelectedStation(station);
                            setEditedStation({
                              stationname: station.stationname,
                              latitude: station.latitude,
                              longitude: station.longitude,
                            });
                            setShowEditModal(true);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setSelectedStationID(station.stationid);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Edit Station Modal */}
            <div
              className={`modal fade ${showEditModal ? 'show' : ''}`}
              style={{ display: showEditModal ? 'block' : 'none' }}
              id="editStationModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="editStationModalLabel"
              aria-hidden={!showEditModal}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="editStationModalLabel">
                      Edit Station
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setShowEditModal(false)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={updateStation}>
                      <div className="form-group">
                        <label htmlFor="editStationName">Station Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="editStationName"
                          value={editedStation.stationname}
                          onChange={(e) => setEditedStation({ ...editedStation, stationname: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="editLatitude">Latitude:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="editLatitude"
                          value={editedStation.latitude}
                          onChange={(e) => setEditedStation({ ...editedStation, latitude: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="editLongitude">Longitude:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="editLongitude"
                          value={editedStation.longitude}
                          onChange={(e) => setEditedStation({ ...editedStation, longitude: e.target.value })}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">Update Station</button>
                      <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowEditModal(false)}>Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Delete Station Modal */}
            <div
              className={`modal fade ${showDeleteModal ? 'show' : ''}`}
              style={{ display: showDeleteModal ? 'block' : 'none' }}
              id="deleteStationModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="deleteStationModalLabel"
              aria-hidden={!showDeleteModal}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="deleteStationModalLabel">Delete Station</h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to delete this Station?</p>
                    <button className="btn btn-danger" onClick={() => deleteStation(selectedStationID)}>Delete</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>

            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredStations.length}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stations;
