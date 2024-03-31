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
    
}


/**
 * 
 * @type InputHandler
 */
export class InputHandler {
    constructor() {
        window.addEventListener('keydown', this.listen);
    }
    
    this.listen () {
        
    }
}