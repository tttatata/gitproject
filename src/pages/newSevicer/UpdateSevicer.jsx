import "./NewSevicer";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { homesInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { sevicerInputs } from "../../formSource";
const UpdateHome = ({ title }) => {


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const id = params.sevicerId;

    const [info, setInfo] = useState({
        sevicerName: "",
        keyword: "",
        price: "",
    });
    useEffect(() => {
        fetch(`/sevicers/${id}`, {
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
        try {

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

                    <div className="right">
                        <form>
                            <div className="formInput" >
                                <label>Sevicer</label>
                                <input
                                    id="sevicername"
                                    name="sevicername"
                                    value={info.sevicername}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="sevicer name"
                                />
                            </div>
                            <div className="formInput" >
                                <label>Key</label>
                                <input
                                    id="keyword"
                                    name="keyword"
                                    value={info.keyword}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="keyword"
                                />
                            </div>
                            <div className="formInput" >
                                <label>Price</label>
                                <input
                                    id="price"
                                    name="price"
                                    value={info.price}
                                    onChange={handleChange}
                                    type="number"
                                    placeholder="12.0000"
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

export default UpdateHome;
