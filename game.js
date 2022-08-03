
//////////////////// Game Section /////////////////////
/* Classes defined in characters.js and story.js */
let Timer,
		refresh=100,
		counter=0, //controls cursor/display
		storyo,
		storyi,
		scene=1; //scene increments per round (starts from 1 and increments, 0 reserved for last scene)
const showHideKeys=()=>{
				if(keyboard.style.display=="block"){
					keyboard.style.display="none";
					window.scrollTo(0,0);
				}else{
					keyboard.style.display="block";
					window.scrollTo(800,800);
				}
}

const init=()=>{
			storyo=document.getElementById("storyboard-outer"),
			storyi=document.getElementById("storyboard-inner"),
			statusboard=document.getElementById("status-board"),
			generalmessage=document.getElementById("general-message"),
			keyboard=document.getElementById("keyboard"),
			cards=document.getElementById("cards"),
			chat=document.getElementById("chat"),
			fgimg=document.getElementById("fgimg"),
			fgdiv=document.getElementById("fgdiv"),
			fgtalk=document.getElementById("fgtalk"),
			bgimg=document.getElementById("bgimg"),
			bgdiv=document.getElementById("bgdiv"),
			container=document.getElementById("story-container"),
			cardOnSign=document.getElementById("itwaswritten"),
			messages=["Welcome, to a land of poker, cheating, and much more. . .","Prepare yourself for Cheater's Poker - Erdnase Edition."],
			messageCounters=[0,0],
			story=true, //toggle story on/off (Note: different from Story with capital 'S' - class used for scenes)
			pause=0, //pregame counter
			firstRun=true,
			Evans=new Character("Evans",3),
			Amos=new Character("Amos",2.5),
			Isabel=new Character("Isabel",4),
			Ned=new Character("Ned",3),
			Barkeep=new Character("Barkeep",3),
			Dealer=new Character("Dealer",4),
			Dog=new Character("Dog",4),
			Andrews=new Character("Andrews",3),
			Saloon=new StageItem("Saloon",4),
			Doors=new StageItem("Doors",5),
			Sign=new StageItem("LuckyCardSign",3),
			Chips=new StageItem("Chips",3),
			Shuffle=new StageItem("Overhand",3),
			Table=new StageItem("Table",3),
			introOutro=new Audio("./sounds/intro-outro.mp3"),
			heartbeat=new Audio("./sounds/heartbeat.wav"),
			suspense=new Audio("./sounds/suspense.mp3"),
			drinkPour=new Audio("./sounds/drink.mp3"),
			pub=new Audio("./sounds/pub.mp3"),
			overhand=new Audio("./sounds/overhand.mp3"),
			bang=new Audio("./sounds/bang.mp3"),
			riff=new Audio("./sounds/riffle.mp3"),
			deal=new Audio("./sounds/deal.mp3"),
			drumSound=new Audio("./sounds/drums.wav");

			drumSound.playbackRate=1;

			//Additional image preloads for non-defaults
			emptyTable=new Image();
				emptyTable.src="images/Table-empty.png";
			drink=new Image();
				drink.src="images/Drink.png";
			riffle=new Image();
				riffle.src="images/Riffle.png";
			spring=new Image();
				spring.src="images/Spring.png";
			pokerStandOff=new Image();
				pokerStandOff.src="images/PokerStandOff.png";
			gunOut=new Image();
				gunOut.src="images/GunPointed.png";
			table4=new Image();
				table4.src="images/Table-4.png";
			table5=new Image();
				table5.src="images/Table-5.png";
			cheat=new Image();
				cheat.src="images/Cheat.png";
			//End additional image preloads

			preGame();

			document.getElementById("story").addEventListener("click",toggleStory);
			document.getElementById("showhidekeys").addEventListener("click",showHideKeys);
			document.getElementById("play").addEventListener("click",game);
}

const preGame=()=>{
	const play=document.getElementById("play");
	if(messageCounters[0]<=messages[0].length){
		chat.innerHTML=messages[0].slice(0,messageCounters[0]);
		messageCounters[0]++;
	}else if(pause<5){	
		pause++;
	}else if(messageCounters[1]<=messages[1].length){
		chat.innerHTML=messages[1].slice(0,messageCounters[1]);
		messageCounters[1]++;
	}else if(pause<10){	
		pause++;
	}else if(pause<12){
		play.style.backgroundColor="black";
		play.style.color="green";
		pause++;
	}else{
		play.style.backgroundColor="green";
		play.style.color="black";
	}
	Timer=setTimeout(preGame, refresh);
}

