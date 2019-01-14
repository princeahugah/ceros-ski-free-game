import FacadeMediator from './facademediator';

export default (function(window){
    class WorkFlowManager {
        constructor(){
            WorkFlowManager.facadeMediator().subscribe('onStart', this.initialize, this);
        }

        static facadeMediator(){
            return FacadeMediator;
        }

        initialize(){
            let name = null;
            while(name === null || name === ''){
                name = this._window.prompt("Please enter your name", "");
            }
            WorkFlowManager.facadeMediator().publish('addUser', name);
            WorkFlowManager.facadeMediator().publish('initializeControls');
            WorkFlowManager.facadeMediator().publish('loadAssets', WorkFlowManager.facadeMediator().gameLoop);
        }

        start(){
            WorkFlowManager.facadeMediator().publish('onStart');
        }

        get _window(){
            return window;
        }
    }
    return WorkFlowManager;
})(window);