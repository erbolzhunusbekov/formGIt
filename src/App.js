import React from 'react';
import './App.css';
import GiphyOnBr from './components/GiphyOnBr'
import BoredAPI from './components/BoredAPI'
import LoaderComp from './components/LoaderComp';
import Converter from './components/Converter'
import AnotherConverter from './components/AnotherConverter'
import ConvertComponent from './components/ConvertComponent'
import ErrorComp from './components/ErrorComp';
import Taylor from './components/Taylor/Taylor'

class App extends React.Component {
  render() {
    return (
      <>
        <GiphyOnBr /> 
        {/* <BoredAPI /> */}
        {/* <Converter /> */}
        {/* <ConvertComp /> */}
        {/* <LoaderComp /> */}
        {/* <AnotherConverter /> */}
        {/* <ErrorComp /> */}
        {/* <Taylor /> */}
        {/* <GiphyOnBr /> */}
      </>
    )
  }
}

export default App;
