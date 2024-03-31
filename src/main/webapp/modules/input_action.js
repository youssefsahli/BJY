/**
 * InputAction class 
 * see Input handler pattern
 */

/**
 * 
 * @type InputAction
 */
class InputAction {
    constructor(name, key, func) {
        this.name = name;
        this.key = key;
        this.func = func; // When key pressed, execute async? func
    }
    
    trigger () {
        return this.func();
    }
}

/**
 * 
 * @type ActionMap
 */
class ActionMap extends Map {
    constructor (kv) {
        super(kv);
    }
    /**
     * 
     * @param {InputAction} i
     * @returns {ActionMap}
     */
    register (i) {
        return super.set(i.key, i.func);
    }
    /**
     * 
     * @param {String} key
     * @returns {undefined}
     */
    lookfor (key) {
        return super.has(key) ? super.get(key).trigger() : false;
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
        this.actions = new ActionMap();
    }
    /**
     * 
     * @param {KeyboardEvent} event
     * @returns {undefined}
     */
    listen (event) {
        console.log(event.key);
        this.actions.lookfor (event.key);
    }
}