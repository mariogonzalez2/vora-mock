const express = require('express');

const app = express()
  

server= app.listen(3331, () => console.log(`Listening on ${3331}`));

const { Server } = require('ws');

const ws_server = new Server({ server });

let callsOncourse = {}

// websockets

ws_server.on('connection', (ws) => {
    console.log('New client connected!');
  
    ws.on('close', () => console.log('Client has disconnected!'));
    ws.on("message",(message) => {
        console.log(message.toString())
        ws.send(message.toString())
    })
});

// setInterval(() => {
//     sendToAll(new Date().toTimeString());
// },1000)

function sendToAll(message) {
    ws_server.clients.forEach((client) => {
        client.send(message);
    });
}

//endpoints

app.get('/hello', (req, res) => {
    res.send('Hello World!')
  })

app.get('/', (req, res) => {
    res.sendFile('/home.html', { root: __dirname })
})

// make call from terminal
app.get('/vora/calls/makeCallTerminal', async(req, res) => {

    let callId = Math.floor(
        Math.random() * (10000000000000)
      )

    console.log("llamando...")

    // step1 : call intiated
    let objectCallInitiated= {
        "interestedParty": "911292350",
        "callContextId": `vm-bar-onenet-ims01-${callId}`,
        "eventName": "callInitiated"
    }
    sendToAll(JSON.stringify(objectCallInitiated))
    console.log("initiating...")
    await new Promise(resolve => setTimeout(resolve, 1000));

    // step2 : call ringing
    let objectCallRinging= {
        "interestedParty": "911292350",
        "callContextId": `vm-bar-onenet-ims01-${callId}`,
        "eventName": "callRinging"
    }
    sendToAll(JSON.stringify(objectCallRinging))
    console.log("ringing...")
    await new Promise(resolve => setTimeout(resolve, 2000));

    // step3 : call Answered
    let objectCallAnswered= {
        "interestedParty": "911292350",
        "callContextId": `vm-bar-onenet-ims01-${callId}`,
        "eventName": "callAnswered"
    }
    sendToAll(JSON.stringify(objectCallAnswered))
    console.log("contestado...")
    await new Promise(resolve => setTimeout(resolve, 5000));

    // step4 : call Released
    let objectCallReleased= {
        "interestedParty": "911292350",
        "callContextId": `vm-bar-onenet-ims01-${callId}`,
        "eventName": "callReleased",
        "reason": "callReleased"
    }
    sendToAll(JSON.stringify(objectCallReleased))
    console.log("colgando...")
    res.status(200).send('call generated...')
})

// make call from terminal
app.get('/vora/calls/makeCallOneNet', async(req, res) => {

    let callId = Math.floor(
        Math.random() * (1000)
      )

    console.log("llamando...")

    // step2 : call ringing
    let objectCallRinging= {
        "interestedParty": "911292350",
        "callContextId": `vm-bar-onenet-ims01-${callId}`,
        "eventName": "callRinging"
    }
    sendToAll(JSON.stringify(objectCallRinging))
    console.log("ringing...")
    await new Promise(resolve => setTimeout(resolve, 2000));

    // step3 : call Answered
    let objectCallAnswered= {
        "interestedParty": "911292350",
        "callContextId": `vm-bar-onenet-ims01-${callId}`,
        "eventName": "callAnswered"
    }
    sendToAll(JSON.stringify(objectCallAnswered))
    console.log("contestado...")
    await new Promise(resolve => setTimeout(resolve, 5000));

    // step4 : call Released
    let objectCallReleased= {
        "interestedParty": "911292350",
        "callContextId": `vm-bar-onenet-ims01-${callId}`,
        "eventName": "callReleased",
        "reason": "callReleased"
    }
    sendToAll(JSON.stringify(objectCallReleased))
    console.log("colgando...")
    res.status(200).send('call generated...')
})


// list calls on course
app.get('/vora/calls', (req, res) => {

    res.status(200).send(callsOncourse)
})
