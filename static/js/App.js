import React, {Component} from 'react';
import '../css/App.css';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      death: null,
      prediction: null,
      deaths: null
    }
  }

  componentDidMount() {
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

  submitQuery = (data) => {
    console.log(data)
    const deaths = [
        {
          age: 23,
          ways: [
            {
              name: "Heart Attack",
              chance: .50,
              desc: ` Heart disease describes a range of conditions that affect your heart. 
                      Diseases under the heart disease umbrella include blood vessel diseases, 
                      such as coronary artery disease; heart rhythm problems (arrhythmias); and 
                      heart defects you're born with (congenital heart defects), among others.
                      The term "heart disease" is often used interchangeably with the term "cardiovascular disease." 
                      Cardiovascular disease generally refers to conditions that involve narrowed or blocked blood 
                      vessels that can lead to a heart attack, chest pain (angina) or stroke. Other heart conditions, 
                      such as those that affect your heart's muscle, valves or rhythm, also are considered forms of 
                      heart disease.`

            },
            {
              name: "Car Accident",
              chance: .25,
              desc: `A traffic collision, also called a motor vehicle collision (MVC) among other terms, occurs when a vehicle collides with another vehicle, pedestrian, animal, road debris, or other stationary obstruction, such as a tree, pole or building. Traffic collisions often result in injury, death, and property damage.`
            },
            {
              name: "Cancer",
              chance: .1,
              desc: `Cancer is a group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body.[2][8] These contrast with benign tumors, which do not spread to other parts of the body.[8] Possible signs and symptoms include a lump, abnormal bleeding, prolonged cough, unexplained weight loss, and a change in bowel movements.[1] While these symptoms may indicate cancer, they may have other causes.[1] Over 100 types of cancers affect humans.`
            }
          ]
        },
        {
          age: 27,
          ways: [
            {
              name: "Fart Attack",
              chance: .50,
              desc: ` Heart disease describes a range of conditions that affect your heart. 
                      Diseases under the heart disease umbrella include blood vessel diseases, 
                      such as coronary artery disease; heart rhythm problems (arrhythmias); and 
                      heart defects you're born with (congenital heart defects), among others.
                      The term "heart disease" is often used interchangeably with the term "cardiovascular disease." 
                      Cardiovascular disease generally refers to conditions that involve narrowed or blocked blood 
                      vessels that can lead to a heart attack, chest pain (angina) or stroke. Other heart conditions, 
                      such as those that affect your heart's muscle, valves or rhythm, also are considered forms of 
                      heart disease.`

            },
            {
              name: "Car Accident",
              chance: .25,
              desc: `A traffic collision, also called a motor vehicle collision (MVC) among other terms, occurs when a vehicle collides with another vehicle, pedestrian, animal, road debris, or other stationary obstruction, such as a tree, pole or building. Traffic collisions often result in injury, death, and property damage.`
            },
            {
              name: "Cancer",
              chance: .1,
              desc: `Cancer is a group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body.[2][8] These contrast with benign tumors, which do not spread to other parts of the body.[8] Possible signs and symptoms include a lump, abnormal bleeding, prolonged cough, unexplained weight loss, and a change in bowel movements.[1] While these symptoms may indicate cancer, they may have other causes.[1] Over 100 types of cancers affect humans.`
            }
          ]
        },
        {
          age: 50,
          ways: [
            {
              name: "Heart Attack",
              chance: .50,
              desc: ` Heart disease describes a range of conditions that affect your heart. 
                      Diseases under the heart disease umbrella include blood vessel diseases, 
                      such as coronary artery disease; heart rhythm problems (arrhythmias); and 
                      heart defects you're born with (congenital heart defects), among others.
                      The term "heart disease" is often used interchangeably with the term "cardiovascular disease." 
                      Cardiovascular disease generally refers to conditions that involve narrowed or blocked blood 
                      vessels that can lead to a heart attack, chest pain (angina) or stroke. Other heart conditions, 
                      such as those that affect your heart's muscle, valves or rhythm, also are considered forms of 
                      heart disease.`

            },
            {
              name: "Car Accident",
              chance: .25,
              desc: `A traffic collision, also called a motor vehicle collision (MVC) among other terms, occurs when a vehicle collides with another vehicle, pedestrian, animal, road debris, or other stationary obstruction, such as a tree, pole or building. Traffic collisions often result in injury, death, and property damage.`
            },
            {
              name: "Cancer",
              chance: .1,
              desc: `Cancer is a group of diseases involving abnormal cell growth with the potential to invade or spread to other parts of the body.[2][8] These contrast with benign tumors, which do not spread to other parts of the body.[8] Possible signs and symptoms include a lump, abnormal bleeding, prolonged cough, unexplained weight loss, and a change in bowel movements.[1] While these symptoms may indicate cancer, they may have other causes.[1] Over 100 types of cancers affect humans.`
            }
          ]
        }
    ]
    console.log(deaths)

    // setTimeout(() => {
      this.setState({
        deaths: deaths
      })
    // }, 1000)


  }

  render() {
    // load from source

    return (
      <div className="App">
        <Header />
        <Form submitQuery={this.submitQuery} />
        {this.state.deaths ? <Blocks deaths={this.state.deaths} /> : null}
        <Footer />
      </div>
    )
  }
}


