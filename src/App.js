import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import FilterMenu from './components/FilterMenu';
import './App.css';
import LoginInWithGoogle from "./components/LoginInWithGoogle";

class App extends Component {
    render() {
        return (
            <Grid columns={2}>
                <Grid.Column width={3}>
                    <LoginInWithGoogle />
                </Grid.Column>
                <Grid.Column width={12}>
                    <FilterMenu />
                </Grid.Column>
            </Grid>
        );
    }
}

export default App;