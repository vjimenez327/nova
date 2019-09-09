import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import logo from './logo.svg';
import { BACKEND_SERVER_PORT } from './constants';
import './App.css';
import ListReport from './components/ListReport';
import DateField from './components/DateField';
import Pagination from './components/Pagination';

let SERVICE_URL = `http://localhost:${BACKEND_SERVER_PORT}/api/requests`;

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			result: [],
			date:'',
			pageCount: '',
			currentPage: 1,
		}
	}

	 getReportData = (date = '') => {
		let cursor = date ? `?cursor=${date}` : `?cursor=${this.state.date}`;
		let count = this.state.pageCount ? `&count=${this.state.pageCount}` : '';
		fetch(SERVICE_URL + cursor + count)
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

	setReportDate = (newDate) => {
		this.setState({
			...this.state,
			date: newDate
		})

	 this.getReportData(newDate);
	}

	updateReportData = () => {
		 this.getReportData();
	}

	setCurrentPage = (number) => {
		this.setState({
			...this.state,
			currentPage: number
		})
	} 

	render() {
		let reports = this.state.result.reports || [];
		let date = this.state.date || new Date().toISOString();
		let reportsPerPage = parseInt(this.state.pageCount, 10) || 20;

		const indexOfLastReport = this.state.currentPage * reportsPerPage
		const indexOfFirstReport = indexOfLastReport - reportsPerPage;
		const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Please Choose a Date for the Credit Scores Report!</h1>
				</header>
				<div className="container">
					<DateField date={date} setNewReportDate={this.setReportDate} />
					<ListReport 
					reports={currentReports} 
					archiveReport = {this.archiveReport} updateReportData = {this.updateReportData} /> 
					<Pagination 
					reportsPerPage={reportsPerPage} 
					totalReports={reports.length}
					paginate={this.setCurrentPage}
					/>
				</div>
			</div>
		);
	}
}

export default App;
