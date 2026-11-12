import { useState } from 'react';
import './App.css';

function App() {
  const [balance, setBalance] = useState(0);
  const [rate, setRate] = useState(0);
  const [term, setTerm] = useState(15);
  const [output, setOutput] = useState(' ');
  const [schedule, setSchedule] = useState([]);

  function calculate(balance, rate, term) {
    const principal = Number(balance);
    const monthlyInterestRate = Number(rate) / 100 / 12;
    const numberOfPayments = Number(term) * 12

    const growth = (1 + monthlyInterestRate) ** numberOfPayments;
    const monthlyPayment = principal * (monthlyInterestRate * growth) / (growth - 1);

    setOutput(`$${monthlyPayment.toFixed(2)} is your payment.`)

    const rows = [];
    let remainingBalance = principal;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interest = remainingBalance * monthlyInterestRate;
      const principalPaid = monthlyPayment - interest;
      remainingBalance = remainingBalance - principalPaid;

      rows.push({
        month: month,
        payment: monthlyPayment,
        principal: principalPaid,
        interest: interest,
        balance: Math.max(remainingBalance, 0),
      })
    }
    setSchedule(rows);
  }
  
  return (
    <>
      <h1>Mortgage Calculator</h1>

      <div className="form-row">
        <label htmlFor="balance">Loan Balance</label>
        <input id="balance" data-testid="balance" type="number" 
          value={balance} onChange={(e) => setBalance(e.target.value)} />
      </div>

      <div className="form-row">
        <label htmlFor="rate">Interest Rate (%)</label>
        <input id="rate" data-testid="rate" type="number" step="0.01"
          value={rate} onChange={(e) => setRate(e.target.value)} />
      </div>

      <div className="form-row">
        <label htmlFor="term">Loan Term (years)</label>
        <select id="term" data-testid="term"
          value={term} onChange={(e) => setTerm(e.target.value)}>
          <option value="15">15</option>
          <option value="30">30</option>
        </select>
      </div>

      <button data-testid="submit" onClick={() => calculate(balance, rate, term)}>
        Calculate
      </button>

      <div id="output" data-testid="output">{output}</div>

      {schedule.length > 0 && (
        <div className="schedule">
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Payment</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.month}>
                  <td>{row.month}</td>
                    <td>${row.payment.toFixed(2)}</td>
                    <td>${row.principal.toFixed(2)}</td>
                    <td>${row.interest.toFixed(2)}</td>
                    <td>${row.balance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    
    </>
    )
}

export default App
