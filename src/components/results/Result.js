import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './result.css';
import { addVenue } from './actions';
import RestaurantDetail from './RestaurantDetail';

class Result extends Component {

  handleAdd(event){ // needs work!
    event.preventDefault();
    addVenue(event.target);
  }

  render() {
    const { name } = this.props.venue;
    const { address } = this.props.venue.location;
    const { message } = this.props.venue.price || 'Not Listed';
    const { id } = this.props.venue;
    const { user } = this.props;

    return (
      <li className="result-li">
        <h2><Link to={`/results/${id}`}>{name}</Link></h2> 
        <p>Price: {message}</p> 
        <p>{address}</p>
        {user &&
          <button onSubmit={this.handleAdd}>Save</button>} 
        {/* button needs attention */}
      </li>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  { addVenue }
)(Result);

// use referral ID to access single restaurant for detail page. Add save button under condition of user logged in. 