/*==================================================
CampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteCampusThunk, editCampusThunk, fetchCampusThunk } from "../../store/thunks";

import { CampusView } from "../views";
import { Redirect } from 'react-router-dom';

class CampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      id: props.match.params.id,
      name: props.campus.name, 
      address: props.campus.address, 
      description: props.campus.description,
      imageurl: props.campus.imageurl,

      redirect: false,
    };
  }
  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
  }
  
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let campus = {
        id: this.props.match.params.id,
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        imageurl: this.state.imageurl
    };
    // Add new student in back-end database
    let updatedCampus = await this.props.editCampus(campus);
    // Update state, and trigger redirect to show the new student
    this.setState({
      id: this.props.match.params.id,
      name: updatedCampus.name, 
      address: updatedCampus.address, 
      description: updatedCampus.description,
      imageurl: updatedCampus.imageurl
    });
  }

  handleDelete = async () => {
    await this.props.deleteCampus(this.props.match.params.id);
    this.setState({
      redirect: true
    })
  }

  // Render a Campus view by passing campus data as props to the corresponding View component
  render() {
    if(this.state.redirect) {
      return (<Redirect to={'/campuses'}/>)
    }

    return (
      <div>
        <Header />
        <CampusView 
          key={this.props.campus.updatedAt}
          campus={this.props.campus}
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
          handleDelete = {this.handleDelete}
        />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "CampusContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
    ...state
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    deleteCampus: (campusId) => dispatch(deleteCampusThunk(campusId))
  };
};

// Export store-connected container by default
// CampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(CampusContainer);