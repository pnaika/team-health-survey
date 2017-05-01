import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, Cell, PieChart} from 'recharts';
import {Col, Row} from "react-bootstrap";

const COLORS = ['green', 'yellow', 'red'];

let pieChartValue = [];
let lineChartData = [];

function crush(data, team, attribute) {
    if (!data) return [];
    let result = [];
    _.forOwn(data[team], (value, key) => {
        result.push(
            {
                name: key,
                value: parseFloat(value.value.toFixed(2)),
                relprcss: parseFloat(value.relprcss.toFixed(2)),
                fun: parseFloat(value.fun.toFixed(2)),
                codehealth: parseFloat(value.codehealth.toFixed(2)),
                learn: parseFloat(value.learn.toFixed(2)),
                prodvis: parseFloat(value.prodvis.toFixed(2)),
                pawn: parseFloat(value.pawn.toFixed(2)),
                spd: parseFloat(value.spd.toFixed(2)),
                prcss: parseFloat(value.prcss.toFixed(2)),
                support: parseFloat(value.support.toFixed(2)),
                team: parseFloat(value.team.toFixed(2)),
                stake: parseFloat(value.stake.toFixed(2)),
                comm: parseFloat(value.comm.toFixed(2)),
                backlog: parseFloat(value.backlog.toFixed(2)),
                ci: parseFloat(value.ci.toFixed(2)),
            }
        );
    });
    console.log('crush',result);
    pieChartValue = getHealthData(result, attribute);
    return result;
}

function getHealthData(result, attribute) {
    let green = 0;
    let red = 0;
    let yellow = 0;
    let value;

    if (!result) return [];

    _.forOwn(result, function(data){
        value = _.omit(data,'name');
        for(let prop in value) {
            if(prop === attribute) {
                if(value[prop] > 1.75){
                    green = green + value[prop];
                } else if(value[prop] >1.2 && value[prop] <1.75) {
                    yellow = yellow + value[prop]
                } else {
                    red = red + value[prop];
                }
            }
        }
    });

    return pieChartValue = [
        {
            name: 'Happy',
            value: green
        },
        {
            name: 'Okaish',
            value: yellow
        },
        {
            name: 'Sad',
            value: red
        }
    ];
}

class ExampleChart extends Component{
    render () {
        lineChartData = crush(this.props.teams, this.props.team, this.props.attribute);
        console.log('pieChartValue : ',pieChartValue);

        return (
            <div>
                {/*<h1>Team Health Survey</h1>*/}
                <div>
                    <Row>
                        <Col xs={8}>
                            <PieChart width={800} height={400} className="Pie-chart-dimensions" onMouseEnter={this.onPieEnter}>
                                <Pie
                                    data={pieChartValue}
                                    cx={120}
                                    cy={200}
                                    innerRadius={30}
                                    outerRadius={40}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                >
                                    {
                                        pieChartValue.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                    }
                                </Pie>
                            </PieChart>
                        </Col>
                        <Col xs={4}>
                            <ul className="list-items">
                                <li style={{ color : "red" }}><span style={{color:"grey"}}>This really sucks and needs to be improved</span></li>
                                <li style={{ color : "yellow" }}><span style={{color:"grey"}}>Some important problems that need addressing</span></li>
                                <li style={{ color : "green" }}><span style={{color:"grey"}}>Team is happy, no major need for improvement</span></li>
                            </ul>
                        </Col>
                    </Row>
                </div>
                <div>
                    <LineChart width={900} height={400}
                               data={lineChartData}
                               className="Line-chart-dimensions"
                               margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis domain={[0, 3]}/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" dataKey={this.props.attribute} stroke="#82ca9d" />
                    </LineChart>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        teams: state.teams.data,
        team: state.team,
        attribute: state.attribute,
    };
}

export default connect(mapStateToProps)(ExampleChart);
