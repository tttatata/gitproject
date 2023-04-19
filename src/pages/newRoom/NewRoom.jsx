import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
const NewRoom = () => {

  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  // const [hotelId, setHotelId] = useState(undefined);
  // const [rooms, setRooms] = useState([]);
  const [title, setTitle] = useState();


  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const newroom = {
      ...info,
      title
    };
    console.log(newroom)
    // const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`/rooms/`, newroom);
      alert("thành công");
      navigate('/rooms')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              {/* <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div> */}

              <div className="formInput">
                <label>Choose a hotel</label>
                <select className="inputboder" id="title" onChange={(e) => setTitle(e.target.value)} placeholder='Select option'>
                  <option value={null} >Chọn Loại </option>
                  <option value='Phổ thông' >phổ thông</option>
                  <option value='Cao cấp' >cao cấp</option>

                </select>
                {/* <select
                id="hotelId"
                onChange={(e) => setHotelId(e.target.value)}
              >
                {loading
                  ? "loading"
                  : data &&
                  data.map((element) => (
                    <option key={element._id} value={element._id}>{element.name}</option>
                  ))}
              </select> */}
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div >
    </div >
  );
};

export default NewRoom;