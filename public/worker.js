import { simulateGames } from './pkrlib.js';

onmessage = e => {
    const result = simulateGames(e.data.pocketCards, e.data.communityCards);
    result.activePlayers = e.data.activePlayers;
    postMessage(result);
};