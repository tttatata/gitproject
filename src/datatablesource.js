export const userColumns = [

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

export const homeColumns = [
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

export const roomColumns = [
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
