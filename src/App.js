
import './App.css';
import Table from './table.js';
import React from 'react';
import { unknownHand, stateReducer } from './stateManagement.js';

function App() {
  //table state (will be modified by the reducer)
  const ts = React.useMemo(() => {
    let ts = { communityCards: [], players: [] };
    for (let i = 0; i < 10; i++) {
      ts.players[i] = {
        cards: unknownHand,
        playerName: undefined,
        active: undefined,
        dealer: undefined
      };
    }
    return ts;
  }, []);

  const strengthData = React.useRef(Array(10));

  const [tableState, actionPerformed] = React.useReducer(stateReducer, ts);

  /** Calculate hand strength if table state has changed */
  React.useEffect(() => {
    //TODO
  }, [tableState]);

  return (
    <div class="app">
      <header>
        <h1>Poker Hand Strength Evaluator</h1>
      </header>
      <table class="main_tbl">
        <tbody>
          <tr>
            <td>
              <Table tableState={tableState} strengthData={strengthData.current} actionHandler={actionPerformed} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
