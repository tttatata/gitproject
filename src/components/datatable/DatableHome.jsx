import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Table, TableHead, TableRow } from "@mui/material";

const DatatableHome = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [list, setList] = useState([]);
    const { data, loading, error } = useFetch(`/${path}`);


    const navigate = useNavigate();

    console.log(data)

    useEffect(() => {

        setList(data);
    }, [data]);


    const handleDelete = async (id) => {
        try {

            const res2 = await axios.get(`/${path}/${id}`);
            await axios.delete(`/${path}/${id}`);
            const listroom = res2.data.rooms;
            listroom.forEach(async (listroom) => {
                const deleteroom = await axios.delete(`/rooms/${listroom}`);
            });



            setList(list.filter((item) => item._id !== id));
        } catch (err) { }
    };
    const handleTo = async (id) => {
        try {


            navigate(`/rooms/${id}`);



        } catch (err) { }
    };
    const handleToAdd = async () => {


        try {


            navigate(`/homes/new`);

        } catch (err) { }
    };
    // console.log(ids)

    const homeColumns = [
        { field: "_id", headerName: "ID", width: 250 },
        {
            field: "name",
            headerName: "Name",
            width: 150,
        },
        {
            field: "type",
            headerName: "Type",
            width: 100,
        },
        {
            field: "city",
            headerName: "City",
            width: 100,
        },
        {
            field: "address",
            headerName: "Address",
            width: 100,
        },

        {
            field: "title",
            headerName: "Title",
            width: 230,
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
                        <Link style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <Link to={`/${path}/update${path}/${params.row._id}`} >
                            edit
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleTo(params.row._id)}
                        >
                            viewroom
                        </div>
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
                columns={homeColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                getRowId={(row) => row._id}
            />

        </div>
    );
};

export default DatatableHome;
