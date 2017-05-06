{
	const canvas = $('#background canvas')
	canvas.width = canvas.clientWidth
	canvas.height = canvas.clientHeight
	
	const c = canvas.getContext('2d')
	let mouseX, mouseY
	
	window.on('resize', function(){
		canvas.resize()
	}.debounce(100))

	window.on('mousemove.throttle', function(e){
		mouseX = e.clientX
		mouseY = e.clientY
		pmouseX = mouseX
		pmouseY = mouseY
	})
	

	const sin = a => Math.sin(a / Math.PI * 180)
	const cos = a => Math.cos(a / Math.PI * 180)
	
	let frameCount = 0
	const startTime = Date.now()
	
	// The Loop
	/*function draw(){
		const t = (Date.now() - startTime) / 1000
		with(c){with(Math){
			
			!{
				mouseySquare(){
					resetTransform()
					clear()
					//background('rgba(100, 0, 0, 0.2)')
					translate(mouseX, mouseY)
					fillStyle = "skyblue"
					fillRect(
						cos(t * 16) * 10. // + width/2,
						0,//height/2 + sin(t) * height/2,
						100,
						100 + sin(t * 3)*100
					)
				},
				ulam(){
					resetTransform()
					clear()
					//background('rgba(100, 0, 0, 0.2)')
					translate(width/2, height/2)
					fillStyle = "skyblue"
					
				}
			}['mouseySquare']()
			
		}}
		frameCount++
	}
	draw.interval(1000/30, true)*/
}