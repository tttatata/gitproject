import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from 'react-router-dom';


const Update = ({ inputs, title }) => {

    const [file, setFile] = useState("");
    const [loading, setLoading] = useState(false); // load, xoay vong vong
    const navigate = useNavigate();
    const params = useParams();
    const id = params.userId;
    // const [input, setInput] = useState({
    //     hoTen: "",
    //     cccd: "",
    //     sex: "",
    //     phone: "",
    //     email: "",
    //     birth: "",
    //     start: "",
    //     bike: "",
    //     address: ""
    // });

    const [info, setInfo] = useState({
        username: "",
        identityId: "",
        email: "",
        birth: "",
        address: "",
        phone: "",
        sex: ""
    });


    useEffect(() => {
        fetch(`/users/${id}`, {
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
        data.append("file", file);
        data.append("upload_preset", "upload");
        try {
            const { username,
                identityId,
                email,
                birth,
                address,
                phone, sex } = info;

            const res = await fetch(`/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    identityId,
                    email,
                    birth,
                    address,
                    phone,
                    sex
                })
            });

            const data = await res.json();
            console.log(data);
            alert("cập nhật thành công");
            setLoading(false);
            navigate('/users')

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
                    <div className="left">
                        <img

                            src={
                                info.img
                                    ? info.img
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>

                            <div className="formInput" >
                                <label>Username</label>
                                <input
                                    id="username"
                                    value={info.username}
                                    name="username"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Please enter name"

                                />
                            </div>
                            <div className="formInput" >
                                <label>IdentityId</label>
                                <input
                                    id="identityId"
                                    value={info.identityId}
                                    name="identityId"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Please enter tenant identityId"

                                />
                            </div>

                            <div className="formInput" >
                                <label>Email</label>
                                <input
                                    id="email"
                                    value={info.email}
                                    name="identityId"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Please enter tenant email"

                                />
                            </div>
                            <div className="formInput" >
                                <label>Birth</label>
                                <input
                                    id="birth"
                                    value={info.birth}
                                    name="birth"
                                    onChange={handleChange}
                                    type="date"
                                    placeholder="Please enter tenant birth"

                                />
                            </div>
                            <div className="formInput" >
                                <label>Address</label>
                                <input
                                    id="address"
                                    value={info.address}
                                    name="address"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Please enter tenant birth"

                                />
                            </div>
                            <div className="formInput" >
                                <label>phone</label>
                                <input
                                    id="phone"
                                    value={info.phone}
                                    name="phone"
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Please enter tenant Phone"

                                />
                            </div>
                            <div className="formInput">
                                <label>Sex</label>
                                <select id="sex" name="sex" value={info.sex} onChange={handleChange}>
                                    <option value="nam">nam</option>
                                    <option value="nữ">nữ</option>
                                </select>
                            </div>

                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;
