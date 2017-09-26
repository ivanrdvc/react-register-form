import React from 'react';

const CourseItem = (props) => {
  const courseItemColor = {
    backgroundColor: props.eventDay.color
  }

  return (
    <div className="course-item">
      <div className="course-item-img" style={courseItemColor}></div>
      <label className="course-item-label">
      <div>
        <p className="course-item-name">{props.eventDay.name}</p>
        <p className="course-item-text">{props.eventDay.description}</p>
      </div>
      <div className="course-item-input">
        <input className="course-item-checkbox" type="checkbox" value={props.eventDay.id} name={props.eventDay.value} onChange={props.onChange} />
      </div>
      </label>
    </div>
  );
};

export default CourseItem;