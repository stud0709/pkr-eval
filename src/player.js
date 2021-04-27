import Hand from './hand.js';
import { cmdActive, cmdResetSingle, cmdFold, cmdDealer } from './stateManagement.js';
import { unknownHand } from './stateManagement.js';

const nf = new Intl.NumberFormat(navigator.language, { maximumFractionDigits: 1 });

const Player = ({ orientation, actionHandler, playerNo, players, strengthData }) => {
    const cards = players?.[playerNo]?.cards || unknownHand;
    const playerName = players?.[playerNo]?.playerName || (playerNo ? `Player ${playerNo + 1}` : '( you )');
    const active = players?.[playerNo]?.active === undefined ? 1 : players[playerNo].active;
    const dealer = players?.[playerNo]?.dealer;
    const fold = players?.[playerNo]?.fold;
    const percent = strengthData[playerNo] && nf.format(strengthData[playerNo] * 100);
    const odds = strengthData[playerNo] > 0 && strengthData < 1 ? nf.format(Math.min(100, (1 / strengthData[playerNo])) - 1) : undefined;

    return (
        <>
            <table>
                <tbody>
                    {orientation === 'top' &&
                        (<tr><td></td><td><center>
                            <div className={'dealer_button' + (dealer ? '' : '_off')}
                                onClick={() => actionHandler(cmdDealer(playerNo))}>D</div>
                        </center></td></tr>)}
                    {orientation !== 'top' && (
                        <tr>
                            <td></td>
                            <td>
                                <input type="checkbox"
                                    checked={active ? true : false}
                                    title="Sit in/out"
                                    onChange={event => actionHandler(cmdActive(playerNo, event.target.checked))}
                                />
                                &nbsp;{playerName}
                            </td>
                        </tr>)}
                    <tr>
                        <td>
                            {orientation === 'left' && (<div className={'dealer_button' + (dealer ? '' : '_off')}
                                onClick={() => actionHandler(cmdDealer(playerNo))}>D</div>)}
                        </td>
                        <td><Hand cards={cards} fold={fold} /></td>
                        <td className="chances">
                            <table><tbody>
                                <tr>
                                    <td>{percent ? `${percent}%` : (<>&nbsp;</>)}</td>
                                </tr>
                                <tr>
                                    <td>{odds ? (<>{odds}<small>:1</small></>) : (<>&nbsp;</>)}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <abbr
                                            //fold
                                            className={'toolbar_button' + (cards?.[0]?.readableValue && active ? '' : ' hidden')}
                                            onClick={() => actionHandler(cmdFold(playerNo, !fold))}
                                            title={fold ? 'Undo fold' : 'Fold'} >
                                            {fold ? '\u21ea' : '\u21e9'}
                                        </abbr>
                                        <abbr
                                            //reset cards
                                            className={'toolbar_button' + (cards?.[0]?.readableValue ? '' : ' hidden')}
                                            onClick={() => actionHandler(cmdResetSingle(playerNo))}
                                            title="Reset hand">
                                            {'\u2716'}
                                        </abbr>
                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                        <td>{orientation === 'right' && (<div className={'dealer_button' + (dealer ? '' : '_off')}
                            onClick={() => actionHandler(cmdDealer(playerNo))}>D</div>)}</td>
                    </tr>
                    {orientation === 'top' && (
                        <tr>
                            <td></td>
                            <td>
                                <input type="checkbox"
                                    checked={active ? true : false}
                                    title="Sit in/out"
                                    onChange={(event) => actionHandler(cmdActive(playerNo, event.target.checked))}
                                />
                                &nbsp;{playerName}</td>
                        </tr>)}
                    {orientation === 'bottom' &&
                        (<tr><td></td><td><center>
                            <div className={'dealer_button' + (dealer ? '' : '_off')}
                                onClick={() => actionHandler(cmdDealer(playerNo))}>D</div>
                        </center></td><td></td></tr>)}
                </tbody>
            </table>
        </>
    );
};

export default Player;