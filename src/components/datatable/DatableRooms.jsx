import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Table, TableHead, TableRow } from "@mui/material";

const DatatableRoom = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const [Id, setId] = useState([]);


    const { data, loading, error } = useFetch(`/${path}`);
    useEffect(() => {

        setList(data);
    }, [data]);

    // var data_filter = data.filter(element => element.homeid == Id)
    console.log(list)
    const handleDelete = async (id) => {
        try {
            console.log(path);
            switch (path) {
                case "homes":
                    const res2 = await axios.get(`/ ${path} / ${id}`);
                    await axios.delete(`/ ${path} / ${id}`);
                    const listroom = res2.data.rooms;
                    listroom.forEach(async (listroom) => {
                        const deleteroom = await axios.delete(`/rooms/${listroom}`);
                    });

                    break;
                case "rooms":
                    const idhome = await axios.get(`/homes/ `);

                    // await axios.delete(`/ ${ path } / ${ id } / ${ idhome }`);
                    console.log(idhome);
                    console.log(id);
                    break;
                case "users":
                    await axios.delete(`/${path}/${id}`);
                    console.log(id);
                    break;
                default:
                    break;
            }

            setList(list.filter((item) => item._id !== id));
        } catch (err) { }
    };



    const handleToAdd = async () => {


        try {


            navigate(`/rooms/new`);


        } catch (err) { }
    };



    const Select = () => {

        const [hotelId, setHotelId] = useState(undefined);



        const { data, loading, error } = useFetch("/homes");



        setId(hotelId)

        return (
            <div className="select-home">
                <div className="formInput">
                    <label>Choose a hotel</label>
                    <select
                        id="hotelId"

                        onChange={(e) => setHotelId(e.target.value)}

                    ><option value={"null"}> Vui lòng chọn phòng</option>
                        {loading
                            ? "loading"
                            : data &&
                            data.map((element) => (
                                <option key={element._id} value={element._id}>{element.name}</option>
                            ))}
                    </select>
                </div></div>
        )
    }


    const roomColumns = [
        {
            field: "_id", headerName: "ID", width: 250,

        },


        {
            field: "roomNumbers",
            headerName: "RoomNumber",
            width: 230,
        },
        {
            field: "title",
            headerName: "Title",
            width: 230,
        },

        {
            field: "price",
            headerName: "Price",
            width: 100,
        },
        {
            field: "maxPeople",
            headerName: "Max People",
            width: 100,
        },
        {
            field: "desc",
            headerName: "Description",
            width: 200,
        },
        {
            field: "status",
            headerName: "Status",
            width: 200,
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
            <Select />

            <DataGrid
                className="datagrid"
                rows={list}
                columns={roomColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                getRowId={(row) => row._id}
            />

        </div>
    );
};

export default DatatableRoom;
