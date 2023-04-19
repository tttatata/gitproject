import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import Datatableuser from "../../components/datatable/Datatableuser"

const ListUser = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Datatableuser  />
            </div>
        </div>
    )
}

export default ListUser