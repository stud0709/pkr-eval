import { Card } from './pkrlib.js';

const unknownCard = { readableValue: undefined, suitSymbol: undefined };
const unknownHand = [unknownCard, unknownCard];
const TYPE_CMD = 'cmd',
    TYPE_GUI = 'gui',
    CMD_RESET = 'xx',
    CMD_RESET_SINGLE = 'x',
    CMD_FOLD = 'f',
    CMD_DEALER = 'd',
    CMD_SIT_OUT = '-',
    CMD_SIT_IN = '+';

const stateReducer = (state, action) => {
    console.log(JSON.stringify(action));

    switch (action.type) {
        case TYPE_CMD:
            switch (action.params) {
                case CMD_RESET:
                    reset(state);
                    break;
                default:
                    //pos. 1 is player number
                    let playerNo = action.params[0];
                    let commandArr = action.params.slice(1);

                    switch (commandArr[0]) {
                        case CMD_FOLD:
                            fold(state, playerNo - 1, commandArr[1]);
                            break;
                        case CMD_DEALER:
                            dealer(state, playerNo - 1);
                            break;
                        case CMD_RESET_SINGLE:
                            reset(state, playerNo - 1);
                            break;
                        case CMD_SIT_OUT:
                        case CMD_SIT_IN:
                            setActive(state, playerNo - 1, commandArr[0] === '+');
                            break;
                        default:
                            //check if it is a card assignment
                            if (/^([23456789tjqka][dchs]){2}/.test(action.params.substring(1))) {
                                setCards(state, playerNo - 1, action.params.substring(1));
                            } else {
                                throw new Error(`invalid action: ${JSON.stringify(action)}`);
                            }
                    }
            }
            break;
        case TYPE_GUI:
            break;
        default:
            throw new Error(`invalid action: ${JSON.stringify(action)}`);

    }

    console.log(JSON.stringify(state));

    return Object.assign({}, state);
};


const cmdActive = (playerNo, value) => { return { type: TYPE_CMD, params: [playerNo + 1, value ? CMD_SIT_IN : CMD_SIT_OUT] } };
const cmdResetSingle = (playerNo) => { return { type: TYPE_CMD, params: [playerNo + 1, CMD_RESET_SINGLE] } };
const cmdFold = (playerNo, value) => { return { type: TYPE_CMD, params: [playerNo + 1, CMD_FOLD] } };
const cmdDealer = (playerNo) => { return { type: TYPE_CMD, params: [playerNo + 1, CMD_DEALER] } };
const cmdUserEntry = (entry) => { return { type: TYPE_CMD, params: entry } };

const reset = (state, playerNo) => {
    state.players.forEach((p, i) => {
        if (playerNo && playerNo !== i) return;
        p.cards = unknownHand;
        fold(state, i);
    });
};

const fold = (state, playerNo) => {
    state.players[playerNo].fold = !state.players[playerNo].fold;
};

const dealer = (state, playerNo) => {
    state.players.forEach((p, i) => p.dealer = i === Number(playerNo));
};

const setActive = (state, playerNo, value) => {
    state.players[playerNo].active = value;
    if (!state.players[playerNo].fold) fold(state, playerNo);
};

const setCards = (state, playerNo, command) => {
    let vs1 = command.substring(0, 2);
    let vs2 = command.substring(2, 4);
    state.players[playerNo].cards = [Card(vs1), Card(vs2)];
};

export { unknownHand, stateReducer, cmdActive, cmdResetSingle, cmdFold, cmdDealer, cmdUserEntry };