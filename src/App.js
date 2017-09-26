import React, { Component } from 'react';
import RegisterList from './components/RegisterList.js';
import CourseItem from './components/CourseItem.js';
import eventDays from './data.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      attendees: [],
      firstName: "",
      lastName: "",
      email: "",
      checkBoxes: [],
      selectedDays: [],
      eventDays: eventDays
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCheckboxChange = (e) => {
    let checkBoxes = this.state.checkBoxes;

    let index;

    if (e.target.checked) {
      checkBoxes.push(+e.target.value);
    } else {
      index = checkBoxes.indexOf(+e.target.value);
      checkBoxes.splice(index, 1);
    }
    
    checkBoxes.sort();  
    this.setState({
      checkBoxes: checkBoxes
    });
  }  

  getSelectedDays = (checkedValues) => {
    let selectedDays = this.state.selectedDays;
    for (let day of eventDays) {
      for (let value of checkedValues) {     
        if(day.id === value.toString()){         
          selectedDays.push(day);
        }
      }
    }
    this.setState({
      selectedDays: selectedDays
    });
  }

  deleteAttendee = (index) => {
    const attendees = this.state.attendees;
    attendees.splice(index, 1);
    this.setState({
      attendees: attendees
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getSelectedDays(this.state.checkBoxes);
    var newAttendee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      selectedDays: this.state.selectedDays
    };
    this.setState((prevState) => ({
      attendees: prevState.attendees.concat(newAttendee),
      // Reset field values
      firstName: '',
      lastName: '',
      email: '',
      checkBoxes: [],
      selectedDays: [],
    }));

    this.uncheckInputs();
  }

  // not a 'react' way to handle unchecking
  uncheckInputs = () => {
    const allCheckboxes = document.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < allCheckboxes.length; i++) {
      if (allCheckboxes[i].checked) {
        allCheckboxes[i].checked = false;
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="register" >
          <p className="heading">Form</p>
          <p className="text text-register">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur possimus ipsa eos odio fugit voluptas recusandae tempore excepturi doloremque voluptatem.</p>
          <p className="subtitle">Attendee #1</p>
          <form className="form" onSubmit={this.handleSubmit} ref="form">
            <div className="input-wrap">
              <input className="input input--small" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleInputChange} />
              <input className="input input--small" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleInputChange} />
              <input className="input" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} />
            </div>
            <div className="form-courses">
              <h6 className="subtitle">Choose Courses</h6>
              {this.state.eventDays.map((day) => (
                <CourseItem key={day.id} eventDay={day} onChange={this.handleCheckboxChange} />
              ))}
            </div>
            <button type="submit" className="button">Register</button>
          </form>
        </div>
        <RegisterList attendees={this.state.attendees} delete={this.deleteAttendee} />
      </div>
    );
  }
}

export default App;