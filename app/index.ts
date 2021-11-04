import { MementoManager } from '../src/memento';
import './style.css';
declare global {
	interface Window {
		memento: unknown;
	}
}

const memento = (window.memento = new MementoManager().onUpdate((event) => {
	console.log(event);
})).onBeforeSave((event) => {
	console.log(event);
});

function mapToString(map: Map<any, any>): string {
	return JSON.stringify(
		Array.from(map.entries()).reduce((o: any, [key, value]) => {
			o[key] = value;
			return o;
		}, {})
	);
}

const datas = new Map();
datas.set(0, 0);
memento.save(mapToString(datas));
datas.set(1, 1);
memento.save(mapToString(datas));

datas.set(2, 2);
memento.save(mapToString(datas));

datas.set(3, 3);
memento.save(mapToString(datas));
console.log(memento);

memento.suspendSave();

datas.set(4, 4);
memento.save(mapToString(datas));

datas.set(5, 5);
memento.save(mapToString(datas));

datas.set(6, 6);
memento.save(mapToString(datas));

memento.suspendSave(false);
console.log(memento);
