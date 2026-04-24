import { useState } from 'react'
import './App.css'

function App() {
  const [amount, setAmount] = useState('')
  const [term, setTerm] = useState('')
  const [rate, setRate] = useState('')
  const [type, setType] = useState('repayment')
  const [results, setResults] = useState(null)

  const calculateMortgage = (e) => {
    e.preventDefault()
    
    const P = parseFloat(amount)
    const r = parseFloat(rate) / 100 / 12
    const n = parseFloat(term) * 12

    if (type === 'repayment') {
      const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      const total = monthly * n
      setResults({
        monthly: monthly.toFixed(2),
        total: total.toFixed(2)
      })
    } else {
      const monthly = P * r
      const total = (monthly * n) + P
      setResults({
        monthly: monthly.toFixed(2),
        total: total.toFixed(2)
      })
    }
  }

  const clearAll = () => {
    setAmount('')
    setTerm('')
    setRate('')
    setType('repayment')
    setResults(null)
  }

  return (
    <main className="container">
      <div className="calculator-box">
        {/* Left Side: Inputs */}
        <section className="inputs">
          <header>
            <h1>Mortgage Calculator</h1>
            <button className="btn-clear" onClick={clearAll}>Clear All</button>
          </header>

          <form onSubmit={calculateMortgage}>
            <div className="form-group">
              <label>Mortgage Amount</label>
              <div className="input-wrapper">
                <span className="unit">ETB</span>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              </div>
            </div>

            <div className="row">
              <div className="form-group">
                <label>Mortgage Term</label>
                <div className="input-wrapper reverse">
                  <span className="unit">years</span>
                  <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} required />
                </div>
              </div>
              <div className="form-group">
                <label>Interest Rate</label>
                <div className="input-wrapper reverse">
                  <span className="unit">%</span>
                  <input type="number" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} required />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Mortgage Type</label>
              <div className={`radio-group ${type === 'repayment' ? 'active' : ''}`}>
                <input type="radio" id="repayment" name="type" value="repayment" checked={type === 'repayment'} onChange={() => setType('repayment')} />
                <label htmlFor="repayment">Repayment</label>
              </div>
              <div className={`radio-group ${type === 'interest-only' ? 'active' : ''}`}>
                <input type="radio" id="interest-only" name="type" value="interest-only" checked={type === 'interest-only'} onChange={() => setType('interest-only')} />
                <label htmlFor="interest-only">Interest Only</label>
              </div>
            </div>

            <button type="submit" className="btn-calculate">
              <img src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='%23133041'%20d='M18.75%202.25H5.25a1.5%201.5%200%200%200-1.5%201.5v16.5a1.5%201.5%200%200%200%201.5%201.5h13.5a1.5%201.5%200%200%200%201.5-1.5V3.75a1.5%201.5%200%200%200-1.5-1.5Zm-10.5%2016.5a1.125%201.125%200%201%201%200-2.25%201.125%201.125%200%200%201%200%202.25Zm0-3.75a1.125%201.125%200%201%201%200-2.25%201.125%201.125%200%200%201%200%202.25ZM12%2018.75a1.125%201.125%200%201%201%200-2.25%201.125%201.125%200%200%201%200%202.25ZM12%2015a1.125%201.125%200%201%201%200-2.25A1.125%201.125%200%200%201%2012%2015Zm3.75%203.75a1.125%201.125%200%201%201%200-2.25%201.125%201.125%200%200%201%200%202.25Zm0-3.75a1.125%201.125%200%201%201%200-2.25%201.125%201.125%200%200%201%200%202.25Zm1.5-5.25a.75.75%200%200%201-.75.75h-9a.75.75%200%200%201-.75-.75V6a.75.75%200%200%201%20.75-.75h9a.75.75%200%200%201%20.75.75v3.75Z'/%3e%3c/svg%3e" alt="calc"></img>
              Calculate Repayments
            </button>
          </form>
        </section>

        {/* Right Side: Results */}
        <section className={`results ${results ? 'has-results' : ''}`}>
          {!results ? (
            <div className="empty-state">
              <img 
                src="calculator.png" 
                alt="Calculator illustration" 
                className="calculator-img"
              />
              <h2>Results shown here</h2>
              <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
            </div>
          ) : (
            <div className="results-content">
              <h2>Your results</h2>
              <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>
              
              <div className="result-card">
                <div className="monthly">
                  <label>Your monthly repayments</label>
                  <div className="price">${Number(results.monthly).toLocaleString()}</div>
                </div>
                <hr />
                <div className="total">
                  <label>Total you'll repay over the term</label>
                  <div className="total-price">${Number(results.total).toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default App