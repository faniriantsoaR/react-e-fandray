import ConnectedService from "./ConnectedService";


export default class UserService{
    loadOtherUsers(){
        return new Promise(async function(resolve:any, reject: any){
            let result: any[] = [] ;
            const connected = ConnectedService.getConnectedId() ;

            await fetch("http://localhost:3001/membres?id_ne="+connected)
            .then(response => response.json())
            .then(json => {
                result = json ;
            });

            resolve(result) ;
        }) ;
    }
}