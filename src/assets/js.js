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
			for(let key in this){
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
	const i = array.indexOf(obj)
	if(i > -1) this.splice(i, 1)
	return this
}




//const π = Math.PI
//const τ = Math.TAU = Math.PI * 2
Math.stdNorm = x => Math.E**(x*x/-2)/* / Math.sqrt(Math.TAU)*/
Math.stdNormSlope = x => Math.stdNorm(x) * -x

Math._random = Math.random
Math.random = Number.random = function(a = 1, b = 0){
	return Math._random().normMap(a, b)
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



// Execute this function after a delay. A time of 0 uses RAF, otherwise setTimeout. A combination of the two can be used by passing true as the second argument.
Function.prototype.delay = function(time, useRAF = false){
	const func = this
	if(time > 0){
		setTimeout(function(){
			if(useRAF){
				requestAnimationFrame(func)
			}else{
				func()
			}
		}, time)
	}else{
		requestAnimationFrame(func)
	}
}

// Execute this function repeatedly over a given time interval. A time of 0 uses RAF, otherwise setTimeout. A combination of the two can be used by passing true as the second argument.
Function.prototype.interval = function(time, useRAF = false){
	const func = this
	if(time > 0){
		const i = setInterval(function(){
			const call = function(){
				if(func() == false){
					clearInterval(i)
				}
			}
			if(useRAF){
				call.delay()
			}else{
				call()
			}
		}, time)
	}else{
		const call = function(){
			if(func() !== false){
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
		const later = () => {
			timeout = null
			if (!immediate) func.apply(this, arguments)
		}
		const callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, time)
		if (callNow) func.apply(this, arguments)
	}
}


// http://stackoverflow.com/a/3561711
RegExp.escape = function(s) {
	return String(s).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
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
	this.appendChild(targetNode)
	return this
}
/*for(let Prototype of [Document, Element, DocumentFragment]){
	Prototype.prototype._append = Prototype.prototype.append
	Prototype.prototype.append = function(){
		this._append(...arguments)
		return this
	}
}*/
for(let Prototype of [Document, Element, DocumentFragment]){
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
})
Element.prototype.find = Element.prototype.querySelectorAll
DocumentFragment.prototype.find = DocumentFragment.prototype.querySelectorAll
/*Element.prototype.find = DocumentFragment.prototype.find = function(s){
	return this.querySelectorAll(s)
}*/
Element.prototype.hasClass = function(c){
	return this.classList.contains(c)
}
Element.prototype.addClass = function(...classes){
	for(let className of classes){
		this.classList.add(className)
	}
	return this
}
Element.prototype.removeClass = function(...classes){
	for(let className of classes){
		this.classList.remove(className)
	}
	return this
}
Element.prototype.toggleClass = function(addClass, ...classes){
	if(typeof arguments[0] === 'boolean'){
		for(let className of classes){
			this.classList[addClass ? 'add' : 'remove'](className)
		}
	}else{
		for(let className of arguments){
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
	let attrs = {}
	if(arguments.length === 2){
		attrs[attr] = value
	}else if(typeof arguments[0] === 'object'){
		attrs = arguments[0]
	}else if(typeof arguments[0] === 'string'){
		return this.getAttribute(attr)
	}
	for(attr in attrs){
		const value = attrs[attr]
		if(value === null || typeof value === 'undefined'){
			this.removeAttribute(attr)
		}else if(attr === 'style' && typeof value === 'object'){
			this.css(value)
		}else{
			this.setAttribute(attr, value)
		}
	}
	return this
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
	if(arguments.length === 2){
		const [prop, value] = arguments
		style = {
			[prop]: value
		}
	}

	for(let prop in style){
		const value = style[prop]
		//if(prop in this.style){
		if(!prop.includes('-')){
			this.style[prop] = value
		}else{
			this.style.setProperty(prop, value)
		}
	}
	return this
}
Element.prototype.updateWithModel = DocumentFragment.prototype.updateWithModel = function(model){
	for(let handle in model){
		let value = model[handle]
		if(handle.includes('[') && !handle.includes('=')){
			const parts = handle.match(/(.+?)\[(.+?)]/)
			const selector = parts[1]
			const attrName = parts[2]
			for(let element of this.find(selector)){
				if(attrName === 'style' && typeof value === 'object'){
					element.css(value)
				}else{
					element.attr(attrName, value)
				}
			}
		}else{
			const $el = this.querySelector(handle)
			if($el) $el.innerHTML = value
		}
	}
	return this
}
Element.prototype.animateScrollY = function(y, speedFactor = 0.08, stopPromise){
	let stop = false
	stopPromise && stopPromise.then(() => stop = true)
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

/*Element.prototype.click_ = function(f){
	this.addEventListener('click', f)
}*/

// For anything with addEventListener()
EventTarget.prototype.on = function(eventNames, callback, optionsOrUseCapture){
	if(typeof eventNames === 'object'){
		for(let eventName in eventNames){
			const callback = eventNames[eventName]
			if(eventName === 'scroll' && this === document.body){
				window.addEventListener(eventName, callback, optionsOrUseCapture)
				continue
			}
			if(typeof callback === 'function')
				this.addEventListener(eventName, callback, optionsOrUseCapture)
		}
	}else{
		//for(let eventName of [...eventNames])){
		for(let eventName of resolveArgumentAsArray(eventNames)){
			if(eventName === 'scroll' && this === document.body){
				window.addEventListener(eventName, callback, optionsOrUseCapture)
				continue
			}
			if(typeof callback === 'function')
				this.addEventListener(eventName, callback, optionsOrUseCapture)
		}
	}
	return this
}
EventTarget.prototype.once = function(eventNames, callback, onlyFireOnThisElement){
	const _this = this
	if(typeof eventNames === 'object'){
		for(let eventName in eventNames){
			this.addEventListener(eventName, function(e){
				if(onlyFireOnThisElement && e.target !== _this) return
				eventNames[eventName].apply(this, arguments)
				e.target.removeEventListener(e.type, arguments.callee)
			})
		}
	}else{
		//for(let eventName of [...eventNames])){
		for(let eventName of resolveArgumentAsArray(eventNames)){
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

const eventNames = Object.getOwnPropertyNames(Document.prototype).filter(p => p.startsWith('on')).map(name => name.slice(2))
for(let eventName of eventNames){
	EventTarget.prototype[eventName] = function(callback){
		if(arguments.length === 0){
			this.dispatchEvent(eventName)
		}else if(arguments.length === 1){
			this.on(eventName, callback)
		}
		return this
	}
}

/*NodeList.prototype.addEventListener = function(eventName, callback){
	for(let element of this){
		element.addEventListener(eventName, callback)
	})
}*/
/*NodeList.prototype.on = function(){
	for(let element of this){
		element.on(...arguments)
	}
}*/
/*NodeList.prototype.filter = function(){
	return [...this].filter.apply(this, arguments)
}*/
/*NodeList.prototype.find = function(){
	return [...this].find.apply(this, arguments)
}*/
for(let method in Element.prototype){
	if(!NodeList.prototype[method]){
		NodeList.prototype[method] = function(){
			let returnValue
			for(let element of this){
				const value = typeof element[method] === 'function' ? element[method](...arguments) : element[method]
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
	if(!data) return {}
	try{
		return JSON.parse(data)
	}catch(e){
		console.error(e, data)
		return {}
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



function get(url, postHeaders, mimeType){
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		xhr.open(postHeaders ? 'POST' : 'GET', url)

		if(mimeType){
			xhr.overrideMimeType(mimeType)
		}
		
		for(let header in postHeaders){
			xhr.setRequestHeader(header, headers[header])
		}
		
		xhr.on({
			load(){
				if (this.status >= 200 && this.status < 300) {
					//onload && onload(JSON.parse(this.responseText))
					resolve(this.responseText)
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
function getJSON(url, headers){
	return new Promise((resolve, reject) => {
		get(url, headers)
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

HTMLCanvasElement.prototype.resize = function(){
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
CanvasRenderingContext2D.prototype.loadImage = function(url){
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.on('load', () => {
			resolve(img)
		}).on('error', e => {
			reject(e)
		})
		img.src = url
	})
}
CanvasRenderingContext2D.prototype.blur = function(radius = 5){
	this.filter = `blur(${radius}px)`
}
CanvasRenderingContext2D.prototype.context = function(){
	for(let callback of arguments){
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





const windowLoad = new Promise(resolve => window.on('load', resolve))
const documentReady = new Promise(resolve => document.on('readystatechange', resolve))






const O_o = {o_O: 'is awesome.'}
for(let i = 0; i < 1000; i++) O_o[String.fromCharCode(i)] = O_o
// O_o.D.A.R.R.Y.L._.Y.E.O.o_O