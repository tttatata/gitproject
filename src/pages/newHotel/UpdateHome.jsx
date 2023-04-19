import "./newHome.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { homesInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateHome = () => {
    const [files, setFiles] = useState("");

    const [rooms, setRooms] = useState();
    const navigate = useNavigate();
    const params = useParams();
    const id = params.homeId;
    console.log(id)
    const [info, setInfo] = useState({

        name: "",
        type: "",
        city: "",
        address: "",
        title: "",
        desc: "",
        featured: "",
        img: ""


    });
    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setInfo((preval) => {
            return {
                ...preval,
                [name]: value,

            }
        })
    }

    console.log(info.img)

    const getdata = async () => {
        const res = await fetch(`/homes/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });


        const data = await res.json();
        console.log(data);


        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setInfo(data)

            // console.log("get data");

        }
    }


    useEffect(() => {
        getdata();
    }, []);

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSelect = (e) => {
        const value = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setRooms(value);
    };

    console.log(files)

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            // const list = await Promise.all(
            //     Object.values(files).map(async (file) => {
            //         const data = new FormData();
            //         data.append("file", file);
            //         data.append("upload_preset", "upload");
            //         const uploadRes = await axios.post(
            //             "https://api.cloudinary.com/v1_1/djdt3mu2j/image/upload",
            //             data
            //         );

            //         const { url } = uploadRes.data;
            //         return url;
            //     })
            // );

            const updatehomes = {
                ...info,

            };

            await axios.put(`/homes/${id}`, updatehomes);
            alert("thành công");
            navigate('/homes')
        } catch (err) { console.log(err) }
    };
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Product</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={info.img}
                            //     files
                            //         ? URL.createObjectURL(files[0])
                            //         : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            // }
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
                                    name="file"
                                    multiple
                                    onChange={(e) => setFiles(e.target.files)}
                                    style={{ display: "none" }}
                                />
                            </div>


                            <div className="formInput" >
                                <label>Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    value={info.name}
                                    onChange={setdata}
                                    type="text"
                                    placeholder="My Hotel"
                                />
                            </div>
                            <div className="formInput" >
                                <label>Type</label>
                                <input
                                    id="type"
                                    name="type"
                                    value={info.type}
                                    onChange={setdata}
                                    type="text"
                                    placeholder="hotel"
                                />
                            </div>
                            <div className="formInput" >
                                <label>City</label>
                                <input
                                    id="city"
                                    name="city"
                                    value={info.city}
                                    onChange={setdata}
                                    type="text"
                                    placeholder="New York"
                                />
                            </div>
                            <div className="formInput" >
                                <label>address</label>
                                <input
                                    id="address"
                                    name="address"
                                    value={info.address}
                                    onChange={setdata}
                                    type="text"
                                    placeholder="elton st, 216"
                                />
                            </div>
                            <div className="formInput" >
                                <label>title</label>
                                <input
                                    id="title"
                                    name="title"
                                    value={info.title}
                                    onChange={setdata}
                                    type="text"
                                    placeholder="The best Hotel"
                                />
                            </div>
                            <div className="formInput" >
                                <label>Description</label>
                                <input
                                    id="desc"
                                    name="desc"
                                    value={info.desc}
                                    onChange={setdata}
                                    type="text"
                                    placeholder=" description"
                                />
                            </div>
                            <div className="formInput">
                                <label>Featured</label>
                                <select id="featured" value={info.featured} onChange={handleChange}>
                                    <option value="false">No</option>
                                    <option value="true">Yes</option>
                                </select>
                            </div>
                            {/* <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                    data.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.title}
                      </option>
                    ))}
                </select>
              </div> */}
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateHome;
