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
import { MementoManager } from '../dist/memento.es.js';

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
</dl>

## Members

<dl>
<dt><a href="#arrayProto">arrayProto</a></dt>
<dd><p>Used for built-in method references.</p>
</dd>
<dt><a href="#splice">splice</a></dt>
<dd><p>Built-in value references.</p>
</dd>
<dt><a href="#freeGlobal">freeGlobal</a></dt>
<dd><p>Detect free variable <code>global</code> from Node.js.</p>
</dd>
<dt><a href="#freeSelf">freeSelf</a></dt>
<dd><p>Detect free variable <code>self</code>.</p>
</dd>
<dt><a href="#root">root</a></dt>
<dd><p>Used as a reference to the global object.</p>
</dd>
<dt><a href="#Symbol">Symbol</a></dt>
<dd><p>Built-in value references.</p>
</dd>
<dt><a href="#objectProto$c">objectProto$c</a></dt>
<dd><p>Used for built-in method references.</p>
</dd>
<dt><a href="#hasOwnProperty$9">hasOwnProperty$9</a></dt>
<dd><p>Used to check objects for own properties.</p>
</dd>
<dt><a href="#nativeObjectToString$1">nativeObjectToString$1</a></dt>
<dd><p>Used to resolve the
<a href="http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring"><code>toStringTag</code></a>
of values.</p>
</dd>
<dt><a href="#symToStringTag$1">symToStringTag$1</a></dt>
<dd><p>Built-in value references.</p>
</dd>
<dt><a href="#objectProto$b">objectProto$b</a></dt>
<dd><p>Used for built-in method references.</p>
</dd>
<dt><a href="#nativeObjectToString">nativeObjectToString</a></dt>
<dd><p>Used to resolve the
<a href="http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring"><code>toStringTag</code></a>
of values.</p>
</dd>
<dt><a href="#nullTag">nullTag</a></dt>
<dd><p><code>Object#toString</code> result references.</p>
</dd>
<dt><a href="#symToStringTag">symToStringTag</a></dt>
<dd><p>Built-in value references.</p>
</dd>
<dt><a href="#asyncTag">asyncTag</a></dt>
<dd><p><code>Object#toString</code> result references.</p>
</dd>
<dt><a href="#coreJsData">coreJsData</a></dt>
<dd><p>Used to detect overreaching core-js shims.</p>
</dd>
<dt><a href="#maskSrcKey">maskSrcKey</a></dt>
<dd><p>Used to detect methods masquerading as native.</p>
</dd>
<dt><a href="#funcProto$1">funcProto$1</a></dt>
<dd><p>Used for built-in method references.</p>
</dd>
<dt><a href="#funcToString$1">funcToString$1</a></dt>
<dd><p>Used to resolve the decompiled source of functions.</p>
</dd>
<dt><a href="#reRegExpChar">reRegExpChar</a></dt>
<dd><p>Used to match <code>RegExp</code>
<a href="http://ecma-international.org/ecma-262/7.0/#sec-patterns">syntax characters</a>.</p>
</dd>
<dt><a href="#reIsHostCtor">reIsHostCtor</a></dt>
<dd><p>Used to detect host constructors (Safari).</p>
</dd>
<dt><a href="#funcProto">funcProto</a></dt>
<dd><p>Used for built-in method references.</p>
</dd>
<dt><a href="#funcToString">funcToString</a></dt>
<dd><p>Used to resolve the decompiled source of functions.</p>
</dd>
<dt><a href="#hasOwnProperty$8">hasOwnProperty$8</a></dt>
<dd><p>Used to check objects for own properties.</p>
</dd>
<dt><a href="#reIsNative">reIsNative</a></dt>
<dd><p>Used to detect if a method is native.</p>
</dd>
<dt><a href="#HASH_UNDEFINED$1">HASH_UNDEFINED$1</a></dt>
<dd><p>Used to stand-in for <code>undefined</code> hash values.</p>
</dd>
<dt><a href="#objectProto$9">objectProto$9</a></dt>
<dd><p>Used for built-in method references.</p>
</dd>
<dt><a href="#hasOwnProperty$7">hasOwnProperty$7</a></dt>
<dd><p>Used to check objects for own properties.</p>
</dd>
<dt><a href="#objectProto$8">objectProto$8</a></dt>
<dd><p>Used for built-in method references.</p>
</dd>
<dt><a href="#hasOwnProperty$6">hasOwnProperty$6</a></dt>
<dd><p>Used to check objects for own properties.</p>
</dd>
<dt><a href="#HASH_UNDEFINED">HASH_UNDEFINED</a></dt>
<dd><p>Used to stand-in for <code>undefined</code> hash values.</p>
</dd>
<dt><a href="#LARGE_ARRAY_SIZE">LARGE_ARRAY_SIZE</a></dt>
<dd><p>Used as the size to enable large array optimizations.</p>
</dd>
<dt><a href="#objectProto$7">objectProto$7</a></dt>
<dd><p>Used for built-in method references.</p>
</dd>
<dt><a href="#hasOwnProperty$5">hasOwnProperty$5</a></dt>
<dd><p>Used to check objects for own properties.</p>
</dd>
<dt><a href="#argsTag$2">argsTag$2</a></dt>
<dd><p><code>Object#toString</code> result references.</p>
</dd>
<dt><a href="#objectProto$6">objectProto$6</a></dt>
<dd><p>Used for built-in method references.</p>
</dd>
<dt><a href="#hasOwnProperty$4">hasOwnProperty$4</a></dt>
<dd><p>Used to check objects for own properties.</p>
</dd>
<dt><a href="#propertyIsEnumerable$1">propertyIsEnumerable$1</a></dt>
<dd><p>Built-in value references.</p>
</dd>
<dt><a href="#MAX_SAFE_INTEGER$1">MAX_SAFE_INTEGER$1</a></dt>
<dd><p>Used as references for various <code>Number</code> constants.</p>
</dd>
<dt><a href="#reIsUint">reIsUint</a></dt>
<dd><p>Used to detect unsigned integer values.</p>
</dd>
<dt><a href="#MAX_SAFE_INTEGER">MAX_SAFE_INTEGER</a></dt>
<dd><p>Used as references for various <code>Number</code> constants.</p>
</dd>
<dt><a href="#argsTag$1">argsTag$1</a></dt>
<dd><p><code>Object#toString</code> result references.</p>
</dd>
<dt><a href="#typedArrayTags">typedArrayTags</a></dt>
<dd><p>Used to identify <code>toStringTag</code> values of typed arrays.</p>
</dd>
<dt><a href="#objectProto$5">objectProto$5</a></dt>
<dd><p>Used for built-in method references.</p>
</dd>
<dt><a href="#hasOwnProperty$3">hasOwnProperty$3</a></dt>
<dd><p>Used to check objects for own properties.</p>
</dd>
<dt><a href="#objectProto$4">objectProto$4</a></dt>
<dd><p>Used for built-in method references.</p>
</dd>
<dt><a href="#objectProto$3">objectProto$3</a></dt>
<dd><p>Used for built-in method references.</p>
</dd>
<dt><a href="#hasOwnProperty$2">hasOwnProperty$2</a></dt>
<dd><p>Used to check objects for own properties.</p>
</dd>
<dt><a href="#objectProto$2">objectProto$2</a></dt>
<dd><p>Used for built-in method references.</p>
</dd>
<dt><a href="#hasOwnProperty$1">hasOwnProperty$1</a></dt>
<dd><p>Used to check objects for own properties.</p>
</dd>
<dt><a href="#objectProto$1">objectProto$1</a></dt>
<dd><p>Used for built-in method references.</p>
</dd>
<dt><a href="#propertyIsEnumerable">propertyIsEnumerable</a></dt>
<dd><p>Built-in value references.</p>
</dd>
<dt><a href="#getPrototype">getPrototype</a></dt>
<dd><p>Built-in value references.</p>
</dd>
<dt><a href="#mapTag$3">mapTag$3</a></dt>
<dd><p><code>Object#toString</code> result references.</p>
</dd>
<dt><a href="#dataViewCtorString">dataViewCtorString</a></dt>
<dd><p>Used to detect maps, sets, and weakmaps.</p>
</dd>
<dt><a href="#objectProto">objectProto</a></dt>
<dd><p>Used for built-in method references.</p>
</dd>
<dt><a href="#hasOwnProperty">hasOwnProperty</a></dt>
<dd><p>Used to check objects for own properties.</p>
</dd>
<dt><a href="#Uint8Array">Uint8Array</a></dt>
<dd><p>Built-in value references.</p>
</dd>
<dt><a href="#reFlags">reFlags</a></dt>
<dd><p>Used to match <code>RegExp</code> flags from their coerced string values.</p>
</dd>
<dt><a href="#symbolProto">symbolProto</a></dt>
<dd><p>Used to convert symbols to primitives and strings.</p>
</dd>
<dt><a href="#boolTag$1">boolTag$1</a></dt>
<dd><p><code>Object#toString</code> result references.</p>
</dd>
<dt><a href="#objectCreate">objectCreate</a></dt>
<dd><p>Built-in value references.</p>
</dd>
<dt><a href="#mapTag$1">mapTag$1</a></dt>
<dd><p><code>Object#toString</code> result references.</p>
</dd>
<dt><a href="#setTag$1">setTag$1</a></dt>
<dd><p><code>Object#toString</code> result references.</p>
</dd>
<dt><a href="#CLONE_DEEP_FLAG$1">CLONE_DEEP_FLAG$1</a></dt>
<dd><p>Used to compose bitmasks for cloning.</p>
</dd>
<dt><a href="#argsTag">argsTag</a></dt>
<dd><p><code>Object#toString</code> result references.</p>
</dd>
<dt><a href="#cloneableTags">cloneableTags</a></dt>
<dd><p>Used to identify <code>toStringTag</code> values supported by <code>_.clone</code>.</p>
</dd>
<dt><a href="#CLONE_DEEP_FLAG">CLONE_DEEP_FLAG</a></dt>
<dd><p>Used to compose bitmasks for cloning.</p>
</dd>
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
    <td>options</td><td><code>IMementoDescriptor</code></td>
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

