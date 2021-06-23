
import React, { useContext, useEffect, useState } from 'react'
import portada from '../images/portada.jpg'
import monserrate from '../images/monserrate.png'
import plaza from '../images/plaza.jpg'
import candelaria from '../images/candelaria.jpg'
import profile from '../images/profile1.png'
import ciudad from '../images/ciudad.png'
import '../styles/Inicio.css'
import { HiOutlineLocationMarker } from 'react-icons/hi'



const Inicio = (props) => {

    const [clima, setClima] = useState([])
    const [climaOtraCiudad, setClimaOtraCiudad] = useState([])
    const [predicciones, setPredicciones] = useState([])


    //Lista de lugares 
    const lugares = [
        { name: "Monserrate", image: monserrate },
        { name: "Plaza", image: plaza },
        { name: "Candelaria", image: candelaria }
    ]

    useEffect(() => {
        obtenerPredicciones()
        obtenerClima()
        obtenerClimaOtraCiudad()
    }, [])

    const obtenerPredicciones = async () => {
        const data = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=Bogota,CO&appid=81c8bd676695a23a6efbb89c042ed6c3')
        const climas = await data.json()
        setPredicciones(climas)
    }


    const obtenerClima = async () => {
        const data = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Bogota,CO&appid=81c8bd676695a23a6efbb89c042ed6c3')
        const climaActual = await data.json()
        setClima(climaActual)
    }

    const obtenerClimaOtraCiudad = async () => {
        const data = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Medellin,CO&appid=81c8bd676695a23a6efbb89c042ed6c3')
        const climaActualCiudad = await data.json()
        setClimaOtraCiudad(climaActualCiudad)
    }



    const getDay = (day) => {
        var format = day.substr(0, 10).replace(/-/g, ",")
        var date = new Date(format)

        switch (date.getDay()) {
            case 0:
                return "Monday";
            case 1:
                return "Tuesday";
            case 2:
                return "Wednesday";
            case 3:
                return "Thurday";
            case 4:
                return "Friday";
            case 5:
                return "Saturday";
            case 6:
                return "Sunday";
        }
        return ""
    }

    return (
        <div className="container">
            {clima != null > 0 ?
                //Clima actual en Bogotá
                <div className="info-clima-lateral">
                    <div className="clouds">
                        <img src={"http://openweathermap.org/img/wn/" + clima.weather[0].icon + "@2x.png"} alt={clima.weather[0].description} />
                        <div className="clouds-name">
                            {clima.weather[0].main}
                        </div>
                    </div>
                    <div className="temperatura">
                        <p>
                            {Math.round(clima.main.temp - 273.15)} <sup>°c</sup>
                        </p>
                    </div>
                </div>
                :
                <div> </div>
            }

            <div className="portada">
                <img className="portada-imagen" src={portada} alt="Bogotá" />

                <div className="portada-ubicacion"><strong> <HiOutlineLocationMarker />Bogotá</strong></div>
            </div>
            <div className="row sections">
                {predicciones != null > 0 ?
                    <div className="column days-forecast">
                        <p><strong>3 Days </strong>Forecast</p>

                        {/*Clima de mañana a las 12:00*/}
                        <div className="day">
                            <div className="day-left">
                                <img className="day-image" src={"http://openweathermap.org/img/wn/" + predicciones.list[3].weather[0].icon + "@2x.png"} />
                            </div>
                            <div className="day-center">
                                <strong>{getDay(predicciones.list[3].dt_txt)}</strong>
                                <p>{predicciones.list[3].weather[0].main}</p>
                            </div>
                            <div className="day-right">
                                <strong>{predicciones.list[3].dt_txt.substr(8, 2) + '/' + predicciones.list[3].dt_txt.substr(5, 2)}</strong>
                            </div>
                        </div>

                        {/*Clima de pasado mañana a las 12:00*/}
                        <div className="day">
                            <div className="day-left">
                                <img className="day-image" src={"http://openweathermap.org/img/wn/" + predicciones.list[11].weather[0].icon + "@2x.png"} />
                            </div>
                            <div className="day-center">
                                <strong>{getDay(predicciones.list[11].dt_txt)}</strong>
                                <div>{predicciones.list[11].weather[0].main}</div>
                            </div>
                            <div className="day-right">
                                <strong>{predicciones.list[11].dt_txt.substr(8, 2) + '/' + predicciones.list[11].dt_txt.substr(5, 2)}</strong>
                            </div>
                        </div>

                        {/*Clima del tercer día a las 12:00*/}
                        <div className="day">
                            <div className="day-left">
                                <img className="day-image" src={"http://openweathermap.org/img/wn/" + predicciones.list[19].weather[0].icon + "@2x.png"} />
                            </div>
                            <div className="day-center">
                                <strong>{getDay(predicciones.list[19].dt_txt)}</strong>
                                <p>{predicciones.list[19].weather[0].main}</p>
                            </div>
                            <div className="day-right">
                                <strong>{predicciones.list[19].dt_txt.substr(8, 2) + '/' + predicciones.list[19].dt_txt.substr(5, 2)}</strong>
                            </div>
                        </div>
                    </div>
                    :
                    <p>Cargando</p>
                }
                <div className="column place-to-visit">
                    <div className="row">
                        <div className="place-to-visit-title">
                            <p><strong>Place to </strong>visit</p>
                            <a href="" className="big-picture">
                                <img src={lugares[0].image}></img>
                            </a>

                        </div>
                        <div className="place-to-visit-reviews">
                            <div className="column reviews" >
                                + Top Reviews <img src={profile}></img>
                                <img src={profile}></img>
                                <img src={profile}></img>

                            </div>
                            <div className="small-picture">
                                <img src={lugares[2].image}></img>
                            </div>
                            <div className="medium-picture">
                                <img src={lugares[1].image}></img>
                                <a href="add link here" alt={lugares[1].name} >+</a>
                            </div>
                        </div>

                    </div>

                    <div></div>
                </div>
                <div className="locations">
                    {climaOtraCiudad != null > 0 ?
                        <div className="card-city">
                            <div className="card-left">
                                <img className="card-image" src={"http://openweathermap.org/img/wn/02n@2x.png"} />
                            </div>
                            <div className="card-center">
                                <p><strong>{Math.round(climaOtraCiudad.main.temp - 273.15)} <sup> °C </sup></strong></p>
                            </div>
                            <div className="card-right">
                                <strong>{climaOtraCiudad.name}</strong>
                                {climaOtraCiudad.sys.country}
                            </div>
                            <div className="card-bottom">
                                Humidity {climaOtraCiudad.main.humidity}%    -   {climaOtraCiudad.coord.lon > 0 ? <>East</> : <>West</>}   -   {climaOtraCiudad.wind.speed} m/h
                            </div>
                        </div>
                        :
                        <div></div>

                    }
                    <div className="add-city">
                        <button className="add-city-button">Add Locations</button>
                        <img className="add-city-img" src={ciudad} alt="City"></img>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Inicio;