import React from 'react';
import { InputGroup, FormControl, Dropdown, Button, Navbar, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class ConvertComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cur: 'KGS',
      cur1: 'EUR',
      inValue: '',
      result: '',
    }
  }

  convert = () => {
    if (this.state.cur !== 'EUR' && this.state.cur1 !== 'EUR') {
      this.setState({
        result: (this.state.inValue / this.props.hold[this.state.cur]) * this.props.hold[this.state.cur1]
      })
    } else if (this.state.cur === 'EUR') {
      this.setState({
        result: this.state.inValue * this.props.hold[this.state.cur1]
      })

    } else if (this.state.cur1 === 'EUR') {
      this.setState({
        result: this.state.inValue / this.props.hold[this.state.cur]
      })
    }
  }
  
  reverse = () => {
    this.setState({
      cur: this.state.cur1,
      cur1: this.state.cur,
    }, () => this.convert())
  }


  currency = (s, v) => {
    if (s === 'from') {
      this.setState({
        cur: v
      })
    }
    else if (s === 'to') {
      this.setState({
        cur1: v
      })
    }
  }

  inp = (i) => {
    this.setState({
      inValue: i
    })
  }
  

  render() {
    return (
        <>
          <div className='text-center'>
            <Navbar className='navbar' variant="dark">
              <Navbar.Brand href="#home">
                <span>
                  <img
                    alt=""
                    src="https://images-na.ssl-images-amazon.com/images/I/41XvwpEmyPL.png"
                    width="40"
                    height="40"
                    color='white'
                    className="d-inline-block align-top"
                  />{' '}
                  <h3>
                    EXCHANGE CURRENCY
                  </h3>
                </span>
              </Navbar.Brand>
            </Navbar>
          </div>
          <div className={'text-center cc'}>
            <h1 className={'m-3'}>
              Converter
            </h1>


            <div>
              <div className={'ggg'}>
                <div className={''}>
                  <InputGroup className="m-3 " >
                    <FormControl
                      placeholder="Convert to ..."
                      type='number'
                      value={this.state.inValue}
                      onChange={(i) => this.inp(i.target.value)}
                    />
                    <InputGroup.Append className={''}>
                      <InputGroup.Text className={'bac'} bg-success>{this.state.cur}</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </div>
              <div>
                <select className={'sel m-3'} value={this.state.cur} onChange={(from) => this.currency('from', from.target.value)}>
                  {['', ...Object.keys(this.props.hold)].map((v) => {
                    return <option value={v}>{v}</option>;
                  })}
                </select>



                <select className={'sel m-3'} value={this.state.cur1} onChange={(to) => this.currency('to', to.target.value)}>
                  {['', ...Object.keys(this.props.hold)].map((v) => {
                    return <option value={v}>{v}</option>
                  })}
                </select>
              </div>
              <div>
                <Button disabled={this.state.cur1 === this.state.cur || this.state.inValue === ''} onClick={() => this.convert()} className={'m-3 button_convert'} variant={'success'} >
                  Convert
                </Button>
                <Button onClick={() => this.reverse()} disabled={this.state.cur1 === this.state.cur || this.state.inValue === ''} className={'m-3 button_convert'} variant={'success'} >
                  Reverse
                </Button>
                <div>

                </div>
              </div>
            </div>


            <h2>{this.state.result === 0 ? '' : this.state.result}</h2>
          </div>
          </>
    )
  }
}

export default ConvertComponent;