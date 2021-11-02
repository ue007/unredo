export interface IMementoDescriptor {
	provider?: (options?: unknown) => unknown;
	maxLength?: number;
}
export interface IEventDescriptor {
	current: unknown;
	action: string;
	history: unknown;
	scope: MementoManager;
}

/**
 * Implementing undo/redo Function with Memento Pattern , where you capture the whole current state.
 * It's easy to implement, but memory-inefficient since you need to store similar copies of the whole state.
 */
export class MementoManager {
	_maxLength = 100;
	_history: unknown[] = [];
	_position = 0;
	_initialState: unknown = undefined;
	_isExceeded = false;
	_suspendSave = false;
	_batchStart = 0;
	_batchEnd = 0;
	_onUpdate: (event?: IEventDescriptor) => unknown = () => 0;
	_onBeforeSave: (event?: IEventDescriptor) => unknown = () => 0;
	_onMaxLength: (event?: IEventDescriptor) => void = () => 0;
	_provider: (event?: unknown) => unknown = () => 0;

	constructor(options?: IMementoDescriptor) {
		if (options && options.provider) {
			this._provider = options.provider;
		}
		this._maxLength = options?.maxLength || 100;
		this._initiliaze();
	}

	/**
	 * @ignore
	 * @private
	 */
	_initiliaze() {
		this._initialState = undefined;
		this._history = [];
		this._isExceeded = false;
		this._position = 0;
		this._batchStart = 0;
		this._batchEnd = 0;
	}

	/**
	 * @ignore
	 * @private
	 */
	_checkMaxLength() {
		if (this._history.length > this._maxLength) {
			this._history = this._history.slice(1, this._history.length);
			if (!this._isExceeded) {
				this._onMaxLength({
					action: 'max',
					current: this.current(),
					history: this.history(),
					scope: this
				});
				this._isExceeded = true;
			}
		} else {
			this._isExceeded = false;
		}
	}

	/**
	 *
	 * @param item
	 * @param beforeSave
	 * @returns {boolean|*}
	 * @private
	 * @ignore
	 */
	_rejectSave(item: unknown, beforeSave: unknown) {
		return this._isEqual(item, this.current()) || beforeSave === false || this._suspendSave;
	}

	/**
	 * check a === b
	 * @param a
	 * @param b
	 * @returns
	 */
	_isEqual(a: unknown, b: unknown) {
		if (a === b) return true;

		/**
		 * compare two map is equal
		 * @param map1
		 * @param map2
		 * @returns
		 */
		const compareMaps = (
			map1: Map<string, Record<string, unknown>>,
			map2: Map<string, Record<string, unknown>>
		) => {
			let value;
			if (map1.size !== map2.size) {
				return false;
			}
			for (const [key, val] of map1) {
				value = map2.get(key);
				// in cases of an undefined value, make sure the key
				// actually exists on the object so there are no false positives
				if (value !== val || (value === undefined && !map2.has(key))) {
					return false;
				}
			}
			return true;
		};
		const arrA = Array.isArray(a),
			arrB = Array.isArray(b);
		let i, length, key;

		if (arrA && arrB) {
			length = a.length;
			if (length != b.length) return false;
			for (i = 0; i < length; i++) if (!this._isEqual(a[i], b[i])) return false;
			return true;
		}

		if (arrA != arrB) return false;

		const dateA = a instanceof Date,
			dateB = b instanceof Date;
		if (dateA != dateB) return false;
		if (dateA && dateB) return a.getTime() == b.getTime();

		const regexpA = a instanceof RegExp,
			regexpB = b instanceof RegExp;
		if (regexpA != regexpB) return false;
		if (regexpA && regexpB) return a.toString() == b.toString();

		if (a instanceof Map && b instanceof Map) {
			return compareMaps(a, b);
		} else if (a instanceof Object && b instanceof Object) {
			const keys = Object.keys(a);
			length = keys.length;

			if (length !== Object.keys(b).length) return false;

			for (i = 0; i < length; i++) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

			for (i = 0; i < length; i++) {
				key = keys[i];
				if (!this._isEqual((a as any)[key], (b as any)[key])) return false;
			}

			return true;
		}
		return false;
	}

	/**
	 * Check if undo is available
	 * @returns {boolean}
	 */
	canUndo() {
		return this._position > 1;
	}

