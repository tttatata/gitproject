import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

import DatatableHome from "../../components/datatable/DatableHome"

const ListHome = ({ columns }) => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DatatableHome columns={columns} />
            </div>
        </div>
    )
}

export default ListHome