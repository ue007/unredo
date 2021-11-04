# Undo
Undo/Redo Manager

<a href="" target="_blank"><img src="https://travis-ci.org/fabioricali/undoo.svg?branch=master" title="Build Status"/></a>
<a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" title="License: MIT"/></a>

## Installation

### Node.js
```
npm install unredo --save
```

## Example
```javascript
import { MementoManager } from '../dist/unredo.es.js';

const memento = new MementoManager().onUpdate((event) => {
    console.log(event);
}).onBeforeSave((event) => {
    console.log(event);
});

function mapToString(map: Map<any, any>): string {
    return JSON.stringify(
        Array.from(map.entries()).reduce((o: any, [key, value]) => {
        o[key] = value;
        return o;
    }, {}));
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

memento.batchStart();

datas.set(4, 4);
memento.save(mapToString(datas));

datas.set(5, 5);
memento.save(mapToString(datas));

datas.set(6, 6);
memento.save(mapToString(datas));

memento.batchEnd();

console.log(memento);
```

## Demo

<a href="https://ue007.github.io/unredo/">Try now</a>

## API

## Classes

<dl>
<dt><a href="#MementoManager">MementoManager</a></dt>
<dd></dd>
<dt><a href="#CommandManager">CommandManager</a></dt>
<dd></dd>
</dl>

<a name="MementoManager"></a>

## MementoManager
**Kind**: global class  

