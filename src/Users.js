import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [owners, setOwners] = useState([]); // State to hold owners
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    user_type: '',
    owner: '',
    userstatus: ''
});

const [showAddModal, setShowAddModal] = useState(false);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedUserId, setSelectedUserId] = useState(null);

const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);
const [searchFilter, setSearchFilter] = useState('');

useEffect(() => {
  const fetchOwners = async () => {
    try {
      if (newUser.user_type) {
        const response = await axios.get('http://vicenterc-001-site35.etempurl.com/API/D_LoginCheckNames.php', {
          params: {
            usertype: newUser.user_type
          }
        });
        setOwners(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching owners:', error);
    }
  };

  fetchOwners();
  
}, [newUser.user_type]);
useEffect(() => {
  fetchUsers();
}, []); // Empty dependency array means this effect will run only once after the initial render


const fetchOwners = async () => {
  try {
    if (newUser.user_type) {
      const response = await axios.get('http://vicenterc-001-site35.etempurl.com/API/D_LoginCheckNames.php', {
        params: {
          usertype: newUser.user_type // Use 'usertype' as the parameter name
        }
      });
      setOwners(response.data.data); // Assuming response data is structured as { data: [] }
    }
  } catch (error) {
    console.error('Error fetching owners:', error);
  }
};

const fetchOwnersForEdit = async (selectedUserType) => {
  try {
    if (selectedUserType) {
      const response = await axios.get('http://vicenterc-001-site35.etempurl.com/API/D_LoginCheckNames.php', {
        params: {
          usertype: selectedUserType
        }
      });
      setOwners(response.data.data);
    }
  } catch (error) {
    console.error('Error fetching owners:', error);
  }
};




const fetchUsers = async () => {
try {
const response = await axios.get('http://vicenterc-001-site35.etempurl.com/API/D_Users.php');
setUsers(response.data);
} catch (error) {
console.error('Error fetching users:', error);
}
};

const addUser = async (e) => {
e.preventDefault();

try {
  await axios.post('http://vicenterc-001-site35.etempurl.com/API/D_Users.php', null, {
    params: {
      username: newUser.username,
      password: newUser.password,
      user_type: newUser.user_type,
      owner: newUser.owner,
      userstatus: newUser.userstatus,
    },
  });
  fetchUsers();
  setShowAddModal(false);
  setNewUser({
    username: '',
    password: '',
    user_type: '',
    owner: '',
    userstatus: ''
  });
} catch (error) {
  console.error('Error adding user:', error);
}

};

const [showEditModal, setShowEditModal] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
const [editedUser, setEditedUser] = useState({
username: '',
password: '',
user_type: '',
owner: '',
userstatus: ''
});

const updateUser = async (e) => {
e.preventDefault();

try {
  await axios.put(
    `http://vicenterc-001-site35.etempurl.com/API/D_Users.php/${selectedUser.userID}`,
    {
      username: editedUser.username,
      password: editedUser.password,
      user_type: editedUser.user_type,
      owner: editedUser.owner,
      userstatus: editedUser.userstatus
    }
  );

  fetchUsers();
  setShowEditModal(false);
  setSelectedUser(null);
} catch (error) {
  console.error('Error updating user:', error);
}

};

const deleteUser = async (userId) => {
try {
await axios.delete(`http://vicenterc-001-site35.etempurl.com/API/D_Users.php/${userId}`, {
data: { userID: userId }
});
fetchUsers();
setShowDeleteModal(false);
setSelectedUserId(null);
} catch (error) {
console.error('Error deleting user:', error);
}
};


const filteredUsers = users.filter(user => {
return user.username.toLowerCase().includes(searchFilter.toLowerCase());
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

      </div>
  <div className="container">
    <h1>Users Management</h1>
    
    <div style={{ textAlign: 'right' }}>
<button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
  Add New User
</button>
</div>



          
    {/* Add User Modal */}
    <div
className={`modal fade ${showAddModal ? 'show' : ''}`}
style={{ display: showAddModal ? 'block' : 'none' }}
id="addUserModal"
tabIndex="-1"
role="dialog"
aria-labelledby="addUserModalLabel"
aria-hidden={!showAddModal}
>
<div className="modal-dialog" role="document">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="addUserModalLabel">
        Add User
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
      <form onSubmit={addUser}>
        <div className="form-group">
          <label htmlFor="username">Email:/</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="text" className="form-control" id="password" value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            required
          />
        </div>
        
       
          <div className="form-group">
          <label htmlFor="user_type">User Type:</label>
      <select
        name="user_type"
        id="user_type"
        className="form-control"
        value={newUser.user_type}
        onChange={(e) => {
          setNewUser({ ...newUser, user_type: e.target.value, owner: '' });
          fetchOwners(); // Fetch owners based on the selected user type
        }}
        required
      >
        <option value="">Select User Type</option>
        <option value="transport">transport</option>
       
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="owner">Owner:</label>
      <select
        name="owner"
        id="owner"
        className="form-control"
        value={newUser.owner}
        onChange={(e) => setNewUser({ ...newUser, owner: e.target.value })}
        required
      >
        <option value="">Select Owner</option>
        <option value="8">Transport</option>
            
      </select>
    </div>


        <div className="form-group">
          <label htmlFor="user_type">Status:</label>
          <select
            name="userstatus"
            id="userstatus"
            className="form-control"
            value={newUser.userstatus}
            onChange={(e) =>
              setNewUser({ ...newUser, userstatus: e.target.value })
            }
         
          >
            <option value="">Select Status </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>



          

        <button type="submit" className="btn btn-primary">
          Add User
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

    {/* User Table */}
   

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
            <h5><b>Users List</b></h5>
<table className="table table-striped table-bordered">
              <thead>
                <tr>
              <th>User ID</th>
              <th>Username</th>
            
              <th>User Type</th>
              
              <th>User Status</th>
              <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((user) => (
                    <tr key={user.userID}>
                      <td>{user.userID}</td>
                      <td>{user.username}</td>
                     
                      <td>{user.user_type}</td>
                      
                     
                      <td>{user.userstatus}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setSelectedUser(user);
                            setEditedUser({
                              username: user.username,
                              password: user.password,
                              user_type: user.user_type,
                              owner: user.owner,
                              userstatus:user.userstatus
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
                            setSelectedUserId(user.userID);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>


          {/* Edit User Modal */}
<div
className={`modal fade ${showEditModal ? 'show' : ''}`}
style={{ display: showEditModal ? 'block' : 'none' }}
id="editUserModal"
tabIndex="-1"
role="dialog"
aria-labelledby="editUserModalLabel"
aria-hidden={!showEditModal}
>
<div className="modal-dialog" role="document">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="editUserModalLabel">
        Edit User
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
      <form onSubmit={updateUser}>
        <div className="form-group">
          <label htmlFor="editusername">Username:</label>
          <input
            type="text"
            className="form-control"
            id="editusername"
            value={editedUser.username}
            onChange={(e) =>
              setEditedUser({ ...editedUser, username: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="editpassword">Password:</label>
          <input
            type="text"
            className="form-control"
            id="editpassword"
            value={editedUser.password}
            onChange={(e) =>
              setEditedUser({ ...editedUser, password: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
        <label htmlFor="user_type">User Type:</label>
      <select
        name="user_type"
        id="user_type"
        className="form-control"
        value={editedUser.user_type}
        onChange={(e) => {
          setEditedUser({ ...editedUser, user_type: e.target.value, owner: '' });
          //fetchOwners();
          fetchOwnersForEdit(e.target.value);
        }}
        required
      >
        <option value="">Select User Type</option>
        <option value="transport">transport</option>
        
      </select>
    </div>

    <div className="form-group">
  <label htmlFor="owner">Owner:</label>
  <select
    name="owner"
    id="owner"
    className="form-control"
    value={editedUser.owner}
    onChange={(e) => setEditedUser({ ...editedUser, owner: e.target.value })}
    required
  >
    <option value="">Select Owner</option>
    
        <option value="8">transport</option>
  </select>
</div>


        <div className="form-group">
          <label htmlFor="user_type">Status:</label>
          <select
            name="userstatus"
            id="userstatus"
            className="form-control"
            value={editedUser.userstatus}
            onChange={(e) =>
              setEditedUser({ ...editedUser, userstatus: e.target.value })
            }
         
          >
           
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        


        <button type="submit" className="btn btn-primary">
          Update User
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

    {/* Delete User Modal */}
    <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} id="deleteUserModal" tabIndex="-1" role="dialog" aria-labelledby="deleteUserModalLabel" aria-hidden={!showDeleteModal}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteUserModalLabel">Delete User</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this User?</p>
            <button className="btn btn-danger" onClick={() => deleteUser(selectedUserId)}>Delete</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredUsers.length}
              onPageChange={handlePageChange}
            />


  </div>
  </div>
  </div>
  </div>
  </div>
   
);
};

export default Users;
