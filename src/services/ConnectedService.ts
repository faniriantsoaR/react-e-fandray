const ConnectedService = {
    getConnectedId: () => Number(localStorage.getItem("connectedId")),
    loadConnectedUser: () => {
        return fetch("localhost:3001/membres/"+ConnectedService.getConnectedId())
            .then(response => response.json())
    }
} ;

export default ConnectedService ;