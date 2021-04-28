import { simulateGames } from './pkrlib.js';

onmessage = e => {
//    console.log("worker received: " + JSON.stringify(e.data));
    const result = simulateGames(e.data.pocketCards, e.data.communityCards);
    result.activePlayers = e.data.activePlayers;
    postMessage(result);
};