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
    switch (action.type) {
        case TYPE_CMD:
            switch (action.params) {
                case CMD_RESET:
                    reset(state);
                    break;
                default:
                    //pos. 1 is player number
                    let playerNo = action.params[0];
                    let command = action.params.slice(1);
                    switch (command) {
                        case CMD_FOLD:
                            fold(state, playerNo);
                            break;
                        case CMD_DEALER:
                            dealer(state, playerNo);
                            break;
                        case CMD_RESET_SINGLE:
                            reset(state, playerNo);
                            break;
                        case CMD_SIT_OUT:
                        case CMD_SIT_IN:
                            setActive(state, playerNo, command === '+');
                            break;
                        default:
                            //check if it is a card assignment
                            if (/^([23456789tjqka][dchs]){2}/.test()) {
                                setCards(state, playerNo, command);
                            } else {
                                throw new Error(`invalid action: ${action}`);
                            }
                    }
            }
            break;
        case TYPE_GUI:
            break;
        default:
            throw new Error(`invalid action: ${action}`);

    }
};

const reset = (state, playerNo) => {
    state.players.forEach((p, i) => {
        if (playerNo && playerNo !== i) return;
        p.cards = unknownHand;
        fold(state, i);
    });
};

const fold = (state, playerNo) => {
    state.players[playerNo].fold = 1;
};

const dealer = (state, playerNo) => {
    state.players[playerNo].dealer = 1;
};

const setActive = (state, playerNo, value) => {
    state.players[playerNo].active = value;
};

const setCards = (state, playerNo, command) => {
    let vs1 = [...command].slice(0, 2);
    let vs2 = [...command].slice(2, 4);
    state.players[playerNo].cards = [Card(vs1), Card(vs2)];
};

export { unknownHand, stateReducer };