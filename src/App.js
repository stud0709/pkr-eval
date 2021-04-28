
import './App.css';
import Table from './Table.js';
import React from 'react';
import { stateReducer, cmdUserEntry, emptyTableState } from './stateManagement.js';
import { suits, suitSymbols } from './pkrlib.js';
import { ToastProvider } from 'react-toast-notifications';
import ReactTooltip from 'react-tooltip';

function App() {
  //table state (will be modified by the reducer)
  const [tableState, actionPerformed] = React.useReducer(stateReducer, emptyTableState());
  const inputRef = React.useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      actionPerformed(cmdUserEntry(e.target.value));
      inputRef.current.value = '';
    }
  };

  React.useEffect(() => inputRef.current.focus());

  React.useEffect(() => {
    const f = e => inputRef.current.focus();
    window.addEventListener('click', f);
    return () => window.removeEventListener('click', f);
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Poker Hand Strength Evaluator</h1>
      </header>
      <table>
        <tbody>
          <tr>
            <td>
              <ToastProvider>
                <Table tableState={tableState} actionHandler={actionPerformed} />
              </ToastProvider>
            </td>
          </tr>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>Command:</td>
                    <td><input type="text" onKeyUp={handleKeyDown} ref={inputRef} focus="true" /></td>
                    <td id="td_help_sign"><span className="help_sign" data-tip="" data-for="help_sign">?</span></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <ReactTooltip id="help_sign">
        <table className="usage"><tbody>
          <tr><td>Card values:</td><td>2...9, 10=t, jqka</td></tr>
          <tr><td>Suits:</td><td>{suitSymbols[0]} = {suits[0]}
            <br />{suitSymbols[1]} = {suits[1]},
                  <br />{suitSymbols[2]} = {suits[2]},
                  <br />{suitSymbols[3]} = {suits[3]}</td>
          </tr>
          <tr>
            <td>Reset:</td><td>xx</td>
          </tr>
          <tr>
            <td>Add A{suitSymbols[0]}J{suitSymbols[1]} as comminuty card:</td><td>ca{suits[0]}j{suits[1]}</td>
          </tr>
          <tr>
            <td>Reset comminuty cards 3...5:</td><td>cx3</td>
          </tr>
          <tr>
            <td>Reset all comminuty cards:</td><td>cx</td>
          </tr>
          <tr>
            <td>Set cards player 2 to&nbsp;A{suitSymbols[0]}5{suitSymbols[2]}:</td><td>2a{suits[0]}5{suits[2]}</td>
          </tr>
          <tr>
            <td>Player 5 fold:</td><td>5f</td>
          </tr>
          <tr>
            <td>Player 5 undo fold:</td><td>5F</td>
          </tr>
          <tr>
            <td>Player 1 reset hand:</td><td>1x</td>
          </tr>
          <tr>
            <td>Sit out player 4 (and fold):</td><td>4-</td>
          </tr>
          <tr>
            <td>Sit in player 4:</td><td>4+</td>
          </tr>
          <tr>
            <td>Player 10 is dealer<br />(starting new game):</td><td className="usage2">10d</td>
          </tr>
        </tbody></table>
      </ReactTooltip>
    </div>
  );
}

export default App;
