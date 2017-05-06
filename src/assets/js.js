const X = console.log

// document.querySelector is eventually overridden by webcomponents.js, save a copy beforehand
const dqs = document.querySelector
const dqsa = document.querySelectorAll
const $ = s => dqs.call(document, s)
const $$ = s => dqsa.call(document, s)
/* 
const $ = s => document.querySelector(s)
const $$ = s => document.querySelectorAll(s)*/

const $$$ = function(name, opts){
	const el = document.createElement(name)
	if(opts && opts.html) el.innerHTML = opts.html
	return el
}

Object.defineProperties(Object.prototype, {
	merge: {
		enumerable: false,
		configurable: true,
		writable: false,
		//writable: true,
		value(){
			for (let i = 0; i < arguments.length; i++) {
				const obj = arguments[i]
				for (let key in obj) {
					if (this.hasOwnProperty(key) && typeof this[key] === "object" && this[key].constructor === obj[key].constructor) {
						this[key] = this[key].constructor === Array ? this[key].concat(obj[key]) : this[key].merge(obj[key])
					} else {
						this[key] = obj[key]
					}
				}
			}
			return this
		}
	},
	invert: {
		enumerable: false,
		configurable: true,
		writable: false,
		value(){
			const o = {}
			for(const key in this){
				o[this[key]] = key
			}
			return o
		}
	}
})


// Object.values/Object.entries polyfill
// https://github.com/tc39/proposal-object-values-entries/blob/master/polyfill.js
;(() => {
	const reduce = Function.bind.call(Function.call, Array.prototype.reduce)
	const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable)
	const concat = Function.bind.call(Function.call, Array.prototype.concat)
	const keys = Reflect.ownKeys

	if (!Object.values) {
		Object.values = function values(O) {
			return reduce(keys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), [])
		}
	}

	if (!Object.entries) {
		Object.entries = function entries(O) {
			return reduce(keys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), [])
		}
	}
})()


/*
"abc".replaceAll("a", "1"); // "1bc"
"abc".replaceAll(["a", "c"], "1"); // "1b1"
"abc".replaceAll({"a": "1", "c": "3"}, "1"); // "1b3"
*/
String.prototype.replaceAll = function(replace, replaceWith) {
	if (typeof replace === 'string') {
		return this.replace(new RegExp(RegExp.escape(replace), 'gi'), replaceWith)
	} else if (Array.isArray(replace)) {
		let s = this
		for (let replaceString of replace) {
			s = s.replaceAll(replaceString, replaceWith)
		}
		return s
	} else if (typeof replace === 'object') {
		let s = this
		for (let r in replace) {
			s = s.replaceAll(r, replace[r])
		}
		return s
	}
	return this
}




Array.prototype.remove = function(obj){
	const i = this.indexOf(obj)
	if(i > -1) this.splice(i, 1)
	return this
}
Array.prototype.clear = function(obj){
	this.length = 0
	return this
}
Array.prototype.last = function(){
	return this[this.length - 1]
}




//const π = Math.PI
/*const τ =*/ Math.TAU = Math.PI * 2
Math.stdNorm = x => Math.pow(Math.E, (x*x/-2))/* / Math.sqrt(Math.TAU)*/
Math.stdNormSlope = x => Math.stdNorm(x) * -x

Math._random = Math.random
Math.random = Number.random = function(a = 1, b = 0){
	return Math._random().normMap(a, b)
}

Math.dist = function(a, b){
	return Math.abs(a - b)
}

Number.prototype.map = function(a, b, A = 0, B = 1){
	return A + (this - a) / (b - a) * (B - A)
}

Number.prototype.normMap = function(A, B){
	return this.map(0, 1, A, B)
}

Number.prototype.constrainMap = function(a, b, A = 0, B = 1){
	return this.map(a, b, A, B).constrain(A, B)
}
Number.prototype.normConstrainMap = function(A, B){
	return this.map(0, 1, A, B).constrain(A, B)
}

Number.prototype.constrain = function(a = 0, b = 1){
	if(a > b) [a, b] = [b, a]
	return this.min(b).max(a)
}

