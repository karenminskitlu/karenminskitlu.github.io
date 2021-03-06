let canvas;
let ctx;

window.onload = function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	init_draw();
}

function init_draw(){
	canvas.addEventListener("mousedown", start_draw);
	document.getElementById("save_art").addEventListener("click", save_art);
}

function start_draw(e){
	console.log(e);
	let x = e.clientX - canvas.offsetLeft + window.scrollX;
	let y = e.clientY - canvas.offsetTop + window.scrollY;
	if(e.ctrlKey == false){
		ctx.lineWidth = document.getElementById("art_linewidth").value;
		ctx.strokeStyle = document.getElementById("art_color").value;
		ctx.lineCap = "round"; //butt  square
		ctx.beginPath();
			ctx.moveTo(x,y);
			canvas.addEventListener("mousemove", do_draw);
			canvas.addEventListener("mouseup", stop_draw);
			canvas.addEventListener("mouseleave", stop_draw);
	} else {
		let w = document.getElementById("art_linewidth").value;
		ctx.clearRect(x - w / 2, y - w / 2, w, w);
		canvas.addEventListener("mousemove", do_erase);
		canvas.addEventListener("mouseup", stop_erase);
		canvas.addEventListener("mouseleave", stop_erase);
	}
}

function do_erase(e){
	let x = e.clientX - canvas.offsetLeft + window.scrollX;
	let y = e.clientY - canvas.offsetTop + window.scrollY;
	let w = document.getElementById("art_linewidth").value;
	ctx.clearRect(x - w / 2, y - w / 2, w, w);
}

function stop_erase(){
	canvas.removeEventListener("mousemove", do_erase);
	canvas.removeEventListener("mouseup", stop_erase);
	canvas.removeEventListener("mouseleave", stop_erase);
}

function do_draw(e){
	let x = e.clientX - canvas.offsetLeft + window.scrollX;
	let y = e.clientY - canvas.offsetTop + window.scrollY;
	ctx.lineTo(x,y);
	ctx.stroke();
}

function stop_draw(e){
		let x = e.clientX - canvas.offsetLeft + window.scrollX;
		let y = e.clientY - canvas.offsetTop + window.scrollY;
		ctx.lineTo(x,y);
	ctx.closePath();
	canvas.removeEventListener("mousemove", do_draw);
	canvas.removeEventListener("mouseup", stop_draw);
	canvas.removeEventListener("mouseleave", stop_draw);
}

function save_art(){
	this.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
}