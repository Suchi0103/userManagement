import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function AddUser () {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [image, setImage] = useState();
    const [isFileValid, setIsFileValid] = useState(true);
    const navigate = useNavigate();
    const baseUrl = `${import.meta.env.VITE_API_URL}`;
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            if (!['image/png', 'image/jpeg'].includes(file.type)) {
                toast.error("Please upload a valid image file (.png or .jpg)");
                setImage(null);
                setIsFileValid(false);
                return;
            }
            setImage(file);
            setIsFileValid(true);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{4,12}$/;
        return phoneRegex.test(phoneNumber);
    };

    const validateName = (name) => {
        const nameRegex = /^[A-Za-z ][a-zA-Z ]+[a-zA-Z]*$/;
        return nameRegex.test(name);
    };

    const Submit = (e) => {
        e.preventDefault();

        // Check if any form fields are empty
        if (!name || !email || !phoneNumber || !image) {
            toast.error("Please fill in all fields and upload an image.");
            return;
        }

        // Validate fields
        if (!validateName(name)) {
            toast.error("Name can only contain letters and spaces.");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            toast.error("Please Enter a Valid Phone number");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('image', image);

        axios.post(`${baseUrl}/api/user/addUser`, formData)
            .then(result => {
                console.log("result", result);
                navigate('/');
            })
            .catch(err => {
                toast.error(err.response.data.msg);
                console.log("error: ", err);
            });
    };

    return (
        <div style={{backgroundColor:'#b0bff6'}} className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
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
                        <input onChange={handleFileChange} type="file" accept=".png, .jpg, .jpeg"/> 
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <button className="btn btn-secondary" onClick={()=> navigate('/')}>Back</button>
                        <button className="btn btn-success" disabled={!isFileValid}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default AddUser;