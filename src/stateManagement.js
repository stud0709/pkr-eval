import { Card } from './pkrlib.js';

const unknownCard = { readableValue: undefined, suitSymbol: undefined };
const unknownHand = [unknownCard, unknownCard];
const TYPE_CMD = 'cmd',
    TYPE_GUI = 'gui',
    CMD_RESET = 'xx',
    CMD_RESET_SINGLE = 'x',
    CMD_FOLD = 'f',
    CMD_UNDO_FOLD = 'F',
    CMD_DEALER = 'd',
    CMD_SIT_OUT = '-',
    CMD_SIT_IN = '+',
    CMD_CC = 'c', //add community card(s)
    CMD_CLEAR_CC = 'x'
    ;

const stateReducer = (state, action) => {
    console.log(JSON.stringify(action));

    switch (action.type) {
        case TYPE_CMD:
            switch (action.params) {
                case CMD_RESET:
                    reset(state);
                    break;
                default:
                    if (action.params[0] === CMD_CC) {
                        if (action.params[1] === CMD_CLEAR_CC) {
                            if (action.params[2]) {
                                let idx = action.params[2];
                                //clear up to this position
                                clearCC(state, idx - 1);
                            } else {
                                //clear all
                                clearCC(state);
                            }

                            break;
                        }
                        //community card
                        let idx = 0;
                        //find first empty card
                        for (; state.communityCards[idx]; idx++);

                        let command = action.params.substring(1);
                        while (command.length > 0 && idx < 5) {
                            let vs = command.substring(0, 2);
                            command = command.substring(2);
                            let c = Card(vs);
                            registerCards(state, c);
                            state.communityCards[idx] = c;
                            idx++;
                        }

                        break;
                    }

                    let cmdRegex = /(\d0?)(.*)/;
                    //element. 1 is player number
                    let playerNo = action.params[0];
                    let command = action.params[1];

                    if (typeof action.params === 'string') {
                        let match = cmdRegex.exec(action.params);
                        playerNo = Number(match[1]);
                        command = match[2];
                    }

                    switch (command) {
                        case CMD_FOLD:
                        case CMD_UNDO_FOLD:
                            fold(state, playerNo - 1, command === 'f');
                            break;
                        case CMD_DEALER:
                            dealer(state, playerNo - 1);
                            break;
                        case CMD_RESET_SINGLE:
                            reset(state, playerNo - 1);
                            break;
                        case CMD_SIT_OUT:
                        case CMD_SIT_IN:
                            setActive(state, playerNo - 1, command === '+');
                            break;
                        default:
                            //check if it is a card assignment
                            if (/^([23456789tjqka][dchs]){2}/.test(command)) {
                                setCards(state, playerNo - 1, command);
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
const cmdFold = (playerNo, value = true) => { return { type: TYPE_CMD, params: [playerNo + 1, value ? CMD_FOLD : CMD_UNDO_FOLD] } };
const cmdDealer = (playerNo) => { return { type: TYPE_CMD, params: [playerNo + 1, CMD_DEALER] } };
const cmdUserEntry = (entry) => { return { type: TYPE_CMD, params: entry } };
const cmdClearCC = (position) => { return { type: TYPE_CMD, params: [CMD_CC, CMD_CLEAR_CC, position + 1] } };

const reset = (state, playerNo) => {
    state.players.forEach((p, i) => {
        if (playerNo && playerNo !== i) return;
        unregisterCards(state, ...p.cards);
        p.cards = unknownHand;
        fold(state, i, false);
    });

    if (!playerNo) {
        //reset all
        unregisterCards(state, ...state.communityCards);
        state.communityCards = [];
        state.deadCards = [];
    }
};

const fold = (state, playerNo, value = true) => {
    state.players[playerNo].fold = value;
};

const dealer = (state, playerNo) => {
    reset(state);
    activateUser(state, playerNo);
    state.players.forEach((p, i) => p.dealer = i === playerNo);
};

const activateUser = (state, playerNo) => {
    if (!state.players[playerNo].active) setActive(state, playerNo, true);
};

const setActive = (state, playerNo, value) => {
    state.players[playerNo].active = value;
    //fold 
    if (state.players[playerNo].cards !== unknownHand) fold(state, playerNo);
};

const setCards = (state, playerNo, command) => {
    activateUser(state, playerNo);
    fold(state, playerNo, false);
    let vs1 = command.substring(0, 2);
    let vs2 = command.substring(2, 4);
    state.players[playerNo].cards = [Card(vs1), Card(vs2)];
    registerCards(state, ...state.players[playerNo].cards);
};

const registerCards = ({ deadCards }, ...cArr) => {
    for (let c of cArr) {
        //duplicate card?
        for (let dc of deadCards) {
            if (dc && c.compareTo(dc) === 0)
                throw new Error(`Duplicate card: ${c}`);
        }

        deadCards.push(c);
    }
};

const unregisterCards = ({ deadCards }, ...cArr) => {
    for (let c of cArr) {
        for (let i = 0; i < deadCards.length; i++) {
            if (deadCards[i] && deadCards[i].compareTo(c) === 0) {
                delete deadCards[i];
                break;
            }
        }
    }
};

const clearCC = (state, pos = 0) => {
    unregisterCards(state, ...state.communityCards.slice(pos));
    state.communityCards = state.communityCards.slice(0, pos);
};

export { unknownHand, stateReducer, cmdActive, cmdResetSingle, cmdFold, cmdDealer, cmdUserEntry, cmdClearCC };