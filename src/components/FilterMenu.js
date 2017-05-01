import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTeam, addAttribute } from '../actions';
import { Dimmer, Loader } from 'semantic-ui-react'
import _ from 'lodash';
import GraphContent from "./GraphContent";
import {DropdownButton, MenuItem, Button} from "react-bootstrap";

const attributes = [
    'value', 'relprcss', 'fun', 'codehealth', 'learn', 'prodvis', 'pawn', 'spd', 'prcss', 'support', 'team', 'stake', 'comm', 'backlog', 'ci'
];

class FilterMenu extends Component {
    constructor(props) {
        super(props);
        this.handleTeamClick = this.handleTeamClick.bind(this);
        this.getTeamNames = this.getTeamNames.bind(this);
        this.state = {
            activeItem: 'python',
        };
    }

    handleTeamClick (name) {
        this.props.addTeam(name);
    }

    handleAttClick (name) {
        this.props.addAttribute(name);
    }

    getTeamNames() {
        let result = [];
        _.forOwn(this.props.teams, (v, k) => {
            result.push(
                <MenuItem key={k} name={k} active={this.props.team === k} onSelect={()=>this.handleTeamClick(k)}>
                    {k}
                </MenuItem>
            );
        });
        if (result.length === 0) return (
            <Dimmer active inverted>
                <Loader />
            </Dimmer>
        );
        return result;
    }

    render() {
        let attributeList = attributes.map(d => (
            <Button name={d}
                    active={this.props.attribute === d}
                    onClick={()=>this.handleAttClick(d)}
                    className="bottom-button"
            >{d}</Button>
        ));

        let teamDropDownResult = this.getTeamNames();
        let selectedName = _.without(_.map(teamDropDownResult, function(res) {
            if(_.get(res,['props','active']))
                return res.props.name
        }));

        if (selectedName.length === 0) {
            selectedName = "Select Team";
        }

        return (
            <div>
                <DropdownButton title={selectedName} id="bg-nested-dropdown">
                    {teamDropDownResult}
                </DropdownButton>
                <GraphContent />
                <div>
                    {attributeList}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        teams: state.teams.data,
        team: state.team,
        attribute: state.attribute
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ addTeam, addAttribute }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(FilterMenu);
