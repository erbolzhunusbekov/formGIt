import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl, Spinner } from 'react-bootstrap'
import axios from 'axios';

class ErrorComp extends React.Component{

  render() {
    return (
      <>
        <div className='error'>
          <h1>Error, this page is not found!</h1>
          <button onClick={() => this.props.reTry()} className='buttonName'>RETRY</button>
        </div>
      </>
    )
  }
}

export default ErrorComp;