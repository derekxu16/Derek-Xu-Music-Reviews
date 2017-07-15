import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchToken } from './actions'
import { connect } from 'react-redux'
import { Divider, Segment, Menu, Grid } from 'semantic-ui-react'
import AlbumInfo from './components/AlbumInfo'
import { Link, BrowserRouter, Route, Redirect } from 'react-router-dom'

class App extends Component {
    prepareAlbumList(props) {
        if (props.match.url == '/best-albums') {
            this.setState({albumList : ['0dAMC0nNikIjhD8LeRZfhH']})
        } else {
            this.setState({albumList : ['2B87zXm9bOWvAJdkJBTpzF', '0dAMC0nNikIjhD8LeRZfhH', '0Svz8ykbdCSdXnr65cPUnG']})
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
            <Menu fluid pointing secondary vertical stackable>
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
                <Grid.Column width={3} stretched> <Sidebar /> </Grid.Column>
                <Grid.Column width={13}>
                    <Segment className='App'>
                        {this.props.albumList.map(id => {
                        return (
                            <div>
                                <AlbumInfo albumID={id}/>
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
