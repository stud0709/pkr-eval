import Card from './card.js';
import Player from './player.js';
import React from 'react';
import { cmdClearCC } from './stateManagement.js';

const Table = ({ tableState, strengthData, actionHandler }) => {
    /** Calculate hand strength if table state has changed */
    React.useEffect(() => {
        //TODO
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