

export default class ChatService{
    loadMessages(userId:number){
        fetch("localhost:3001/messages")
            .then(response => response.json())
            .then(json => console.log(json));
    }
}