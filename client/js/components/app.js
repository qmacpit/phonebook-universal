import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { contacts } from '../actions/actions';

class App extends Component {
  
  constructor(props) {
    super(props);    
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(contacts());
  }

  render() {
    return (
      <div>            
        {
          this.props.contacts.map
          ? (
              <div className="six columns">
                <h5>Contacts</h5>  
                <ul>
                  {
                  this.props.contacts.map((current, index) => {                        
                    return (
                      <li key={index}>
                        <Link to={`/contact/${current.id}`}>{current.name}</Link>
                      </li>
                    )
                  })
                  }
                </ul>
                <Link className='button' to='/add'>add new</Link>
              </div>
            )            
          : ''
        }                
        <div className="six columns">
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {  
  return {
    contacts: state.contacts
  }
}

export default connect(mapStateToProps)(App)