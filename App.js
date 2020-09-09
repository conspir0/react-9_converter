class App extends React.Component {
  state = {
    inputValue: '',
    ratio: {
      euro: 4.60,
      dollar: 3.90
    }
  }

  inputHandler = (e) => {
    if (e.target.value >= 0) {
      this.setState({
        inputValue: e.target.value,
      })
    }
  }

  converterHandler = (value, ratio) => {
    return (value / ratio).toFixed(2);
  }

  render() {
    const { inputValue, ratio } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <h1 className="title-container">
            Write value in PLN
          </h1>
          <input
            type="number"
            placeholder="write value"
            className="input-text"
            value={inputValue}
            min="0"
            onChange={this.inputHandler}
          />
          <div className="result-container">
            <ResultBox
              title="dollar"
              sign="$"
              convertedValue={this.converterHandler(inputValue, ratio.dollar)}
            />
            <ResultBox
              title="euro"
              sign="€"
              convertedValue={this.converterHandler(inputValue, ratio.euro)}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const ResultBox = ({ title, sign, convertedValue }) => {
  return (
    <div className="result-box">
      {title}: {convertedValue} {sign}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
