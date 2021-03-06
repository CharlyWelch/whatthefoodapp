import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { retrieve } from '../../services/foursquareApi';
import MyResult from './MyResult';
import { loadSaveList } from '../user/actions';
import { loadList } from './actions';

class MyResults extends Component {

  state = {
    venues: []
  };

  componentDidMount() {
    const listKey = this.props.match.params.listKey;
    this.props.loadSaveList(listKey)
      .then(() => {
        return Promise.all(this.props.venueList.map((venueId => {
          return retrieve(venueId);
        })
        )).then(results => {
          this.setState({ venues: results.map((result)=> result.response) });
        });
      });
  }

  render() {
    const listKey = this.props.match.params.listKey;
    const { venues } = this.state;

    return (

      <section className="main-container maxwidth-wrap">
        <div className="body-padding">
          <Link className="back" to="/user">⬅ Back to my list</Link>

          {venues[0] ? 
            <ul className="result-ul">
              {venues.map((venue, index) => <MyResult key={index} {...venue} listKey={listKey}/>)}
            </ul>
            : <p>No Saved Restaurants Yet</p>
          } 
        </div>
      </section>

    );
  }
}

export default connect(

  state => ({ 
    loading: state.loading,
    venueLoad: state.venueLoad,
    listResults: state.listLoad,
    venueList: state.loadSaveResults
  }),
  ({ loadSaveList, loadList })
)(MyResults);