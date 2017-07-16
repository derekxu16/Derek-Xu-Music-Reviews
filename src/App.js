import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchToken } from './actions'
import { connect } from 'react-redux'
import { Divider, Segment, Menu, Grid, Header } from 'semantic-ui-react'
import AlbumInfo from './components/AlbumInfo'
import { Link, BrowserRouter, Route, Redirect } from 'react-router-dom'

//Dictionary to refer to albums more easily
var URIDict = {
    BonitoGeneration: '0dAMC0nNikIjhD8LeRZfhH',
    CollegeDropout : '3ff2p3LnR6V7m6BinwhNaQ',
    HelplessnessBlues : '3l7iMXJ0jqFnIYZRyCUewC',
    OKComputer : '7dxKtc08dYeRVHt3p9CZJn',
    Melodrama: '2B87zXm9bOWvAJdkJBTpzF',
    ALoveSupreme : '0Svz8ykbdCSdXnr65cPUnG',
    CrackUp : '0xtTojp4zfartyGtbFKN3v', 
}

class App extends Component {
    prepareAlbumList(props) {
        //All time best albums
        if (props.match.url == '/best-albums') {
            this.setState({albumList : [URIDict.BonitoGeneration, URIDict.CollegeDropout, URIDict.HelplessnessBlues, URIDict.OKComputer]})
        } else {
            //Current favourite albums
            this.setState({albumList : ['2B87zXm9bOWvAJdkJBTpzF', '0dAMC0nNikIjhD8LeRZfhH', '0Svz8ykbdCSdXnr65cPUnG', '0xtTojp4zfartyGtbFKN3v']})
        }
    }
    componentWillMount() {
        this.prepareAlbumList(this.props)
    }
    componentWillReceiveProps(props) {
        this.prepareAlbumList(props)
    }
    componentDidMount() {
        //When the app starts, get an authorization token from Spotify
        this.props.dispatch(fetchToken())
    }
  render() {
    return <ReviewPage albumList={this.state.albumList} />
  }
}

function mapStateToProps(state) {
    console.log(state)
    return {
    }
}

class Sidebar extends Component {
    state = { activeItem: 'currentFavourites' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
        const { activeItem } = this.state
        return (
            <Menu fixed='left' pointing secondary vertical>
                <Menu.Item>
                    <Header style={{fontFamily:'Amatic SC', fontSize:35, textAlign:'center'}}>
                    Derek Xu
                        <Header.Subheader size='huge' style={{fontSize:20}}>
                            Music Reviews
                        </Header.Subheader>
                    </Header>
                <Divider fitted />
                </Menu.Item>
                <Menu.Item as={Link} to={'/current-favs'} name='currentFavourites' active={activeItem === 'currentFavourites'} onClick={this.handleItemClick} />
                <Menu.Item as={Link} to={'/best-albums'} name='allTimeBest' active={activeItem === 'allTimeBest'} onClick={this.handleItemClick} />
            </Menu>
        )
    }
}

class ReviewPage extends Component {
    render() {
        return (
            <Grid>
                <Grid.Column width={3}> <Sidebar /> </Grid.Column>
                <Grid.Column width={13}>
                    <Segment className='App'>
                        {this.props.albumList.map(id => {
                        return (
                            <div key={id}>
                                <AlbumInfo albumID={id} key={id /*The key prop will only cause the component to remount if an album is changed*/}/>
                                <Divider />
                            </div>
                        )
                        })}
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(mapStateToProps)(App);
