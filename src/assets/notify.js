const notificationTimeouts = {}

window.notify = window.alert = function(message, dismiss, type){
	customElements.whenDefined('dy-comments').then(() => {
		// Check if a notification already has this message.
		let notification = [...$$("dy-notification")].find(function($this){
			return ($this.html() || $this.shadowRoot.html()) == message// && $this.childNodes.length === 0
		})
		if(notification){
			notification.remind()
		}else{
			notification = new DYNotification()
				.html(message)
				.attr('type', type || 'info')
			notification.dismiss(dismiss)
		}
	})
}