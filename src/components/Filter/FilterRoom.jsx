import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

let FilterRoom = () => {
    
    const [hotelId, setHotelId] = useState(undefined);



    const { data, loading, error } = useFetch("/homes");


    useEffect(() => {
        setHotelId(data);
    }, [data]);

    function onFilterValueChanged(e) {
        console.log(e.target.value);
    }
    return (
        <div className="select-home">
            <div className="formInput">
                <label>Choose a hotel</label>
                <select id="hotelId" onChange={onFilterValueChanged}>
                    <option value="all"> Vui lòng chọn phòng</option>
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
export default FilterRoom;