Number.prototype.min = function(){
	return Math.min(...[this, ...arguments])
}

Number.prototype.max = function(a){
	return Math.max(...[this, ...arguments])
}

Number.prototype.sign = function(){
	return Math.sign(this)
}

Number.prototype.abs = function(){
	return Math.abs(this)
}



// Execute this function after a delay. A time of 0 uses RAF, otherwise setTimeout. A combination of the two can be used by passing true as the second argument.
Function.prototype.delay = function(time = 0, useRAF = false){
	if(time > 0){
		return setTimeout(() => {
			if(useRAF){
				requestAnimationFrame(this)
			}else{
				this()
			}
		}, time)
	}else{
		requestAnimationFrame(this)
	}
}

// Execute this function repeatedly over a given time interval. A time of 0 uses RAF, otherwise setTimeout. A combination of the two can be used by passing true as the second argument.
Function.prototype.interval = function(time = 0, useRAF = false){
	if(time > 0){
		const i = setInterval(() => {
			const call = () => {
				if(this() == false){
					clearInterval(i)
				}
			}
			if(useRAF){
				call.delay()
			}else{
				call()
			}
		}, time)
		return i
	}else{
		const call = () => {
			if(this() !== false){
				requestAnimationFrame(call)
			}
		}
		call()
	}
}

// Returns a version of this function that won't be executed more than once in a given interval of time.
Function.prototype.throttle = function(time, useRAF){
	let shouldWait = false
	let later
	const func = this
	return function(){
		if (!shouldWait) {
			func.apply(this, arguments)
			shouldWait = true
			;(() => {
				shouldWait = false
				if(later){
					later()
					later = undefined
				}
			}).delay(time, useRAF)
		}else{
			later = () => {
				func.apply(this, arguments)
			}
		}
	}
}

// Returns a version of this function that won't be executed if the given interval of time has not passed since the last attempt to execute it.
Function.prototype.debounce = function(time, immediate) {
	let timeout
	const func = this
	return function() {
		if(immediate && !timeout) func.apply(this, arguments)

		clearTimeout(timeout)

		timeout = setTimeout(() => {
			timeout = undefined
			if(!immediate) func.apply(this, arguments)
		}, time)
	}
}


Set.prototype.toggle = function(add, ...objects){
	if(typeof arguments[0] === 'boolean'){
		this[add ? 'add' : 'delete'](...objects)
	}else{
		for(const object of arguments){
			this[this.has(object) ? 'delete' : 'add'](object)
		}
	}
	return this
}


// http://stackoverflow.com/a/3561711
RegExp.escape = function(s) {
	return String(s).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}


URL.pathName = function(url){
	return (new URL(url)).pathname
}


