import Card from './card.js';
import Player from './player.js';
import { unknownHand } from './stateManagement.js';

const nf = new Intl.NumberFormat(navigator.language, { maximumFractionDigits: 1 });

const Table = ({ tableState: { players, communityCards }, strengthData, actionHandler }) => {
    /** Set Player component to a specific player data
 * 
 * @param {*} players Default dealer button position: 0 
 * @param {*} i 
 * @param {*} orientation 
 * @returns Preconfigured component
 */
    const setPlayer = (players, i, orientation) => {
        return (
            <Player orientation={orientation}
                cards={players?.[i]?.cards || unknownHand}
                playerName={players?.[i]?.playerName || (i ? `Player ${i + 1}` : '( you )')}
                active={players?.[i]?.active || 1}
                dealer={players?.[i]?.dealer || !i}
                fold={players?.[i]?.fold}
                percent={strengthData[i] && nf.format(strengthData[i] * 100)}
                odds={strengthData[i] > 0 && strengthData < 1 ? nf.format(Math.min(100, (1 / strengthData[i])) - 1) : undefined} />
        );
    }

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td>{setPlayer(players, 4, 'bottom')}</td>
                        <td>{setPlayer(players, 5, 'bottom')}</td>
                        <td><td>{setPlayer(players, 6, 'bottom')}</td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>{setPlayer(players, 3, 'right')}</td>
                        <td colSpan="3" rowSpan="2">
                            <center>
                                <table class="community"><tbody>
                                    <tr>
                                        {[0, 1, 2, 3, 4].map(i =>
                                        (<td><table><tbody>
                                            <tr>
                                                <td>
                                                    <Card value={communityCards?.[i]?.readableValue} suit={communityCards?.[i]?.suitSymbol} />
                                                </td>
                                            </tr>
                                            <tr><td><span>{'\u2716'}</span></td></tr>
                                        </tbody></table></td>)
                                        )}
                                    </tr>
                                </tbody></table>
                            </center>
                        </td>
                        <td>{setPlayer(players, 7, 'left')}</td>
                    </tr>
                    <tr>
                        <td>{setPlayer(players, 2, 'right')}</td>
                        <td>{setPlayer(players, 8, 'left')}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{setPlayer(players, 1, 'top')}</td>
                        <td>{setPlayer(players, 0, 'top')}</td>
                        <td>{setPlayer(players, 9, 'top')}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};



export default Table;