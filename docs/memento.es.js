class MementoManager {
    _maxLength = 100;
    _history = [];
    _position = 0;
    _initialState = undefined;
    _isExceeded = false;
    _suspendSave = false;
    _onUpdate = () => 0;
    _onBeforeSave = () => 0;
    _onMaxLength = () => 0;
    _provider = () => 0;
    constructor(options) {
        if (options) {
            this._provider = options.provider;
            this._maxLength = options.maxLength || 100;
        }
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
                    current: this.current(),
                    history: this.history(),
                    scope: this
                });
                this._isExceeded = true;
            }
        }
        else {
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
    _rejectSave(item, beforeSave) {
        return this._isEqual(item, this.current()) || beforeSave === false || this._suspendSave;
    }
    /**
     * check a === b
     * @param a
     * @param b
     * @returns
     */
    _isEqual(a, b) {
        if (a === b)
            return true;
        const arrA = Array.isArray(a), arrB = Array.isArray(b);
        let i, length, key;
        if (arrA && arrB) {
            length = a.length;
            if (length != b.length)
                return false;
            for (i = 0; i < length; i++)
                if (!this._isEqual(a[i], b[i]))
                    return false;
            return true;
        }
        if (arrA != arrB)
            return false;
        const dateA = a instanceof Date, dateB = b instanceof Date;
        if (dateA != dateB)
            return false;
        if (dateA && dateB)
            return a.getTime() == b.getTime();
        const regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
        if (regexpA != regexpB)
            return false;
        if (regexpA && regexpB)
            return a.toString() == b.toString();
        if (a instanceof Object && b instanceof Object) {
            const keys = Object.keys(a);
            length = keys.length;
            if (length !== Object.keys(b).length)
                return false;
            for (i = 0; i < length; i++)
                if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
                    return false;
            for (i = 0; i < length; i++) {
                key = keys[i];
                if (!this._isEqual(a[key], b[key]))
                    return false;
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
    static callbackError(callback) {
        if (typeof callback !== 'function')
            throw new TypeError('callback must be a function');
    }
    /**
     * Import external history
     * @param history {Array}
     * @returns {Undoo}
     */
    import(history = []) {
        if (!Array.isArray(history))
            throw new TypeError('Items must be an array');
        this._initiliaze();
        this._history = history;
        this._position = this._history.length;
        this._initialState = history[0];
        return this;
    }
    /**
     * Get history
     * @returns {Array}
     */
    history() {
        return this._history;
    }
    /**
     * Save history
     * @param [item] {*}
     * @returns {Undoo}
     */
    save(value) {
        let item = value;
        if (typeof item === 'undefined' && typeof this._provider === 'function') {
            item = this._provider();
        }
        const beforeSave = this._onBeforeSave({
            item: item,
            scope: this
        });
        item = beforeSave || item;
        if (this._rejectSave(item, beforeSave))
            return this;
        if (this._position < this._history.length)
            this._history = this._history.slice(0, this._position);
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
     * Suspend save method
     * @param [state=true] {boolean}
     * @returns {Undoo}
     */
    suspendSave(state = true) {
        this._suspendSave = state;
        return this;
    }
    /**
     * Check if save is allowed
     * @returns {boolean}
     */
    allowedSave() {
        return !this._suspendSave;
    }
    /**
     * Clear history
     * @returns {Undoo}
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
     * undo callback
     * @callback Undoo~undoCallback
     * @param item {*} current history item
     */
    /**
     * Undo
     * @param [callback] {Undoo~undoCallback} callback function
     * @returns {Undoo}
     */
    undo(callback) {
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
     * redo callback
     * @callback Undoo~redoCallback
     * @param item {*} current history item
     */
    /**
     * Redo
     * @param [callback] {Undoo~redoCallback} callback function
     * @returns {Undoo}
     */
    redo(callback) {
        if (this.canRedo()) {
            this._position++;
            if (typeof callback === 'function')
                callback(this.current());
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
     * Get current item in history
     * @returns {*}
     */
    current() {
        return this._history.length ? this._history[this._position - 1] : null;
    }
    /**
     * Count history items, the first element is not considered
     * @returns {number}
     */
    count() {
        return this._history.length ? this._history.length - 1 : 0;
    }
    /**
     * Get initial state history
     * @returns {*}
     */
    initialState() {
        return this._initialState;
    }
    /**
     * onUpdate callback
     * @callback Undoo~updateCallback
     * @param item {*} current history item
     * @param action {string} action that has called update event. Can be: redo, undo, save, clear
     * @param history {Array} history array
     * @param istance {Undoo}
     */
    /**
     * Triggered when history is updated
     * @param callback {Undoo~updateCallback} callback function
     * @returns {Undoo}
     */
    onUpdate(callback) {
        MementoManager.callbackError(callback);
        this._onUpdate = callback;
        return this;
    }
    /**
     * onMaxLength callback
     * @callback Undoo~maxLengthCallback
     * @param item {*} current history item
     * @param history {Array} history array
     * @param istance {Undoo}
     */
    /**
     * Triggered when maxLength is exceeded
     * @param callback {Undoo~maxLengthCallback} callback function
     * @returns {Undoo}
     */
    onMaxLength(callback) {
        MementoManager.callbackError(callback);
        this._onMaxLength = callback;
        return this;
    }
    /**
     * onBeforeSave callback
     * @callback Undoo~beforeSaveCallback
     * @param item {*} current history item
     * @param istance {Undoo}
     */
    /**
     * Triggered before save
     * @param callback {Undoo~beforeSaveCallback} callback function
     * @returns {Undoo}
     * @example
     * // If callback returns `false` the save command will not be executed
     * myHistory.onBeforeSave(()=>false)
     *
     * // You can overwrite item before save
     * myHistory.onBeforeSave((item)=>{
     *      return item.toUpperCase();
     * })
     */
    onBeforeSave(callback) {
        MementoManager.callbackError(callback);
        this._onBeforeSave = callback;
        return this;
    }
}

export { MementoManager };
//# sourceMappingURL=memento.es.js.map