const OriginalNode = Node
Node.prototype._insertBefore = Node.prototype.insertBefore
Node.prototype.insertBefore = function(targetNode){
	// Emulate default behavior as according to spec... sigh
	/*if(arguments.length === 2){console.log(arguments)
		let [newNode, referenceNode] = arguments
		if(referenceNode === null){
			this._insertBefore.apply(this, arguments)
			//this.appendChild(WRAP(newNode))
		}else{
			referenceNode.insertAdjacentElement('beforebegin', newNode)
		}
		return
	}*/
	if(arguments.length === 2) return this._insertBefore.apply(this, arguments)

	targetNode.insertAdjacentElement('beforebegin', this)
	//targetNode.parentNode.insertBefore(this, targetNode)
	return this
}
Node.prototype.insertAfter = function(targetNode){
	targetNode.insertAdjacentElement('afterend', this)
	return this
}
Node.prototype.prependTo = function(targetNode){
	targetNode.prependChild(this)
	//targetNode.insertBefore(this, targetNode.firstChild)
	return this
}
Node.prototype.appendTo = function(targetNode){
	targetNode.append(this)
	//return OriginalNode.prototype.appendChild.call(targetNode, this)
	return this
}
Node.prototype.prependChild = function(targetNode){
	this.insertAdjacentElement('afterbegin', targetNode)
	//this.insertBefore(targetNode, this.firstChild)
	return this
}
/*Node.prototype._appendChild = OriginalNode.prototype.appendChild
Node.prototype.appendChild = function(targetNode){
	this._appendChild(targetNode)
	return this
}*/
Node.prototype.append = function(targetNode){
	if(arguments[0] instanceof NodeList){
		for(const targetNode of arguments[0]){
			this.appendChild(targetNode)
		}
	}else{
		this.appendChild(targetNode)
	}
	return this
}
/*for(const Prototype of [Document, Element, DocumentFragment]){
	Prototype.prototype._append = Prototype.prototype.append
	Prototype.prototype.append = function(){
		this._append(...arguments)
		return this
	}
}*/
for(const Prototype of [Document, Element, DocumentFragment]){
	Prototype.prototype.append = Node.prototype.append
}
Node.prototype.replaceWith = function(targetNode){
	this.parentNode.replaceChild(this, targetNode)
	return targetNode
}
Node.prototype.empty = function(){
	while (this.firstChild) {
		this.removeChild(this.firstChild)
	}
	return this
}
Node.prototype.clone = function(deep = true){
	return this.cloneNode(deep)
}
// Naming this "Node.prototype.import" results in "TypeError: null is not an object (evaluating 'node.__proto__')" from webcomponents.js"
// Use .clone() instead, there's no difference: http://stackoverflow.com/q/39372886/5545315
Node.prototype.import = function(deep = true){
	return document.importNode(this, deep)
}
Node.prototype.importTo = function(doc = document, deep = true){
	return doc.importNode(this, deep)
}

