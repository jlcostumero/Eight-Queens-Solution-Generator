
		var personal = [];
		
		function init() {
			var number = document.getElementById("quantity").value;
			if(!isNumber(number)){
				alert("Wrong dimension");
				return;
			}
			if(number < 5){
				alert("Board must be bigger than 5X5");
				return;
			}
			var t0 = performance.now();
			var complete = false;
			for (mode1 = 1; mode1 <= 3; mode1++) {
				for (mode2 = 1; mode2 <= 4; mode2++) {
					if(generate(mode1, mode2)){
						complete = true;
						break;
					}
				 }
				 if(complete){
					break;
				}
			}
			var t1 = performance.now();
			document.getElementById("quantity").value = document.getElementById("quantity").value/1 + 1;
			if(complete){
				document.getElementById("message").innerHTML = '<font face="verdana" >Time: ' + msToTime(t1 - t0) + '</font>';
			}
		}
		
		function generate(mode1, mode2) {
			debug = false;
			var board = {};
			var number = document.getElementById("quantity").value;
			var size = document.getElementById("sizes").value;
			var queenImage = document.getElementById("imageQueen").value;
			var step = 0;
			var x = number;
			var y = number;
			var posy = 0;
			var posx = 0;
			
			if(mode1 == 1){
				posx = x / 2 - Math.round(x / 4) + 1;
				//posx = posx+1;
				if (isOdd(posx)) {
					posx = Math.round(posx) - 1;
				}
				setQueensFase1();
				posx = x - 1;
				posy = posy - 3;
				setQueensFase1();
			}else{
				posx = Math.round(x/2) - 1;
				if (isOdd(posx)) {
					posx = Math.round(posx) - 1;
				}
				setQueensFase1();
				posx = x - 2;
				posy = 1;
				if(mode1 == 3){
					setQueensFase1();
					posx = x - 1;
					posy = y - 1;
					board[posx + ":" + posy] = " R ";
				}
			}

			for (var i = 0; i < personal.length; i++) {
				board[personal[i]] = " R ";
			}
		
			for (i = 0; i < x; i++) {
				for (j = 0; j < y; j++) {
					if (board[i + ":" + j] == " R ") {
						markdiagonal(i, j);
						mark(i, j);
					}
				}
			}
			
			if(!debug){
				setQueensFase2(mode2);
			}else{
				var count = 0;
				var e = "";

				for (i = 0; i < x; i++) {
					for (j = 0; j < y; j++) {

						  if(board[i+":"+j] == " _ "){
							var casos = countdiagonal(i,j);
							casos = count(i,j);
							board[":"+i+":"+j] = " " + casos + " ";
						 } 
					 }
				}
			}


			var countQueens = 0;
			for (i = 0; i < x; i++) {
				for (j = 0; j < y; j++) {
					if (board[i + ":" + j] == " R ") {
						countQueens++;
					}
				}
			}

			var boardString = "";
			var charBoardString = "";
			count = 0;
			boardString = boardString + " <table border='1'>";
			for (i = 0; i < x; i++) {
				boardString = boardString + " <tr>";
				for (j = 0; j < y; j++) {
					var valor = "";
					if (board[":" + i + ":" + j] != null) {
						valor = board[":" + i + ":" + j]
					} else {
						valor = board[i + ":" + j].replace("'", '');
					}
					if (valor == " R ") {
						var isChrome = !!window.chrome && !!window.chrome.webstore;
						if(isChrome){
							valor = "<img  style='fill: #FFF;' width='" + size + "' height='" + size + "'  src='data:image/svg+xml;utf8," + queenImage.trim() + "' >";
						}else{
							valor = '<img width="' + size + '" height="' + size + '" alt="qlt" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chess_qlt45.svg/45px-Chess_qlt45.svg.png"   >';
						}
					}
					var bgcolor = "";
					var font = "";
					var position = '"' + i + ':' + j + '"';


					if ((count % 2 == 0 && i % 2 == 0) || (count % 2 != 0 && i % 2 != 0)) {
						bgcolor = "bgcolor='#444444'";
						font = "<font face='verdana' color='#FFFFFF'>" + valor.replace("stroke:#000000","stroke:#FFFFFF").replace("fill:#ffffff;","fill:#444444;") + "</font>";
					} else {
						bgcolor = "bgcolor='#E1E1E1'";
						font = "<font face='verdana' color='#000000'>" + valor + "</font>";
					}
					count++;
					if (count == y) count = 0;
					var addQueen = "";
					if(debug){
						addQueen = "onclick='putQueen(" + position + ");init();'";
					}
					boardString = boardString + "<td " + addQueen + " " + bgcolor + ">" + font + "</td>";
					charBoardString = charBoardString + valor;
				}
				boardString = boardString + " </tr> ";
				charBoardString = charBoardString + "<br>";
			}
			boardString = boardString + " </table>";
			document.getElementById("txtHead2").innerHTML = '<font face="verdana" >' + number + "X" + number + '</font>';
			document.getElementById("board").innerHTML = boardString;
			//document.getElementsByTagName('h2')[0].innerHTML = '<font face="verdana" >' +  charBoardString + '</font>'
			
			if(number == countQueens){
				return true;
			}else{
				return false;
			}

			function setQueensFase1(){
				for (i = 0; i < x; i++) {
					for (j = 0; j < y; j++) {
						if (posx == j && posy == i) {
							board[i + ":" + j] = " R ";
							posy = posy + 2;
							posx = posx - 1;
						} else if (board[i + ":" + j] != " R ") {
							board[i + ":" + j] = " _ ";
						}
					}
				}
			}
			
			function setQueensFase11(){
				var alternate = true;
				var ended = false;
				for (i = 0; i < x; i++) {
					for (j = 0; j < y; j++) {
						if (posx == j && posy == i) {
							var jj = posx;
							if(alternate && !ended){
								jj = posx - 1;
							}else if(!ended){
								jj = posx + 1;
								ended = true;
							}
							board[i + ":" + jj] = " R ";
							posy = posy + 2;
							posx = posx - 1;
							alternate = !alternate;
						} 
					}
				}
			}
			
			
			function setQueensFase2(mode){
				if(mode ==1){
					for (i = 0; i < x; i++) {
						for (j = y - 1; j >= 0; j--) {
							if (board[i + ":" + j] == " _ ") {
								board[i + ":" + j] = " R ";
								markdiagonal(i, j);
								mark(i, j);
								break;
							}
						}
					}
				}else if(mode ==2){
					for (i = x - 1; i >= 0; i--) {
						for (j = 0; j < y; j++) {
							if (board[i + ":" + j] == " _ ") {
								board[i + ":" + j] = " R ";
								markdiagonal(i, j);
								mark(i, j);
								break;
							}
						}
					}
				}else if(mode ==3){
					for (i = x - 1; i >= 0; i--) {
						for (j = y - 1; j >= 0; j--) {
							if (board[i + ":" + j] == " _ ") {
								board[i + ":" + j] = " R ";
								markdiagonal(i, j);
								mark(i, j);
								break;
							}
						}
					}
				}else if(mode ==4){
					for (i = 0; i < x; i++) {
						for (j = 0; j < y; j++) {
							if (board[i + ":" + j] == " _ ") {
								board[i + ":" + j] = " R ";
								markdiagonal(i, j);
								mark(i, j);
								break;
							}
						}
					}
				}
			}
			
			function isOdd(num) {
				return num % 2;
			}

			function mark(i, j) {
				for (ii = 0; ii < x; ii++) {
					if (board[ii + ":" + j] != " R ") {
						board[ii + ":" + j] = " ' "
					}
				}
				for (jj = 0; jj < y; jj++) {
					if (board[i + ":" + jj] != " R ") {
						board[i + ":" + jj] = " ' "
					}
				}
			}

			function markdiagonal(i, j) {
				var pos = 0;
				for (ii = i - j; ii < x; ii++) {
					if (board[ii + ":" + pos] != " R ") {
						board[ii + ":" + pos] = " ' "
					}
					pos++;
				}
				pos = 0;
				for (ii = i + j; ii >= 0; ii--) {
					if (board[ii + ":" + pos] != " R ") {
						board[ii + ":" + pos] = " ' "
					}
					pos++;
				}
			}

			function count(i, j) {
				var count = 0;
				for (ii = 0; ii < x; ii++) {
					if (board[ii + ":" + j] == " _ " && (ii != i)) {
						count++;
					}
				}
				for (jj = 0; jj < y; jj++) {
					if (board[i + ":" + jj] == " _ " && (jj != j)) {
						count++;
					}
				}
				return count;
			}

			function countdiagonal(i, j) {
				var count = 0;
				var pos = 0;
				for (ii = i - j; ii < x; ii++) {
					if (board[ii + ":" + pos] == " _ " && (ii != i)) {
						count++;
					}
					pos++;
				}
				pos = 0;
				for (ii = i + j; ii >= 0; ii--) {
					if (board[ii + ":" + pos] == " _ " && (ii != i)) {
						count++;
					}
					pos++;
				}
				return count;
			}
			
		}
		
		function msToTime(duration) {
			var milliseconds = parseInt((duration % 1000)),
				seconds = parseInt((duration / 1000) % 60),
				minutes = parseInt((duration / (1000 * 60)) % 60),
				hours = parseInt((duration / (1000 * 60 * 60)) % 24);

			hours = (hours < 10) ? "0" + hours : hours;
			minutes = (minutes < 10) ? "0" + minutes : minutes;
			seconds = (seconds < 10) ? "0" + seconds : seconds;
			var time = hours + ":" + minutes + ":" + seconds + "." + milliseconds
			return time.replace("00:00:", "00:");
		}
	
		function putQueen(position){
			for (var i = 0; i < personal.length; i++) {
				if(personal[i] == position){
					personal.splice(i, 1);
					return;
				}
			}
			personal.push(position);
		}
		
		function isNumber(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}
