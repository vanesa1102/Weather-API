import { Link } from "react-router-dom"
import ciudad from '../images/ciudad.png'
import { HiOutlineLocationMarker } from 'react-icons/hi'

const Ciudad = (props) => {

    const { match } = props;
    let { idCiudad } = match.params;
    
    return (
        <div>
            <Link to={'/'} className="add-city-button home-button">Inicio </Link>
            <div className="portada">
                <img className="portada-imagen" src={ciudad} alt="Bogotá" />

                <div className="portada-ubicacion"><strong> <HiOutlineLocationMarker />{idCiudad}</strong></div>
            </div>
        </div>
    )
}

export default Ciudad;