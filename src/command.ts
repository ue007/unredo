import cloneDeep from 'lodash/cloneDeep';
export interface CommandDescriptor {
	uuid: string;
	undo: () => unknown;
	redo: () => unknown;
}

export interface IMementoEventDescriptor {
	cursor: number;
	action: string;
	current: unknown;
	commands: unknown[];
	scope: CommandManager;
}

/**
 *
 */
/**
 * @class
 * @description
 * The Command Pattern, where you capture commands/actions that affect the state (the current action and it's inverse action). Harder to implement since for for each undoable action
 * in your application you must explicitly code it's inverse action, but it's far more memory-efficient since you only store the actions that affect the state.
 */
export class CommandManager {
	private _commands: unknown[] = [];
	private _cursor = -1;
	private _suspended = false;
	private _limit = 100;
	private _batch: CommandDescriptor[] | undefined = undefined;

	private _onUpdate: (event?: IMementoEventDescriptor) => unknown = () => 0;
	private _onBeforeAdd: (event?: IMementoEventDescriptor) => unknown = () => 0;
	private _onLimited: (event?: IMementoEventDescriptor) => void = () => 0;
	private _onSuspended: (event?: IMementoEventDescriptor) => void = () => 0;
	private _provider: (event?: unknown) => unknown = () => 0;

	/**
	 *
	 */
	constructor() {
		console.log('init Command Manager');
	}

	/**
	 *
	 * @param command {CommandDescriptor | CommandDescriptor[]}
	 * @returns {void}
	 */
	public add(command: CommandDescriptor | CommandDescriptor[]): void {
		const batch = this._batch;
		const commands = this._commands;
		this._onBeforeAdd({
			cursor: this._cursor,
			action: 'beforeAdd',
			current: this.current(),
			commands: this._commands,
			scope: this
		});
		if (this._suspended) {
			this._onSuspended({
				cursor: this._cursor,
				action: 'suspended',
				current: this.current(),
				commands: this._commands,
				scope: this
			});
			return;
		}

		if (batch && !(command instanceof Array)) {
			batch.push(command);
		} else {
			if (this._cursor !== commands.length - 1) {
				commands.splice(this._cursor + 1, commands.length);
			}
			if (this._limit !== 0 && commands.length === this._limit) {
				this._onLimited({
					action: 'limit',
					cursor: this._cursor,
					current: this.current(),
					commands: this._commands,
					scope: this
				});
				commands.splice(0, 1);
			}

			commands.push(command);

			this._cursor = commands.length - 1;

			this._onUpdate({
				action: 'add',
				cursor: this._cursor,
				current: this.current(),
				commands: this._commands,
				scope: this
			});
		}
	}

	/**
	 *
	 * @param callback {function}
	 * @returns {CommandManager}
	 */
	public undo(callback?: (current: unknown) => void): CommandManager {
		const commands = this._commands;
		if (!this.canUndo()) {
			console.log('can not undo!');
			return this;
		}
		const command = commands[this._cursor--];
		this._suspended = true;
		if (command instanceof Array) {
			for (let c = command.length, i = c - 1; i >= 0; i--) {
				(command[i] as CommandManager).undo();
			}
		} else {
			(command as CommandManager).undo();
		}
		this._suspended = false;

		if (callback && typeof callback === 'function') {
			callback(this.current());
		}

		this._onUpdate({
			action: 'undo',
			cursor: this._cursor,
			current: this.current(),
			commands: this._commands,
			scope: this
		});
		return this;
	}

	/**
	 *
	 * @param callback {function}
	 * @returns {CommandManager}
	 */
	public redo(callback?: (current: unknown) => void): CommandManager {
		const commands = this._commands;
		if (!this.canRedo()) {
			console.log('can not redo!');
			return this;
		}
		const command = commands[++this._cursor];
		this._suspended = true;
		if (command instanceof Array) {
			command.forEach((item: CommandDescriptor) => {
				item.redo();
			});
		} else {
			(command as CommandManager).redo();
		}
		this._suspended = false;
		if (typeof callback === 'function') callback(this.current());
		this._onUpdate({
			action: 'redo',
			cursor: this._cursor,
			current: this.current(),
			commands: this._commands,
			scope: this
		});
		return this;
	}

