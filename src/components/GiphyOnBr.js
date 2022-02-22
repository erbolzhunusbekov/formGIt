import axios from 'axios';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class GiphyOnBr extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hold: [],
      text: '',
      ss: false,
    }
  }

  componentDidMount() {
    axios.get('https://api.giphy.com/v1/gifs/trending?api_key=1LaLYtzbwXej37HXcnWaaBTCwsr4Rz79&rating=g&limit=5')
      .then((response) => {
        console.log(response.data.data)
        this.setState({
          hold: response.data.data
        })
      })
      .catch((error) => {
        console.log(error);
        toast.error('Проверьте подключение к интернету')
      })
      
  }

  apiToGif = () => {
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=1LaLYtzbwXej37HXcnWaaBTCwsr4Rz79&q=${this.state.text}&limit=5`)
      .then((response) => {
        toast.success(`Ваш поиск: ${this.state.text}`)
        console.log(response)
        this.setState({
          hold: response.data.data,
          ss: !this.state.ss
        })
      })
      .catch((error) => {
        toast.error('Не удалось совершить поиск')
        console.log(error);
      })
      .finally( () => {
        this.setState({
          ss: !this.state.ss
        })
      });
    console.log('try')
  }

  changeVal = (e) => {
    this.setState({
      text: e
    })
  }

  render() {
    return (
      <>
        <h1>
          Gifs
        </h1>
        <input type={'text'} placeholder={'Что искать??? '} onChange={(e) => this.changeVal(e.target.value)} />


        {this.state.ss ?  <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </Button> : <Button className={'btn'} variant={'primary'} style={{ marginBottom: 20 }} onClick={() => this.apiToGif()}>
          Check
        </Button>}

       

        
        <div>
          {this.state.hold.map(v => {
            return (
              <img className={'img'} src={v.images.original.url} />
            )
          })}
        </div>
        <ToastContainer />
      </>
    )
  }
}

export default GiphyOnBr;