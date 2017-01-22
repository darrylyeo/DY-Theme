// ".modalized": is animating into modal state (.delay()-ed with requestAnimationFrame) or in final modal state.
// ":not(.modalized)": is animating out of modal state or is not in modal state.

// ".in-modal": element is inside of #modal.
// ":not(.in-modal)": element is outside of #modal.

Element.prototype.modalize = function(opts){
	const transition = 'var(--transition-medium)'
	
	this.on('click', e => {
		if(this.hasClass('in-modal') || this.hasClass('modalized-clone')) return
		
		;(() => {
		const $modal = $$$('div').attr({
			id: 'modal'
		}).appendTo(document.body)
		
		//$modal.empty()

		/*$clone = this.cloneNode(true)
		//if(this.shadowRoot) $clone.shadowRoot.innerHTML = this.shadowRoot.innerHTML
		$clone.appendTo($modal)*/

		const offsetX = this.centerX - window.innerWidth/2
		const offsetY = this.centerY - window.innerHeight/2

		/*
		// GSAP

		const initialStyle = {
			minWidth: '',
			minHeight: '',
			width: this.width + 'px',
			height: this.height + 'px',
			maxWidth: this.width + 'px',
			maxHeight: this.height + 'px',
			willChange: 'transform, width, height, min-width, min-height'
		}
		const finalStyle = {
			transition: transition
		}
		this.dispatchEvent(new CustomEvent('modalize', {
			detail: {
				$clone: this,
				initialStyle,
				finalStyle
			}
		}))

		const $clone = this.cloneNode(true).insertBefore(this)
		this.appendTo($modal)

		this.css(initialStyle)

		this.addClass('in-modal')
		$clone.addClass('modalized-clone')
		$modal.addClass('show')
		
		$modal.css({
			transform: `translate(${offsetX}px, ${offsetY}px)`,
			transition: 'none',
			willChange: 'transform'
		})

		;(() => {
			$modal.css({
				transform: 'none',
				transition: transition
			})
			this.css(finalStyle)
			this.addClass('modalized')
		}).delay()*/



		/*
		// Web Animations API

		const initialStyle = {
			width: this.width + 'px',
			height: this.height + 'px',
			maxWidth: this.width + 'px',
			maxHeight: this.height + 'px',
		}
		const finalStyle = {}

		this.dispatchEvent(new CustomEvent('modalize', {
			detail: {
				$clone: this,
				initialStyle,
				finalStyle
			}
		}))

		const computedStyle = getComputedStyle(this)
		for(let prop in finalStyle){
			if(!(prop in initialStyle))
				initialStyle[prop] = computedStyle[prop]
		}

		const $clone = this.cloneNode(true).insertBefore(this)
		this.appendTo($modal)

		let thisAnimate = this.animate([
			initialStyle,
			finalStyle
		], {
			duration: 1000,
			easing: 'cubic-bezier(0, 0.9, 0, 1)',
			fill: 'forwards'
		})

		$modal.animate({
			transform: [`translate(${offsetX}px, ${offsetY}px)`, 'none']
		}, {
			duration: 1000,
			easing: 'cubic-bezier(0, 0.9, 0, 1)',
			fill: 'forwards'
		})

		this.addClass('in-modal')
		$clone.addClass('modalized-clone')
		$modal.addClass('show')

		;(() => {
			this.addClass('modalized')
		}).delay()
		*/



		// GSAP
		const initialStyle = {
			width: this.width + 'px',
			height: this.height + 'px',
			maxWidth: this.width + 'px',
			maxHeight: this.height + 'px',
		}
		const finalStyle = {}

		this.dispatchEvent(new CustomEvent('modalize', {
			detail: {
				$clone: this,
				initialStyle,
				finalStyle
			}
		}))

		const computedStyle = getComputedStyle(this)
		for(let prop in finalStyle){
			if(!(prop in initialStyle))
				initialStyle[prop] = computedStyle[prop]
		}

		const $clone = this.cloneNode(true).insertBefore(this)
		this.appendTo($modal)

		let thisAnimate = TweenLite.fromTo(
			this,
			1,
			initialStyle,
			Object.assign(finalStyle, {
				ease: Expo.easeOut
			})
		)

		TweenLite.fromTo(
			$modal,
			1,
			{
				transform: `translate(${offsetX}px, ${offsetY}px)`
			},
			{
				transform: 'none',
				ease: Expo.easeOut
			}
		)

		this.addClass('in-modal')
		$clone.addClass('modalized-clone')
		$modal.addClass('show')

		;(() => {
			this.addClass('modalized')
		}).delay()




		$modal.once('click', () => {
			const offsetX = $clone.left + window.pageXOffset
			const offsetY = $clone.top + window.pageYOffset
			const cloneOffsetX = this.left + window.pageXOffset
			const cloneOffsetY = this.top + window.pageYOffset

			/*
			// Pure CSS

			this.css({
				width: this.width + 'px',
				height: this.height + 'px',
				maxWidth: this.width + 'px',
				maxHeight: this.height + 'px',
				transition: 'none'
			})

			$modal.removeClass('show')
			this.removeClass('modalized')

			$modal.css({
				transform: `translate(${cloneOffsetX}px, ${cloneOffsetY}px)`,
				transition: 'none'
			})
			this.css({
				//minWidth: $clone.width + 'px',
				//minHeight: $clone.height + 'px',
				width: $clone.width + 'px',
				height: $clone.height + 'px',
				maxWidth: $clone.width + 'px',
				maxHeight: $clone.height + 'px',
				transition: transition
			})
			$modal.css({
				transform: `translate(${offsetX}px, ${offsetY}px)`,
				transition: transition
			})

			this.once('transitionend', e => {
				const $modal = this.parentNode

				this.attr('style', $clone.attr('style'))
				$clone.replaceWith(this)
				this.removeClass('in-modal')

				$modal.remove()
			}, true)*/



			/*

			// Web Animations API

			$modal.animate([{
				transform: `translate(${cloneOffsetX}px, ${cloneOffsetY}px)`,
			}, {
				transform: `translate(${offsetX}px, ${offsetY}px)`,
			}], {
				duration: 1000,
				easing: 'cubic-bezier(0, 0.9, 0, 1)',
				fill: 'forwards'
			})

			$modal.removeClass('show')
			this.removeClass('modalized')

			this.animate([{
				width: this.width + 'px',
				height: this.height + 'px',
				maxWidth: this.width + 'px',
				maxHeight: this.height + 'px',
			}, {
				width: $clone.width + 'px',
				height: $clone.height + 'px',
				maxWidth: $clone.width + 'px',
				maxHeight: $clone.height + 'px',
			}], {
				duration: 1000,
				easing: 'cubic-bezier(0, 0.9, 0, 1)',
				fill: 'forwards'
			}).on('finish', e => {
				const $modal = this.parentNode

				this.attr('style', $clone.attr('style'))
				$clone.replaceWith(this)
				this.removeClass('in-modal')

				$modal.remove()
			}, true)

			thisAnimate.cancel()
			*/



			// GSAP

			TweenLite.fromTo(
				$modal,
				1,
				{
					transform: `translate(${cloneOffsetX}px, ${cloneOffsetY}px)`
				},
				{
					transform: `translate(${offsetX}px, ${offsetY}px)`,
					ease: Expo.easeOut
				}
			)

			$modal.removeClass('show')
			this.removeClass('modalized')

			TweenLite.fromTo(
				this,
				1,
				{
					width: this.width + 'px',
					height: this.height + 'px',
					maxWidth: this.width + 'px',
					maxHeight: this.height + 'px',
				},
				{
					width: $clone.width + 'px',
					height: $clone.height + 'px',
					maxWidth: $clone.width + 'px',
					maxHeight: $clone.height + 'px',
					ease: Expo.easeOut,
					onComplete: function(){
						const $modal = this.parentNode

						this.attr('style', $clone.attr('style'))
						$clone.replaceWith(this)
						this.removeClass('in-modal')

						$modal.remove()
					}.bind(this)
				}
			)


			/*Promise.all([
				new Promise(resolve => $modal.once('transitionend', resolve)),
				new Promise(resolve => $clone.once('transitionend', resolve))
			]).then(() => {$clone.style.display='none'
				this.removeClass('modalized')
				$clone.remove()
			})*/
		}, true)
		E = $clone

		}).delay()
	})
	return this
}