/*
// Consider using this pattern instead of the one below.
Element.prototype = class extends Element {
	get width(){
		return this.rect.width
	}
}.prototype
*/
Object.defineProperties(Element.prototype, {
	clientRight: {
		get(){
			return this.clientLeft + this.clientWidth
		}
	},
	clientBottom: {
		get(){
			return this.clientTop + this.clientHeight
		}
	},
	rect: {
		get(){
			return this.getBoundingClientRect()
		}
	},
	left: {
		get(){
			return this.rect.left
		}
	},
	right: {
		get(){
			return this.rect.right
		}
	},
	top: {
		get(){
			return this.rect.top
		}
	},
	bottom: {
		get(){
			return this.rect.bottom
		}
	},
	width: {
		get(){
			return this._width || this.rect.width
		},
		set(width){
			this._width = width
		}
	},
	height: {
		get(){
			return this._height || this.rect.height
		},
		set(height){
			this._height = height
		}
	},
	centerX: {
		get(){
			return this.left + this.width/2
		}
	},
	centerY: {
		get(){
			return this.top + this.height/2
		}
	},
	offsetCenterX: {
		get(){
			return this.offsetLeft + this.offsetWidth/2
		}
	},
	offsetCenterY: {
		get(){
			return this.offsetTop + this.offsetHeight/2
		}
	},
	// like Element.getClientBoundingRect() but without taking into account transformations
	//http://stackoverflow.com/questions/41435561/how-to-get-an-elements-rect-before-a-transform/41435685
	/*pageX: {
		get(){
			return this.offsetLeft + this.height/2
		}
	}*/
	computedStyle: {
		get(){
			return window.getComputedStyle(this)
		}
	}
})
for(const Prototype of [Document, Element, DocumentFragment]){
	Prototype.prototype.find = Prototype.prototype.querySelector
	Prototype.prototype.findAll = Prototype.prototype.querySelectorAll
}
Element.prototype.hasClass = function(c){
	return this.classList.contains(c)
}
Element.prototype.addClass = function(...classes){
	for(const className of classes){
		this.classList.add(className)
	}
	return this
}
Element.prototype.removeClass = function(...classes){
	for(const className of classes){
		this.classList.remove(className)
	}
	return this
}
Element.prototype.toggleClass = function(addClass, ...classes){
	if(typeof arguments[0] === 'boolean'){
		for(const className of classes){
			this.classList[addClass ? 'add' : 'remove'](className)
		}
	}else{
		for(const className of arguments){
			this.classList.toggle(className)
		}
	}
	return this
}
Element.prototype.animateClass = function(...classes){
	this.removeClass(...classes)
	this.width
	this.addClass(...classes)
	return this
}
Element.prototype.html = function(html){
	if(!arguments.length) return this.innerHTML
	this.innerHTML = html
	return this
}
Element.prototype.text = function(text){
	if(!arguments.length) return this.innerText
	this.innerText = text
	return this
}
Element.prototype.attr = function(attr, value){
	let
		get = this.getAttribute.bind(this),
		remove = this.removeAttribute.bind(this),
		set = this.setAttribute.bind(this)
	if(this instanceof SVGElement){
		const namespaceSVG = 'http://www.w3.org/2000/svg'
		get = function(){ return this.getAttributeNS(namespaceSVG, ...arguments) }.bind(this)
		remove = function(){ return this.removeAttributeNS(namespaceSVG, ...arguments) }.bind(this)
		set = function(){ return this.setAttributeNS(namespaceSVG, ...arguments) }.bind(this)
	}

	let attrs = {}
	if(arguments.length === 2){
		attrs[attr] = value
	}else if(typeof arguments[0] === 'object'){
		attrs = arguments[0]
	}else if(typeof arguments[0] === 'string'){
		return get(attr)
	}
	for(attr in attrs){
		const value = attrs[attr]
		if(value === null || typeof value === 'undefined'){
			remove(attr)
		}else if(attr === 'style' && typeof value === 'object'){
			this.css(value)
		}else{
			set(attr, value)
		}
	}
	return this
}
Element.prototype.toggleAttr = function(addAttr, ...attrs){
	if(typeof arguments[0] === 'boolean'){
		for(const attrName of attrs){
			this.attr(attrName, addAttr ? '' : undefined)
		}
	}else{
		for(const attrName of arguments){
			this.attr(attrName, this.hasAttribute(attrName) ? undefined : '')
		}
	}
	return this
	this.setAttribute.bind(this)
}
/*Element.prototype.css = function(style){
	if(arguments.length === 1){
		Object.assign(this.style, style)
	}else if(arguments.length === 2){
		const [prop, value] = arguments
		this.style[prop] = value
	}
}*/
Element.prototype.css = function(style){
	if(arguments.length === 1 && typeof arguments[0] === 'string'){
		const prop = arguments[0]
		if(prop.includes('-')){
			return this.style.getPropertyValue(prop)
		}else{
			return this.style[prop]
		}
	}else if(arguments.length === 2){
		const [prop, value] = arguments
		style = {
			[prop]: value
		}
	}

	for(const prop in style){
		const value = style[prop]
		//if(prop in this.style){
		if(prop.includes('-')){
			this.style.setProperty(prop, value)
		}else{
			this.style[prop] = value
		}
	}
	return this
}
Element.prototype.updateWithModel = DocumentFragment.prototype.updateWithModel = function(model){
	for(const handle in model){
		let value = model[handle]
		if(handle.includes('[') && !handle.includes('=')){
			const parts = handle.match(/(.+?)\[(.+?)]/)
			const selector = parts[1]
			const attrName = parts[2]
			for(const $element of this.findAll(selector)){
				if(attrName === 'style' && typeof value === 'object'){
					$element.css(value)
				}else{
					$element.attr(attrName, value)
				}
			}
		}else{
			this.findAll(handle).html(value)
			//const $el = this.querySelector(handle)
			//if($el) $el.innerHTML = value
		}
	}
	return this
}

/*
stopPromise: Promise - Stop animating when this promise is resolved.
*/
if(0) Element.prototype.animateScrollY = function(y, speedFactor = 0.08, stopPromise){
	let stop = false
	if(stopPromise)
		stopPromise.then(() => stop = true)

	/*let isProgrammaticScroll = false
	this.on('scroll', () => {
		X(2)
		if(isProgrammaticScroll) isProgrammaticScroll = false
		else stop = true,X('stop!')
	})*/

	;(() => {
		//isProgrammaticScroll = true
		this.scrollTop = this.scrollTop * (1 - speedFactor)
		return this.scrollTop > 0 && !stop
	}).interval(1)

	return this
}

