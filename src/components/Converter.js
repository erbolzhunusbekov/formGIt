import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl, Spinner } from 'react-bootstrap'
import axios from 'axios';

class Converter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      optionValue: 'KGS',
      optionValue2: 'EUR',
      result: 0,
      myInp: '',
      spin: true,
      error: false,
    }
  }

  resultOperation = () => {
    if (this.state.optionValue !== 'EUR' && this.state.optionValue2 !== 'EUR') {
      this.setState({
        result: (this.state.myInp / this.state.data[this.state.optionValue] * this.state.data[this.state.optionValue2])
      })
      console.log(this.state.result)
    } else if (this.state.optionValue === 'EUR') {
      this.setState({
        result: this.state.myInp * this.state.data[this.state.optionValue2]
      })
    }
    else if (this.state.optionValue !== 'EUR') {
      this.setState({
        result: this.state.myInp / this.state.data[this.state.optionValue]
      })
    }
  }

  componentDidMount() {
    this.fetchInf()
  }

  // , {
  //   headers: {
  //     'Cache-Control': 'no-cache'
  //   }
  // }

  fetchInf = () => {
    axios.get('http://data.fixer.io/api/latest?access_key=c023a440b22214d7b69e3199cd10f914&format=1')
      .then(res => {
        console.log(res)
        this.setState({
          data: res.data.rates,
          spin: !this.state.spin,
        })

      })
      .catch((e) => {
        this.setState({
          error: true
        })
      })
      .finally(() => {
        console.log(this.state.spin)

      })
  }

  myClick = () => {
    this.resultOperation()
  }

  retry = () => {
    this.fetchInf()
  }

  current = (elem, elem1) => {
    if (elem === 'from') {
      this.setState({
        optionValue: elem1
      })
    } else {
      this.setState({
        optionValue2: elem1
      })
    }
  }

  inputVal = (e) => {
    this.setState({
      myInp: e
    })
  }

  convert = () => {

    this.setState({
      optionValue: this.state.optionValue2,
      optionValue2: this.state.optionValue
    }, (() => {
      this.resultOperation()
    }))

  }

  errorF = () => {
    this.setState({
      error: false
    }, () => this.fetchInf())
  }

  render() {
    return (
      <>
        {this.state.error ? (
          <div className={'body1'}>
          <div className={'wrapper'}>
            <div className={'content'}>
              <div className={'myContent'}>
                <h2 className={'errorText'}>
                  Проверьте подключение к интернету
                </h2>
              </div>
              <div className={'myCont myContent1'}>
                <Button onClick={() => this.errorF()} variant={'danger'}>
                  ReTry
                </Button>
              </div>
            </div>
          </div>
        </div>
        ) :
          <div className={'body'}>
            <div className={'text-center'}>
              <label for='inp'>
                <h1 className={'text '}>
                  Converter
                </h1>
              </label>
            </div>
            <div className={'wrapper'}>
              <div className={'content'}>
                {this.state.spin ? <div className={'myCont spin'}>
                  <Spinner animation="border" variant="danger" />


                </div> :

                  <>
                    <div className={'myCont'}>
                      <div>
                        <InputGroup className="mb-3">
                          <FormControl
                            placeholder="Conver to ..."
                            type={'number'}
                            onChange={(e) => this.inputVal(e.target.value)}
                            id={'inp'}
                          />
                          <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">{this.state.optionValue}</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </div>
                    </div>
                    <div className={'myCont myCont1'}>
                      <div>
                        <select value={this.state.optionValue} onChange={(e) => this.current('from', e.target.value)} className={'sel'}>
                          {[this.state.optionValue, ...Object.keys(this.state.data)].map(v => {
                            return <option>{v}</option>
                          })}
                        </select>
                      </div>
                      <div>
                        <Button disabled={this.state.optionValue === this.state.optionValue2 || this.state.myInp === '' || this.state.myInp === '0'} onClick={() => this.convert()} variant={'danger'}>
                          Change
                        </Button>
                      </div>
                      <div>
                        <select value={this.state.optionValue2} onChange={(e) => this.current('to', e.target.value)} className={'sel'}>
                          {[this.state.optionValue2, ...Object.keys(this.state.data)].map(v => {
                            return <option>{v}</option>
                          })}
                        </select>
                      </div>
                    </div>
                    <hr />
                    <div className={'myCont myCont1'}>
                      <Button disabled={this.state.optionValue === this.state.optionValue2 || this.state.myInp === '' || this.state.myInp === '0'} onClick={() => this.myClick()} variant={'danger'} className={'w-50 mt-4'}>
                        Convert
                      </Button>
                    </div>
                    <div className={'myCont myCont2'}>
                      <h1>
                        {this.state.result === 0 ? '' : this.state.result.toFixed(2)}
                      </h1>
                    </div>

                  </>

                }
              </div>
            </div>
          </div>}
      </>
    )
  }
}

export default Converter;












// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, InputGroup, FormControl, Spinner } from 'react-bootstrap'
// import axios from 'axios';

// class Converter extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       data: {},
//       optionValue: 'KGS',
//       optionValue2: 'EUR',
//       result: 0,
//       myInp: '',
//       spin: true,
//       error: false,
//     }
//   }

