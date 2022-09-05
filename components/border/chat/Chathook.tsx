import { Client } from '@stomp/stompjs';

export let ws = new Client({
  brokerURL: 'wss://minesweeper.hanjoon.dev/minesweeper/stomp/chat/websocket',
  debug: (str) => {
    console.log(str);
  },
  reconnectDelay: 3000,
  heartbeatIncoming: 1000,
  heartbeatOutgoing: 1000,

});



