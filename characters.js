class StageItem {
	constructor(name,scale){
		this.name=name;
		this.avatar=`./images/${this.name}.png`;
		this.img=new Image();
		this.scale=scale;

		this.img.src=this.avatar;

		//style defaults
		this.style_width="100%";
		this.style_height="100%";
		this.style_textAlign="left";
		this.style_top="160px";
		this.style_left="70px";
		this.style_zIndex="0";
		this.style_webkitTransform=`scale(${this.scale})`; /* Saf3.1+, Chrome */
		this.style_mozTransform=`scale(${this.scale})`; /* FF3.5+ */
		this.style_msTransform=`scale(${this.scale})`; /* IE9 */
		this.style_oTransform=`scale(${this.scale})`; /* Opera 10.5+ */
		this.style_transform=`scale(${this.scale})`;
		this.style_filter=`progid:DXImageTransform.Microsoft.Matrix(M11=0.9999619230641713, M12=-0.008726535498373935, M21=0.008726535498373935, M22=0.9999619230641713,SizingMethod='auto expand')`;
	}
	flip(){
		const bgimg=document.getElementById("bgimg");
		bgimg.style.transform=`scale(${this.scale}) rotateY(180deg)`;	
	}
	setPos(left,top){
		const bgdiv=document.getElementById("bgdiv");
		this.style_top=top;
		this.style_left=left;

		bgdiv.style.top=top;							
		bgdiv.style.left=left;
	}
	setScale(){
		const bgimg=document.getElementById("bgimg");	
		bgimg.style.webkitTransform=this.style_webkitTransform;
		bgimg.style.mozTransform=this.style_mozTransform;
		bgimg.style.msTransform=this.style_msTransform;
		bgimg.style.oTransform=this.style_oTransform;
		bgimg.style.transform=this.style_transform;
		bgimg.style.filter=this.style_filter;
	}
	setDimensions(width,height){
		const bgimg=document.getElementById("bgimg");
		this.style_height=height;
		this.style_width=width;

		bgimg.style.height=height;
		bgimg.style.width=width;
	}
}

class Character extends StageItem {
	constructor(...args){
		super(...args);
		//style defaults for avatar placement
		this.style_textAlign="right";
		this.style_top="-50px";
		this.style_left="15px";
		this.style_zIndex="1";
	}
	speak(type,message){
		const fgdiv=document.getElementById("fgdiv"),
					fgtalk=document.getElementById("fgtalk"),
					chat=document.getElementById("chat");
		switch(type){
			case 'bubble-left':
									this.style_textAlign="right";
									fgdiv.style.top=this.style_top;							
									fgdiv.style.left=this.style_left;
									fgtalk.className="bubble bubble-bottom-right";	
									fgtalk.innerHTML=message;
									return `${message}`;
									break;
			case 'bubble-right':
									this.style_textAlign="left";
									fgdiv.style.top=this.style_top;							
									fgdiv.style.left=this.style_left;
									fgtalk.className="bubble bubble-bottom-left";	
									fgtalk.innerHTML=message;
									return `${message}`;
									break;
			case 'console':
									let text=`[${this.name}] ${message}`;
									chat.innerHTML=text;
									return text;
									break;
			default:
					return -1;
		}
	}
	flip(){
		const fgimg=document.getElementById("fgimg");
		fgimg.style.transform=`scale(${this.scale}) rotateY(180deg)`;	
	}
	setPos(left,top){
		const fgdiv=document.getElementById("fgdiv");
		this.style_top=top;
		this.style_left=left;

		fgdiv.style.top=top;							
		fgdiv.style.left=left;
	}
	setScale(){
		const bgimg=document.getElementById("fgimg");	
		fgimg.style.webkitTransform=this.style_webkitTransform;
		fgimg.style.mozTransform=this.style_mozTransform;
		fgimg.style.msTransform=this.style_msTransform;
		fgimg.style.oTransform=this.style_oTransform;
		fgimg.style.transform=this.style_transform;
		fgimg.style.filter=this.style_filter;
	}
	setDimensions(width,height){
		const fgimg=document.getElementById("fgimg");
		this.style_height=height;
		this.style_width=width;

		fgimg.style.height=height;
		fgimg.style.width=width;
	}
}

