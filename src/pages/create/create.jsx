import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./create.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Button, Checkbox, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Popup from "reactjs-popup";
import Adduser from "../../components/content/adduser";
import { ListCreate } from "../list/listcreate";
import { Dialog } from 'primereact/dialog';
import Popups from "../../components/popup/Popup";
import { SearchBar } from "../../components/search/SearchBar";
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TransgenderIcon from '@mui/icons-material/Transgender';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";

const Create = () => {

    //////xu ly trong dialog
    const navigate = useNavigate();
    const [selectedSevicer, setselectedSevicer] = useState([null]);
    const handleChange = (e) => {
        const value = e.target.value
        const checked = e.target.checked

        console.log(value, checked)
        if (checked) {
            setselectedSevicer([
                ...selectedSevicer, value
            ])
        }
        else {
            setselectedSevicer(selectedSevicer.filter((e) => (e !== value)))
        }
    }
    async function handleClick(e) {
        e.preventDefault();
        try {
            const newContract = {

                homeid: selectedRoom._id,
                userid: selectedCustomer._id,
                sevicers: selectedSevicer
            };
            await axios.post("/contracts/", newContract);
            alert("thành công");
            setResults("");
            setselectedCustomere("")
            var status = "Đang thuê"

            const res3 = await fetch(`/rooms/${selectedRoom._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status,
                })
            });
            setselectedSevicer(null)
            setOpenPopup(false)
        } catch (err) {
            console.log(err);
        }
    }
    ////
    const [results, setResults] = useState([]);
    console.log(results)

    const [selectedCustomer, setselectedCustomere] = useState("");
    console.log(selectedCustomer)

    const [openPopup, setOpenPopup] = useState(false)
    ////
    ///xulitrong trang create
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [list, setList] = useState([]);
    const [selectedRoom, setselectedRoom] = useState("");
    const [info, setInfo] = useState({});

    const [loadSevicer, setloadSevicer] = useState([]);
    const { data, loading, error } = useFetch(`/rooms`);
    useEffect(() => {
        fetch(`/sevicers/`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(response => { return response.json(); })
            .then(responseData => { console.log(responseData); return responseData; })
            .then(data2 => { setloadSevicer(data2) })

            .catch(err => {
                console.log("fetch error" + err);
            });
        setList(data);

    }, []);

    // console.log(selectedRoom)
    // console.log(selectedSevicer)
    return (
        <>
            <div className="home">
                <Sidebar />
                <div className="homeContainer">
                    <Navbar />
                    <div className="datatable">
                        <div className="datatableTitle">


                        </div>
                        <div className="widgets">

                            <div className="roomtiem">
                                {data.map((element, id) => (

                                    <div className="room" onClick={() => {
                                        setselectedRoom(element)
                                        setOpenPopup(true)

                                    }}>
                                        <p className="row">
                                            <h2>
                                                <HomeIcon />
                                                {element.roomNumbers}
                                            </h2>
                                            <span
                                                className="dot">
                                                {element.status}
                                            </span>
                                        </p>
                                        <p>{element.title}</p>
                                        <span>
                                            <MonetizationOnIcon />
                                            {element.price}
                                        </span>
                                        <br />
                                        <br />
                                        <div className="active" >



                                        </div>
                                    </div>




                                ))}
                            </div>
                            {/* {data.map((element, id) => (
                            <ListCreate
                                key={element.id}
                                name={element.roomNumbers}
                                price={element.price}

                                timeLeft={element.title}
                                rating={element.rating}
                            />
                        ))} */}
                        </div>
                    </div>
                </div >

            </div >
            <Popups
                title="Create"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>

                <div className="modal">
                    <div className="search-bar-container">

                        <SearchBar setResults={setResults} />
                        {results && results.length > 0 &&
                            //<SearchResultsList results={results} />
                            (
                                <div className="results-list">
                                    {results.map((result, id) => {
                                        return (
                                            <div onClick={() => setselectedCustomere(result)}>
                                                {result.phone}
                                            </div>)

                                    })}
                                </div>
                            )}
                    </div>

                    <div className="top">
                        <div className="form-create">
                            <h2 className="form-title">Create contract</h2>
                            <br />
                            <div className="form-top">
                                <div className="left">
                                    <h3>Thông tin phòng trọ</h3>
                                    <div className="inforoom">
                                        <p> <HomeIcon />Room:<span>{selectedRoom.roomNumbers}</span></p>
                                        <p><ChecklistRtlIcon /> Type:  <span>{selectedRoom.title}</span></p>
                                        <p><MonetizationOnIcon />Price:  <span >{selectedRoom.price}</span></p>
                                    </div></div>



                                <div className="right">
                                    <h3 >Thông tin khách thuê</h3>
                                    <p > <AssignmentIndIcon />Name:{selectedCustomer.username}</p>
                                    <div className="right-row1">

                                        <p > <CreditCardIcon />ID card:{selectedCustomer.identityId}</p>
                                        <p> <TransgenderIcon />sex:{selectedCustomer.sex}</p>
                                    </div>
                                    <div className="right row2">
                                        <p> <AlternateEmailIcon />email:{selectedCustomer.email}</p>
                                        <p> <ContactPhoneIcon />phone:{selectedCustomer.phone}</p>
                                    </div>

                                </div>
                            </div>
                            <div className="form-bottom">
                                <div className="form-table" >
                                    <p>Sevicer </p>
                                    <Table aria-label="simple table" size="small" className="table" >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Check</TableCell>
                                                <TableCell>Sevicer name</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className="table-body" >
                                            {loadSevicer.map((row) => (

                                                <TableRow
                                                    ChecklistRtlIcon
                                                    onClick={() => {
                                                        setselectedSevicer(row)
                                                    }}
                                                    key={row._id}
                                                    className="table-row"
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        <Checkbox value={row._id} onChange={handleChange} />
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.sevicerName}
                                                    </TableCell>
                                                    <TableCell align="right">{row.price}</TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table></div>


                            </div>



                        </div>
                    </div>
                    <br />
                    <div className="wrapper-button"> <button onClick={handleClick}
                        className="send-button">Send</button></div>

                </div>

            </Popups>
        </>
    );
};

export default Create;
