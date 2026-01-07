import axios from "axios";
import React, { useEffect, useState,useCallback } from "react";

const userObject={
  id: '',
    name: '',
    age: '',
    location: '',
    mobileNumber: '',
}

const CRUD = () => {
  const [user, setUser] = useState([]);
  const [createData, setCreateData] = useState(userObject);

  const getCall = () => {
    axios.get('https://6891db6f447ff4f11fbe0d1f.mockapi.io/user')
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCall();
  }, []);

  const handleClick = () => {
    axios.post('https://6891db6f447ff4f11fbe0d1f.mockapi.io/user', createData)
      .then((res) => {
        setCreateData(userObject);
        getCall(); // Refresh the list
      });
  };


  const handleChange = useCallback( (e) => {
    setCreateData({ ...createData, [e.target.name]: e.target.value });
  }
)

  const handleUpdate= useCallback( (data)=>{
    setCreateData({
      id: data.id,
      name: data.name,
      age: data.age,
      location: data.location,
      mobileNumber: data.mobileNumber,
    })
  }
)

  const updateCall=()=>{
    axios.put(`https://6891db6f447ff4f11fbe0d1f.mockapi.io/user/${createData.id}`,createData)
    .then(()=>{
      setCreateData(userObject)
      getCall();
    })
  }

  const handleDelete = (id) => {
  axios.delete(`https://6891db6f447ff4f11fbe0d1f.mockapi.io/user/${id}`)
    .then(() => {
      getCall(); // Refresh the table after deletion
    })
    .catch((err) => {
      console.log(err);
    });
};


  return (
    <>
      <div style={{ padding: "10px", display: "flex", gap: "10px" }}>
        <label>
          Name:
          <input type="text" name='name' value={createData.name} onChange={handleChange} />
        </label>
        <label>
          Age:
          <input type="number" name='age' value={createData.age} onChange={handleChange} />
        </label>
        <label>
          Location:
          <input type="text" name='location' value={createData.location} onChange={handleChange} />
        </label>
        <label>
          Mobile Number:
          <input type="text" name='mobileNumber' value={createData.mobileNumber} onChange={handleChange} />
        </label>
        {/* <button onClick={handleClick}>Save</button>
        <button onClick={updateCall}>Update</button> */}
        <button onClick={createData.id ? updateCall():handleClick()} >{createData.id ?'Update':'Save'}</button>

      </div>

      <div style={{ margin: "20px" }}>
        <table
          border="1"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Age</th>
              <th>Location</th>
              <th>Mobile Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.location}</td>
                <td>{user.mobileNumber}</td>
                <td>
                  <button onClick={()=>handleUpdate(user)} >Update</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CRUD;
