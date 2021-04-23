import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Horario.css'
import axios from 'axios'
import { API_URL } from '../services/apiUrl';




const Horario = () => {

    const [time, guardarTime] = useState('');
    const [timezone, guardarTimeZone] = useState('');
    const [errorFormulario, guardarErrorFormulario] = useState(false);
    const [data, setData] = useState()
    const [errorRest, guardarErroRest] = useState(false)


    const guardarHora = (e) => {
        guardarTime(e.target.value);

    }

    const guardarZonaHoraria = (e) => {
        guardarTimeZone(e.target.value);
    }

    const consumoApi = (e) => {
        e.preventDefault();
        if (time.trim() === '' || timezone.trim() === '') {
            guardarErrorFormulario(true);
            setData('')
            return;
        }

        guardarErrorFormulario(false);
        console.log(time + " " + timezone)
        let url = `${API_URL}utc`;
        axios.post(url, null, {
            params: {
                "hora": time,
                "utc": timezone
            }
        })
            .then(response => {
                console.log(response.data.response);
                setData(response.data.response);
                guardarErroRest(false)


            }).catch(error => {
                guardarErroRest(true);
                setData('');
            })
    }

    return (

        <div className="container mt-5">
            <form>


                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">HORA</label>
                    <input type="text" name="time" className="form-control mt-3" onChange={guardarHora} />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">UTC</label>
                    <input type="number" placeholder="" name="timezone" className="form-control mt-3" onChange={guardarZonaHoraria} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={consumoApi}>Consultar</button>
                {data ? <p id="datautc" className="alert alert-success mt-3">{`Hora: ${data.time}  UTC: ${data.timezone}`}</p> : null}
                {errorRest ? <p className="alert alert-danger mt-3">Error en los datos</p> : null}
                {errorFormulario ? <p className="alert alert-danger mt-3">Ambos campos son obligatorios</p> : null}
            </form>


        </div>
    );
}

export default Horario;