* [MementoManager](#MementoManager)
    * [new MementoManager(options)](#new_MementoManager_new)
    * [.position](#MementoManager+position) ⇒ <code>number</code>
    * [.maxLength](#MementoManager+maxLength)
    * [.canUndo()](#MementoManager+canUndo) ⇒ <code>boolean</code>
    * [.canRedo()](#MementoManager+canRedo) ⇒ <code>boolean</code>
    * [.import(history)](#MementoManager+import) ⇒ [<code>MementoManager</code>](#MementoManager)
    * [.history()](#MementoManager+history) ⇒ <code>[ &#x27;Array&#x27; ].&lt;unknown&gt;</code>
    * [.save(value)](#MementoManager+save) ⇒ [<code>MementoManager</code>](#MementoManager)
    * [.suspendSave(state)](#MementoManager+suspendSave) ⇒ [<code>MementoManager</code>](#MementoManager)
    * [.allowedSave()](#MementoManager+allowedSave) ⇒ <code>boolean</code>
    * [.clear()](#MementoManager+clear) ⇒ [<code>MementoManager</code>](#MementoManager)
    * [.undo(callback)](#MementoManager+undo) ⇒ [<code>MementoManager</code>](#MementoManager)
    * [.redo(callback)](#MementoManager+redo) ⇒ [<code>MementoManager</code>](#MementoManager)
    * [.current()](#MementoManager+current) ⇒ <code>\*</code>
    * [.count()](#MementoManager+count) ⇒ <code>number</code>
    * [.initialState()](#MementoManager+initialState) ⇒ <code>unknown</code>
    * [.onUpdate(callback)](#MementoManager+onUpdate) ⇒ [<code>MementoManager</code>](#MementoManager)
    * [.onMaxLength(callback)](#MementoManager+onMaxLength) ⇒ [<code>MementoManager</code>](#MementoManager)
    * [.onBeforeSave(callback)](#MementoManager+onBeforeSave) ⇒ [<code>MementoManager</code>](#MementoManager)

<a name="new_MementoManager_new"></a>

### new MementoManager(options)
Implementing undo/redo Function with Memento Pattern , where you capture the whole current state.It's easy to implement, but memory-inefficient since you need to store similar copies of the whole state.

<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>options</td><td><code>ICommandDescriptor</code></td>
    </tr><tr>
    <td>options.provider</td><td><code>function</code></td>
    </tr><tr>
    <td>options.maxLength</td><td><code>function</code></td>
    </tr>  </tbody>
</table>

<a name="MementoManager+position"></a>

### mementoManager.position ⇒ <code>number</code>
get current position

**Kind**: instance property of [<code>MementoManager</code>](#MementoManager)  
<a name="MementoManager+maxLength"></a>

### mementoManager.maxLength
{set max length}

**Kind**: instance property of [<code>MementoManager</code>](#MementoManager)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>value</td><td><code>number</code></td>
    </tr>  </tbody>
</table>

<a name="MementoManager+canUndo"></a>

### mementoManager.canUndo() ⇒ <code>boolean</code>
Check if undo is available

**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
<a name="MementoManager+canRedo"></a>

### mementoManager.canRedo() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
**Check**: if redo is available  
<a name="MementoManager+import"></a>

### mementoManager.import(history) ⇒ [<code>MementoManager</code>](#MementoManager)
Import external history

**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>history</td><td><code>Array</code></td>
    </tr>  </tbody>
</table>

<a name="MementoManager+history"></a>

### mementoManager.history() ⇒ <code>[ &#x27;Array&#x27; ].&lt;unknown&gt;</code>
get history

**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
<a name="MementoManager+save"></a>

### mementoManager.save(value) ⇒ [<code>MementoManager</code>](#MementoManager)
**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>value</td>
    </tr>  </tbody>
</table>

<a name="MementoManager+suspendSave"></a>

### mementoManager.suspendSave(state) ⇒ [<code>MementoManager</code>](#MementoManager)
**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Default</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>state</td><td><code>true</code></td>
    </tr>  </tbody>
</table>

<a name="MementoManager+allowedSave"></a>

### mementoManager.allowedSave() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
<a name="MementoManager+clear"></a>

### mementoManager.clear() ⇒ [<code>MementoManager</code>](#MementoManager)
**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
<a name="MementoManager+undo"></a>

### mementoManager.undo(callback) ⇒ [<code>MementoManager</code>](#MementoManager)
**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td>
    </tr>  </tbody>
</table>

<a name="MementoManager+redo"></a>

### mementoManager.redo(callback) ⇒ [<code>MementoManager</code>](#MementoManager)
**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td>
    </tr>  </tbody>
</table>

<a name="MementoManager+current"></a>

### mementoManager.current() ⇒ <code>\*</code>
**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
<a name="MementoManager+count"></a>

### mementoManager.count() ⇒ <code>number</code>
**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
<a name="MementoManager+initialState"></a>

### mementoManager.initialState() ⇒ <code>unknown</code>
**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
<a name="MementoManager+onUpdate"></a>

### mementoManager.onUpdate(callback) ⇒ [<code>MementoManager</code>](#MementoManager)
**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td>
    </tr>  </tbody>
</table>

<a name="MementoManager+onMaxLength"></a>

### mementoManager.onMaxLength(callback) ⇒ [<code>MementoManager</code>](#MementoManager)
**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td>
    </tr>  </tbody>
</table>

<a name="MementoManager+onBeforeSave"></a>

### mementoManager.onBeforeSave(callback) ⇒ [<code>MementoManager</code>](#MementoManager)
**Kind**: instance method of [<code>MementoManager</code>](#MementoManager)  
<table>
  <thead>
    <tr>
      <th>Param</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td>
    </tr>  </tbody>
</table>

<a name="CommandManager"></a>

## CommandManager
**Kind**: global class  

* [CommandManager](#CommandManager)
    * [new CommandManager()](#new_CommandManager_new)
    * [.cursor](#CommandManager+cursor) ⇒ <code>number</code>
    * [.commands](#CommandManager+commands) ⇒ <code>\*</code>
    * [.limit](#CommandManager+limit)
    * [.limit](#CommandManager+limit) ⇒ <code>number</code>
    * [.add(command)](#CommandManager+add) ⇒ <code>void</code>
    * [.undo(callback)](#CommandManager+undo) ⇒ [<code>CommandManager</code>](#CommandManager)
    * [.redo(callback)](#CommandManager+redo) ⇒ [<code>CommandManager</code>](#CommandManager)
    * [.onUpdate(callback)](#CommandManager+onUpdate) ⇒ [<code>CommandManager</code>](#CommandManager)
    * [.onLimited(callback)](#CommandManager+onLimited) ⇒ [<code>CommandManager</code>](#CommandManager)
    * [.onSuspended(callback)](#CommandManager+onSuspended) ⇒ [<code>CommandManager</code>](#CommandManager)
    * [.onBeforeAdd(callback)](#CommandManager+onBeforeAdd) ⇒ [<code>CommandManager</code>](#CommandManager)
    * [.canUndo()](#CommandManager+canUndo) ⇒ <code>boolean</code>
    * [.canRedo()](#CommandManager+canRedo) ⇒ <code>boolean</code>
    * [.size()](#CommandManager+size) ⇒ <code>number</code>
    * [.clear()](#CommandManager+clear) ⇒ [<code>CommandManager</code>](#CommandManager)
    * [.current()](#CommandManager+current) ⇒ <code>\*</code>
    * [.suspendAdd(state)](#CommandManager+suspendAdd) ⇒ [<code>CommandManager</code>](#CommandManager)
    * [.allowedAdd()](#CommandManager+allowedAdd) ⇒ <code>boolean</code>
    * [.startBatch()](#CommandManager+startBatch) ⇒ [<code>CommandManager</code>](#CommandManager)
    * [.endBatch()](#CommandManager+endBatch) ⇒ [<code>CommandManager</code>](#CommandManager)
    * [.batch(callback, scope)](#CommandManager+batch) ⇒ [<code>CommandManager</code>](#CommandManager)
    * [.isBatching()](#CommandManager+isBatching) ⇒ <code>boolean</code>

<a name="new_CommandManager_new"></a>

### new CommandManager()
The Command Pattern, where you capture commands/actions that affect the state (the current action and it's inverse action). Harder to implement since for for each undoable actionin your application you must explicitly code it's inverse action, but it's far more memory-efficient since you only store the actions that affect the state.

<a name="CommandManager+cursor"></a>

### commandManager.cursor ⇒ <code>number</code>
**Kind**: instance property of [<code>CommandManager</code>](#CommandManager)  
<a name="CommandManager+commands"></a>

### commandManager.commands ⇒ <code>\*</code>
**Kind**: instance property of [<code>CommandManager</code>](#CommandManager)  
<a name="CommandManager+limit"></a>

### commandManager.limit
**Kind**: instance property of [<code>CommandManager</code>](#CommandManager)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>limit</td><td><code>number</code></td>
    </tr>  </tbody>
</table>

<a name="CommandManager+limit"></a>

### commandManager.limit ⇒ <code>number</code>
**Kind**: instance property of [<code>CommandManager</code>](#CommandManager)  
<a name="CommandManager+add"></a>

### commandManager.add(command) ⇒ <code>void</code>
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>command</td><td><code>CommandDescriptor</code> | <code>Array.&lt;CommandDescriptor&gt;</code></td>
    </tr>  </tbody>
</table>

<a name="CommandManager+undo"></a>

### commandManager.undo(callback) ⇒ [<code>CommandManager</code>](#CommandManager)
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code>function</code></td>
    </tr>  </tbody>
</table>

<a name="CommandManager+redo"></a>

### commandManager.redo(callback) ⇒ [<code>CommandManager</code>](#CommandManager)
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code>function</code></td>
    </tr>  </tbody>
</table>

<a name="CommandManager+onUpdate"></a>

### commandManager.onUpdate(callback) ⇒ [<code>CommandManager</code>](#CommandManager)
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code>function</code></td>
    </tr>  </tbody>
</table>

<a name="CommandManager+onLimited"></a>

### commandManager.onLimited(callback) ⇒ [<code>CommandManager</code>](#CommandManager)
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code>function</code></td>
    </tr>  </tbody>
</table>

<a name="CommandManager+onSuspended"></a>

### commandManager.onSuspended(callback) ⇒ [<code>CommandManager</code>](#CommandManager)
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code>function</code></td>
    </tr>  </tbody>
</table>

<a name="CommandManager+onBeforeAdd"></a>

### commandManager.onBeforeAdd(callback) ⇒ [<code>CommandManager</code>](#CommandManager)
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code>function</code></td>
    </tr>  </tbody>
</table>

<a name="CommandManager+canUndo"></a>

### commandManager.canUndo() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<a name="CommandManager+canRedo"></a>

### commandManager.canRedo() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<a name="CommandManager+size"></a>

### commandManager.size() ⇒ <code>number</code>
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<a name="CommandManager+clear"></a>

### commandManager.clear() ⇒ [<code>CommandManager</code>](#CommandManager)
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<a name="CommandManager+current"></a>

### commandManager.current() ⇒ <code>\*</code>
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<a name="CommandManager+suspendAdd"></a>

### commandManager.suspendAdd(state) ⇒ [<code>CommandManager</code>](#CommandManager)
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>state</td><td><code>boolean</code></td><td><code>true</code></td>
    </tr>  </tbody>
</table>

<a name="CommandManager+allowedAdd"></a>

### commandManager.allowedAdd() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<a name="CommandManager+startBatch"></a>

### commandManager.startBatch() ⇒ [<code>CommandManager</code>](#CommandManager)
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<a name="CommandManager+endBatch"></a>

### commandManager.endBatch() ⇒ [<code>CommandManager</code>](#CommandManager)
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<a name="CommandManager+batch"></a>

### commandManager.batch(callback, scope) ⇒ [<code>CommandManager</code>](#CommandManager)
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code>function</code></td>
    </tr><tr>
    <td>scope</td><td><code>*</code></td>
    </tr>  </tbody>
</table>

<a name="CommandManager+isBatching"></a>

### commandManager.isBatching() ⇒ <code>boolean</code>
**Kind**: instance method of [<code>CommandManager</code>](#CommandManager)  

## Changelog
You can view the changelog <a target="_blank" href="https://github.com/ue007/unredo/blob/main/CHANGELOG.md">here</a>

## License
UnReDo is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="">Jeff</a>
