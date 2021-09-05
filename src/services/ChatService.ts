import ConnectedService from "./ConnectedService";


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
}