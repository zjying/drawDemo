this.drawDemo = this.drawDemo || {};
(function(){
    var demo = function(option){
    	this.mycolor=$("#color_d").cxColor();
        this.option = option
        this.init();
        this.addEvent();
    }
    var p = demo.prototype;
    p.init = function () {
        this.demoCanvas=document.getElementById("demoCanvas")
		this.stage = new createjs.Stage(this.demoCanvas);
		this.flag="line";
    }
    p.addEvent=function(){
    	var _this=this;
    	_this.demoCanvas.addEventListener("mousedown",function(e){
			_this.width_d=$("#width_d").val();
			let flag=_this.flag;
			if(flag=="eraser"){
				_this.color_d="#ffffff";
			}else{
				_this.color_d=$("#color_d").val();
			}
			if(flag=="circle"){
				_this.newCircle = new createjs.Shape();
				_this.stage.addChild(_this.newCircle);
			}else if(flag=="line"||flag=="eraser"){
				_this.pic = new createjs.Shape(); 
				_this.pic.graphics.setStrokeStyle(_this.width_d, 'round').beginStroke(_this.color_d).mt(e.offsetX, e.offsetY)
				_this.stage.addChild(_this.pic);
			}else if(flag=="rect"){
				_this.newRect = new createjs.Shape();
				_this.stage.addChild(_this.newRect);
			}
			_this.start_x=e.offsetX;
			_this.start_y=e.offsetY;  
			document.addEventListener('mousemove', mousemove);
		})
		document.addEventListener('mouseup', e => {
			_this.start_x=0;_this.start_y=0;
            document.removeEventListener('mousemove', mousemove);
      	})
    	mousemove=function (e) {
    		let flag=_this.flag;
			if(flag=="circle"){
				let chX = Math.abs(e.offsetX-_this.start_x);
				let chY = Math.abs(e.offsetY-_this.start_y);
				let R = Math.max(chX, chY)
				_this.newCircle.graphics.clear()
            	.setStrokeStyle(_this.width_d, 'round').beginStroke(_this.color_d)
            	.arc(_this.start_x, _this.start_y, R, 0, Math.PI*2);
			}else if(flag=="line"||flag=="eraser"){
				_this.pic.graphics.lt(e.offsetX, e.offsetY);
			}else if(flag=="rect"){
				let chX = Math.abs(e.offsetX-_this.start_x);
				let chY = Math.abs(e.offsetY-_this.start_y);
				_this.newRect.graphics.clear()
            	.setStrokeStyle(_this.width_d, 'round').beginStroke(_this.color_d)
            	.rect(_this.start_x, _this.start_y,chX,chY );
			}
        	_this.stage.update();
        }
    	//线条粗细
		$(".wide-thin").on("click","i[_type]",function(){
			var _type=$(this).attr("_type");
			var numval=$(".num-val").val();
			if(_type=="minus"&&numval>1){
				numval--;
			}else if(_type=="add"&&numval<=30){
				numval++;
			}
			$(".num-val").val(numval);
		})
		//橡皮擦与形状
    	$(".tools").on("click","[tool]",function(){
			let _tool=$(this).attr("tool");
			$(".tools [tool]").removeClass("clickT");
			$(this).addClass("clickT");
			_this.flag=_tool;
		})
    	//颜色
    	let color_d = document.querySelector('#color_d');
    	color_d.addEventListener("click",function(){
    		e.stopPropagation();
    	});
    }
    drawDemo.demo = demo;
})()