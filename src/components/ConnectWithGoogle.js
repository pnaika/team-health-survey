import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { checkAuth, load } from '../utils/gsheets';
import { getAvgFromArray } from '../utils/crusher';
import { addData } from '../actions';
import moment from 'moment';
import _ from 'lodash';

class ConnectWithGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    window.gapi.load('client', () => {
      checkAuth(true, this.handleAuth.bind(this));
    });
  }

  handleAuth(result) {
    if(result && !result.error) {
      this.setState({
        auth: true,
      });
      load(this.onLoad.bind(this))
    } else {
      this.setState({
        auth: false,
      });
    }
  }

  onLoad(data, error) {
    if (data) {
      let teamStats = {};
      data.data.forEach((row) => {
        // check if team present
        if (row[16] in teamStats) {
          let key = `${moment(row[0]).year().toString()}-${moment(row[0]).month().toString()}`;
          // check if month and year present
          if (key in teamStats[row[16]]) {
            teamStats[row[16]][key]['value'] = teamStats[row[16]][key]['value'].concat(row[1]);
            teamStats[row[16]][key]['relprcss'] = teamStats[row[16]][key]['relprcss'].concat(row[2]);
            teamStats[row[16]][key]['fun'] = teamStats[row[16]][key]['fun'].concat(row[3]);
            teamStats[row[16]][key]['codehealth'] = teamStats[row[16]][key]['codehealth'].concat(row[4]);
            teamStats[row[16]][key]['learn'] = teamStats[row[16]][key]['learn'].concat(row[5]);
            teamStats[row[16]][key]['prodvis'] = teamStats[row[16]][key]['prodvis'].concat(row[6]);
            teamStats[row[16]][key]['pawn'] = teamStats[row[16]][key]['pawn'].concat(row[7]);
            teamStats[row[16]][key]['spd'] = teamStats[row[16]][key]['spd'].concat(row[8]);
            teamStats[row[16]][key]['prcss'] = teamStats[row[16]][key]['prcss'].concat(row[9]);
            teamStats[row[16]][key]['support'] = teamStats[row[16]][key]['support'].concat(row[10]);
            teamStats[row[16]][key]['team'] = teamStats[row[16]][key]['team'].concat(row[11]);
            teamStats[row[16]][key]['stake'] = teamStats[row[16]][key]['stake'].concat(row[12]);
            teamStats[row[16]][key]['comm'] = teamStats[row[16]][key]['comm'].concat(row[13]);
            teamStats[row[16]][key]['backlog'] = teamStats[row[16]][key]['backlog'].concat(row[14]);
            teamStats[row[16]][key]['ci'] = teamStats[row[16]][key]['ci'].concat(row[15]);
          } else {
            teamStats[row[16]][key] = {
              value: [row[1]],
              relprcss: [row[2]],
              fun: [row[3]],
              codehealth: [row[4]],
              learn: [row[5]],
              prodvis: [row[6]],
              pawn: [row[7]],
              spd: [row[8]],
              prcss: [row[9]],
              support: [row[10]],
              team: [row[11]],
              stake: [row[12]],
              comm: [row[13]],
              backlog: [row[14]],
              ci: [row[15]],
            }
          }
        } else {
          let key = `${moment(row[0]).year().toString()}-${moment(row[0]).month().toString()}`;
          teamStats[row[16]] = {
          };
          teamStats[row[16]][key] = {
            value: [row[1]],
            relprcss: [row[2]],
            fun: [row[3]],
            codehealth: [row[4]],
            learn: [row[5]],
            prodvis: [row[6]],
            pawn: [row[7]],
            spd: [row[8]],
            prcss: [row[9]],
            support: [row[10]],
            team: [row[11]],
            stake: [row[12]],
            comm: [row[13]],
            backlog: [row[14]],
            ci: [row[15]],
          };
        }
      });
      let teamStatsAvg = {};
      _.forOwn(teamStats, function(value, key) {
        _.forOwn(value, function(v, k) {
          if(key in teamStatsAvg) {
              teamStatsAvg[key][k] = {
                value: getAvgFromArray(v['value']),
                relprcss: getAvgFromArray(v['relprcss']),
                fun: getAvgFromArray(v['fun']),
                codehealth: getAvgFromArray(v['codehealth']),
                learn: getAvgFromArray(v['learn']),
                prodvis: getAvgFromArray(v['prodvis']),
                pawn: getAvgFromArray(v['pawn']),
                spd: getAvgFromArray(v['spd']),
                prcss: getAvgFromArray(v['prcss']),
                support: getAvgFromArray(v['support']),
                team: getAvgFromArray(v['team']),
                stake: getAvgFromArray(v['stake']),
                comm: getAvgFromArray(v['comm']),
                backlog: getAvgFromArray(v['backlog']),
                ci: getAvgFromArray(v['ci']),
              };
          } else {
            teamStatsAvg[key] = {};
            teamStatsAvg[key][k] = {
              value: getAvgFromArray(v['value']),
              relprcss: getAvgFromArray(v['relprcss']),
              fun: getAvgFromArray(v['fun']),
              codehealth: getAvgFromArray(v['codehealth']),
              learn: getAvgFromArray(v['learn']),
              prodvis: getAvgFromArray(v['prodvis']),
              pawn: getAvgFromArray(v['pawn']),
              spd: getAvgFromArray(v['spd']),
              prcss: getAvgFromArray(v['prcss']),
              support: getAvgFromArray(v['support']),
              team: getAvgFromArray(v['team']),
              stake: getAvgFromArray(v['stake']),
              comm: getAvgFromArray(v['comm']),
              backlog: getAvgFromArray(v['backlog']),
              ci: getAvgFromArray(v['ci']),
            };
          }
        });
      });
      this.props.addData(teamStatsAvg);
    }
    else {
      console.log('data not loaded error', error);
    }
  }

  render() {
    if(this.state.auth === false) {
      return (
        <Button
          label={"Please sign in"}
          icon='google plus'
          labelPosition='left'
          color='blue'
          onClick={ this.authenticate.bind(this) }
          style={{
            width: 'auto'
          }}
        >
        </Button>
      );
    } else {
      return (
        <Button
          label={"Signed in!"}
          icon='google plus'
          labelPosition='left'
          color='blue'
          onClick={ this.authenticate.bind(this) }
          style={{
            width: 'auto'
          }}
        >
        </Button>
      );
    }
  }

  authenticate(e) {
    e.preventDefault();
    checkAuth(false, this.handleAuth.bind(this));
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ addData }, dispatch);
}

export default connect(null, matchDispatchToProps)(ConnectWithGoogle);
