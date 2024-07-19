

export class AuthorizationService {

    authentication = false

    constructor() {}

    autorizarClient() {
        sessionStorage.setItem('loginClient', 'sim')
    }

    deslogarClient(){
        sessionStorage.clear()
    }

    obterLoginStatusClient = () => !!sessionStorage.getItem('loginClient')

    autorizarPovider() {
        sessionStorage.setItem('loginProvider', 'sim')
    }

    deslogarProvider(){
        sessionStorage.clear()
    }

    obterLoginStatusProvider = () => !!sessionStorage.getItem('loginProvider')
}