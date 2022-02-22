import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap'

class LoaderComp extends React.Component{
  render() {
    return (
      <>
        <Spinner animation="border" variant="primary" />
      </>
    )
  }
}

export default LoaderComp;