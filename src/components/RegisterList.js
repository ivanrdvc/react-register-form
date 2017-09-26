import React, { Component } from 'react';

class RegisterList extends Component {
  courseItemColor(day) {
    return { background: day.color };
  }

  render() {
    const attendees = this.props.attendees.map((item, index) => (
      <div className="attendee" key={index}>        
        <div className="attendee__header">
          <span>Attendee #{index + 1}</span>
          <span className="attendee__delete" onClick={() => {this.props.delete(index)}}>Delete</span>
        </div>
        <div className="attendee__name">{item.firstName} {item.lastName}</div>
        <div className="attendee__email">{item.email}</div>
        <div className="attendee__list">
          {item.selectedDays.map(day => (
            <div key={day.id} className="attendee__item">
              <div className="attendee__item-img" style={this.courseItemColor(day)}></div>
              <p className="attendee__item-name">{day.name}</p>
            </div>
          ))}
        </div>
      </div>
    ));

    return (
      <div className="register-list">
        <p className="heading">Item List</p>
        {attendees.length > 0 ? attendees : "No registered Attendees."}
      </div>
    );
  }  
}

export default RegisterList;