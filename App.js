class App extends React.Component {
  state = {
    inputValue: '',
    selectedItem: '',
    currency: [
      { id: 1, title: 'dollar', ratio: 4.60, sign: '$' },
      { id: 2, title: 'euro', ratio: 3.90, sign: '€' },
      { id: 3, title: 'pound', ratio: 4.90, sign: '£' },
    ],
    products: [
      { id: 0, title: '', price: 0 },
      { id: 1, title: 'gas', price: 2.30 },
      { id: 2, title: 'oil', price: 4.10 },
      { id: 3, title: 'petrol', price: 4.50 },
    ]
  }

  inputHandler = (e) => {
    if (e.target.value >= 0) {
      this.setState({
        inputValue: e.target.value,
      })
    }
  }

  selectHandler = (e) => {
    this.setState({
      selectedItem: e.target.value,
      inputValue: ''
    })
  }

  converterHandler = (qty, ratio, list, product) => {
    const price = list.filter(elem => elem.title === product);

    return (qty * price[0].price / ratio).toFixed(2);
  }

  render() {
    const { inputValue, currency, products, selectedItem } = this.state;
    const resultBoxList = currency.map(elem => {
      return (
        <ResultBox
          key={elem.id}
          title={elem.title}
          sign={elem.sign}
          convertedValue={this.converterHandler(inputValue, elem.ratio, products, selectedItem)}
        />
      )
    })

    return (
      <React.Fragment>
        <div className="container">
          <h1 className="title-container">
            Check price in other currency
          </h1>
          <ProductSelect
            products={products}
            selectEvent={this.selectHandler}
          />
          <ValueToConvert
            value={inputValue}
            inputEvent={this.inputHandler}
          />
          <div className="result-container">
            {resultBoxList}
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

const ValueToConvert = ({ value, inputEvent }) => {
  return (
    <input
      type="number"
      placeholder="write value"
      className="input-text"
      value={value}
      min="0"
      onChange={inputEvent}
    />
  )
}

const ProductSelect = ({ products, selectEvent }) => {
  const elements = products.map(product => {
    return (
      <ProductItem
        key={product.id}
        title={product.title}
      />
    )
  })

  return (
    <select
      className="input-text"
      onChange={selectEvent}
    >
      {elements}
    </select>
  )
}

const ProductItem = ({ title }) => {
  return (
    <option
      value={title}
    >
      {title}
    </option>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));
