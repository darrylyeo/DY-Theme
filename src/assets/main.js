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
window.trigger('scroll')

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
	//document.body.animateScrollY(0)

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
	let data = WP.current

	$('header').toggleClass(WP.queryType === 'front-page', 'full', 'immersive')
	$('#secondary-menu').toggleClass(WP.queryType === 'front-page', 'immersive')

	if(WP.queryType === 'front-page'){
		showNavItems()
	}else if(WP.queryType === 'archive'){
		data = DY.data.objects[WP.siteURL]

		showNavItems(location.href.split('/').pop())
	}else if(WP.queryType === 'blog'){
		showNavItems('blog')
	}
	X(data)

	$('main > article').html(`
		${data.meta.kaId ? `<dy-khan data-id="${data.meta.kaId}"></dy-khan>` : ''}
		${data.content.rendered}
		${data.comment_status === 'open' ? `<dy-comments></dy-comments>` : ''}
	`)
})

$$('#main-menu > ul > li > a').on({
	click(){
		
	}
})

function showNavItems(){
	const items = [...arguments]

	if(items.length){
		$('#logo').animate([
			{ marginRight: getComputedStyle($('#logo')).marginRight }, 
			{ marginRight: '-1em' }
		], { 
			duration: 500,
			fill: 'forwards',
			easing: 'ease-out'
		})
	}else{
		$('#logo').animate([
			{ marginRight: '-1em' },
			{ marginRight: getComputedStyle($('#logo')).marginRight }
		], { 
			duration: 500,
			fill: 'forwards',
			easing: 'ease-out'
		})
	}

	for(const $navItem of $$('#main-menu > ul > li')){
		$navItem.css('display', '')

		const showStyle = {
			opacity: '1',
			width: $navItem.computedStyle.width,
			transform: 'none'
		}
		const hideStyle = {
			opacity: '0',
			width: '0',
			transform: 'scale(0.5)'
		}

		if(!items.length || items.includes($navItem.innerText.toLowerCase().trim())){
			$navItem.play()
			/*$navItem.animate([
				hideStyle,
				showStyle
			], { 
				duration: 500,
				//fill: 'forwards',
				easing: 'ease-out'
			})*/
		}else{
			$navItem.animate([
				showStyle,
				hideStyle
			], { 
				duration: 500,
				//fill: 'forwards',
				easing: 'ease-out'
			})
			;(() => {
				$navItem.css('display', 'none')
			}).delay(500)
			/*$navItem.once({
				animationend(){
					X(this, 'end')
					this.css('display', 'none')
				}
			})*/
		}
	}
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