	/**
	 * ignore
	 * @param callback {function}
	 * @private
	 */
	static callbackError(callback: () => void) {
		if (typeof callback !== 'function') throw new TypeError('callback must be a function');
	}

	/**
	 *
	 * @param callback {function}
	 * @returns {CommandManager}
	 */
	onUpdate(callback: (event?: IMementoEventDescriptor) => unknown): CommandManager {
		CommandManager.callbackError(callback);
		this._onUpdate = callback;
		return this;
	}

	/**
	 *
	 * @param callback {function}
	 * @returns {CommandManager}
	 */
	onLimited(callback: (event?: IMementoEventDescriptor) => void): CommandManager {
		CommandManager.callbackError(callback);
		this._onLimited = callback;
		return this;
	}

	/**
	 *
	 * @param callback {function}
	 * @returns {CommandManager}
	 */
	onSuspended(callback: (event?: IMementoEventDescriptor) => void): CommandManager {
		CommandManager.callbackError(callback);
		this._onSuspended = callback;
		return this;
	}

	/**
	 *
	 * @param callback {function}
	 * @returns {CommandManager}
	 */
	onBeforeAdd(callback: (event?: IMementoEventDescriptor) => void): CommandManager {
		CommandManager.callbackError(callback);
		this._onBeforeAdd = callback;
		return this;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	public canUndo(): boolean {
		return this._cursor >= 0;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	public canRedo(): boolean {
		return this._cursor < this._commands.length - 1;
	}

	/**
	 *
	 * @returns {number}
	 */
	public size(): number {
		return this._commands.length;
	}

	/**
	 * @returns {number}
	 */
	public get cursor(): number {
		return this._cursor;
	}

	/**
	 *
	 * @returns {CommandManager}
	 */
	public clear(): CommandManager {
		this._commands = [];
		this._cursor = -1;
		return this;
	}

	/**
	 *
	 * @returns {*}
	 */
	public current(): unknown {
		return this._commands[this._cursor];
	}

	/**
	 *
	 * @returns {*}
	 */
	public get commands(): unknown[] {
		return this._commands;
	}

	/**
	 * @param limit {number}
	 */
	public set limit(limit: number) {
		this._limit = limit;
	}

	/**
	 * @returns {number}
	 */
	public get limit(): number {
		return this._limit;
	}

	public get suspended(): boolean {
		return this._suspended;
	}

	public set suspended(suspended: boolean) {
		this._suspended = suspended;
	}

	/**
	 *
	 * @param state {boolean}
	 * @returns {CommandManager}
	 */
	public suspendAdd(state = true): CommandManager {
		this._suspended = state;
		return this;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	public allowedAdd(): boolean {
		return !this._suspended;
	}

	/**
	 *
	 * @returns {CommandManager}
	 */
	public startBatch(): CommandManager {
		if (!this._batch) {
			this._batch = [];
		}
		return this;
	}

	/**
	 *
	 * @returns  {CommandManager}
	 */
	public endBatch(): CommandManager {
		if (this._batch) {
			const batch: CommandDescriptor[] = cloneDeep(this._batch);
			this._batch = undefined;
			if (batch.length > 0) {
				this.add(batch);
			}
		}
		return this;
	}

	/**
	 *
	 * @param callback {function}
	 * @param scope {*}
	 * @returns {CommandManager}
	 */
	public batch(callback: () => unknown, scope: unknown): CommandManager {
		this.startBatch();
		callback && callback.call(scope);
		this.endBatch();
		return this;
	}

	/**
	 *
	 * @returns {boolean}
	 */
	public isBatching(): boolean {
		return !!this._batch;
	}
}
