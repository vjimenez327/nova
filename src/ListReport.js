import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from './Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

const ListReport = (props) => {
  console.log('data', props.reports)

  const classes = useStyles();

  return (
  <Paper className={classes.root}>
    <Table className={classes.table}>
    <TableHead>
          <TableRow>
            <TableCell>Created</TableCell>
            <TableCell>Credit Score</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Birth Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.reports.map(report => (
            <TableRow key={report.id}>
              <TableCell align="left">{report.createdAt}</TableCell>
              <TableCell align="left">{report.id}</TableCell>
              <TableCell component="th" scope="row">
                {report.score}
              </TableCell>
              <TableCell align="left">{report.firstName}</TableCell>
              <TableCell align="left">{report.lastName}</TableCell>
              <TableCell align="left">{report.dob}</TableCell>
              <TableCell align="right"><Button reportId={report.id} archiveReport={props.archiveReport} updateReportData={props.updateReportData}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default ListReport;