/**
 * InputAction class 
 * see Input handler pattern
 */

/**
 * @class Takes care of looped callbacks
 * @type CallableLoop
 */
class CallableLoop {
    constructor(cb) {
        this.callback = cb;
    }
    id;
    callback;
    /**
     * @description Starts the loop
     * @returns {Boolean}
     */
    start() {
        if (!this.id) {
            this.id = setInterval(this.callback, 16);
        }
    }
    /**
     * @description Stops the loop
     * @returns {Boolean}
     */
    stop() {
        if (this.id) {
            clearInterval(this.id);
            this.id = null;
        }
    }
}

/**
 * 
 * @type InputAction
 */
class InputAction {
    /**
     * 
     * @param {String} name
     * @param {String} key
     * @param {Callable} func
     * @param {boolean} repeat
     * @returns {InputAction}
     */
    constructor(name, key, func, repeat = false) {
        this.name = name;
        this.key = key;
        this.repeat = repeat;
        /**
         * @description When key pressed, execute async? func
         */
        this.callable = new CallableLoop(func);
    }
    /**
     * @description WARNING starts a looped callback
     * @returns {unresolved}
     */
    trigger() {
        return this.callable.start();
    }

    triggerOnce() {
        return this.callable.callback();
    }

    start() {
        if (!this.repeat)
            return this.triggerOnce();
        else
            return this.trigger();
    }

    stop() {
        return this.callable.stop();
    }
}

/**
 * 
 * @type ActionMap
 */
class ActionMap extends Map {
    
    /**
     * 
     * @param {InputAction} i
     * @returns {ActionMap}
     */
    register(i) {
        return super.set(i.key, i);
    }
    /**
     * 
     * @param {String} key
     * @returns {undefined}
     */
    lookfor(key) {
        return super.has(key) ? super.get(key) : false;
    }

}


/**
 * 
 * @type InputHandler
 */
export class InputHandler {
    constructor() {
        // lambda necessaire pour garder le contexte de classe
        window.addEventListener('keydown', (e) => this.listen(e), false);
        window.addEventListener('keyup', (e) => this.listen(e), false);
        this.actions = new ActionMap();
    }
    /**
     * 
     * @param {String} name
     * @param {String} key
     * @param {Callable} func
     * @param {boolean} repeat
     * @returns {undefined}
     */
    addAction(name, key, func, repeat = false) {
        let A = new InputAction(name, key, func, repeat);
        return this.actions.register(A);
    }
    /**
     * 
     * @param {KeyboardEvent} event
     * @returns {undefined}
     */
    listen(event) {
        if (event.repeat)
            return; // We look for keyup to stop the callback
        let A = this.actions.lookfor(event.key);
        if (!A)
            return;
        switch (event.type) {
            case 'keyup':
                A.stop();
                break;
            case 'keydown':
                A.start();
                break;
        }
    }
}