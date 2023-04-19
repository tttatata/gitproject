
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
export function ListCreate(props) {
    return (
        <div className='productList'>
            <div key={props.id} className='productCard'>

                <p className="row">
                    <h2>
                        <HomeIcon />
                        {props.roomNumbers}
                    </h2>
                    <span
                        className="dot">

                    </span>
                </p>
                <p>{props.title}</p>


                <span>
                    <MonetizationOnIcon />
                    {props.price}
                </span>
                <br />11
                <br />
                <div className="active" >




                </div>

            </div>
        </div>
    )
}