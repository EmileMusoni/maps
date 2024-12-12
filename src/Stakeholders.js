import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const Stakeholders = () => {
  const [stakeholders, setStakeholders] = useState([]);
  const [newStakeholder, setNewStakeholder] = useState({

    sname: '',
    Location: '',
    email: '',
    contacts: '',
  
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedShnumber, setSelectedShnumber] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    fetchStakeholders();
  }, []);

  const fetchStakeholders = async () => {
    try {
      const response = await axios.get('http://vicenterc-001-site35.etempurl.com/API/D_Companies.php');
      setStakeholders(response.data);
    } catch (error) {
      console.error('Error fetching stakeholders:', error);
    }
  };

  const addStakeholder = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://vicenterc-001-site35.etempurl.com/API/D_Companies.php', null, {
        params: {
        
          sname: newStakeholder.sname,
          Location: newStakeholder.Location,
          email: newStakeholder.email,
          contacts: newStakeholder.contacts,
         
        },
      });
      fetchStakeholders();
      setShowAddModal(false);
      setNewStakeholder({
    
        sname: '',
        Location: '',
        email: '',
        contacts: '',
        
      });
    } catch (error) {
      console.error('Error adding stakeholder:', error);
    }
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStakeholder, setSelectedStakeholder] = useState(null);
  const [editedStakeholder, setEditedStakeholder] = useState({
    shnumber: '',
    sname: '',
    Location: '',
    email: '',
    contacts: '',
    status: ''
  });

  const updateStakeholder = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://vicenterc-001-site35.etempurl.com/API/D_Companies.php/${selectedStakeholder.shnumber}`,
        {
          shnumber: editedStakeholder.shnumber,
          sname: editedStakeholder.sname,
          Location: editedStakeholder.Location,
          email: editedStakeholder.email,
          contacts: editedStakeholder.contacts,
          status: editedStakeholder.status
        }
      );

      fetchStakeholders();
      setShowEditModal(false);
      setSelectedStakeholder(null);
    } catch (error) {
      console.error('Error updating stakeholder:', error);
    }
  };

  const deleteStakeholder = async (shnumber) => {
    try {
      await axios.delete(`http://vicenterc-001-site35.etempurl.com/API/D_Companies.php/${shnumber}`, {
        data: { shnumber: shnumber }
      });
      fetchStakeholders();
      setShowDeleteModal(false);
      setSelectedShnumber(null);
    } catch (error) {
      console.error('Error deleting stakeholder:', error);
    }
  };

  const filteredStakeholders = stakeholders.filter((stakeholder) => {
    return stakeholder.sname.toLowerCase().includes(searchFilter.toLowerCase());
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
              <h1>Companies Management</h1>
            </div>
          </div>
          <div className="container">
            <div style={{ textAlign: 'right' }}>
              <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                Add New Company
              </button>
            </div>

            {/* Add Stakeholder Modal */}
            <div
              className={`modal fade ${showAddModal ? 'show' : ''}`}
              style={{ display: showAddModal ? 'block' : 'none' }}
              id="addStakeholderModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="addStakeholderModalLabel"
              aria-hidden={!showAddModal}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addStakeholderModalLabel">
                      Add Company
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
                    <form onSubmit={addStakeholder}>
                     
                      <div className="form-group">
                        <label htmlFor="sname">Company Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="sname"
                          value={newStakeholder.sname}
                          onChange={(e) =>
                            setNewStakeholder({ ...newStakeholder, sname: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="Location">Location:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="Location"
                          value={newStakeholder.Location}
                          onChange={(e) =>
                            setNewStakeholder({ ...newStakeholder, Location: e.target.value })
                          }
                          required
                        />
                      </div>

                     
                      <div className="form-group">
                        <label htmlFor="email">companyphone:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          value={newStakeholder.email}
                          onChange={(e) =>
                            setNewStakeholder({ ...newStakeholder, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="contacts">contactperson:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="contacts"
                          value={newStakeholder.contacts}
                          onChange={(e) =>
                            setNewStakeholder({ ...newStakeholder, contacts: e.target.value })
                          }
                          required
                        />
                      </div>
                    
                      <button type="submit" className="btn btn-primary">
                        Add Stakeholder
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={() => setShowAddModal(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Stakeholder Table */}
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
            <h5>
              <b>Company List</b>
            </h5>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
               
                  <th>Company Number</th>
                  <th>Company Name</th>
                  <th>Location</th>
                  <th>companyphone</th>
                  <th>contactperson</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStakeholders
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((stakeholder) => (
                    <tr key={stakeholder.shnumber}>
                      <td>{stakeholder.shnumber}</td>
                      <td>{stakeholder.sname}</td>
                      <td>{stakeholder.Location}</td>
                      <td>{stakeholder.email}</td>
                      <td>{stakeholder.contacts}</td>
                      <td>{stakeholder.status}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setSelectedStakeholder(stakeholder);
                            setEditedStakeholder({
                              shnumber: stakeholder.shnumber,
                              sname: stakeholder.sname,
                              Location: stakeholder.Location,
                              email: stakeholder.email,
                              contacts: stakeholder.contacts,
                              status: stakeholder.status,
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
                            setSelectedShnumber(stakeholder.shnumber);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Edit Stakeholder Modal */}
            <div
              className={`modal fade ${showEditModal ? 'show' : ''}`}
              style={{ display: showEditModal ? 'block' : 'none' }}
              id="editStakeholderModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="editStakeholderModalLabel"
              aria-hidden={!showEditModal}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="editStakeholderModalLabel">
                      Edit Company
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
                    <form onSubmit={updateStakeholder}>
                      <div className="form-group">
                        <label htmlFor="editShnumber">Company Number:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="editShnumber"
                          value={editedStakeholder.shnumber}
                          onChange={(e) =>
                            setEditedStakeholder({ ...editedStakeholder, shnumber: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="editSname">Company Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="editSname"
                          value={editedStakeholder.sname}
                          onChange={(e) =>
                            setEditedStakeholder({ ...editedStakeholder, sname: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="editLocation">Location:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="editLocation"
                          value={editedStakeholder.Location}
                          onChange={(e) =>
                            setEditedStakeholder({ ...editedStakeholder, Location: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="editEmail">Phone:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="editEmail"
                          value={editedStakeholder.email}
                          onChange={(e) =>
                            setEditedStakeholder({ ...editedStakeholder, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="editContacts">Contact Person:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="editContacts"
                          value={editedStakeholder.contacts}
                          onChange={(e) =>
                            setEditedStakeholder({ ...editedStakeholder, contacts: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="editStatus">Status:</label>
                        <select
                          name="editStatus"
                          id="editStatus"
                          className="form-control"
                          value={editedStakeholder.status}
                          onChange={(e) =>
                            setEditedStakeholder({ ...editedStakeholder, status: e.target.value })
                          }
                          required
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Update Stakeholder
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={() => setShowEditModal(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Delete Stakeholder Modal */}
            <div
              className={`modal fade ${showDeleteModal ? 'show' : ''}`}
              style={{ display: showDeleteModal ? 'block' : 'none' }}
              id="deleteStakeholderModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="deleteStakeholderModalLabel"
              aria-hidden={!showDeleteModal}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="deleteStakeholderModalLabel">
                      Delete Company
                    </h5>
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
                    <p>Are you sure you want to delete this Company?</p>
                    <button className="btn btn-danger" onClick={() => deleteStakeholder(selectedShnumber)}>
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredStakeholders.length}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stakeholders;
