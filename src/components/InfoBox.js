import React, {Component} from 'react'

class InfoBox extends Component {
    render() {
        const data = this.props.info
        console.log(data)
        if (data.hasOwnProperty('artists')) {
            return (
                <div style={infoStyle} >
                    <img style={{alignSelf:'center'}} src={data.images.length > 0 ? data.images[0].url : null} width={200}/>
                    <div style={dataStyle}>
                        <p> <b>Artist:</b> {data.artists.map(n => {return n.name}).join(', ')} </p>
                        <p> <b>Number of tracks: </b> {data.tracks.total} </p>
                        <p> <b>Release Year:</b> {data.releaseDate.slice(0, data.releaseDate.indexOf('-'))} </p>
                        <p> <b>Label:</b> {data.label} </p>
                    </div>
                </div>
            )
        } else {
            return <h3> Loading </h3>
        }
    }
}

const infoStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
}

const dataStyle = {
    display: 'block',
    position: 'static',
    marginLeft: 20,
    textAlign: 'left'
}

export default InfoBox