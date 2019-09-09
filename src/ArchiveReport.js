import React from 'react';
import { BACKEND_SERVER_PORT } from './constants';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

let ARCHIVE_URL = `http://localhost:${BACKEND_SERVER_PORT}/api/requests/archive`;

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function ContainedButtons(props) {
  const classes = useStyles();

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
      console.log('success')
      return props.updateReportData();
    });
	}

  const handleClick = async (e) => {
    e.preventDefault();
    console.log('archive reportId', props.reportId)
    await archiveReport(props.reportId);
  }

  return (
    <div>
      <Button size="small" variant="contained" className={classes.button} onClick={handleClick}>
        Archive
      </Button>
    </div>
  );
}