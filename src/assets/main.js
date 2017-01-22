// Break out of iframe
if(this.top.location.href !== this.location.href) this.top.location = this.location

const $html = $('html')
const $body = document.body
const $header = $('header')
const $toTop = $('#to-top')

documentReady.then(() => {
	$html.addClass('ready')
	console.timeEnd('ready')
})
windowLoad.then(() => {
	$html.addClass('load')
	console.timeEnd('load')
})

window.on('scroll', function(e){
	$header.classList[this.scrollY > $('#secondary-menu').clientBottom ? 'add' : 'remove']('sticky')
	$toTop.classList[this.scrollY > window.innerHeight * 0.5 ? 'add' : 'remove']('show')
}.throttle(10))
/*document.body.on('scroll', function(e){console.log(this.scrollY, this.scrollTop, e)
	$('header').classList[this.scrollY > $('#secondary-menu').clientHeight ? 'add' : 'remove']('sticky')
	$('#to-top').classList[this.scrollY > window.innerHeight * 0.5 ? 'add' : 'remove']('show')
}.throttle(10))*/



$$('code:not([class*=lanugage-])').addClass('language-*')



if('moment' in window){
	/*const timeSinceLastVisit = new Date(Date.now() - DY.data.lastSession.date)
	if(timeSinceLastVisit.getUTCHours() < 1) return
	
	let timeString = ''
	if(timeSinceLastVisit.getUTCDays()*/
	
	const lastVisit = moment(DY.data.lastSession.date)
	if(moment().diff(lastVisit, 'hours') >= 1){
		let username = ''
		if(document.referrer === 'https://www.khanacademy.org'){
			username = 'fellow Khan Academy user'
		}
		
		if(DY.data.lastSession.date){
			const greeting = moment().diff(lastVisit, 'days') < 5 ? 'Welcome back' : 'Long time no see'
			notify(`${greeting}, ${username}! You last visited this site ${lastVisit.fromNow()}.`)
		}else{
			notify(`Welcome to my online portfolio, ${username}!`)
		}
	}
}


navigator.getBattery && navigator.getBattery()
	.then(function(battery) {
		const level = battery.level * 100;
		if(level < 100){
			notify(
				`Your battery level is at ${level}%` +
				(battery.charging ?
					` and will be fully charged ${moment().add(battery.chargingTime, 's').fromNow()}` :
					` and will be depleted ${moment().add(battery.dischargingTime, 's').fromNow()}`) +
				`.`
			)
		}else{
			notify('Your battery is fully charged.')
		}
	})
	/*.catch(function(e) {
		console.error(e)
	})*/

window.on('offline', function(){
	notify("Whoops! You've lost internet connection.", new Promise(function(resolve){
		window.on('online', resolve)
	}))
})






$$('.has-sub-menu').hover(function(){
	$body.addClass('sub-menu-open')
	this.closest('nav').addClass('sub-menu-open')
}, function(){
	$body.removeClass('sub-menu-open')
	this.closest('nav').removeClass('sub-menu-open')
})

$toTop.on('click', () => {
	document.body.animateScrollY(0)
})




window.on('pageload', () => {
	document.body.animateScrollY(0)
	$$('#modal').click()

	if('Prism' in window){
		Prism.highlightAll()
	}
})
window.on('pageanimate', () => {
	DYProjectFilters.update()
})




// Page Content
window.on('pageload', () => {
	DY.getData.then(() => {
		const $main = $('main')
		const id = $main.dataset.postId
		const data = DY.data.posts[id]

		if(!data) return

		$('main > article').html(`
			${data.meta.kaId ? `<dy-khan data-id="${data.meta.kaId}"></dy-khan>` : ''}
			<!--<hgroup>
				<h1>${data.title.rendered}</h1>
			</hgroup>-->
			${data.content.rendered}
			<dy-comments></dy-comments>
		`)
	})
})




{
	const $particleField = $$('.particle-field')
	const $particlesWrapper = $$('.particle-field .particles')
	const $links = $$('.particle-field a')

	for(let i = 0; i < 150; i++){
		$particleWrapper = $$$('span').addClass('particle-wrapper')
			.append(
				$$$('span').addClass('particle')
			)
			.appendTo($particlesWrapper)
		$particleWrapper.css({
			'--particle-size': `${Math.random(4, 16)}px`,
			//transform: `translate(${Math.random(100)}vw, ${Math.random(100)}vh) scale(${Math.random(0.8, 1.2)})`
			left: Math.random(100) + `vw`,
			top: Math.random(100) + `vh`,
			//transform: `translate3d(${Math.random(100)}vw, ${Math.random(100)}vh, ${Math.random(-10, 0)}px) scale(0.5)`
			transform: `scale(0.5)`
		})
	}

	window.on('mousemove', (e => {
		for(let $particleWrapper of $$('.particle-field .particle-wrapper')){
			const dx = $particleWrapper.centerX - e.pageX
			const dy = $particleWrapper.centerY - e.pageY
			const dist = Math.hypot(dx, dy)

			const $particle = $particleWrapper.find('.particle')[0]

			// repel
			//$particle.style.transform = `translate(${dx * 100 / dist}px, ${dy * 100 / dist}px) scale(${Math.max(1, 1.5 - dist*dist / 10000)}`

			// attract
			//$particle.style.transform = `translate(${-dx * 100 / dist}px, ${-dy * 100 / dist}px) scale(${Math.max(1, 1.5 - dist*dist / 10000)}`

			/*$particle.style.transform = `translate(${
				dx * Math.min(100 / dist, 1)
			}px, ${
				dy * Math.min(100 / dist, 1)
			}px) scale(${1 + Math.stdNorm(dist)}`*/
			
			/*$particle.style.transform = `translate3d(${
				0
				//dx * Math.stdNorm(dist / 200)
			}px, ${
				0
				//dy * Math.stdNorm(dist / 200)
			}px, ${
				Math.stdNorm(dist / 200) * 60
			}px`*/

			$particle.style.transform = `translate(${
				dx * Math.stdNorm(dist / 200) * 0.5
			}px, ${
				dy * Math.stdNorm(dist / 200) * 0.5
			}px)
			scale(${
				1 + Math.stdNorm(dist / 200) * 0.75
			})
			`/*
			rotateY(${
				(1 - Math.stdNormSlope(dx / 200)) * 10
			}deg)
			rotateX(${
				(1 - Math.stdNormSlope(dy / 200)) * 10
			}deg)`*/


			/*$particle.style.transform = `
				translate(
					${ dx * Math.stdNorm(dist / 200) * 0.75 }px,
					${ dy * Math.stdNorm(dist / 200) * 0.75 }px)
				scale(${ 1 + Math.stdNorm(dist / 200) * 0.75 })
				rotateY(${ Math.atan(Math.stdNormSlope(dist / 200)) * 180/Math.PI }deg)
				rotate(${ Math.atan(dy/dx) * 180/Math.PI }deg)
				`*/
		}
	}).throttle())
}



// Experiment - Pin window to screen
/*!function(){
	$('body').attr('style', {
		'min-width': screen.width+'px',
		'min-height': screen.height+'px',
		transform: `translate(${-screenX}px, ${-screenY}px)`
	})
}.interval()*/



// Experiment :)
/*
$$('article *').on('click', function(){
	const _this = this
	!function(){
		_this.innerHTML += ' :)'
	}.delay(100, true)
})*/