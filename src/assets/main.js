// Break out of iframe
if(this.top.location.href !== this.location.href) this.top.location = this.location

const $html = document.documentElement
const $body = document.body

documentReady.then(() => {
	$html.addClass('ready')
	console.timeEnd('ready')
})
windowLoad.then(() => {
	$html.addClass('load')
	console.timeEnd('load')
})



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
				`Your battery level is at ${level.toFixed(1)}%` +
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