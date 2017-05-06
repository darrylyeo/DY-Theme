// alwaysFitToWidth: whether to distribute word/letter spacing if above maxFontSize
Element.prototype.fitText = function(maxFontSize = Infinity, alwaysFitToWidth = false, letterToWordSpacingRatio = 0.5){
	const originalMaxFontSize = maxFontSize

	const fitText = () => {
		let maxFontSize = originalMaxFontSize
		if(typeof maxFontSize === 'string' && maxFontSize != parseFloat(maxFontSize) && !maxFontSize.includes('px')){
			this.style.fontSize = maxFontSize
			maxFontSize = parseFloat(getComputedStyle(this).fontSize)
		}

		Object.assign(this.style, {
			fontSize: '',
			letterSpacing: '',
			wordSpacing: '0',
			width: 'initial'
		})
		
		const parentWidth = this.parentNode.clientWidth
		const newFontSize = parseFloat(getComputedStyle(this).fontSize) * parentWidth / this.clientWidth
		
		Object.assign(this.style, {
			fontSize: Math.min(newFontSize, maxFontSize) + 'px',
			whiteSpace: 'nowrap',
			width: ''
		})

		if(!alwaysFitToWidth) return

		const leftoverSpace = parentWidth - this.clientWidth
		const letterCount = this.innerText.length - 1
		const wordCount = this.innerText.split(' ').length - 1

		if(wordCount === 0) letterToWordSpacingRatio = 1

		const newLetterSpacing = (leftoverSpace * letterToWordSpacingRatio) / letterCount
		const newWordSpacing = (leftoverSpace * (1 - letterToWordSpacingRatio)) / wordCount
	  
		Object.assign(this.style, {
			letterSpacing: newLetterSpacing + 'px',
			marginRight: -newLetterSpacing + 'px',
			wordSpacing: newWordSpacing + 'px'
		})
	}
	fitText.delay()
	window.on('resize.throttle', fitText)
}

/*
Element.prototype.fitText = function(maxFontSize = Infinity, letterToWordSpacingRatio = 0.5){
	const fitText = function(){
		if(typeof maxFontSize === 'string' && maxFontSize != parseFloat(maxFontSize) && !maxFontSize.includes('px')){
			this.style.fontSize = maxFontSize
			maxFontSize = parseFloat(getComputedStyle(this).fontSize)
		}

		Object.assign(this.style, {
			fontSize: '',
			letterSpacing: '',
			wordSpacing: '0'
		})
		
		const parentWidth = this.parentNode.clientWidth
		const newFontSize = parseFloat(getComputedStyle(this).fontSize) * parentWidth / this.clientWidth
		
		Object.assign(this.style, {
			fontSize: Math.min(newFontSize, maxFontSize) + 'px',
			whiteSpace: 'nowrap'
		})

		const leftoverSpace = parentWidth - this.clientWidth
		
		const letterSpace = leftoverSpace * letterToWordSpacingRatio
		const letterCount = this.innerText.length - 1
		const newLetterSpacing = letterSpace / letterCount
	  
		const wordSpace = leftoverSpace - letterSpace
		const wordCount = this.innerText.split(' ').length - 1
		const newWordSpacing = wordSpace / wordCount
	  
		Object.assign(this.style, {
			letterSpacing: newLetterSpacing + 'px',
			marginRight: -newLetterSpacing + 'px',
			wordSpacing: newWordSpacing + 'px'
		})
	}
	fitText()
	window.addEventListener('resize', fitText)
}
*/