class Block extends Component {
  constructor() {
    super()
    this.state = {
      selected: 0
    }
  }

  onHover = (x) => {
    // console.log(x)
    this.setState({
      selected: x
    })
  }

  render() {

    const mappedWays = this.props.death.ways.map(way => <BlockInfo name={way.name} chance={way.chance} desc={way.desc} />)
    console.log(mappedWays)
    return (
      <li className="block">
        <div className="circle">
          <span style={{display: "inline-block", height: ".5em"}}>{this.props.death.age}</span><br />
          <span style={{fontSize: "12px"}}>years old</span>
        </div>
        <div className="icons">
          <i className={this.state.selected == 0 ? "fa fa-heartbeat fa-5x i-selected" : "fa fa-heartbeat fa-5x icon"} onMouseEnter={() => this.onHover(0)}></i>
          <i className={this.state.selected == 1 ? "fa fa-car fa-5x i-selected" : "fa fa-car fa-5x icon"} onMouseEnter={() => this.onHover(1)}></i>
          <i className={this.state.selected == 2 ? "fa fa-medkit fa-5x i-selected" : "fa fa-medkit fa-5x icon"} onMouseEnter={() => this.onHover(2)}></i>
        </div>

        {mappedWays[this.state.selected]}

      </li>
    )
  }
}

const BlockInfo = ({name, chance, desc}) => 
  <div>
    <h2>{name}<span> - {chance * 100}%</span></h2>
    <p className="blockDesc">{desc}</p>
  </div>


class Blocks extends Component {
  render() {

    const mappedBlocks = this.props.deaths.map(death => <Block death={death} />)
    // console.log(mappedBlocks)
    return (
      <ul>
        <div style={{position:"sticky", top: "200px"}}>
          <div className="teardrop"></div>
        </div>
        <div>
          {mappedBlocks}
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
        <input type="number" defaultValue={23}></input>
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
        &nbsp; with a &nbsp;
        <select className="minimal">
          <option value="man">Bachelor's</option>
          <option value="woman">Master's</option>
        </select>
        &nbsp; degree, and I am &nbsp;
        <select className="minimal">
          <option value="man">Single</option>
          <option value="woman">Married</option>
          <option value="woman">Divorced</option>
          <option value="woman">Widowed</option>
        </select>
        .
        </p>
        <input className="button" type="button" value="Submit" onClick={() => this.props.submitQuery("fakedata")}></input>
      </div>
    )
  }
}

const Loading = () => {
  <div className="loading">

  </div>
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
    <p><span>Created for CX6242 at Georgia Tech by Sam Ford, John Giordono, Joe Mosby, Aaron Parry, and Rodolfo Soborio | </span><span><a href="https://www.github.com/samford100/cx">View the source on github</a></span></p>
    
  </div>














