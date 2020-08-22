const tmi = require('tmi.js');
const gamble = require('./functions/gamble');

const opts = {
    identity: {
        username: '',
        password: ''
    },
    channels: [
        'artbczao'
    ]
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect();

function onMessageHandler(target, user, msg, self)
{
    if(self)
    {
        return;
    }

    const commandName = msg.trim();

    switch (commandName)
    {
        case "!test":
            client.say(target, `hello world`);
            break;

        case "!dice":
            client.say(target, `você rolou um ${rollDice()}`);
            break;

        case "!gamble":
            client.say(target, `${user['display-name']} apostou ${gamble.spend()}`);
            break;
    }

    console.log(`* Executed ${commandName} command`);
    console.log(`target: ${target}, user: ${user}, msg: ${msg}, self: ${self}`);
}

/* user: {
*   "badge-info":null,"badges":{"moderator":"1","premium":"1"},
*   "client-nonce":"6109518028147a945451abea0f318be6",
*   "color":null,
*   "display-name":"babilonia364",
*   "emotes":null,
*   "flags":null,
*   "id":"65de95d4-ed3f-4909-afc0-ee169a6e8fac",
*   "mod":true,"room-id":"146775194",
*   "subscriber":false,
*   "tmi-sent-ts":"1598054490849",
*   "turbo":false,
*   "user-id":"57940311",
*   "user-type":"mod",
*   "emotes-raw":null,
*   "badge-info-raw":null,
*   "badges-raw":"moderator/1,
*   premium/1",
*   "username":"babilonia364",
*   "message-type":"chat"
* } */

function onConnectedHandler(addr, port)
{
    console.log(`* Connected to ${addr}:${port}`);
}

function rollDice()
{
    return Math.round((Math.random()*10)%5)+1;
}