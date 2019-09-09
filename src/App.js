import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import logo from './logo.svg';
import { BACKEND_SERVER_PORT } from './constants';
import './App.css';
import ListReport from './ListReport';
import DateField from './DateField';

let SERVICE_URL = `http://localhost:${BACKEND_SERVER_PORT}/api/requests`;

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			result: [],
			qsParams: {
				cursor: ''
			}
		}
	}

	 getReportData = () => {
		let qs = '?' + Object.keys(this.state.qsParams)
		.map(k => k + '=' + this.state.qsParams[k])
		.join('&');

		fetch(SERVICE_URL + qs)
		.then(res => res.json())
		.then(result => {
			this.setState({ 
				result
			})
		});
	}
		
	componentDidMount() {
		this.getReportData();
	}

	setReportDate = async (newDate) => {
		await this.setState({
			qsParams : {
				...this.state.qsParams,
				cursor: newDate
			} 
		})

		await this.getReportData();
	}

	updateReportData = async () => {
		await this.getReportData();
	}


 getFormattedDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	return yyyy + "-" + mm + "-" + dd  ;
}

	render() {
		let reports = this.state.result.reports || [];
		let date = this.state.qsParams.cursor || this.getFormattedDate();
		
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to Nova's code challenge!</h1>
					</header>
					<DateField date={date} setNewReportDate={this.setReportDate} />
					<ListReport reports={reports} archiveReport = {this.archiveReport} updateReportData = {this.updateReportData} /> 

			</div>
		);
	}
}

export default App;