<a name="arrayProto"></a>

## arrayProto
Used for built-in method references.

**Kind**: global variable  
<a name="splice"></a>

## splice
Built-in value references.

**Kind**: global variable  
<a name="freeGlobal"></a>

## freeGlobal
Detect free variable `global` from Node.js.

**Kind**: global variable  
<a name="freeSelf"></a>

## freeSelf
Detect free variable `self`.

**Kind**: global variable  
<a name="root"></a>

## root
Used as a reference to the global object.

**Kind**: global variable  
<a name="Symbol"></a>

## Symbol
Built-in value references.

**Kind**: global variable  
<a name="objectProto$c"></a>

## objectProto$c
Used for built-in method references.

**Kind**: global variable  
<a name="hasOwnProperty$9"></a>

## hasOwnProperty$9
Used to check objects for own properties.

**Kind**: global variable  
<a name="nativeObjectToString$1"></a>

## nativeObjectToString$1
Used to resolve the
[`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
of values.

**Kind**: global variable  
<a name="symToStringTag$1"></a>

## symToStringTag$1
Built-in value references.

**Kind**: global variable  
<a name="objectProto$b"></a>

## objectProto$b
Used for built-in method references.

**Kind**: global variable  
<a name="nativeObjectToString"></a>

## nativeObjectToString
Used to resolve the
[`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
of values.

**Kind**: global variable  
<a name="nullTag"></a>

## nullTag
`Object#toString` result references.

**Kind**: global variable  
<a name="symToStringTag"></a>

## symToStringTag
Built-in value references.

**Kind**: global variable  
<a name="asyncTag"></a>

## asyncTag
`Object#toString` result references.

**Kind**: global variable  
<a name="coreJsData"></a>

## coreJsData
Used to detect overreaching core-js shims.

**Kind**: global variable  
<a name="maskSrcKey"></a>

## maskSrcKey
Used to detect methods masquerading as native.

**Kind**: global variable  
<a name="funcProto$1"></a>

## funcProto$1
Used for built-in method references.

**Kind**: global variable  
<a name="funcToString$1"></a>

## funcToString$1
Used to resolve the decompiled source of functions.

**Kind**: global variable  
<a name="reRegExpChar"></a>

## reRegExpChar
Used to match `RegExp`
[syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).

**Kind**: global variable  
<a name="reIsHostCtor"></a>

## reIsHostCtor
Used to detect host constructors (Safari).

**Kind**: global variable  
<a name="funcProto"></a>

## funcProto
Used for built-in method references.

**Kind**: global variable  
<a name="funcToString"></a>

## funcToString
Used to resolve the decompiled source of functions.

**Kind**: global variable  
<a name="hasOwnProperty$8"></a>

## hasOwnProperty$8
Used to check objects for own properties.

**Kind**: global variable  
<a name="reIsNative"></a>

## reIsNative
Used to detect if a method is native.

**Kind**: global variable  
<a name="HASH_UNDEFINED$1"></a>

## HASH\_UNDEFINED$1
Used to stand-in for `undefined` hash values.

**Kind**: global variable  
<a name="objectProto$9"></a>

## objectProto$9
Used for built-in method references.

**Kind**: global variable  
<a name="hasOwnProperty$7"></a>

## hasOwnProperty$7
Used to check objects for own properties.

**Kind**: global variable  
<a name="objectProto$8"></a>

## objectProto$8
Used for built-in method references.

**Kind**: global variable  
<a name="hasOwnProperty$6"></a>

## hasOwnProperty$6
Used to check objects for own properties.

**Kind**: global variable  
<a name="HASH_UNDEFINED"></a>

## HASH\_UNDEFINED
Used to stand-in for `undefined` hash values.

**Kind**: global variable  
<a name="LARGE_ARRAY_SIZE"></a>

## LARGE\_ARRAY\_SIZE
Used as the size to enable large array optimizations.

**Kind**: global variable  
<a name="objectProto$7"></a>

## objectProto$7
Used for built-in method references.

**Kind**: global variable  
<a name="hasOwnProperty$5"></a>

## hasOwnProperty$5
Used to check objects for own properties.

**Kind**: global variable  
<a name="argsTag$2"></a>

## argsTag$2
`Object#toString` result references.

**Kind**: global variable  
<a name="objectProto$6"></a>

## objectProto$6
Used for built-in method references.

**Kind**: global variable  
<a name="hasOwnProperty$4"></a>

## hasOwnProperty$4
Used to check objects for own properties.

**Kind**: global variable  
<a name="propertyIsEnumerable$1"></a>

## propertyIsEnumerable$1
Built-in value references.

**Kind**: global variable  
<a name="MAX_SAFE_INTEGER$1"></a>

## MAX\_SAFE\_INTEGER$1
Used as references for various `Number` constants.

**Kind**: global variable  
<a name="reIsUint"></a>

## reIsUint
Used to detect unsigned integer values.

**Kind**: global variable  
<a name="MAX_SAFE_INTEGER"></a>

## MAX\_SAFE\_INTEGER
Used as references for various `Number` constants.

**Kind**: global variable  
<a name="argsTag$1"></a>

## argsTag$1
`Object#toString` result references.

**Kind**: global variable  
<a name="typedArrayTags"></a>

## typedArrayTags
Used to identify `toStringTag` values of typed arrays.

**Kind**: global variable  
<a name="objectProto$5"></a>

## objectProto$5
Used for built-in method references.

**Kind**: global variable  
<a name="hasOwnProperty$3"></a>

## hasOwnProperty$3
Used to check objects for own properties.

**Kind**: global variable  
<a name="objectProto$4"></a>

## objectProto$4
Used for built-in method references.

**Kind**: global variable  
<a name="objectProto$3"></a>

## objectProto$3
Used for built-in method references.

**Kind**: global variable  
<a name="hasOwnProperty$2"></a>

## hasOwnProperty$2
Used to check objects for own properties.

**Kind**: global variable  
<a name="objectProto$2"></a>

## objectProto$2
Used for built-in method references.

**Kind**: global variable  
<a name="hasOwnProperty$1"></a>

## hasOwnProperty$1
Used to check objects for own properties.

**Kind**: global variable  
<a name="objectProto$1"></a>

## objectProto$1
Used for built-in method references.

**Kind**: global variable  
<a name="propertyIsEnumerable"></a>

## propertyIsEnumerable
Built-in value references.

**Kind**: global variable  
<a name="getPrototype"></a>

## getPrototype
Built-in value references.

**Kind**: global variable  
<a name="mapTag$3"></a>

## mapTag$3
`Object#toString` result references.

**Kind**: global variable  
<a name="dataViewCtorString"></a>

## dataViewCtorString
Used to detect maps, sets, and weakmaps.

**Kind**: global variable  
<a name="objectProto"></a>

## objectProto
Used for built-in method references.

**Kind**: global variable  
<a name="hasOwnProperty"></a>

## hasOwnProperty
Used to check objects for own properties.

**Kind**: global variable  
<a name="Uint8Array"></a>

## Uint8Array
Built-in value references.

**Kind**: global variable  
<a name="reFlags"></a>

## reFlags
Used to match `RegExp` flags from their coerced string values.

**Kind**: global variable  
<a name="symbolProto"></a>

## symbolProto
Used to convert symbols to primitives and strings.

**Kind**: global variable  
<a name="boolTag$1"></a>

## boolTag$1
`Object#toString` result references.

**Kind**: global variable  
<a name="objectCreate"></a>

## objectCreate
Built-in value references.

**Kind**: global variable  
<a name="mapTag$1"></a>

## mapTag$1
`Object#toString` result references.

**Kind**: global variable  
<a name="setTag$1"></a>

## setTag$1
`Object#toString` result references.

**Kind**: global variable  
<a name="CLONE_DEEP_FLAG$1"></a>

## CLONE\_DEEP\_FLAG$1
Used to compose bitmasks for cloning.

**Kind**: global variable  
<a name="argsTag"></a>

## argsTag
`Object#toString` result references.

**Kind**: global variable  
<a name="cloneableTags"></a>

## cloneableTags
Used to identify `toStringTag` values supported by `_.clone`.

**Kind**: global variable  
<a name="CLONE_DEEP_FLAG"></a>

## CLONE\_DEEP\_FLAG
Used to compose bitmasks for cloning.

**Kind**: global variable  

## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/undoo/blob/master/CHANGELOG.md">here</a>

## License
UnReDo is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="">Jeff</a>