const elementToScrollInterval = new WeakMap()
Element.prototype.animateScrollY = function(y = 0, speedFactor = 0.2, stopPromise){
	y = Math.ceil(y)

	if(elementToScrollInterval.has(this)){
		const interval = elementToScrollInterval.get(this)
		interval.stop()
	}

	const interval = new Interval(interval => {
		const dy = Math.max(
			Math.abs(y - this.scrollTop) * speedFactor,
			Math.min( Math.dist(this.scrollTop, y), 1.5 )
		) * Math.sign(y - this.scrollTop)
		
		this.scrollTop = this.scrollTop + dy
		
		if(Math.dist(this.scrollTop, y) <= dy){
			this.scrollTop = y
			interval.stop()
		}
	})
	if(stopPromise) stopPromise.then(() => interval.stop())

	elementToScrollInterval.set(this, interval)

	return interval
}

/*Element.prototype.click_ = function(f){
	this.addEventListener('click', f)
}*/

Element.prototype.animateStyleChange = function(callback, duration = 500){
	const beforeStyle = Object.assign({}, window.getComputedStyle(this))

	if(this._styleChangeAnimation) this._styleChangeAnimation.cancel()

	const then = () => {	
	//requestAnimationFrame(() => {
		const afterStyle = Object.assign({}, window.getComputedStyle(this))

		const styleDifference = {}
		for(const property in beforeStyle){
			if(beforeStyle[property] !== afterStyle[property]){
				styleDifference[property] = [
					beforeStyle[property],
					afterStyle[property]
				]
			}
		}

		this._styleChangeAnimation = this.animate(styleDifference, {
			duration: duration || parseInt(afterStyle.transitionDuration),
		})
		//TweenLite(this, styleDifference, duration)
	//})
	}

	if(typeof callback === 'function'){
		callback.call(this)
		then()
	}else if(callback instanceof Promise){
		callback.then(then)
	}

	return this
}
Element.prototype.animatePositionChange = function(callback, duration = 500){
	const beforeLeft = this.left
	const beforeTop = this.top

	if(this._positionChangeAnimation) this._positionChangeAnimation.cancel()

	const then = () => {	
		const afterLeft = this.left
		const afterTop = this.top

		const computedStyle = window.getComputedStyle(this)

		this._positionChangeAnimation = this.animate({
			transform: [
				`translate(${beforeLeft - afterLeft}px, ${beforeTop - afterTop}px)`,
				'none'
			]
		}, {
			duration: duration || parseInt(computedStyle.transitionDuration),
			easing: computedStyle.transitionTimingFunction
		})
	}

	if(typeof callback === 'function'){
		callback.call(this)
		then()
	}else if(callback instanceof Promise){
		callback.then(then)
	}

	return this
}