	/**
	 * @Check if redo is available
	 * @returns {boolean}
	 */
	canRedo() {
		return this._position < this._history.length;
	}

	/**
	 * ignore
	 * @param callback
	 * @private
	 */
	static callbackError(callback: () => void) {
		if (typeof callback !== 'function') throw new TypeError('callback must be a function');
	}

	/**
	 * Import external history
	 * @param history {Array}
	 * @returns {MementoManager}
	 */
	import(history = []) {
		if (!Array.isArray(history)) throw new TypeError('Items must be an array');
		this._initiliaze();
		this._history = history;
		this._position = this._history.length;
		this._initialState = history[0];
		return this;
	}

	/**
	 *  get history
	 * @returns
	 */
	history() {
		return this._history;
	}

	/**
	 *
	 * @param value
	 * @returns
	 */
	save(value: unknown) {
		let item = value;
		if (typeof item === 'undefined' && typeof this._provider === 'function') {
			item = this._provider();
		}
		const beforeSave = this._onBeforeSave({
			action: 'beforesave',
			history: null,
			current: item,
			scope: this
		});
		item = beforeSave || item;
		if (this._rejectSave(item, beforeSave)) return this;
		if (this._position < this._history.length) this._history = this._history.slice(0, this._position);
		if (typeof item !== 'undefined') {
			this._history.push(item);
			if (this._initialState === undefined) {
				this._initialState = item;
			}
		}
		this._checkMaxLength();
		this._position = this._history.length;
		this._onUpdate({
			current: this.current(),
			action: 'save',
			history: this.history(),
			scope: this
		});
		return this;
	}

	/**
	 *
	 * @param state
	 * @returns
	 */
	suspendSave(state = true) {
		this._suspendSave = state;
		return this;
	}

	/**
	 *
	 * @returns
	 */
	allowedSave() {
		return !this._suspendSave;
	}

	/**
	 *
	 * @returns
	 */
	clear() {
		this._initiliaze();
		this._onUpdate({
			current: null,
			action: 'clear',
			history: this.history(),
			scope: this
		});
		return this;
	}

	/**
	 *
	 * @param callback
	 * @returns
	 */
	undo(callback: (current: unknown) => void) {
		if (this.canUndo()) {
			this._position--;
			if (typeof callback === 'function') {
				callback(this.current());
			}
			this._onUpdate({
				current: this.current(),
				action: 'undo',
				history: this.history(),
				scope: this
			});
		}
		return this;
	}

	/**
	 *
	 * @param callback
	 * @returns
	 */
	redo(callback: (current: unknown) => void) {
		if (this.canRedo()) {
			this._position++;
			if (typeof callback === 'function') callback(this.current());
			this._onUpdate({
				current: this.current(),
				action: 'redo',
				history: this.history(),
				scope: this
			});
		}
		return this;
	}

	/**
	 *
	 * @returns
	 */
	current() {
		return this._history.length ? this._history[this._position - 1] : null;
	}

	/**
	 *
	 * @returns
	 */
	count() {
		return this._history.length ? this._history.length - 1 : 0;
	}

	/**
	 *
	 * @returns
	 */
	initialState() {
		return this._initialState;
	}

	/**
	 *
	 * @param callback
	 * @returns
	 */
	onUpdate(callback: (event?: IEventDescriptor) => unknown) {
		MementoManager.callbackError(callback);
		this._onUpdate = callback;
		return this;
	}

	/**
	 *
	 * @param callback
	 * @returns
	 */
	onMaxLength(callback: (event?: IEventDescriptor) => void) {
		MementoManager.callbackError(callback);
		this._onMaxLength = callback;
		return this;
	}

	/**
	 *
	 * @param callback
	 * @returns
	 */
	onBeforeSave(callback: (event?: IEventDescriptor) => void) {
		MementoManager.callbackError(callback);
		this._onBeforeSave = callback;
		return this;
	}

	/**
	 * start batch mode
	 */
	batchStart() {
		this._batchStart = this._position;
	}

	/**
	 * end batch mode
	 */
	batchEnd() {
		this._batchEnd = this._position - 1;
		this._history && this._history.splice(this._batchStart, this._batchEnd - this._batchStart);
		this._position = this._batchStart;
	}
}
