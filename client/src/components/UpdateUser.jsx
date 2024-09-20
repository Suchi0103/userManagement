import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

function UpdateUser () {
    const {id} = useParams()
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [image, setImage] = useState();
    const [path, setImagePath] = useState();
    const [edit, setEdit] = useState(false);
    const [isFileValid, setIsFileValid] = useState(true);
    const navigate = useNavigate()
    const baseUrl = `${import.meta.env.VITE_API_URL}`

    useEffect(()=> {
        axios.get(`${baseUrl}/api/user/getUser/${id}`)
            .then(result => {
                console.log(result)
                setName(result.data.name)
                setEmail(result.data.email)
                setPhoneNumber(result.data.phoneNumber)
                setImagePath(result.data.imageUrl)
            })
            .catch(err => console.log(err))
    }, [])

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
            setEdit(true);
            setIsFileValid(true);
        }
    };

    const Update = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('name', name)
        formData.append('email', email)
        formData.append('phoneNumber', phoneNumber)
        if(image)
            formData.append('image', image)
        else
            formData.append('imagePath', path)

        axios.patch(`${baseUrl}/api/user/updateUser/${id}`,formData)
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => {
            toast.error(err.response.data.msg);
            console.log("error: ",err)
        })
    }

    return (
        <div style={{backgroundColor:'#b0bff6'}} className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-50 bg-white rounder p-3">
                <Toaster />
                <form onSubmit={Update}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" 
                            value={name} onChange={(e)=> setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder="Enter Email" className="form-control"  
                            value={email} onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Phone Number</label>
                        <input type="text" placeholder="Enter Phone Number" className="form-control"  
                            value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        {!edit && <img width="20%" src={`${baseUrl}/${path}`} />}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="file">Update New Image:</label>
                        <input type="file" className="form-control"
                            onChange={handleFileChange}
                            accept=".png, .jpg, .jpeg" 
                        /> 
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <button style={{margin: '0 10px'}} className="btn btn-secondary" onClick={()=> navigate('/')}>Back</button>
                        <button className="btn btn-success" disabled={!isFileValid}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UpdateUser;