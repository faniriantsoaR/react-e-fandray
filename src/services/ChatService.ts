import ConnectedService from "./ConnectedService";
import axios from 'axios' ;

export default class ChatService{
    loadMessages(destId:number){
        return new Promise(async function(resolve:any, reject: any){
            let result = [] ;
            let r1: any[] = [] ;
            let r2: any[] = [] ;
            const connected = ConnectedService.getConnectedId() ;

            await fetch("http://localhost:3001/messages?destId="+destId+"&auteurId="+connected)
            .then(response => response.json())
            .then(json => {
                r1 = json ;
            });
            await fetch("http://localhost:3001/messages?auteurId="+destId+"&destId="+connected)
            .then(response => response.json())
            .then(json => {
                r2 = json ;
            });
            result = r1
                .concat(r2)
                .sort(function compare(a,b)  {  
                    return a.id-b.id;  
                }
            ) ;
            console.log("result : ", result) ;
            resolve(result) ;
        }) ;
    }

    addMessage(destId: number, contenu: string){
        return new Promise(async function(resolve:any, reject: any){
            let newMessage = {
                id: 0,
                contenu: contenu,
                temps: Math.round(new Date().getTime()/1000),
                auteurId: ConnectedService.getConnectedId(),
                destId: Number(destId)
            } ;

            await fetch("http://localhost:3001/messages?_sort=id&_order=desc")
                .then(resp => resp.json()).then(json => {
                    if(json[0] !== undefined)
                        newMessage.id = json[0].id + 1 ;
                    else
                        newMessage.id = 1 ;
                }) ;
            await axios.post("http://localhost:3001/messages", newMessage).then(resp => {
                console.log(resp.data) ;
            }).catch(error => {
                console.log(error) ;
                reject(error) ;
            }) ;
            
            resolve(newMessage) ;
        }) ;
    }
}