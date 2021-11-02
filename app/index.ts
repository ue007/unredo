import { MementoManager } from '../src/memento';
import './style.css';
declare global {
	interface Window {
		memento: unknown;
	}
}

const memento = (window.memento = new MementoManager());
memento.save(1);
memento.save(2);
console.log(memento._history);
