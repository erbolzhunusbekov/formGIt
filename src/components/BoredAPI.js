import axios from "axios";
import React from "react";
import { Button } from 'react-bootstrap';
import '../App.css'


class BoredAPI extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      actives: '',
      number: '',
    }
    this.num = [1, 2, 3, 4]
  }

  checkNum = (e) => {
    this.setState({
      number: e
    })
    console.log(+e)
  }

  globalCheck = () => {
    axios.get(`http://www.boredapi.com/api/activity?participants=${this.state.number}`)
      .then((response) => {
        console.log(response.data)
        this.setState({
          actives: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <>
        <div className={'fl'}>
          {this.num.map((v, i) => {
            return (
              <button className={this.state.number === v ? 'dd' : ''} onClick={() => this.checkNum(v)}>
                {v}
              </button>
            )
          })}
        </div>
        <button onClick={() => this.globalCheck()} className={'show'}>
          SHOW
        </button>
        <h1 style={{textAlign: "center"}}>
          {this.state.actives.activity}
        </h1>
      </>
    )
  }
}

export default BoredAPI;