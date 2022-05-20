/*==================================================
StudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllCampusesThunk, fetchStudentThunk, editStudentThunk, deleteStudentThunk } from "../../store/thunks";
import { StudentView } from "../views";
import { Redirect } from 'react-router-dom';

class StudentContainer extends Component {
  // Get student data from back-end database
  constructor(props){
    super(props);
    this.state = {
      id: props.match.params.id,
      firstname: props.student.firstname, 
      lastname: props.student.lastname, 
      email: props.student.email,
      campusId: props.student.campusId, 
      gpa: props.student.gpa,
      imageurl: props.student.imageurl,

      redirect: false
    };
  }

  componentDidMount() {
    //getting student ID from url
    this.props.fetchStudent(this.props.match.params.id);
    this.props.fetchAllCampuses();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let student = {
        id: this.props.match.params.id,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        campusId: this.state.campusId,
        email: this.state.email,
        gpa: this.state.gpa,
        imageurl: this.state.imageurl
    };   
    // Add new student in back-end database
    let updatedStudent = await this.props.editStudent(student);
    // Update state, and trigger redirect to show the new student
    this.setState({
      id: this.props.match.params.id,
      firstname: updatedStudent.firstname, 
      lastname: updatedStudent.lastname, 
      campusId: updatedStudent.campusId,
      email: updatedStudent.email,
      gpa: updatedStudent.gpa,
      imageurl: updatedStudent.imageurl
    });
  }

  handleDelete = async () => {
    await this.props.deleteStudent(this.props.match.params.id);
    this.setState({
      redirect: true
    })
  }

  // Render Student view by passing student data as props to the corresponding View component
  render() {
    if(this.state.redirect) {
      return (<Redirect to={'/students'}/>)
    }

    return (
      <div>
        <Header />
        <StudentView 
          student={this.props.student}
          handleChange = {this.handleChange} 
          handleSubmit = {this.handleSubmit}
          handleDelete={this.handleDelete} 
          allCampuses = {this.props.allCampuses}
        />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "StudentContainer" to connect to Redux Store.  
// The following 2 input arguments are passed to the "connect" function used by "AllCampusesContainer" component to connect to Redux Store.
const mapState = (state) => {
  return {
    student: state.student,  // Get the State object from Reducer "student"
    allCampuses: state.allCampuses,
    ...state
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    editStudent: (student) => dispatch(editStudentThunk(student)),
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
    deleteStudent: (studentId) => dispatch(deleteStudentThunk(studentId)),
  };
};

// Export store-connected container by default
// StudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(StudentContainer);