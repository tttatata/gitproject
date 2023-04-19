import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"


import DatatableSevicer from "../../components/datatable/DatableSevicer"

const ListSevicer = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DatatableSevicer />
            </div>
        </div>
    )
}

export default ListSevicer