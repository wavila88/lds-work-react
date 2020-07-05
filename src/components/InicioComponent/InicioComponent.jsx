import React, { Fragment } from 'react';
import YouTube from 'react-youtube';
import './InicioComponent.scss'
import {useHistory} from 'react-router-dom';


const InicioComponent = () => {
    const opts = {
        height: '300',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1
        },
    };
    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    const history = useHistory();

    return (
        <Fragment>
            <div className="inicio">
                <div className="inicio__right">
                    <button type="submit" className="btn btn-success"  onClick={() =>{ history.push('/busqueda');}}>Busco Talento</button>
                </div>
                <div className="inicio__left">
                    <button type="submit" className="btn btn-primary" onClick={() =>{ history.push('/nombresApellidos');}}>Deseo inscribirme</button>
                </div>
                <div className="inicio__youtube">
                    <YouTube videoId="dLlI8YPYXZg" opts={opts} onReady={_onReady} />
                </div>

            </div>
        </Fragment>
    );
}


export default InicioComponent;


