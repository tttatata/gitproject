import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Table, TableHead, TableRow } from "@mui/material";

const DatatableSevicer = ({ columns }) => {
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [list, setList] = useState([]);
    const { data, loading, error } = useFetch(`/${path}`);
    const navigate = useNavigate();
    console.log(data)

    useEffect(() => {
        setList(data);
    }, [data]);
    console.log(list)
    const handleDelete = async (id) => {
        try {

            await axios.delete(`/${path}/${id}`);


            setList(list.filter((item) => item._id !== id));
        } catch (err) { }
    };

    const handleToAdd = async () => {


        try {
            navigate(`/${path}/new`);

        } catch (err) { }
    };
    const sevicerColumns = [
        {
            field: "_id", headerName: "ID", width: 250,

        },

        {
            field: "sevicername",
            headerName: "Name",
            width: 230,
        },

        {
            field: "keyword",
            headerName: "KeyWord",
            width: 100,
        },
        {
            field: "price",
            headerName: "Price",
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
                columns={sevicerColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                getRowId={(row) => row._id}
            />

        </div>
    );
};

export default DatatableSevicer;
