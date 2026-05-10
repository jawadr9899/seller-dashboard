export const DummyChats ={
  "contacts": [
    {
      "id": "contact-1",
      "name": "Sarah Jenkins",
      "avatar": "https://picsum.photos/seed/n59smi/96",
      "time": "2 min ago",
      "preview": "Thanks for the quick delivery!",
      "online": true
    },
    {
      "id": "contact-2",
      "name": "Mike Roberts",
      "avatar": "https://picsum.photos/seed/iotji/96",
      "time": "1 hr ago",
      "preview": "When will my order arrive?",
      "online": true
    },
    {
      "id": "contact-3",
      "name": "Emma Williams",
      "avatar": "https://picsum.photos/seed/5xnbh/96",
      "time": "3 hrs ago",
      "preview": "The quality is amazing!",
      "online": false
    },
    {
      "id": "contact-4",
      "name": "John Davis",
      "avatar": "https://picsum.photos/seed/32roql/96",
      "time": "Yesterday",
      "preview": "I want to place another order",
      "online": false
    }
  ],
  "conversations": {
    "contact-1": [
      {
        "id": "msg-1",
        "type": "inbound",
        "text": "Hi, I received my order but items seem damaged",
        "timestamp": "10:30 AM"
      },
      {
        "id": "msg-2",
        "type": "outbound",
        "text": "I'm sorry to hear that. Can you send me photos of the damaged items?",
        "timestamp": "10:35 AM"
      },
      {
        "id": "msg-3",
        "type": "inbound",
        "text": "Sure, I'll send them right away",
        "timestamp": "10:40 AM"
      },
      {
        "id": "msg-4",
        "type": "inbound",
        "text": "Thanks for the quick delivery!",
        "timestamp": "10:45 AM"
      }
    ],
    "contact-2": [
      {
        "id": "msg-5",
        "type": "inbound",
        "text": "When will my order arrive?",
        "timestamp": "9:15 AM"
      }
    ],
    "contact-3": [
      {
        "id": "msg-6",
        "type": "inbound",
        "text": "The quality is amazing!",
        "timestamp": "8:20 AM"
      }
    ],
    "contact-4": [
      {
        "id": "msg-7",
        "type": "inbound",
        "text": "I want to place another order",
        "timestamp": "Yesterday"
      }
    ]
  }
}
