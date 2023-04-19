import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
const UpdateRoom = ({ title }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const id = params.roomsId;

    const [info, setInfo] = useState({
        roomNumbers: "",
        title: "",
        price: "",
        maxPeople: "",
        desc: ""
    });








    useEffect(() => {
        fetch(`/rooms/${id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => { console.log(responseData); return responseData; })
            .then(data => { setInfo(data) })

            .catch(err => {
                console.log("fetch error" + err);
            });
    }, [])




    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("upload_preset", "upload");
        try {
            const { roomNumbers,
                title,
                price,
                maxPeople,
                desc } = info;

            const res = await fetch(`/rooms/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    roomNumbers,
                    title,
                    price,
                    maxPeople,
                    desc

                })
            });

            const data = await res.json();
            console.log(data);
            alert("cập nhật thành công");
            setLoading(false);
            navigate('/rooms')

            // setUPdata(data2);
        } catch (error) {
            alert("Error Occured!" + error.response.data.message
            );
            setLoading(false);
        }
    };

    console.log(info);

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">

                    <div className="right">
                        <form>


                            <div className="formInput" >
                                <label>Room Number</label>
                                <input
                                    id="roomNumbers"
                                    value={info.roomNumbers}
                                    name="roomNumbers"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Please enter name"

                                />
                            </div>
                            <div className="formInput">
                                <label>Title</label>
                                <select id="title" name="title" value={info.title} onChange={handleChange}>
                                    <option value="Phổ thông">Phổ thông</option>
                                    <option value="Cao cấp">Cao cấp</option>
                                </select>
                            </div>



                            <div className="formInput" >
                                <label>Price</label>
                                <input
                                    id="price"
                                    value={info.price}
                                    name="price"
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="Please enter tenant email"

                                />
                            </div>
                            <div className="formInput" >
                                <label>Max People </label>
                                <input
                                    id="maxPeople"
                                    value={info.maxPeople}
                                    name="maxPeople"
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="Please enter tenant birth"

                                />
                            </div>
                            <div className="formInput" >
                                <label>Address</label>
                                <input
                                    id="desc"
                                    value={info.desc}
                                    name="desc"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Please enter tenant birth"

                                />
                            </div>


                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateRoom;