import React, { useEffect } from "react";
import "./content.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { SearchBar } from "../search/SearchBar";
import { SearchResultsList } from "../search/SearchResultsList";

const Adduser = ({ close }) => {




    const [results, setResults] = useState([]);
    console.log(results)

    const [selectedCustomer, setselectedCustomere] = useState(null);
    console.log(selectedCustomer)







    return (
        <div className="modal">
            <a className="close" onClick={close}>
                &times;
            </a>
            <div className="header">Create </div>

            <div className="top">
                <div className="left">
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
                </div>
                <div className="right">
                    <p>Thông tin phòng trọ</p>
                    <input></input>
                </div>
            </div>
            <div className="bottom">
                <div className="left">

                </div>
                <div className="right">

                </div>
            </div>
        </div>

    );
}
export default Adduser;