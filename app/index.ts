import { UnReDo } from '../src/memento/index';
import './style.css';
declare global {
	interface Window {
		unredo: unknown;
	}
}

// test mock api
fetch('/api/user')
	.then((res) => res.json())
	.catch((error) => console.error('Error:', error))
	.then((response) => console.log('Success:', response));

const unredo = (window.unredo = new UnReDo());
unredo.save(1);
unredo.save(2);
console.log(unredo._history);
