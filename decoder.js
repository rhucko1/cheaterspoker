
	/***************************************************************************
	Copyright 2022 The Disclaimer Magazine 
	Website: https://ko-fi.com/thedisclaimer

	Based on Al Stanger’s Miracle Poker Machine by Al Stanger, John Mendoza, Gaetan Bloom

	4 Card Coding method used here is Derrick Chung's brilliant idea. In his method it allows any 4 cards to key a 5th card using a Low/Med/High sequence and setting
	the position of the highest card in the set to represent the suit; however, if the 5th card was 7 or above, at least one card would be reversed to indicate that 
	and represent a 0 (the other face up cards used as 1 values) then used binary (Octal) to determine value.
	Keeping the same concept for A-6, but setting a high mode to differentitate and using same LMH method for high cards works, but leaves out 1 value (King) which will
	be represented with a different king mode (assuming value is a king). 
				 
	High mode may also be obtained by representing the high card as a capital 'X' when providing input as a positional placeholder.
	
	(note: does not conform to the original Fitch Cheney problem, but works nicely in practice).

	Optional 5 Card Coding method is Alex Elmsley's from The Looking Glass Winter 1998 (Coding By Permutation) p. 161
	This allows one method for representing a 6th card of any value/suit. Very nice but doesn't conform to a 5 card stud theme, if that is important to you. 
	If a fictional game of Texas Holdem with one hole card or 6 card stud is presented, this way works nicely. 

	Ideas by Derrick Chung, Curtis Kam, Richard Hucko, Al Stanger, John Mendoza, Gaetan Bloom, Alex Elmsley
	Author: Richard Hucko
	***************************************************************************/
	const LMH={
					"LMH":"A",
					"LHM":"2",
					"MLH":"3",
					"MHL":"4",
					"HLM":"5",
					"HML":"6",
				}, //LMH used for A-6 in 4 card encoding
			values=[
					["A","2","3","4","5"],
					["6","7","8","9","10"],
					["J","Q","K"],
				], //values arranged positionally for 5 card encoding
				suits=[
						{letter:"S", icon:"&spades;", value:'0'},
						{letter:"H", icon:"&hearts;", value:'13'},
						{letter:"C", icon:"&clubs;", value:'26'},
						{letter:"D", icon:"&diams;", value:'39'},
				];	
	let hand=[
						{letter:"AS", icon:"A&spades;", value:'1'},
						{letter:"AH", icon:"A&hearts;", value:'14'},
						{letter:"AC", icon:"A&clubs;", value:'27'},
						{letter:"AD", icon:"A&diams;", value:'40'},
						{letter:"JS", icon:"J&spades;", value:'11'},
				],
				temphand=[], //used to initially set hand (and for simple checks later)
				forcehands=[[],[]], //0 = first hand in round with 4 cards, 1 = first hand in round with 5 cards
				holecard="", //player's hole card (decoding result or overriden result)
				highest, //highest card (used in 4 card coding where index denotes suit)
				mode="low", //toggle mode in 4 card coding low/high/king to cover Low: (A-6), High: (7-Q), King: K
				code=""; /* 
				 4 Card Encoding Format
				 ------------------------
					(A-6)	mode: low, format: LMH
					(7-Q) mode: high, format: LMH (add 6 when decoding)
					K mode: king, format: N/A

				 5 Card Encoding Format
				 ------------------------
				 format: p/s/g	(p=position (for value in column), s=suit (position), g=group (row)

				 since arrays are 0-index based, may need to subtract 1 to each before referencing

				 range for p is 1-5 (or 0-4 in array)
				 range for s is 1-4 (or 0-3 in array)
				 range for g is 1-3 (or 0-2 in array)

				 2/3/2 (-1 for all) = 1/2/1 = 7C

				 In array, p and g are referenced together to get value
				 ex. for 7, values[1][1]=7

				 For suit (s), reference index then either .icon or .letter
				 ex. for Clubs, suits[2].letter=C		- OR -	 suits[2].icon=&clubs;

				 suits[i].value is used for sorting (value is added to card value to determine if higher or lower). This is used to sort with suits and allows uniquely identifying each card.
				 */
		const elem2index=(elem)=>parseInt(elem)-1;
		const getSuit=(card)=>card.slice(-1).toUpperCase();
		const getValue=(card)=>{
			let v=parseInt(card)?parseInt(card):card.substring(0,1).toUpperCase(); //value initial (if parseInt fails it means it's not a number value but has a single letter value (ex. J, Q, K, A))
			return v;	
		}
		const compare=(a,b)=>{
			a=parseInt(a);
			b=parseInt(b);
			if(a===b)
				return "eq";
			else if(a<b)
				return "lt";
			else if(a>b)
				return "gt";
			else
				return -1;
		}
		const cardCompare=(card1,card2)=>{
			//requires hand[i].value to be set (ex. run setHand())
			//2 args to compare ex. hand[0], hand[1]
			//assumes hand[i].value is unique value ID so no dups (ID based on card val + suit val)
			card1=parseInt(card1.value);
			card2=parseInt(card2.value);
			if(card1<card2)
				return "lt";
			else if(card1>card2)
				return "gt";
			else
				return -1;			
		}
		const isLMH=(str)=>{
			//assumes compare() or cardCompare() have been called successfully twice previously with results appended ("eq" values converted to "lt" or "gt")
			str=String(str);
			if(str.match(/(?:lt){2}/))
				return "L";
			else if(str.match(/(?:gt){2}/))
				return "H";
			else if(str.match(/(?:ltgt|gtlt)/))
				return "M";
			else
				return -1;
		}
		const getSuitID=(index)=>suits[index].value;
		const getCardID=(value,suit)=>{
			//value obtained by either: values[i][i] or from getValue(card)
			//suit is index of suit 0-3
			//returns card ID number to uniquely represent card in deck (ordering lowest to highest based on suit and value)
			const v=getValueID(value),
					s=getSuitID(suit);
			return parseInt(v)+parseInt(s);
		}
		const getValueID=(value)=>{
			//value ID is the numeric representation of card's value (ex. A=1, 2...10, J=11, Q=12, K=13)
			let v=parseInt(value)?parseInt(value):value.substring(0,1).toUpperCase(); //value initial (if parseInt fails it means it's not a number value but has a single letter value (ex. J, Q, K, A))
				switch(v){
					case 'A':
							v='1';
							break;
					case 'J':
							v='11';
							break;
					case 'Q':
							v='12';
							break;
					case 'K':
							v='13';
							break;
					default:
							v=v;
				}
				return v;
		}
		const getCardVal=(v)=>{
			//takes numeric card value and converts back to card value
			switch(v){
					case '1':
							v='A';
							break;
					case '11':
							v='J';
							break;
					case '12':
							v='Q';
							break;
					case '13':
							v='K';
							break;
					default:
							v=v;
				}
				return v;
		}
		const getHighCardPos=()=>{
			//assumes both temphand is set (use setTempHand(...)) and hand is set (use setHand())
			let tempvals=[],
					highcard,
					dupvals=[]; //array of dup ID vals

			//check for placeholder x
			if(temphand.indexOf("X")!=-1){
				mode="high";
				return temphand.indexOf("X");
			}

			// get values from temphand
			for(let v of temphand)
				tempvals.push(getValueID(v));

			tempvals.sort(function(a, b){return b-a}); //sort tempvals highest to lowest (tempvals[0] is the highest value)
			highcard=tempvals[0];
	
			if(tempvals[0]>tempvals[1]){	//no high card dups
				for(let i in temphand)
					if(getValueID(temphand[i])==highcard)
						return i;	
			}else{ //high card dups
				for(let i in temphand)
					if(getValueID(temphand[i])==highcard)
						dupvals.push(hand[i].value);
				dupvals.sort(function(a, b){return b-a}); //sort dupvals highest to lowest (dupvals[0] is the highest value)
				for(let i in temphand)
					for(let s in suits)
						if(suits[s].letter===getSuit(temphand[i]))
							if(compare(getCardID(getValue(temphand[i]),s),dupvals[0])=="eq")
								return i;
			}
		}	
		function setTempHand(){
			//vairable # arguments accepted
			//if one arg supplied, create array splitting on space/comma combinations
			temphand=[]; //reset temphand
			if(arguments.length==1)
				arguments=arguments[0].split(/[ ,]+/);
			for(let arg of arguments)
				temphand.push(arg);	
		}
		const setHand=()=>{
			//temphand must be set from setTempHand("...") prior to this function call
			//if(temphand.length!=5)
			//	return -1;
			if(temphand.length==4 && hand.length==5)
				hand.pop();
			if(temphand.length==5 && hand.length==4)
				hand.push({letter:"JS", icon:"J&spades;", value:'11'}); //add a placeholder

			hand.forEach(function(v,k){
				//set letter, icon, and value for each card
				let value=getValue(temphand[k]),
						suit=getSuit(temphand[k]);
				hand[k].letter=temphand[k]; //letter
				for(let i in suits){
					if(getSuit(suits[i].letter)===suit){
						hand[k].icon=value+suits[i].icon; //icon
						hand[k].value=getCardID(value,i); //value
					}
				}
			});
		}
		const encode=()=>{
			//set code (format: p/s/g)
			//assumes hand is set via setHand()
			code=""; //reset code

			if(temphand.length==5){
				//Alex Elmsley method 5 card encoding
					let cnt=0;
					for(let i=0;i<3;i++){
						for(let j=i;j<hand.length;j++)
							if(hand[j].value<hand[i].value)
								cnt++;
							code+=cnt+"/";
							cnt=0;
					}
					code=code.slice(0,-1); //strip trailing /
			}else if(temphand.length==4){
				//Derrick Chung method 4 card encoding
				let cursor=[], //lt/gt values array
						temparray=[], //used for determining card value (won't include highcard from temparray)
						handclone=hand.map(a => {return {...a}}); //clone hand
				if(hand.length==5)
					hand.pop(); //remove placeholder card

				//get High Card position and remove from handclone (also don't include in temparray)
				highest=getHighCardPos();	
				for(let i in temphand){
					if(i!=highest)
						temparray.push(temphand[i]);
					else
						handclone.splice(i,1);
				}

				//determine lt/gt values and add to cursor array
				for(let i in temparray){
					let result;
					cursor.push("");
					for(let j in temparray){
					 if(i!=j){
							result=compare(getValueID(temparray[i]),getValueID(temparray[j]));
							if(result!="eq")
								cursor[i]+=result; //console.log(`${i} = ${arr[i]}; ${j} = ${arr[j]}`);		
							else
								cursor[i]+=cardCompare(handclone[i],handclone[j]);
						}
					}
				}
				//assign LMH values to code
				for(let v of cursor)
					code+=isLMH(v);
			}
		}
		const decode=()=>{
			//requires code to be set (call encode() first)
			let codetemp;
			if(code==="")
				return -1;
			if(hand.length==5){
				let codetemp=code.split("/");
				if(codetemp.length!=3)
					return -2;
				return values[codetemp[2]][codetemp[0]]+suits[codetemp[1]].letter;
			}else if(hand.length==4){
				if(code.length!=3)
					return -2;
				switch(mode){
					case 'low':
								return LMH[code]+suits[highest].letter;	
								break;
					case 'high':
								const offset=6;
								return getCardVal(String(parseInt(getValueID(LMH[code]))+parseInt(offset)))+suits[highest].letter;
								break;
					case 'king':
								return "K"+suits[highest].letter;
								break;
					default:
								return -3;
				}
			}
		}
			///////////////////// Additional Functions /////////////////////

		const isRed=(card)=>{
			if((getSuit(card)=="C") || (getSuit(card)=="S"))
				return false;
			else
				return true;
		}

		const getSuitSymbol=(suit)=>{
			//pass suit letter (after calling getSuit(card) prior)
			for(let i in suits)
				if(suits[i].letter==suit)
					return suits[i].icon;
		}

		const isFourOfAKind=()=>{
			//assumes temphand is set
			//check if 4 values are the same
			//used to check for kings but can be any four of a kind
			let tmp=[];
			for(let v of temphand)
				tmp.push(getValue(v));

			if([...new Set(tmp)].length==1 && temphand.length==4) //4 of the same in 4 card coding
				return true;

			if([...new Set(tmp)].length==2 && temphand.length==5) //4 of the same in 5 card coding
				return true;

			return false;
		}

