import React from 'react';
import axios from 'axios';
import { InputGroup, FormControl, Dropdown, Button, Navbar, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoaderComp from './LoaderComp';
import ErrorComp from './ErrorComp';
import ConvertComponent from './ConvertComponent';


class ConvertComp extends React.Component {
  state = {
    hold: {},
    double: 0
  }

  money = () => {
    this.setState({
      double: 1
    })
    axios.get("http://data.fixer.io/api/latest?access_key=782134e7d0e1f6353f4680b4b83298af")
      .then((response) => {
        this.setState({
          hold: response.data.rates,
          double: 0
        })
      }).catch((error) => {
        this.setState({
          double: 2
        })
      })
  }

  
  componentDidMount() {
    this.money();
  }

  render() {
    if (this.state.double === 1) return <LoaderComp />;
    return (
      <>
        {this.state.double === 2 ? <ErrorComp reTry={() => this.money()} /> : <ConvertComponent hold={this.state.hold} />
        }
        </>
    )
  }

}
export default ConvertComp;





// class ConvertComp extends React.Component {
//   state = {
//     hold: {},
//     spinner: false,
//     erroring: false,
//     every: false
//   }

//   money = () => {
//     this.setState({
//       spinner: true,
//       every: true
//     })
//     axios.get("http://data.fixer.io/api/latest?access_key=782134e7d0e1f6353f4680b4b83298af")
//       .then((response) => {
//         this.setState({
//           hold: response.data.rates,
//           erroring: false,
//           spinner: false,
//           every: false


//         })
//       }).catch((error) => {
//         this.setState({
//           erroring: true,
//           spinner: true,
//           every: true
          

//         })
//       })
//   }

  
//   componentDidMount() {
//     this.money();
//   }

//   render() {
//     if (this.state.spinner) return <LoaderComp />;
//     return (
//       <>
//         {this.state.erroring ? <ErrorComp reTry={() => this.money()} /> : <ConvertComponent hold={this.state.hold} />
//         }
//         </>
//     )
//   }

// }
// export default ConvertComp;