import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {FaEdit, FaTrash} from 'react-icons/fa';
import './Users.css';

function Users () {
    const [users, setUsers] = useState([])
    const baseUrl = `${import.meta.env.VITE_API_URL}`;

    useEffect(()=> {
        axios.get(`${baseUrl}/api/user`)
            .then(result => setUsers(result.data))
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete(`${baseUrl}/api/user/deleteUser/${id}`)
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
    } 
    return (
        <div style={{backgroundColor:'#b0bff6'}} className="d-flex vh-100 justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/add" style={{backgroundColor:'#f6d1b0'}} className="btn">Add User</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>User Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>
                                        <img 
                                            className="user-image" 
                                            src={`${baseUrl}/${user.imageUrl}`} 
                                            alt="User Image" 
                                        />
                                    </td>
                                    <td>
                                        <Link to={`/update/${user._id}`} >
                                            <FaEdit />
                                        </Link>
                                        <span style={{margin: '0 10px'}} />
                                        <button onClick={(e) => handleDelete(user._id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Users;