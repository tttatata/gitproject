import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"


import DatatableRoom from "../../components/datatable/DatableRooms"

const ListRoom = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DatatableRoom />
            </div>
        </div>
    )
}

export default ListRoom