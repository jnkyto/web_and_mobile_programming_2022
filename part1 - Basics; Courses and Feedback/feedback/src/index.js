/*

DTEK2040 PART 1
Joona Kytöniemi 523008
jnkyto@utu.fi

feedback-app
Implementation of Part 1.6 thru 1.10

*/

import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) => {
  return (
    <header>
      <h1>{text}</h1>
    </header>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({text, value}) => {
  return (
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Statistics = ({i, j, k, l, m}) => {
  return (
    <table>
      <tbody>
        <Statistic text="Hyvä" value={i} />
        <Statistic text="Neutraali" value={j} />
        <Statistic text="Huono" value={k} />
        <Statistic text="Keskiarvo" value={l} />
        <Statistic text="Positiivisia" value={m} />
      </tbody>
    </table>
  )
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      all_clicks: [],
      good_val: 0,
      neut_val: 0,
      bad_val: 0
    }
  }

  clickGood = () => {
    this.setState({
      good_val: this.state.good_val + 1,
      all_clicks: this.state.all_clicks.concat('g')
    })
  }

  clickNeut = () => {
    this.setState({
      neut_val: this.state.neut_val + 1,
      all_clicks: this.state.all_clicks.concat('n')
    })
  }

  clickBad = () => {
    this.setState({
      bad_val: this.state.bad_val + 1,
      all_clicks: this.state.all_clicks.concat('b')
    })
  }

  average = () => {
    if(this.state.all_clicks.length === 0)   {
      return 0
    }
    else return (this.state.good_val - this.state.bad_val) / this.state.all_clicks.length
  }

  percentage = () => {
      if(this.state.all_clicks.length === 0)   {
        return 0
      }
      else return (this.state.good_val / this.state.all_clicks.length)*100
  }

  render()  {
    const check_feedback_existence = () => {
      if(this.state.all_clicks.length > 0)  {
        return (
          <div>
            <Statistics
              i={this.state.good_val}
              j={this.state.neut_val}
              k={this.state.bad_val}
              l={this.average()}
              m={this.percentage() + " %"}
            />
          </div>
        )
      }
      else return (
        <div>
          <p>Ei yhtään palautetta annettu.</p>
        </div>
      )
    }
    return (
        <div className="app">
          <Header text="Anna palautetta" />
          <Button
            handleClick={() => this.clickGood()}
            text="Hyvä"
          />
          <Button
            handleClick={() => this.clickNeut()}
            text="Neutraali"
          />
          <Button
            handleClick={() => this.clickBad()}
            text="Huono"
          />
          <Header text="Statistiikka" />
          <div>{check_feedback_existence()}</div>
        </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
