import Hand from './hand.js';

const Player = ({ cards, playerName, active, orientation, percent, odds, dealer, fold }) => {
    return (
        <>
            <table>
                <tbody>
                    {orientation === 'top' &&
                        (<tr><td></td><td><center><div class={'dealer_button' + (dealer ? '' : ' hidden')}>D</div>
                        </center></td></tr>)}
                    {orientation !== 'top' && (
                        <tr>
                            <td></td>
                            <td><input type="checkbox" checked={active ? true : false} />&nbsp;{playerName}</td>
                        </tr>)}
                    <tr>
                        <td>
                            {orientation === 'left' && (<div class={'dealer_button' + (dealer ? '' : ' hidden')}>D</div>)}
                        </td>
                        <td><Hand cards={cards} fold={fold} /></td>
                        <td class="chances">
                            <table><tbody>
                                <tr>
                                    <td>{percent ? `${percent}%` : (<>&nbsp;</>)}</td>
                                </tr>
                                <tr>
                                    <td>{odds ? (<>{odds}<small>:1</small></>) : (<>&nbsp;</>)}</td>
                                </tr>
                                <tr>
                                    <td><span>{'\u21e9'}</span><span>{'\u2716'}</span></td>
                                </tr>
                            </tbody></table>
                        </td>
                        <td>{orientation === 'right' && (<div class={'dealer_button' + (dealer ? '' : ' hidden')}>D</div>)}</td>
                    </tr>
                    {orientation === 'top' && (
                        <tr>
                            <td></td>
                            <td><input type="checkbox" checked={active ? true : false} />&nbsp;{playerName}</td>
                        </tr>)}
                    {orientation === 'bottom' &&
                        (<tr><td></td><td><center>
                            <div class={'dealer_button' + (dealer ? '' : ' hidden')}>D</div>
                        </center></td><td></td></tr>)}
                </tbody>
            </table>
        </>
    );
};

export default Player;