//   resultOperation = () => {
//     if (this.state.optionValue !== 'EUR' && this.state.optionValue2 !== 'EUR') {
//       this.setState({
//         result: (this.state.myInp / this.state.data[this.state.optionValue] * this.state.data[this.state.optionValue2])
//       })
//       console.log(this.state.result)
//     } else if (this.state.optionValue === 'EUR') {
//       this.setState({
//         result: this.state.myInp * this.state.data[this.state.optionValue2]
//       })
//     }
//     else if (this.state.optionValue !== 'EUR') {
//       this.setState({
//         result: this.state.myInp / this.state.data[this.state.optionValue]
//       })
//     }
//   }

//   componentDidMount() {
//     this.fetchInf()
//   }

  // , {
  //   headers: {
  //     'Cache-Control': 'no-cache'
  //   }
  // }

//   fetchInf = () => {
//     axios.get('http://data.fixer.io/api/latest?access_key=c023a440b22214d7b69e3199cd10f914&format=1')
//       .then(res => {
//         console.log(res)
//         this.setState({
//           data: res.data.rates,
//           spin: !this.state.spin,
//         })

//       })
//       .catch((e) => {
//         this.setState({
//           error: true
//         })
//       })
//       .finally(() => {
//         console.log(this.state.spin)

//       })
//   }

//   myClick = () => {
//     this.resultOperation()
//   }

//   retry = () => {
//     this.fetchInf()
//   }

//   current = (elem, elem1) => {
//     if (elem === 'from') {
//       this.setState({
//         optionValue: elem1
//       })
//     } else {
//       this.setState({
//         optionValue2: elem1
//       })
//     }
//   }

//   inputVal = (e) => {
//     this.setState({
//       myInp: e
//     })
//   }

//   convert = () => {

//     this.setState({
//       optionValue: this.state.optionValue2,
//       optionValue2: this.state.optionValue
//     }, (() => {
//       this.resultOperation()
//     }))

//   }

//   errorF = () => {
//     this.setState({
//       error: false
//     }, () => this.fetchInf())
//   }

//   render() {
//     return (
//       <>
//         {this.state.error ? (
//           <div className={'body1'}>
//           <div className={'wrapper'}>
//             <div className={'content'}>
//               <div className={'myContent'}>
//                 <h2 className={'errorText'}>
//                   Проверьте подключение к интернету
//                 </h2>
//               </div>
//               <div className={'myCont myContent1'}>
//                 <Button onClick={() => this.errorF()} variant={'danger'}>
//                   ReTry
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//         ) :
//           <div className={'body'}>
//             <div className={'text-center'}>
//               <label for='inp'>
//                 <h1 className={'text '}>
//                   Converter
//                 </h1>
//               </label>
//             </div>
//             <div className={'wrapper'}>
//               <div className={'content'}>
//                 {this.state.spin ? <div className={'myCont spin'}>
//                   <Spinner animation="border" variant="danger" />


//                 </div> :

//                   <>
//                     <div className={'myCont'}>
//                       <div>
//                         <InputGroup className="mb-3">
//                           <FormControl
//                             placeholder="Conver to ..."
//                             type={'number'}
//                             onChange={(e) => this.inputVal(e.target.value)}
//                             id={'inp'}
//                           />
//                           <InputGroup.Append>
//                             <InputGroup.Text id="basic-addon2">{this.state.optionValue}</InputGroup.Text>
//                           </InputGroup.Append>
//                         </InputGroup>
//                       </div>
//                     </div>
//                     <div className={'myCont myCont1'}>
//                       <div>
//                         <select value={this.state.optionValue} onChange={(e) => this.current('from', e.target.value)} className={'sel'}>
//                           {[this.state.optionValue, ...Object.keys(this.state.data)].map(v => {
//                             return <option>{v}</option>
//                           })}
//                         </select>
//                       </div>
//                       <div>
//                         <Button disabled={this.state.optionValue === this.state.optionValue2 || this.state.myInp === '' || this.state.myInp === '0'} onClick={() => this.convert()} variant={'danger'}>
//                           Change
//                         </Button>
//                       </div>
//                       <div>
//                         <select value={this.state.optionValue2} onChange={(e) => this.current('to', e.target.value)} className={'sel'}>
//                           {[this.state.optionValue2, ...Object.keys(this.state.data)].map(v => {
//                             return <option>{v}</option>
//                           })}
//                         </select>
//                       </div>
//                     </div>
//                     <hr />
//                     <div className={'myCont myCont1'}>
//                       <Button disabled={this.state.optionValue === this.state.optionValue2 || this.state.myInp === '' || this.state.myInp === '0'} onClick={() => this.myClick()} variant={'danger'} className={'w-50 mt-4'}>
//                         Convert
//                       </Button>
//                     </div>
//                     <div className={'myCont myCont2'}>
//                       <h1>
//                         {this.state.result === 0 ? '' : this.state.result.toFixed(2)}
//                       </h1>
//                     </div>

//                   </>

//                 }
//               </div>
//             </div>
//           </div>}
//       </>
//     )
//   }
// }

// export default Converter;