// For anything with addEventListener()
EventTarget.prototype.on = function(eventNames, callback, options = {}){
	if(typeof eventNames === 'object'){
		for(const eventName in eventNames){
			this.on(eventName, eventNames[eventName], options)
		}
	}else{
		if(typeof callback === 'object'){
			const _callback = callback
			callback = function(){
				_callback.handleEvent.apply(this, arguments)
			}
		}
		if(callback === undefined) console.trace()

		if(typeof options === 'boolean'){
			options = {capture: false}
		}

		for(const eventNameWithModifiers of resolveArgumentAsArray(eventNames)){
			const [eventName, ...modifiers] = eventNameWithModifiers.split('.')

			for(const option of ['once', 'capture', 'passive']){
				if(modifiers.includes(option)){
					options[option] = true
				}
			}

			//const runOnce = modifiers.includes('once')
			//const useCapture = modifiers.includes('capture')
			const checkIfIsEventTarget = modifiers.includes('self')
			const preventDefault = modifiers.includes('prevent')
			const stopPropagation = modifiers.includes('stop')
			const throttle = modifiers.includes('throttle')

			const _callback = callback
			if(checkIfIsEventTarget || preventDefault || stopPropagation){
				callback = function(e){
					if(checkIfIsEventTarget && e.target !== this) return

					_callback.apply(this, arguments)

					//if(runOnce) e.target.removeEventListener(e.type, callback)
					if(preventDefault) e.preventDefault()
					if(stopPropagation) e.stopPropagation()
				}
			}
			if(throttle){
				callback = callback.throttle()
			}

			if(eventName === 'scroll' && this === document.body){
				window.addEventListener(eventName, callback, options)
				continue
			}
			if(typeof callback === 'function'){
				this.addEventListener(eventName, callback, options)
			}
		}
	}
	return this
}
EventTarget.prototype.off = function(eventName, callback){
	if(typeof eventNames === 'object'){
		for(const eventName in eventNames){
			const callback = eventNames[eventName]
			this.off(eventName, callback)
		}
	}else{
		for(const eventName of resolveArgumentAsArray(eventNames)){
			if(eventName === 'scroll' && this === document.body){
				window.removeEventListener(eventName, callback)
				continue
			}
			if(typeof callback === 'function')
				this.removeEventListener(eventName, callback)
		}
	}
	return this
}
EventTarget.prototype.once = function(eventNames, callback, onlyFireOnThisElement){
	const _this = this
	if(typeof eventNames === 'object'){
		for(const eventName in eventNames){
			this.addEventListener(eventName, function(e){
				if(onlyFireOnThisElement && e.target !== _this) return
				eventNames[eventName].apply(this, arguments)
				e.target.removeEventListener(e.type, arguments.callee)
			})
		}
	}else{
		//for(const eventName of [...eventNames])){
		for(const eventName of resolveArgumentAsArray(eventNames)){
			this.addEventListener(eventName, function(e){
				if(onlyFireOnThisElement && e.target !== _this) return
				callback.apply(this, arguments)
				e.target.removeEventListener(e.type, arguments.callee)
			})
		}
	}
	return this
}
EventTarget.prototype.hover = function(on, off){
	if(on) this.on('mouseover', on)
	if(off) this.on('mouseout', off)
}
EventTarget.prototype.trigger = function(eventName){
	this.dispatchEvent(new Event(eventName))
}

const eventNames = Object.getOwnPropertyNames(Document.prototype).filter(p => p.startsWith('on')).map(name => name.slice(2))
for(const eventName of eventNames){
	EventTarget.prototype[eventName] = function(callback){
		if(arguments.length === 0){
			this.dispatchEvent(new Event(eventName))
		}else if(arguments.length === 1){
			this.on(eventName, callback)
		}
		return this
	}
}

/*NodeList.prototype.addEventListener = function(eventName, callback){
	for(const $element of this){
		element.addEventListener(eventName, callback)
	})
}*/
/*NodeList.prototype.on = function(){
	for(const $element of this){
		element.on(...arguments)
	}
}*/
NodeList.prototype.filter = function(){
	if(typeof arguments[0] === 'function'){
		const callback = arguments[0]
		return [...this].filter(callback)
	}else if(typeof arguments[0] === 'string'){
		const selector = arguments[0]
		return [...this].filter($element => $element.matches(selector))
	}
}
/*NodeList.prototype.find = function(){
	return [...this].find.apply(this, arguments)
}*/
for(const method in Element.prototype){
	if(!(method in NodeList.prototype)){
		NodeList.prototype[method] = function(){
			let returnValue
			for(const $element of this){
				const value = typeof $element[method] === 'function' ? $element[method](...arguments) : $element[method]
				returnValue = returnValue || value
			}
			return returnValue
		}
	}
}




