import { UnReDo } from '../memento';

test('two plus two is four', () => {
	expect(2 + 2).toBe(4);
});

test('UnReDo', () => {
	const myUndo = new UnReDo();
	myUndo.save('hello');
});
