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
      <div className="container">
        <h5 className="text-left">Report Date</h5>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            <div className="col-auto my-1">
                <input
                  className="form-control mr-sm-2"
                  name="Report Date"
                  type="date"
                  value={this.state.value}
                  onChange={this.updateReportDate}
                  />
            </div>
            <div className="col-auto my-1">
              <input
                className="btn btn-primary mb-2"
                type="submit"
                value="Generate Report"
              />
            </div>  
          </div>
        </form>
      </div>
    )
  }
}

export default DateField;