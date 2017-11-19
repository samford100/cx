import React, {Component} from 'react';
import '../css/App.css';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      death: null,
      prediction: null
    }
  }

  componentDidMount() {
    // fetch("/api/test")
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     this.setState({
    //       death: data.death
    //     })
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })

    // fetch("/api/train_death")
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     fetch('/api/test_death')
    //       .then(res => res.json())
    //       .then(da => {
    //         console.log(da)
    //       })
    //       .catch(er => {
    //         console.log(er)
    //       })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

        //   <p>{this.state.death ? this.state.death : "loading"}</p>
        // <p>{this.state.prediction ? JSON.stringify(this.state.prediction) : "loading"}</p>


  render() {
    return (
      <div className="App">
        <Header />
        <Form />
        <Blocks />
        <Footer />

      </div>
    )
  }
}

class Block extends Component {
  render() {
    return (
      <li className="block">
        <div className="circle">
          <span>23</span>
        </div>

        <i className="fa fa-heartbeat fa-5x" aria-hidden="true"></i>
        <i className="fa fa-car fa-5x" aria-hidden="true"></i>
        <i className="fa fa-medkit fa-5x" aria-hidden="true"></i>
        
        <h2>Heart Disease<span> - 50%</span></h2>
        <p>
          Heart disease describes a range of conditions that affect your heart. 
          Diseases under the heart disease umbrella include blood vessel diseases, 
          such as coronary artery disease; heart rhythm problems (arrhythmias); and 
          heart defects you're born with (congenital heart defects), among others.
          The term "heart disease" is often used interchangeably with the term "cardiovascular disease." 
          Cardiovascular disease generally refers to conditions that involve narrowed or blocked blood 
          vessels that can lead to a heart attack, chest pain (angina) or stroke. Other heart conditions, 
          such as those that affect your heart's muscle, valves or rhythm, also are considered forms of 
          heart disease.
        </p>

      </li>
    )
  }
}

class Blocks extends Component {
  render() {
    return (
      <ul>
        <div style={{position:"sticky", top: "200px"}}>
          <div className="teardrop"></div>
        </div>
        <div>
          <Block />
          <Block />
          <Block />
          <Block />
        </div>
      </ul>
    )
  }
}


class Form extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="form">
        <p>I am a &nbsp;
        <input type="number"></input>
        &nbsp; year old &nbsp;
        <select className="minimal">
          <option value="white">White</option>
          <option value="black">Black</option>
        </select>
        &nbsp;
        <select className="minimal">
          <option value="man">Man</option>
          <option value="woman">Woman</option>
        </select>
        &nbsp; from &nbsp;
        <select className="minimal">
          <option value="man">Georgia</option>
          <option value="woman">Illinois</option>
        </select>
        &nbsp; and I am &nbsp;
        <select className="minimal">
          <option value="man">Single</option>
          <option value="woman">Married</option>
          <option value="woman">Divorced</option>
          <option value="woman">Widowed</option>
        </select>
        .


        </p>

        <input className="button" type="button" value="Submit"></input>
      </div>
    )
  }
}


const Header = () => 
  <div className="header">
    <div className='heart-rate'>
      <svg version='1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'
      width='150' height='73' viewBox='0 0 150 73'>
          <polyline fill='none' stroke='#af111c' strokeWidth='3' strokeMiterlimit='10'
          points='0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486'
          />
      </svg>
      <div className='fade-in'></div>
      <div className='fade-out'></div>
    </div>
    <h1>How You Die</h1>
  </div>


const Footer = () => 
  <div className="footer">
    <p>Created for CX6242 at Georgia Tech</p>
    <p><a href="https://www.github.com/samford100/cx">View the source on github</a></p>
  </div>














