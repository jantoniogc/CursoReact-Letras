import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cancion from './components/Cancion';
import Info from './components/Info';


function App() {

  const [busquedaLetra, setBusquedaLetra] = useState({})
  const [letra, setLetra] = useState('');
  const [info, setInfo] = useState({});

  useEffect(() => {
    if (Object.keys(busquedaLetra).length === 0) { return; }
    const consultaAPILetra = async () => {
      const { artista, cancion } = busquedaLetra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      const [letra, informacion] = await Promise.all([
        axios(url),
        axios(url2)
      ]);
      if (Object.keys(letra).length === 0) { return null; }
      setLetra(letra.data.lyrics);
      if (informacion.data.artists === null) { return null; }
      setInfo(informacion.data.artists[0]);

    };
    consultaAPILetra();
  }, [busquedaLetra, info])

  return (
    <Fragment>
      <Formulario
        setBusquedaLetra={setBusquedaLetra}
      >
      </Formulario>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
