class Story {
	constructor(){
		this.pauses=[0,0]; //counters for scenes [0] is reserved for final scene, will push(0) at the end of each scene
		this.patters=[
							`You can put down the`,
							`Bet you're holding the`,
							`I reckon, you must have the`,
						];
	}
	getPatter=()=>{
		let color=isRed(holecard)?"red":"black",
						suit=getSuitSymbol(getSuit(holecard)),
						val=holecard.slice(0,-1),
						string=`${this.patters[0]} <span style="color:${color};">${val}${suit}</span>`; //gets shifted at end of scene
		string=(mode=="high" && temphand.length==4)?`Hey! Quit holding out on me! I know you got the <span style="color:${color};">${val}${suit}</span>!`:string;
		string=(isFourOfAKind())?`4 of a kind's a good hand, but this is Liar's Poker. Bet you got the <span style="color:${color};">${val}${suit}</span>!`:string;
		return string;
	}
	////////////// SCENE 1 //////////////
	scene1(){
		switch(true){
			case (this.pauses[1]<5):
				introOutro.volume=1;
				introOutro.play();
				keyboard.style.display="none";
				this.pauses[1]++;
				break;
			case (this.pauses[1]<25):
				fgimg.style.visibility="hidden";
				fgtalk.style.visibility="hidden";	
				bgimg.src=Saloon.img.src;
				Saloon.setScale();
				Saloon.setDimensions("200px","85px");
				Saloon.setPos("200px","135px");
				bgimg.style.visibility="visible";
				chat.style.textAlign="center";
				chat.innerHTML="[Saloon]";
				this.pauses[1]++;
				break;
			case (this.pauses[1]<35):
				bgimg.src=Doors.img.src;
				Amos.setScale();
				fgimg.src=Amos.avatar;
				Amos.setPos("15px","-50px");
				this.pauses[1]++;
				break;
			case (this.pauses[1]<55):
				Sign.setScale();
				Sign.setDimensions("100px","110px");
				Sign.setPos("40px","115px");
				fgimg.style.visibility="visible";
				fgtalk.style.visibility="visible";
				Amos.speak("bubble-left","Howdy, partner!");
				bgimg.src=Sign.img.src;
				this.pauses[1]++;
				break;
			case (this.pauses[1]<85):
				fgimg.style.visibility="hidden";
				fgtalk.style.visibility="hidden";
				pub.volume=0.25;
				pub.play();
				this.pauses[1]++;	
				break;
			case (this.pauses[1]<110):
				bgimg.src=Table.img.src;
				Table.setDimensions("260px","110px");
				Table.setPos("170px","130px");
				bgimg.style.visibility="visible";
				Table.setScale();
				chat.innerHTML="[Dealer] Welcome to town, partner. Have a Seat.";
				this.pauses[1]++;
				break;
			case (this.pauses[1]<115):
				chat.innerHTML="";
				this.pauses[1]++;
				break;
			case (this.pauses[1]<140):
				chat.innerHTML=`[Dealer] The game's Liar's Poker.`;
				this.pauses[1]++;
				break;
			case (this.pauses[1]<145):
				chat.innerHTML="";
				this.pauses[1]++;
				break;
			case (this.pauses[1]<200):
				chat.innerHTML=`[Dealer] You tell me your "up" cards and I bet I can tell you your hole card.`;
				this.pauses[1]++;
				break;
			case (this.pauses[1]<205):
				chat.innerHTML="";
				this.pauses[1]++;
				break;
			case (this.pauses[1]<255):
				bgimg.src=emptyTable.src;
				chat.innerHTML=`[Dealer] If I'm wrong, you win. If I'm close, it's a draw.`;
				this.pauses[1]++;
				break;
			case (this.pauses[1]<260):
				bgimg.src=emptyTable.src;
				chat.innerHTML="";
				this.pauses[1]++;
				break;
			case (this.pauses[1]<310):
				chat.innerHTML=`[Dealer]  But if I nail it, that's a 50 to 1 bet, you only pay 10 to 1.`;
				this.pauses[1]++;
				break;
			case (this.pauses[1]<315):
				overhand.play();
				chat.innerHTML="";
				this.pauses[1]++;
				break;
			case (this.pauses[1]<355):
				chat.innerHTML=`[Dealer]  Gentlemen, let's play some cards!`;
				this.pauses[1]++;
				break;
			case (this.pauses[1]<360):
				chat.innerHTML="";
				this.pauses[1]++;
				break;
			case (this.pauses[1]<410):
				Shuffle.setScale();
				overhand.play();
				bgimg.src=Shuffle.img.src;
				Ned.speak("console","Shuffle 'em up real good now, ya hear.");	
				this.pauses[1]++;
				break;
			case (this.pauses[1]<415):
				chat.innerHTML="";
				this.pauses[1]++;
				break;
			case (this.pauses[1]<465):
				Ned.speak("console","Kid, put your faith in providence, but always cut the cards.");	
				this.pauses[1]++;
				break;
			case (this.pauses[1]<470):
				chat.innerHTML="";
				this.pauses[1]++;
				break;
			case (this.pauses[1]<475):
				bgimg.src=emptyTable.src;
				overhand.pause();
				deal.play();		
				this.pauses[1]++;
				break;
			case (this.pauses[1]<515):
				chat.innerHTML="[Dealer] Alright, fellas. Ante up.";
				fgimg.src=Chips.img.src;
				fgimg.style.visibility="visible";
				cards.innerHTML="";
				this.pauses[1]++;
				break;
			default:
				pub.pause();
				this.pauses.push(0);
				promptUser();	
		}
	}
	////////////// SCENE 2 //////////////
	scene2(){
		switch(true){
			case (this.pauses[2]<25):
				keyboard.style.display="none";
				fgimg.src=Dealer.avatar;
				Dealer.setScale();
				Dealer.setPos("0px","-70px");
				this.pauses[2]++;
				break;
			case (this.pauses[2]<85):
				let color=isRed(holecard)?"red":"black",
						suit=getSuitSymbol(getSuit(holecard)),
						val=holecard.slice(0,-1);
				hideMessage();
				pub.volume=0.25;
				pub.loop=true;
				pub.play();
				bgimg.style.visibility="hidden";
				fgimg.style.visibility="visible";
				fgtalk.style.visibility="visible";
				Dealer.speak("bubble-left",`I'm calling your bluff kid. You're holding the <span style="color:${color};">${val}${suit}</span>`);
				chat.innerHTML="[Dealer]";
				this.pauses[2]++;
				break;
			case (this.pauses[2]<90):
				chat.innerHTML="";
				Table.img.src=(temphand.length==4)?table4.src:table5.src;
				bgimg.src=Table.img.src;
				fgimg.style.visibility="hidden";
				fgtalk.style.visibility="hidden";
				this.pauses[2]++;
				break;
			case (this.pauses[2]<120):
				Amos.speak("console","Looks like you need a drink.");
				bgimg.style.visibility="visible";
				Amos.setPos("0px","-75px");
				fgimg.src=Amos.avatar;
				this.pauses[2]++;
				break;
			case (this.pauses[2]<125):
				chat.innerHTML="";
				this.pauses[2]++;
				break;
			case (this.pauses[2]<150):
				bgimg.style.visibility="hidden";
				fgimg.style.visibility="visible";
				fgtalk.style.visibility="visible";
				fgtalk.style.zIndex="3";
				Amos.setScale();
				Amos.speak("bubble-left","Barkeep, get this man a drink!");
				chat.innerHTML="[Amos]";
				this.pauses[2]++;
				break;
			case (this.pauses[2]<190):
				Amos.speak("bubble-left","Don't worry, kid. This one's on me.");
				this.pauses[2]++;
				break;
			case (this.pauses[2]<220):
				Barkeep.setScale();
				Barkeep.setPos("-570px","-100px");
				fgimg.src=Barkeep.avatar;
				Barkeep.speak("bubble-right","One drink coming right up!");
				chat.innerHTML="[Drink Request]";
				this.pauses[2]++;
				break;
			case (this.pauses[2]<260):
				drinkPour.play();
				fgimg.src=drink.src;
				fgtalk.style.zIndex="3";
				Barkeep.speak("bubble-right","This will cure what ails yah.");
				chat.innerHTML="[Drink Up]";
				this.pauses[2]++;
			break;
			case (this.pauses[2]<290):
				chat.innerHTML="";
				this.pauses[2]++;
				break;
			case (this.pauses[2]<320):
				drinkPour.pause();
				chat.innerHTML="[Isabel]";
				document.getElementById("fgimg").src=Isabel.avatar;
				Isabel.flip(); //for bubble-right
				Isabel.setPos("-490px","-70px");
				Isabel.speak("bubble-right","<br>Hey there stranger!<br><br>");
				this.pauses[2]++;	
				break;
			case (this.pauses[2]<360):
				Isabel.setPos("-490px","-105px");
				Isabel.speak("bubble-right","Don't wear yourself out playing cards... Save some energy for me!");
				bgimg.src=Table.img.src;
				this.pauses[2]++;	
				break;
			case (this.pauses[2]<365):
				chat.innerHTML="";
				this.pauses[2]++;	
				break;
			case (this.pauses[2]<395):
				Dealer.speak("console","Fellas, I gotta go take care of something.");
				Dealer.speak("bubble-left","Don't worry. Your new dealer, Andrews, will take good care of you.");
				Dealer.setPos("0px","-70px");
				fgimg.src=Dealer.avatar;
				fgimg.style.visibility="hidden";
				fgtalk.style.visibility="hidden";
				bgimg.style.visibility="visible";
				this.pauses[2]++;	
				break;
			case (this.pauses[2]<400):
				chat.innerHTML="";
				this.pauses[2]++;	
				break;
			case (this.pauses[2]<445):
				chat.innerHTML="[Switching Dealers]";
				fgimg.style.visibility="visible";
				fgtalk.style.visibility="visible";
				bgimg.style.visibility="hidden";	
				this.pauses[2]++;	
				break;
			case (this.pauses[2]<450):
				chat.innerHTML="";
				this.pauses[2]++;	
				break;
			case (this.pauses[2]<485):
				fgimg.src=Amos.avatar;
				Amos.setPos("0px","-75px");
				Amos.setScale();
				Amos.speak("bubble-left","Careful kid. I heard he cheats.");
				this.pauses[2]++;	
				break;
			case (this.pauses[2]<515):
				Andrews.setScale();
				chat.innerHTML="[Andrews]";
				fgimg.src=cheat.src;
				Amos.speak("bubble-left","Howdy, I'll be taking over for now.");
				Andrews.setScale();
				Andrews.setPos("15px","-50px;");
				this.pauses[2]++;	
				break;
			case (this.pauses[2]<520):
				fgimg.src=Andrews.avatar;
				Andrews.speak("bubble-left","Alright, boys. Money on the table, no go to the pockets.");
				this.pauses[2]++;	
				break;
			case (this.pauses[2]<545):
				chat.innerHTML="[Shuffling]";
				riff.play();
				this.pauses[2]++;	
				break;
			case (this.pauses[2]<595):
				bgimg.style.visibility="visible";
				fgimg.style.visibility="hidden";
				fgtalk.style.visibility="hidden";
				riff.loop=true;
				Shuffle.img.src=riffle.src;
				Shuffle.setScale();
				Shuffle.setDimensions("80px","100px");
				Shuffle.setPos("280px","135px");
				bgimg.src=Shuffle.img.src;	
				this.pauses[2]++;
				break;
			case (this.pauses[2]<600):
				bgimg.style.visibility="hidden";
				this.pauses[2]++;
				break;
			case (this.pauses[2]<630):
				bgimg.style.visibility="visible";
				Shuffle.setDimensions("80px","100px");
				Shuffle.img.src=spring.src;
				bgimg.src=Shuffle.img.src;
				this.pauses[2]++;
				break;
			case (this.pauses[2]<635):
				chat.innerHTML="";
				this.pauses[2]++;
				break;
			case (this.pauses[2]<640):
				Table.setDimensions("260px","110px");
				Table.setPos("170px","130px");
				Table.setScale();
				bgimg.src=emptyTable.src;
				deal.play();		
				this.pauses[2]++;
				break;
			case (this.pauses[2]<670):
				Andrews.speak("console","Ok, Gents. Ante Up.");
				fgimg.src=Chips.img.src;
				fgimg.style.visibility="visible";
				cards.innerHTML="";
				this.pauses[2]++;
				break;
			default:
				riff.pause();
				pub.pause();
				this.pauses.push(0);
				promptUser();
		}
	}
	////////////// SCENE 3 //////////////
	scene3(){
		switch(true){
			case (this.pauses[3]<25):
				keyboard.style.display="none";
				fgimg.src=Andrews.avatar;
				Andrews.setScale();
				Andrews.setPos("15px","-50px;");
				this.pauses[3]++;
				break;
			case (this.pauses[3]<85):
				let patter=this.getPatter();	
				hideMessage();
				pub.volume=0.25;
				pub.loop=true;
				pub.play();
				bgimg.style.visibility="hidden";
				fgimg.style.visibility="visible";
				fgtalk.style.visibility="visible";
				Andrews.speak("bubble-left",patter);
				chat.innerHTML="[Andrews]";
				this.pauses[3]++;
				break;
			case (this.pauses[3]<120):
				Dog.setScale();
				Dog.setPos("15px","-70px");
				fgimg.src=Dog.avatar;
				Dog.speak("bubble-left","Don't worry kid, you'll get 'em next time.");
				chat.innerHTML="";
				this.pauses[3]++;
				break;
			case (this.pauses[3]<125):
				Table.img.src=(temphand.length==4)?table4.src:table5.src;
				bgimg.src=Table.img.src;
				this.pauses[3]++;
				break;
			case (this.pauses[3]<150):
				fgtalk.style.visibility="hidden";
				fgimg.style.visibility="hidden";
				bgimg.style.visibility="visible";
				chat.innerHTML="[Isaac] Boss... boss..";
				this.pauses[3]++;
				break;
			case (this.pauses[3]<190):
				chat.style.textAlign="left";
				Ned.speak("console","Andrews, man. I thought I had you on this one.");
				this.pauses[3]++;
				break;
			case (this.pauses[3]<195):
				chat.innerHTML="";
				this.pauses[3]++;
				break;
			case (this.pauses[3]<235):
				Andrews.speak("console","One second folks. Isaac, what're you saying?");
				this.pauses[3]++;
				break;
			case (this.pauses[3]<240):
				chat.innerHTML="";
				this.pauses[3]++;
				break;
			case (this.pauses[3]<280):		
				chat.innerHTML="[Isaac] Don't trouble 'bout no two han's boss. get yo' own han'.";
				this.pauses[3]++;
				break;
			case (this.pauses[3]<285):
				chat.innerHTML="";
				this.pauses[3]++;
				break;
			case (this.pauses[3]<325):
				chat.innerHTML="[Isaac] De suckah, he'll get a han' all right, suah!";
				this.pauses[3]++;
				break;
			case (this.pauses[3]<330):
				chat.innerHTML="";
				this.pauses[3]++;
				break;
			case (this.pauses[3]<365):
				bgimg.style.visibility="hidden";
				fgtalk.style.visibility="visible";
				fgimg.style.visibility="visible";
				Andrews.setPos("15px","-50px;");
				fgimg.src=Andrews.avatar;
				Andrews.speak("bubble-left","Back. Alright, let's play cards!");
				chat.style.textAlign="center";
				chat.innerHTML="[Game Continues]";
				riff.play();
				this.pauses[3]++;
				break;
			case (this.pauses[3]<395):
				Andrews.speak("bubble-left","You guys know the drill.");
				this.pauses[3]++;
				break;
			case (this.pauses[3]<430):
				riff.pause();
				deal.play();
				Andrews.speak("bubble-left","Ante up fellas.");
				deal.play();
				cards.innerHTML="";
				this.pauses[3]++;
				break;
			default:
				this.patters.shift;
				pub.pause();
				this.pauses.push(0);
				promptUser();
		}
	}
	////////////// SCENE 4 //////////////
	scene4(){
		switch(true){	
			case (this.pauses[4]<15):
				hideMessage();
				fgimg.style.visibility="hidden";
				fgtalk.style.visibility="hidden";
				bgimg.style.visibility="hidden";
				keyboard.style.display="none";
				bgimg.src=pokerStandOff.src;
				fgimg.src=Andrews.avatar;
				Andrews.setScale();
				Andrews.setPos("15px","-50px;");
				this.pauses[4]++;
				break;
			case (this.pauses[4]<40):
				bgimg.style.visibility="visible";
				this.pauses[4]++;
				break;
			case (this.pauses[4]<45):
				chat.innerHTML="";
				this.pauses[4]++;
				break;
			case (this.pauses[4]<90):
				let patter=this.getPatter();	
				fgimg.style.visibility="visible";
				fgtalk.style.visibility="visible";
				bgimg.style.visibility="hidden";
				pub.volume=0.25;
				pub.loop=true;
				pub.play();
				Andrews.speak("bubble-left",patter);
				chat.innerHTML="[Andrews]";
				this.pauses[4]++;
				break;
			case (this.pauses[4]<95):
				chat.innerHTML="";
				this.pauses[4]++;
				break;
			case (this.pauses[4]<135):
				Isabel.setPos("-535px","-70px");
				fgimg.src=Isabel.avatar;	
				Isabel.speak("bubble-right","I only go home with winners, kid.");
				this.pauses[4]++;
				break;
			case (this.pauses[4]<175):
				Andrews.setPos("15px","-50px;");
				fgimg.src=Andrews.avatar;
				Andrews.speak("bubble-left","Alright. Boys, money on the table, no go to the pockets.");
				riff.play();
				chat.innerHTML="";
				this.pauses[4]++;	
				break;
			case (this.pauses[4]<195):
				chat.innerHTML="[Shuffling]";
				this.pauses[4]++;	
				break;
			case (this.pauses[4]<235):
				bgimg.style.visibility="visible";
				fgimg.style.visibility="hidden";
				fgtalk.style.visibility="hidden";
				riff.loop=true;
				Shuffle.img.src=riffle.src;
				Shuffle.setScale();
				Shuffle.setDimensions("80px","100px");
				Shuffle.setPos("280px","135px");
				bgimg.src=Shuffle.img.src;	
				this.pauses[4]++;
				break;
			case (this.pauses[4]<240):
				bgimg.style.visibility="hidden";
				this.pauses[4]++;
				break;
			case (this.pauses[4]<280):
				bgimg.style.visibility="visible";
				Shuffle.setDimensions("80px","100px");
				Shuffle.img.src=spring.src;
				bgimg.src=Shuffle.img.src;
				this.pauses[4]++;
				break;
			case (this.pauses[4]<285):
				chat.innerHTML="";
				this.pauses[4]++;
				break;
			case (this.pauses[4]<290):
				Table.setDimensions("260px","110px");
				Table.setPos("170px","130px");
				Table.setScale();
				bgimg.src=emptyTable.src;
				riff.pause();
				deal.play();		
				this.pauses[4]++;
				break;
			case (this.pauses[4]<330):
				Andrews.speak("console","Ante Up.");
				fgimg.src=Chips.img.src;
				fgimg.style.visibility="visible";
				cards.innerHTML="";
				this.pauses[4]++;
				break;
			default:
				this.patters.shift;
				pub.pause();
				this.pauses.push(0);
				promptUser();
		}
	}
	////////////// SCENE 5 //////////////
	scene5(){
		switch(true){
			case (this.pauses[5]<35):
				keyboard.style.display="none";
				fgimg.src=Andrews.avatar;
				Andrews.setScale();
				Andrews.setPos("15px","-50px;");
				chat.innerHTML="";
				this.pauses[5]++;
				break;
			case (this.pauses[5]<95):
				let patter=this.getPatter();	
				hideMessage();
				fgimg.style.visibility="visible";
				fgtalk.style.visibility="visible";
				bgimg.style.visibility="hidden";
				pub.volume=0.25;
				pub.loop=true;
				pub.play();
				Andrews.speak("bubble-left",patter);
				chat.innerHTML="[Andrews]";
				riff.play();
				riff.loop=true;
				this.pauses[5]++;
				break;
			case (this.pauses[5]<100):
				chat.innerHTML="";
				this.pauses[5]++;
				break;
			case (this.pauses[5]<130):
				fgimg.style.visibility="hidden";
				fgtalk.style.visibility="hidden";
				bgimg.style.visibility="visible";
				Shuffle.setScale();
				Shuffle.setDimensions("80px","100px");
				Shuffle.setPos("280px","135px");
				Shuffle.img.src=riffle.src;
				bgimg.src=Shuffle.img.src;	
				chat.innerHTML="[Shuffling]";
				this.pauses[5]++;	
				break;
			case (this.pauses[5]<145):
				Table.setDimensions("260px","110px");
				Table.setPos("170px","130px");
				Table.setScale();
				bgimg.src=emptyTable.src;
				chat.innerHTML="";
				riff.pause();
				deal.play();	
				this.pauses[5]++;
				break;
			case (this.pauses[5]<220):
				Ned.speak("console","Say, you're dealing off the bottom!");	
				cards.innerHTML="";
				this.pauses[5]++;
				break;
			case (this.pauses[5]<225):
				chat.innerHTML="";
				this.pauses[5]++;
				break;
			case (this.pauses[5]<265):
				Andrews.speak("console","So what! It's my deal, isn't it?");
				this.pauses[5]++;
				break;
			case (this.pauses[5]<270):
				chat.innerHTML="";
				this.pauses[5]++;
				break;
			case (this.pauses[5]<300):
				Andrews.speak("console","Alright, boys. Ante up.");
				fgimg.src=Chips.img.src;
				fgimg.style.visibility="visible";
				this.pauses[5]++;
				break;
			default:
				this.patters.shift;
				pub.pause();
				this.pauses.push(0);
				promptUser();
		}
	}
	////////////// SCENE 0 - Final //////////////
	scene0(){
		switch(true){
			case (this.pauses[0]<5):
				hideMessage();
				bgimg.style.visibility="hidden";
				fgimg.style.visibility="hidden";
				fgtalk.style.visibility="hidden";
				this.pauses[0]++;
				break;
			case (this.pauses[0]<35):
				container.style.backgroundColor="white";
				bgimg.style.height="110px";
				bgimg.style.width="90px";
				bgimg.src=gunOut.src;
				Andrews.speak("console","Hey! You didn't take those off the top!");
				suspense.play();
				chat.style.textAlign="left";
				this.pauses[0]++;
				break;
			case (this.pauses[0]<40):
				chat.innerHTML="";
				this.pauses[0]++;
				break;
			case (this.pauses[0]<115):
				bgimg.style.visibility="visible";
				heartbeat.play();
				Andrews.speak("console",`Now, I'mma put some lead in you!`);
				this.pauses[0]++;
				break;
			case (this.pauses[0]<120):
				chat.innerHTML="";
				fgimg.src=Ned.avatar;
				Ned.setPos("0px","-120px");
				Ned.setScale();
				this.pauses[0]++;
				break;
			case (this.pauses[0]<165):
				chat.innerHTML="[Isaac] He cheated boss, he cheated. I seens it alright!";
				this.pauses[0]++;
				break;
			case (this.pauses[0]<195):
				bgimg.style.visibility="hidden";
				fgimg.style.visibility="visible";
				fgtalk.style.visibility="visible";
				container.style.backgroundColor="black";
				Ned.speak("bubble-left",'Hey, hold on! Andrews, what about the "lucky card" rule?');
				chat.style.textAlign="center";
				chat.innerHTML="[Lucky Card]";
				this.pauses[0]++;
				break;
			case (this.pauses[0]<225):
				Ned.speak("bubble-left","<br>Check the sign!<br><br>");
				this.pauses[0]++;
				break;
			case (this.pauses[0]<275):
				fgimg.style.visibility="hidden";
				fgtalk.style.visibility="hidden";
				bgimg.style.visibility="visible";
				cardOnSign.innerHTML=`${holecard}`;
				bgimg.style.zIndex="0";
				cardOnSign.style.zIndex="4";
				cardOnSign.style.display="block";
				Sign.setScale();
				Sign.setDimensions("100px","110px");
				Sign.setPos("250px","115px");
				bgimg.src=Sign.img.src;
				this.pauses[0]++;
				break;
			case (this.pauses[0]<280):
				chat.innerHTML="";
				this.pauses[0]++;
				break;
			case (this.pauses[0]<320):
				cardOnSign.style.display="none";
				bgimg.style.height="110px";
				bgimg.style.width="90px";
				bgimg.src=gunOut.src;
				container.style.backgroundColor="white";
				Andrews.speak("console","Arggggh!!! I'll have to honor that!");
				this.pauses[0]++;
				break;
			case (this.pauses[0]<325):
				chat.innerHTML="";
				this.pauses[0]++;
				break;
			case (this.pauses[0]<365):
				Andrews.speak("console","Now, there's only one way to deal with this...");
				this.pauses[0]++;
				break;
			case (this.pauses[0]<370):
				bgimg.style.visibility="hidden";
				chat.innerHTML="";
				this.pauses[0]++;
				break;
			case (this.pauses[0]<390):	
				bang.play();
				container.style.backgroundColor="orange";
				cardOnSign.style.fontSize="100px";
				cardOnSign.style.color="yellow";
				cardOnSign.style.top="50%";
				cardOnSign.style.transform="translate( -50%, -50% )";
				cardOnSign.innerHTML="BANG!"; //using cardOnSign for display text
				cardOnSign.style.display="block";
				chat.innerHTML="[Shoots Ned]";
				this.pauses[0]++;
				break;
			case (this.pauses[0]<425):
				cardOnSign.style.display="none";
				container.style.backgroundColor="black";
				this.pauses[0]++;
				break;
			case (this.pauses[0]<505):
				bgimg.style.visibility="hidden";
				introOutro.play();	
				chat.innerHTML="[Game Over]";
				cards.innerHTML="";
				this.pauses[0]++;
				break;
			default:
				scene=9999;
				promptUser();
		}
	}

}
