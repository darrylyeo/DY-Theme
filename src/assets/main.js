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
window.on('pagerender', (() => {
	(() => $html.addClass('render')).delay()
}))


{
	const notifications = []
	const temporaryNotify = window.notify = function(){
		notifications.push(arguments)
	}
	customElements.whenDefined('dy-notifications').then(() => {
		window.once('pagerender', () => {
			for(const args of notifications){
				window.notify(...args)
			}
		})
	})
}



WP.getUser.then(user => {
	/*const timeSinceLastVisit = new Date(Date.now() - DY.data.lastSession.date)
	if(timeSinceLastVisit.getUTCHours() < 1) return
	
	let timeString = ''
	if(timeSinceLastVisit.getUTCDays()*/

	function getUsername(){
		if(document.referrer === 'https://www.khanacademy.org'){
			return 'fellow Khan Academy user'
		}
		if(user){
			return user.name
		}
	}

	const username = getUsername()

	if('moment' in window && DY.data.lastSession){
		const now = moment()
		const lastVisit = moment(DY.data.lastSession.date)
		const beenAnHour = now.diff(lastVisit, 'hours') >= 1
		const beenFiveDays = now.diff(lastVisit, 'days') >= 5

		if(beenAnHour){
			const greeting = beenFiveDays ? 'Welcome back' : 'Long time no see'
			notify(
				`${greeting}${username ? ', ' + username : ''}! You last visited this site ${lastVisit.fromNow()}.`,
				{
					buttonText: 'Hello!'
				}
			)
		}
	}else{
		notify(`Welcome to my online portfolio${username ? ', ' + username : ''}!`)
	}
})


if('getBattery' in navigator) navigator.getBattery().then(battery => {
	const notifyBatteryStatus = () => {
		const {level, charging, chargingTime, dischargingTime} = battery
		if(level < 1.00){
			notify(
				`Your battery level is at ${(level * 100).toFixed(1)}%${
					charging
						? isFinite(chargingTime)
							? ` and will be fully charged ${moment().add(chargingTime, 's').fromNow()}`
							: ''
						: isFinite(dischargingTime)
							? ` and will be depleted ${moment().add(dischargingTime, 's').fromNow()}`
							: ''
				}.`,
				{
					id: 'battery',
					buttonText: 'Got it!'
				}
			)
		}else{
			notify(
				'Your battery is fully charged.',
				{
					id: 'battery',
					buttonText: 'Ok'
				}
			)
		}
	}

	notifyBatteryStatus()
	battery.on('chargingchange chargingtimechange dischargingtimechange levelchange', notifyBatteryStatus)
})

if('onLine' in navigator){
	/*const checkOnlineStatus = () => {
		if(!navigator.onLine){
			notify('Whoops! You\'ve lost internet connection.', {
				dismiss: new Promise(function(resolve){
					window.once('online', resolve)
				})
			})
		}
	}
	checkOnlineStatus()
	window.on('offline', checkOnlineStatus)*/

	const notifyOnlineStatus = () => {
		if(navigator.onLine){
			notify('...And we\'re back online!', {id: 'onLine', dismiss: 5, buttonText: 'Hooray!'})
		}else{
			notify('Whoops! You\'ve lost internet connection.', {id: 'onLine', buttonText: 'Aw, man!'})
		}
	}
	if(!navigator.onLine) notifyOnlineStatus()
	window.on('online offline', notifyOnlineStatus)
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