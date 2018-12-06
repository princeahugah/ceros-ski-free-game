import FacadeMediator from './facademediator';

class WorkFlowManager {
    constructor(){
        FacadeMediator.subscribe('onStart', () => {
            let name = null;
            while(name === null || name === ''){
                name = prompt("Please enter your name", "");
            }
            FacadeMediator.publish('addUser', name);
            FacadeMediator.publish('initializeControls');
            FacadeMediator.publish('loadAssets');
        });
    }

    start(){
        FacadeMediator.publish('onStart');
    }
}

export default WorkFlowManager;