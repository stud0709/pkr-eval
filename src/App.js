
import './App.css';
import Table from './table.js';
import React from 'react';
import { unknownHand, stateReducer, cmdUserEntry } from './stateManagement.js';
import { suits, suitSymbols } from './pkrlib.js';

function App() {
  //table state (will be modified by the reducer)
  const ts = React.useMemo(() => {
    let ts = { communityCards: [], players: [] };
    for (let i = 0; i < 10; i++) {
      ts.players[i] = {
        cards: unknownHand,
        playerName: undefined,
        active: undefined,
        dealer: i === 0
      };
    }
    return ts;
  }, []);

  const strengthData = React.useRef(Array(10));
  const [tableState, actionPerformed] = React.useReducer(stateReducer, ts);
  const inputRef = React.useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      actionPerformed(cmdUserEntry(e.target.value));
      inputRef.current.value = '';
    }
  };

  React.useEffect(() => inputRef.current.focus());

  return (
    <div className="app">
      <header>
        <h1>Poker Hand Strength Evaluator</h1>
      </header>
      <table className="main_tbl">
        <tbody>
          <tr>
            <td>
              <Table tableState={tableState} strengthData={strengthData.current} actionHandler={actionPerformed} />
            </td>
            <td>
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
                  <td>Player specific commands:</td><td>[No][Command]</td>
                </tr>
                <tr>
                  <td>Set cards player 2<br />to&nbsp;A{suitSymbols[0]}5{suitSymbols[2]}:</td><td className="usage2">2a{suits[0]}5{suits[2]}</td>
                </tr>
                <tr>
                  <td>Player 5 fold/undo:</td><td>5f</td>
                </tr>
                <tr>
                  <td>Player 1 clear hand:</td><td>1x</td>
                </tr>
                <tr>
                  <td>Sit out player 4:</td><td>4-</td>
                </tr>
                <tr>
                  <td>Sit in player 4:</td><td>4+</td>
                </tr>
                <tr>
                  <td>Player 8 is dealer:</td><td>8d</td>
                </tr>
              </tbody></table>
            </td>
          </tr>
          <tr>
            <td>Command:&nbsp;<input type="text" onKeyUp={handleKeyDown} ref={inputRef} /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
