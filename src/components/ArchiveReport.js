import React from 'react';
import { BACKEND_SERVER_PORT } from '../constants';

let ARCHIVE_URL = `http://localhost:${BACKEND_SERVER_PORT}/api/requests/archive`;

export default function ArchiveReport(props) {

  const archiveReport = (requestId) => {
		let reportId = {id: requestId}

		fetch(ARCHIVE_URL, {
			headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
			method: 'PATCH',
			body: JSON.stringify(reportId)
		})
		.then(res => res.json())
    .then(result => {
      console.log('Successfully Archived')
      return props.updateReportData();
    });
	}

  const handleClick = (e) => {
    e.preventDefault();
    archiveReport(props.reportId);
  }

  return (
    <div>
      <button 
        type="button" 
        className="btn btn-primary btn-sm" variant="contained" 
        onClick={handleClick}>
        Archive
      </button>
    </div>
  );
}