const game=()=>{
	if(firstRun){
		clearTimeout(Timer);
		cards.innerHTML=chat.innerHTML="";
		cards.style.position="absolute";
		cards.style.textAlign="left";
		Game=new Story();
		firstRun=false;
	}

	if(counter<5){
		//statusboard.innerHTML=`${counter}`;
		counter++;
	}else{
		//handle display cursor
		if(cards.innerHTML.slice(-1)=="_")
			cards.innerHTML=cards.innerHTML.slice(0,-1);
		else
			cards.innerHTML+='_';
		counter=0;
	}	

	//Scenes	
	if(story){
		switch(scene){
			case 1:
						Game.scene1();
						break;
			case 2:
						Game.scene2();
						break;
			case 3:
						Game.scene3();
						break;
			case 4:
						Game.scene4();
						break;
			case 5:
						Game.scene5();
						break;
			case 0:
						Game.scene0();
						break;
			default:
						promptUser();
		}
	}else{ //story off
		promptUser();
	}


	Timer=setTimeout(game, refresh);
}
const promptUser=()=>{
	chat.innerHTML="";
	chat.style.textAlign="left";
	chat.innerHTML="Enter known up cards. . .";
	keyboard.style.display="block";
	hideMessage();
	hideMainStory();
	cards.style.display="block";
	chat.style.display="block";
}
const hideMainStory=()=>{
	bgimg.style.display="none";
	fgtalk.style.display="none";
	fgimg.style.visibility="hidden";
	fgdiv.style.visibility="hidden";
}
const displayMessage=()=>{
	hideMainStory();	
	generalmessage.style.display="block";
	generalmessage.style.fontSize="35px";
	generalmessage.style.fontFamily="Comic Sans MS";
	generalmessage.style.textAlign="left";
	//generalmessage.style.height="260px";
	generalmessage.style.width="770px";
	generalmessage.style.zIndex="0";
}

const hideMessage=()=>{
	generalmessage.style.display="none";
	bgimg.style.display="block";
	fgtalk.style.display="block";
	fgimg.style.visibility="visible";
	fgdiv.style.visibility="visible";
}

const toggleStory=()=>{
	//Toggling story can mess up positioning when returning to the story
	//therefore, hiding after user clicks
	let s=document.getElementById("story");
	game();
	if(story){
		story=false;
		s.innerHTML="Story: Off";
		promptUser();
		s.style.display="none";
	}else{
		story=true;
		s.innerHTML="Story: On";
		s.style.display="none";
	}
}

const forceHandCheck=(forcehand)=>{
	//assumes forcehand passed in is set previously to temphand from first round of 4 or 5
	let matched=[]; //tracks matched cards

	if(forcehand.length==0)
		return;

	//update matched cards
	for(let v of temphand)
		for(let v1 of forcehand)
			if(v==v1)		
				matched.push(v); //if matched, add to matched array

	//sort forcehand and matched arrays (type of sort doesn't matter as long as they are the same)
	forcehand.sort();
	matched.sort();

	//if one less than forcehand length, return unmatched card
	if(matched.length==forcehand.length-1) 
		for(let i in forcehand)
			if(forcehand[i] != matched[i])
				return forcehand[i];

	return false;
}

const forceSet=(x)=>{
	//used to set initial force hand as well as call forceHandCheck() to check if forcehand is current
	//if forcehand is current, will set holecard to missing card from forcehands[x]
	if(forcehands[x].length==0) //set forcehand to inital hand for 4 or 5
		forcehands[x]=[...temphand];	

	if(forceHandCheck(forcehands[x])){
		scene=0;
		holecard=forceHandCheck(forcehands[x]);
	}
}

const updateCards=(val,type)=>{
	//val is number or letter representation
	//type: (ex. suit, card, del)
	if(cards.innerHTML.slice(-1)=="_") //check for display cursor and remove
		cards.innerHTML=cards.innerHTML.slice(0,-1);
	if(type=="del"){
		cards.innerHTML=cards.innerHTML.slice(0,-1);
		return;
	}
	if(type=="suit") //do not allow a suit to be updated directly after a space of X
		if(cards.innerHTML.slice(-1)==" " || cards.innerHTML.slice(-1)=="X")
			return;
	if(val=="X" || type=="num") //verify X and numbers are preceded by a space (if not remove the character/s)
		if(cards.innerHTML.slice(-1)!=" ")
			if(cards.innerHTML.slice(-1)=="0") //check for 10 since has two chars
				cards.innerHTML=cards.innerHTML.slice(0,-2);
			else
				cards.innerHTML=cards.innerHTML.slice(0,-1);

	//once previous checks pass, display can be successfully updated
	
	cards.innerHTML+=val; //update display

	if(type=="suit" || val=="X") //add space if complete
		cards.innerHTML+=" ";
}

const showdown=()=>{
	let delay=5000; //delay before reveal
			mode="low"; //set to default of low (later checks will set to other modes if applicable)

	if(cards.innerHTML.slice(-1)=="_") //check for display cursor and remove
		cards.innerHTML=cards.innerHTML.slice(0,-1);

	if(cards.innerHTML.trim().split(/[ ,]+/).length<4) //check if all cards entered
		return;
	else if(cards.innerHTML.trim().split(/[ ,]+/).length>5) //check if too many cards entered
		return -1;

	
	cards.innerHTML=cards.innerHTML.replace("_",""); //remove display cursor if present
	setTempHand(cards.innerHTML.trim());
	setHand();

	if(temphand.length!=[...new Set(temphand)].length) //duplicates
		return -2;

	drumSound.play();
	encode();
	holecard=decode();
	scene++;

	//check for initial hand (set force hand) and check for result to override
	if(temphand.length==4)
		forceSet(0);
	else if(temphand.length==5)
		forceSet(1);

	
	cards.innerHTML="";
	//showHideKeys();
	chat.style.textAlign="center";
	chat.innerHTML="[Showdown]";
					
	if(scene==0 && story) //set delay to longer for final scene's reveal
		delay=27000;

	sleep(delay).then(() => {	
			cards.innerHTML=`${holecard} `; //space added to display to allow using card in next set if needed
	});
}

function sleep (time){
	return new Promise((resolve) => setTimeout(resolve, time));
}

