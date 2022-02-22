import axios from 'axios';
import React from 'react';
import './Taylor.css'
import LoaderComp from '../LoaderComp'

class Taylor extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      array: [1, 2, 3, 4],
      number: '',
      activity: '',
      part: '',
      myState: false,
    }
  }

  btnV(value) {
    this.setState({
      number: value
    })
  }

  show() {
    this.setState({
      myState: true
    })
    axios.get(`http://www.boredapi.com/api/activity?participants=${this.state.number}`)
      .then((res) => {
        this.setState({
          activity: res.data.activity,
          part: res.data.participants,
          myState: false
        })
      })
  }


  render() {
    return (
      <>


        <div className={'content'}>
          {this.state.array.map((value) => {
            return (
              <button onClick={() => this.btnV(value)} className={this.state.number === value ? 'red btn' : 'btn'}>
                {value}
              </button>
            )
          })}
        </div>
        <div className={'show'}>
          <button onClick={() => this.show()}>
            Show
          </button>
        </div>


        {this.state.myState
          ?
          <div className={'text'}>
            <LoaderComp />
          </div>
          :
          <>
            <h1 className={'text'}>
              {this.state.activity}
            </h1>
            <h3 className={'text'}>
              {this.state.part === '' ? '' : `For ${this.state.part} people`}
            </h3>
          </>
        }


      </>
    )
  }
}

export default Taylor;