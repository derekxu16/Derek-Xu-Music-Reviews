import { requestAlbum, receiveAlbum, fetchAlbum } from '../actions'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import InfoBox from './InfoBox'
import { Header, Accordion, Icon, Container } from 'semantic-ui-react'
import reviews from '../review'

class AlbumInfo extends Component {
    componentDidMount() {
        //console.log("LOOK HERE")
        //console.log(this.props)
        this.setState({fetched : false})
    }
    componentWillReceiveProps(props) {
        const { dispatch } = this.props
        //console.log(props.albumData.hasOwnProperty('name'))
        if (props.token && !this.state.fetched && !props.albumData.hasOwnProperty('name')) {
            //If there is no data and the token has been assigned, request album data
            dispatch(fetchAlbum(this.props.albumID))
            this.state.fetched = true
        }
    }
    render() {
        images = []
        artists = []
        let info = {}
        if (this.props.albumData.hasOwnProperty('name')) {
            var { name, images, artists, label, releaseDate, tracks, link } = this.props.albumData
            info = {
                name : name,
                artists : artists,
                tracks: tracks,
                label : label,
                releaseDate : releaseDate,
                images: images     
            }
        }
        return (
            <div className="albumInfo">
                <Header as='h2'> <a href={link && link}> {name} </a>
                    <Header.Subheader>
                        {artists.length > 0 ? artists[0].name : 'Loading'}
                    </Header.Subheader>
                </Header>
                <InfoBox info={info} />
                <Accordion>
                    <Accordion.Title>
                        <Icon name='dropdown' />
                        My thoughts
                    </Accordion.Title>
                    <Accordion.Content>
                        <Container text>
                        <p> {reviews[this.props.albumID]} </p>
                        </Container>
                    </Accordion.Content>
                </Accordion>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    //After the album data has been returned by Spotify, map it to the component's props
    let targetAlbum = ownProps.albumID
    return Object.assign(
        {},
        { albumData : Object.assign({}, 
            'albumData' in state && targetAlbum in state.albumData ? state.albumData[targetAlbum] : {})
        },
        {token : state.token}
    )
}

export default connect(mapStateToProps)(AlbumInfo)