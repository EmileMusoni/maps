import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    platenumber: '',
    companyid: '',
    make: '',
    model: '',
    fueltype: '',
    yearofmanufacture: '',
    transmission: '',
    status: '',
    maxfuel: '',
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCarID, setSelectedCarID] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://vicenterc-001-site35.etempurl.com/API/D_Cars.php');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const addCar = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://vicenterc-001-site35.etempurl.com/API/D_Cars.php', null, {
        params: {
          platenumber: newCar.platenumber,
          companyid: newCar.companyid,
          make: newCar.make,
          model: newCar.model,
          fueltype: newCar.fueltype,
          yearofmanufacture: newCar.yearofmanufacture,
          transmission: newCar.transmission,
          status: newCar.status,
          maxfuel: newCar.maxfuel,
        },
      });

      fetchCars();
      setShowAddModal(false);
      setNewCar({
        platenumber: '',
        companyid: '',
        make: '',
        model: '',
        fueltype: '',
        yearofmanufacture: '',
        transmission: '',
        status: '',
        maxfuel: '',
      });
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

 
  const [selectedCar, setSelectedCar] = useState(null);
  const [editedCar, setEditedCar] = useState({
    platenumber: '',
    companyid: '',
    make: '',
    model: '',
    fueltype: '',
    yearofmanufacture: '',
    transmission: '',
    status: '',
    maxfuel: '',
  });

  const updateCar = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`vicenterc-001-site35.etempurl.com/API/D_Cars.php/${selectedCarID}`, {
        platenumber: editedCar.platenumber,
       companyid: editedCar.companyid,
        make: editedCar.make,
        model: editedCar.model,
        fueltype: editedCar.fueltype,
        yearofmanufacture: editedCar.yearofmanufacture,
        transmission: editedCar.transmission,
        status: editedCar.status,
        maxfuel: editedCar.maxfuel,
      });

      fetchCars();
      setShowEditModal(false);
      setSelectedCarID(null);
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const deleteCar = async (plateNumber) => {
    try {
      await axios.delete(`http://vicenterc-001-site35.etempurl.com/API/D_Cars.php/${plateNumber}`, {
        data: { platenumber: plateNumber },
      });

      fetchCars();
      setShowDeleteModal(false);
      setSelectedCarID(null);
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const filteredCars = cars.filter((car) => {
    return car.make.toLowerCase().includes(searchFilter.toLowerCase());
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
              <h1>Cars Management</h1>
            </div>
          </div>
          <div className="container">
            <div style={{ textAlign: 'right' }}>
              <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                Add New Car
              </button>
            </div>

            {/* Add Farm Modal */}
           {/* Add Car Modal */}
<div
  className={`modal fade ${showAddModal ? 'show' : ''}`}
  style={{ display: showAddModal ? 'block' : 'none' }}
  id="addCarModal"
  tabIndex="-1"
  role="dialog"
  aria-labelledby="addCarModalLabel"
  aria-hidden={!showAddModal}
>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="addCarModalLabel">
          Add Car
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
        <form onSubmit={addCar}>
          <div className="form-group">
            <label htmlFor="platenumber">Plate Number:</label>
            <input
              type="text"
              className="form-control"
              id="platenumber"
              value={newCar.platenumber}
              onChange={(e) => setNewCar({ ...newCar, platenumber: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="companyid">Company ID:</label>
            <input
              type="text"
              className="form-control"
              id="companyid"
              value={newCar.companyid}
              onChange={(e) => setNewCar({ ...newCar, companyid: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="make">Make:</label>
            <input
              type="text"
              className="form-control"
              id="make"
              value={newCar.make}
              onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              className="form-control"
              id="model"
              value={newCar.model}
              onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fueltype">Fuel Type:</label>
            <input
              type="text"
              className="form-control"
              id="fueltype"
              value={newCar.fueltype}
              onChange={(e) => setNewCar({ ...newCar, fueltype: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="yearofmanufacture">Year of Manufacture:</label>
            <input
              type="text"
              className="form-control"
              id="yearofmanufacture"
              value={newCar.yearofmanufacture}
              onChange={(e) => setNewCar({ ...newCar, yearofmanufacture: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="transmission">Transmission:</label>
            <input
              type="text"
              className="form-control"
              id="transmission"
              value={newCar.transmission}
              onChange={(e) => setNewCar({ ...newCar, transmission: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <input
              type="text"
              className="form-control"
              id="status"
              value={newCar.status}
              onChange={(e) => setNewCar({ ...newCar, status: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxfuel">Max Fuel:</label>
            <input
              type="text"
              className="form-control"
              id="maxfuel"
              value={newCar.maxfuel}
              onChange={(e) => setNewCar({ ...newCar, maxfuel: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Car
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


            {/* Farm Table */}
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
            <h5><b>Cars List</b></h5>
            <table className="table table-striped table-bordered">
            <thead>
          <tr>
            <th>Plate Number</th>
            <th>Company ID</th>
            <th>Make</th>
            <th>Model</th>
            <th>Fuel Type</th>
            <th>Year of Manufacture</th>
            <th>Transmission</th>
            <th>Status</th>
            <th>Max Fuel</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCars
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((car) => (
              <tr key={car.platenumber}>
                <td>{car.platenumber}</td>
                <td>{car.companyid}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.fueltype}</td>
                <td>{car.yearofmanufacture}</td>
                <td>{car.transmission}</td>
                <td>{car.status}</td>
                <td>{car.maxfuel}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setSelectedCar(car);
                      setEditedCar({
                        platenumber: car.platenumber,
                        companyid: car.companyid,
                        make: car.make,
                        model: car.model,
                        fueltype: car.fueltype,
                        yearofmanufacture: car.yearofmanufacture,
                        transmission: car.transmission,
                        status: car.status,
                        maxfuel: car.maxfuel,
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
                      setSelectedCarID(car.platenumber);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
            </table>

            {/* Edit Farm Modal */}
           {/* Edit Car Modal */}
<div
  className={`modal fade ${showEditModal ? 'show' : ''}`}
  style={{ display: showEditModal ? 'block' : 'none' }}
  id="editCarModal"
  tabIndex="-1"
  role="dialog"
  aria-labelledby="editCarModalLabel"
  aria-hidden={!showEditModal}
>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="editCarModalLabel">
          Edit Car
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
        <form onSubmit={updateCar}>
          <div className="form-group">
            <label htmlFor="editCompanyid">Company ID:</label>
            <input
              type="text"
              className="form-control"
              id="editCompanyid"
              value={editedCar.companyid}
              onChange={(e) => setEditedCar({ ...editedCar, companyid: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="editMake">Make:</label>
            <input
              type="text"
              className="form-control"
              id="editMake"
              value={editedCar.make}
              onChange={(e) => setEditedCar({ ...editedCar, make: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="editModel">Model:</label>
            <input
              type="text"
              className="form-control"
              id="editModel"
              value={editedCar.model}
              onChange={(e) => setEditedCar({ ...editedCar, model: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="editFueltype">Fuel Type:</label>
            <input
              type="text"
              className="form-control"
              id="editFueltype"
              value={editedCar.fueltype}
              onChange={(e) => setEditedCar({ ...editedCar, fueltype: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="editYearofmanufacture">Year of Manufacture:</label>
            <input
              type="text"
              className="form-control"
              id="editYearofmanufacture"
              value={editedCar.yearofmanufacture}
              onChange={(e) => setEditedCar({ ...editedCar, yearofmanufacture: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="editTransmission">Transmission:</label>
            <input
              type="text"
              className="form-control"
              id="editTransmission"
              value={editedCar.transmission}
              onChange={(e) => setEditedCar({ ...editedCar, transmission: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="editStatus">Status:</label>
            <input
              type="text"
              className="form-control"
              id="editStatus"
              value={editedCar.status}
              onChange={(e) => setEditedCar({ ...editedCar, status: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="editMaxfuel">Max Fuel:</label>
            <input
              type="text"
              className="form-control"
              id="editMaxfuel"
              value={editedCar.maxfuel}
              onChange={(e) => setEditedCar({ ...editedCar, maxfuel: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Car
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


            {/* Delete Farm Modal */}
            <div
  className={`modal fade ${showDeleteModal ? 'show' : ''}`}
  style={{ display: showDeleteModal ? 'block' : 'none' }}
  id="deleteCarModal"
  tabIndex="-1"
  role="dialog"
  aria-labelledby="deleteCarModalLabel"
  aria-hidden={!showDeleteModal}
>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="deleteCarModalLabel">
          Delete Car
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
        <p>Are you sure you want to delete this Car?</p>
        <button className="btn btn-danger" onClick={() => deleteCar(selectedCarID)}>
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
              totalItems={filteredCars.length}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
