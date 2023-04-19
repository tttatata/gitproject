import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Table, TableHead, TableRow } from "@mui/material";

const Datatableuser = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [list, setList] = useState([]);
    const { data, loading, error } = useFetch(`/${path}`);

    const navigate = useNavigate();


    useEffect(() => {
        setList(data);
    }, [data]);


    const handleDelete = async (id) => {
        try {

            await axios.delete(`/${path}/${id}`);
            console.log(id);

            setList(list.filter((item) => item._id !== id));
        } catch (err) { }
    };

    const handleToAdd = async () => {


        try {


            if (path == "users") {
                navigate(`/users/new`);
            }



        } catch (err) { }
    };
    const userColumns = [

        { field: "_id", headerName: "ID", width: 250 },
        {
            field: "user",
            headerName: "User",
            width: 230,
            renderCell: (params) => {
                return (
                    <div className="cellWithImg">
                        <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
                        {params.row.username}
                    </div>
                );
            },
        },
        {
            field: "email",
            headerName: "Email",
            width: 230,
        },

        {
            field: "sex",
            headerName: "Sex",
            width: 50,
        },
        {
            field: "address",
            headerName: "Address",
            width: 250,
        },
        {
            field: "birth",
            headerName: "Birth",
            width: 100,
        },
        {
            field: "phone",
            headerName: "Phone",
            width: 100,
        },
    ];



    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,

            renderCell: (params) => {
                return (
                    <div className="cellAction">



                        <Link style={{ textDecoration: "none" }} to={`/${path}/update${path}/${params.row._id}`} >
                            <div className="viewButton">Edit</div>
                        </Link>

                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row._id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="datatable">
            <div className="datatableTitle">
                {path}
                <div className="link" onClick={() => handleToAdd()}>
                    Add New
                </div>

            </div>
            <DataGrid
                className="datagrid"
                rows={list}
                columns={userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                getRowId={(row) => row._id}
            />

        </div>
    );
};

export default Datatableuser;
