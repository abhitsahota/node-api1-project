import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [users, setUsers] = useState([])

  const fetchData = () => {
    axios
    .get('http://localhost:5000/api/users/')
    .then(res => {
      setUsers(res.data)
    })
    .catch(e => console.log(e))
  }

  useEffect(() => {
    fetchData()
  },  []  )


  // const handleChange = () => {

  // }

  // const handleSubmit = () => {
    
  // }

  // const deleteUser = () => {

  // }

  return (
    <div className="App">
      {/* <section>
        <form onSubmit={handleSubmit}>
          <input 
            type='text'
            name='name'
            placeholder='name'
            value={user.name}
            onChange={handleChange}
          />
          <input 
            type='text'
            name='bio'
            placeholder='bio'
            value={user.bio}
            onChange={handleChange}
          />
        </form>
      </section> */}

      <section>
        {users.map(u => <li key={u.id}>{u.name}, {u.bio}</li>)}
      </section>

    </div>
  );
}

export default App;
