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
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate()

    useEffect(()=> {
        axios.get(`http://localhost:3000/api/user/getUser/${id}`)
            .then(result => {
                console.log(result)
                setName(result.data.name)
                setEmail(result.data.email)
                setPhoneNumber(result.data.phoneNumber)
                setImage(result.data.imageUrl)
            })
            .catch(err => console.log(err))
    }, [])

    const Update = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('name', name)
        formData.append('email', email)
        formData.append('phoneNumber', phoneNumber)
        formData.append('image', image)

        axios.put(`http://localhost:3000/api/user/updateUser/${id}`,formData)
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
                        {!edit && <img width="20%" src={`http://localhost:3000/${image}`} />}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="file">Update New Image:</label>
                        <input type="file" className="form-control"
                            onChange={(e)=> {
                                setImage(e.target.files[0]);
                                setEdit(true);
                            }}/> 
                    </div>
                    <button style={{margin: '0 10px'}} className="btn btn-secondary nb-3" onClick={()=> navigate('/')}>Back</button>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    )
}
export default UpdateUser;