class Foods{
    constructor(eta, tau){
        self.eta = eta;
        self.tau = tau;
    }

    update(deta_eta){
        for(let i=0; i<self.tau.length; i++){
            for(let j=0; j<self.tau[i].length; j++){
                tau[i][j] += deta_eta[i][j];
            }
        }
    }
}

