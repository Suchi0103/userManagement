import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function AddUser () {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [image, setImage] = useState();
    const navigate = useNavigate()
    console.log(image, 12)
    const Submit = (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('name', name)
        formData.append('email', email)
        formData.append('phoneNumber', phoneNumber)
        formData.append('image', image)

        axios.post("http://localhost:3000/api/user/addUser",formData)
            .then(result => {
                console.log("result",result)
                navigate('/')
            })
            .catch(err => {
                toast.error(err.response.data.msg);
                console.log("error: ",err)
            })
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounder p-3">
                <Toaster />
                <form onSubmit={Submit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" 
                            onChange={(e)=> setName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder="Enter Email" className="form-control" 
                            onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Phone Number</label>
                        <input type="text" placeholder="Enter Phone Number" className="form-control"
                            onChange={(e)=> setPhoneNumber(e.target.value)}/> 
                    </div>
                    <div className="mb-2">
                        <label htmlFor="file">Upload User Image:</label>
                        <input onChange={(e)=> setImage(e.target.files[0])} type="file"/> 
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default AddUser;