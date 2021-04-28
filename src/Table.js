import Card from './Card.js';
import Player from './Player.js';
import React from 'react';
import { cmdClearCC } from './stateManagement.js';
import { useToasts } from 'react-toast-notifications';


const Table = ({ tableState, actionHandler }) => {
    const [strengthData, setStrengthData] = React.useState(Array(10));
    const workerRef = React.useRef(new Worker('./worker.js', { type: 'module' }));
    const useToastsRef = React.useRef(useToasts());

    React.useEffect(() => {
        if (tableState.error) {
            useToastsRef.current.addToast(tableState.error, {
                appearance: 'error',
                autoDismiss: true
            })
        };
        tableState.error = undefined;

        //calculate strength
        let message = { pocketCards: [], communityCards: [], activePlayers: [] };
        tableState.players.forEach((p, i) => {
            if (!p.active) return;

            if (p.cards?.[0]?.value) {
                message.pocketCards.push(p.cards.map(c => `${c.value}${c.suit}`));
            } else {
                message.pocketCards.push([]);
            }
            message.activePlayers.push(i);
        });

        message.communityCards = tableState.communityCards.map(c => `${c.value}${c.suit}`);

        workerRef.current.onmessage = (result) => {
            const s = Array(10);
            result.data.strength.forEach((v, i) => {
                let idx = result.data.activePlayers[i];
                s[idx] = v;
            });
            setStrengthData(s);
        };

        workerRef.current.postMessage(message);
    }, [tableState]);


    const { players, communityCards } = tableState;

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td><Player
                            orientation="bottom"
                            actionHandler={actionHandler}
                            playerNo={4}
                            players={players}
                            strengthData={strengthData} />
                        </td>
                        <td><Player
                            orientation="bottom"
                            actionHandler={actionHandler}
                            playerNo={5}
                            players={players}
                            strengthData={strengthData} />
                        </td>
                        <td><Player
                            orientation="bottom"
                            actionHandler={actionHandler}
                            playerNo={6}
                            players={players}
                            strengthData={strengthData} />
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><Player
                            orientation="right"
                            actionHandler={actionHandler}
                            playerNo={3}
                            players={players}
                            strengthData={strengthData} />
                        </td>
                        <td colSpan="3" rowSpan="2">
                            <center>
                                <table className="community"><tbody>
                                    <tr>
                                        {[0, 1, 2, 3, 4].map(i =>
                                        (<td key={`Card${i}`}><table><tbody>
                                            <tr>
                                                <td>
                                                    <Card
                                                        value={communityCards?.[i]?.readableValue}
                                                        suit={communityCards?.[i]?.suitSymbol}
                                                        red={communityCards?.[i]?.suit === 'd' || communityCards?.[i]?.suit === 'h'}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <abbr
                                                        className={'toolbar_button' + (communityCards?.[i] ? '' : ' hidden')}
                                                        onClick={() => actionHandler(cmdClearCC(i))}
                                                    >
                                                        {'\u2716'}
                                                    </abbr>
                                                </td>
                                            </tr>
                                        </tbody></table></td>)
                                        )}
                                    </tr>
                                </tbody></table>
                            </center>
                        </td>
                        <td><Player
                            orientation="left"
                            actionHandler={actionHandler}
                            playerNo={7}
                            players={players}
                            strengthData={strengthData} />
                        </td>
                    </tr>
                    <tr>
                        <td><Player
                            orientation="right"
                            actionHandler={actionHandler}
                            playerNo={2}
                            players={players}
                            strengthData={strengthData} />
                        </td>
                        <td><Player
                            orientation="left"
                            actionHandler={actionHandler}
                            playerNo={8}
                            players={players}
                            strengthData={strengthData} />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><Player
                            orientation="top"
                            actionHandler={actionHandler}
                            playerNo={1}
                            players={players}
                            strengthData={strengthData} />
                        </td>
                        <td><Player
                            orientation="top"
                            actionHandler={actionHandler}
                            playerNo={0}
                            players={players}
                            strengthData={strengthData} />
                        </td>
                        <td><Player
                            orientation="top"
                            actionHandler={actionHandler}
                            playerNo={9}
                            players={players}
                            strengthData={strengthData} />
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};



export default Table;