// http://undefinedmethod.com/blog/storing-compressed-json-objects-in-local-storage-with-lz-string/
Storage.prototype.set = function(key, obj) {
	return this.setItem(key, window.LZString ? LZString.compress(JSON.stringify(obj)) : JSON.stringify(obj))
}
Storage.prototype.get = function(key) {
	const data = window.LZString ? LZString.decompress(this.getItem(key)) : this.getItem(key)
	if(!data) return null
	try{
		return JSON.parse(data)
	}catch(e){
		console.error(e, data)
		return null
	}
}



// Add a history.onpushstate event
History.prototype._pushState = History.prototype.pushState;
History.prototype.pushState = function(state) {
	/*if (typeof window.onpushstate === 'function') {
		window.onpushstate({state})
	}*/
	const pushStateEvent = new CustomEvent('pushstate'/*, {
		detail: {
			state
		}
	}*/)
	pushStateEvent.state = state
	window.dispatchEvent(pushStateEvent)
	return this._pushState.apply(this, arguments)
}



function get(url, options = {}){
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		xhr.open(options.type || 'GET', url)

		if(options.mimeType){
			xhr.overrideMimeType(options.mimeType)
		}

		if(options.responseType) xhr.responseType = options.responseType
		
		for(const header in options.headers){
			xhr.setRequestHeader(header, options.headers[header])
		}
		
		xhr.on({
			load(){
				if (this.status >= 200 && this.status < 300) {
					//onload && onload(JSON.parse(this.responseText))
					resolve(this.response/*, this*/)
				} else {
					reject({
						status: this.status,
						statusText: xhr.statusText
					})
				}
			},
			error(){
				reject({
					status: this.status,
					statusText: xhr.statusText
				})
			},
			abort(){
				onabort && onabort()
			}
		})
		//onprogress && xhr.on("progress", onprogress)
		xhr.send()
	})
}
function getJSON(url, options){
	return new Promise((resolve, reject) => {
		get(url, options)
			.then(response => resolve(JSON.parse(response)))
			.catch(response => reject(response))
	})
}




function styleToString(style){
	return Object.keys(style).map(prop => {
		let value = style[prop]
		if(['width', 'height'].includes(prop) && typeof value === 'number') value += 'px'
		return prop + ':' + value
	}).join(';')
}



/*function typeOf(x){
	if(Array.isArray(x)) return 'array'
	return typeof x
}*/
function resolveArgumentAsArray(arg){
	if(arg instanceof Array) return arg
	if(typeof arg === 'string') return arg.split(' ')
	return [arg]
}






Object.defineProperties(HTMLImageElement.prototype, {
	ratio: {
		get(){
			return this.naturalWidth / this.naturalHeight
		}
	}
})

/*HTMLCanvasElement.prototype.resize = function(){
	this.width = this.clientWidth
	this.height = this.clientHeight
	return this
}
HTMLCanvasElement.prototype.draw = function(callback, drawOnResize){
	const context = this.getContext('2d')
	callback.call(context, context)

	if(drawOnResize){
		window.on('resize', (() => {
			this.resize()
			callback.call(context, context)
		}).debounce(100))
	}
	return this
}*/
HTMLCanvasElement.prototype.resize = function(){
	this.width = this.clientWidth
	this.height = this.clientHeight
	return this
}
HTMLCanvasElement.prototype.draw = function(callback){
	if(callback) this._drawCallback = callback

	if(this._drawCallback){
		const context = this.getContext('2d')
		this._drawCallback.call(context)
	}
	return this
}
HTMLCanvasElement.prototype.drawOnResize = function(drawOnResize = true){
	if(drawOnResize){
		const context = this.getContext('2d')
		this._onResize = (() => {
			this.resize()
			this.draw()
		}).debounce(100)
		window.on('resize', this._onResize)
	}else{
		window.off('resize', this._onResize)
	}
	return this
}
HTMLCanvasElement.prototype.animate = function(callback, interval){
	if(callback) this._drawCallback = callback

	clearInterval(this._animationInterval)

	if(this._drawCallback){
		const context = this.getContext('2d')
		let t = 0
		this._animationInterval = (() => {
			return this._drawCallback.call(context, t++)
		}).interval(interval)
	}
	return this
}

