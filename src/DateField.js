import React, {Component} from 'react';


class DateField extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.date
    }
  }

  updateReportDate = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.setNewReportDate(this.state.value);
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="Report Date"
          type="date"
          value={this.state.value}
          onChange={this.updateReportDate}
         />
        <input
          type="submit"
          value="Generate Report"
         />
      </form>
    )
  }
}

export default DateField;