import React, { Fragment}  from 'react';
import YouTube from 'react-youtube';
import './InicioComponent.scss'

const InicioComponent = () =>{
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1
        },
    };
   const _onReady =(event) =>{
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }

    return(
        <Fragment>
            <div className="inicio">
              <button type="submit" className="btn btn-success">Busco Talento</button>
              <button type="submit" className="btn btn-primary">Deseo inscribirme</button>
            <YouTube videoId="dLlI8YPYXZg" opts={opts} onReady={_onReady} />
            </div>
        </Fragment>
    );
}


export default InicioComponent;