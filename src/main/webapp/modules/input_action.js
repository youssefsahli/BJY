/**
 * InputAction class 
 * see Input handler pattern
 */
export class InputAction {
	constructor (name, key, func){
		this.name = name;
                this.key = key;
                this.func = func; // When key pressed, execute async? func
	}
}

export class InputHandler {
    constructor () {
        
    }
}