CanvasRenderingContext2D.prototype.clear = function(){
	this.clearRect(0, 0, this.width, this.height)
}
CanvasRenderingContext2D.prototype.background = function(color){
	const fillStyle = this.fillStyle
	this.fillStyle = color
	this.fillRect(0, 0, this.width, this.height)
	this.fillStyle = fillStyle
}
CanvasRenderingContext2D.prototype.circle = function(x = 0, y = 0, radius = 1){
	this.beginPath()
	this.arc(x, y, radius, startAngle = 0, endAngle = Math.TAU)
	this.closePath()
	return this
}
/*CanvasRenderingContext2D.prototype._ellipse = CanvasRenderingContext2D.prototype.ellipse
CanvasRenderingContext2D.prototype.ellipse = function(x = 0, y = 0, radiusX = 1, radiusY = radiusX, rotation = 0, startAngle = 0, endAngle = Math.TAU, anticlockwise){
	this._ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
	return this
}*/
CanvasRenderingContext2D.prototype.line = function(x1, y1, x2, y2){
	if(arguments.length === 2){
		x1 = arguments[0].x
		y1 = arguments[0].y
		x2 = arguments[1].x
		y2 = arguments[1].y
	}
	this.beginPath()
	this.moveTo(x1, y1)
	this.lineTo(x2, y2)
	this.stroke()
	return this
}
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r = 0) {
	if (w < 2 * r) r = w / 2
	if (h < 2 * r) r = h / 2
	r = r.abs()
	this.beginPath()
	this.moveTo(x + r, y)
	this.arcTo(x + w, y, x + w, y + h, r)
	this.arcTo(x + w, y + h, x, y + h, r)
	this.arcTo(x, y + h, x, y, r)
	this.arcTo(x, y, x + w, y, r)
	this.closePath()
	return this
}

CanvasRenderingContext2D.prototype._scale = CanvasRenderingContext2D.prototype.scale
CanvasRenderingContext2D.prototype.scale = function(x, y = x){
	this._scale(x, y)
} 

CanvasRenderingContext2D.prototype.loadImage = function(url){
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.on({
			load(){
				resolve(img)
			},
			error(e){
				reject(e)
			}
		})
		img.src = url
	})
}
CanvasRenderingContext2D.prototype.blur = function(radius = 5){
	this.filter = `blur(${radius}px)`
}
CanvasRenderingContext2D.prototype.context = function(){
	for(const callback of arguments){
		this.save()
		callback.call(this)
		this.restore()
	}
}
Object.defineProperties(CanvasRenderingContext2D.prototype, {
	width: {
		get(){
			return this.canvas.width
		}
	},
	height: {
		get(){
			return this.canvas.height
		}
	}
})






class Interval {
	constructor(callback, period = 0, autoStart = true){
		Object.assign(this, {
			callback,
			period,
			startTime: undefined,
			isRunning: false,
			intervalID: undefined
		})
		if(autoStart) this.start()
	}

	get elapsedTime(){
		return this.isRunning ? Date.now() - this.startTime : 0
	}


	_call(){
		if(this.callback){
			const stop = this.callback(this) === false
			if(stop) this.isRunning = false
		}
		this._scheduleNextCall()
	}
	_scheduleNextCall(){
		if(this.isRunning){
			if(this.period === 0){
				requestAnimationFrame(this._call.bind(this))
			}else{
				this.intervalID = setInterval(this._call.bind(this))
			}
		}else{
			if(this.intervalID){
				stopInterval(this.intervalID)
				this.intervalID = undefined
			}
		}
	}

	start(){
		this.isRunning = true
		this.startTime = Date.now()

		this._scheduleNextCall()
	}

	stop(){
		this.isRunning = false
	}
}





const windowLoad = new Promise(resolve => window.on('load', resolve))
const documentReady = new Promise(resolve => document.on('DOMContentLoaded', resolve))






const O_o = {o_O: 'is awesome.'}
for(let i = 0; i < 1000; i++) O_o[String.fromCharCode(i)] = O_o
// O_o.D.A.R.R.Y.L._.Y.E.O.o_O