import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Table, TableHead, TableRow } from "@mui/material";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`);
  const { data2 } = useFetch(`/homes`);
  const navigate = useNavigate();
  const ids = location.pathname.split("/")[2];
  console.log(data)

  useEffect(() => {
    setList(data);
  }, [data]);

  // const load = async () => {
  //   const res = await fetch(`/homes/${ids}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   });
  //   const data = await res.json();
  //   const idr = data.rooms
  //   const STOCKS = [];
  //   idr.forEach(async (idr) => {

  //     const res2 = await fetch(`/rooms/${idr}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     });

  //     const data2 = await res2.json();


  //   })



  // }

  // load();
  const handleDelete = async (id) => {
    try {
      console.log(path);
      switch (path) {
        case "homes":
          const res2 = await axios.get(`/${path}/${id}`);
          await axios.delete(`/${path}/${id}`);
          const listroom = res2.data.rooms;
          listroom.forEach(async (listroom) => {
            const deleteroom = await axios.delete(`/rooms/${listroom}`);
          });

          break;
        case "rooms":
          const idhome = await axios.get(`/homes/`);

          // await axios.delete(`/${path}/${id}/${idhome}`);
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
  const handleTo = async (id) => {
    try {
      console.log(path);
      switch (path) {
        case "homes":

          navigate(`/rooms/${id}`);

          break;

        default:
          break;
      }


    } catch (err) { }
  };
  const handleToAdd = async () => {


    try {

      if (path == "homes") {
        navigate(`/homes/new`);
      }
      if (path == "users") {
        navigate(`/users/new`);
      }

      if (path == "rooms") {
        navigate(`/rooms/${ids}/new`);
      }

    } catch (err) { }
  };
  // console.log(ids)


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
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />

    </div>
  );
};

export default Datatable;
