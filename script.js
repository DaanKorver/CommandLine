var dirLabel = document.getElementById("dirLabel");
var loc = window.location.pathname;
var dir = loc.substring(1, loc.lastIndexOf('/'));
var commandLine = document.getElementById("commandLine");
var before = document.getElementById("before");
var result = "";
var pararesult = "";
var latestCommand = "";
var allCommands = [];
dirLabel.innerHTML = "&#60;" + dir + "&#62;";
allCommands.push('HELP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You just did this command. Need more help?');
allCommands.push('COLOR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Changes the color of the text in the console');
allCommands.push('DIR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Checks the current directory');
allCommands.push('SHORTCUTS&nbsp;&nbsp;Shows all shortcuts');
allCommands.push('ECHO&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Echos a string');
allCommands.push('DATE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Echos the current date');
allCommands.push('TITLE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Changes the title of the document');
allCommands.push('COINFLIP&nbsp;&nbsp;&nbsp;Flips a coin');
allCommands.push('START&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Starts a new window of the command line');
allCommands.push('IPCONFIG&nbsp;&nbsp;&nbsp;Shows your local IP address');
allCommands.push('OPENURL&nbsp;&nbsp;&nbsp;&nbsp;Opens a URL');
getIP();

commandLine.addEventListener('keydown', (e)=>{
	if(e.keyCode == 13){
		read();
		clear();
	}
});

document.body.addEventListener('keydown', (e)=>{
	if(e.ctrlKey && e.keyCode == 67){
		clearLines();
	}
});

document.getElementById('commandLine').onblur = function (event) { 
	var blurEl = this; 
	setTimeout(function() {
		blurEl.focus()
	}, 10);
};

document.body.addEventListener('keydown', (e)=>{
	if(e.keyCode == 38 && !latestCommand == ""){
		commandLine.value = latestCommand;
		window.scrollBy(0, 200);
		commandLine.blur();
	}
});


function read() {
	var command = commandLine.value.split(" ");
	switch(command[0].toLowerCase()){
		case 'color':
			changeColor();
			break;
		case 'help':
			help();
			break;
		case 'dir':
			checkDir();
			break;
		case 'shortcuts':
			shortCuts();
			break;
		case 'echo':
			echo();
			break;
		case 'date':
			date();
			break;
		case 'title':
			setTitle();
			break;
		case 'coinflip':
			coinFlip();
			break;
		case 'start':
			start();
			break;
		case 'ipconfig':
			getIP();
			break;
		case 'openurl':
			openUrl();
			break;
		default:
			result = "'" + command[0] + "'" +  " is not recognized as an internal or external command, operable program or batch file";
	} 
	
	
}

function clear() {
	var para = document.createElement("P");
		para.innerHTML = "&#60;" + dir + "&#62;" + "  " + commandLine.value
		+ "<br>"
		+ result;
		before.appendChild(para);
		latestCommand = commandLine.value;
		commandLine.value = "";
		result = "";
		window.scrollBy(0, 300);
		getIP();
}


function changeColor() {
	var command = commandLine.value;
	var colorValue = "";
	var colorArray = command.split(" ");
	
	switch(colorArray[1]) {
		case '0':
			colorValue = 'black';
			break;
		case '1':
			colorValue = 'blue';
			break;
		case '2':
			colorValue = 'green';
			break;
		case '3':
			colorValue = 'aqua';
			break;
		case '4':
			colorValue = 'red';
			break;
		case '5':
			colorValue = 'purple';
			break;
		case '6':
			colorValue = 'yellow';
			break;
		case '7':
			colorValue = '#d8d8d8';
			break;
		case '8':
			colorValue = 'gray';
			break;
		case '9':
			colorValue = 'lightblue';
			break;
		case 'A':
			colorValue = 'lightgreen';
			break;
		case 'B':
			colorValue = '#bcd4e6';
			break;
		case 'C':
			colorValue = '#ff6666';
			break;
		case 'D':
			colorValue = '#9B30FF';
			break;
		case 'E':
			colorValue = '#FFFF66';
			break;
		case 'F':
			colorValue = 'white';
			break;
		case 'a':
			colorValue = 'lightgreen';
			break;
		case 'b':
			colorValue = '#bcd4e6';
			break;
		case 'c':
			colorValue = '#ff6666';
			break;
		case 'd':
			colorValue = '#9B30FF';
			break;
		case 'e':
			colorValue = '#FFFF66';
			break;
		case 'f':
			colorValue = 'white';
			break;
		default:
			if(colorArray[1] == undefined){
				colorArray[1] = "you can't set nothing. it ";
			}
			result = colorArray[1] + " isn't a color<br>"
			+"Sets the default console text color"
			+ "<br><br>"
			+ "COLOR [attr]"
			+ "<br><br>"
			+ "&nbsp;&nbsp;attr&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Specifies color attribute of console output"
			+ "<br><br>"
			+ "Color attributes are specified by TWO hex digits -- the first <br>"
			+ "corresponds to the background; the second the foreground.  Each digit <br>"
			+ "can be any of the following values:"
			+ "<br><br>"
			+ "    0 = Black&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8 = Gray<br>"
			+ "    1 = Blue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9 = Light Blue<br>"
			+ "    2 = Green&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A = Light Green<br>"
			+ "    3 = Aqua&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B = Light Aqua<br>"
			+ "    4 = Red&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C = Light Red<br>"
			+ "    5 = Purple&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D = Light Purple<br>"
			+ "    6 = Yellow&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E = Light Yellow<br>"
			+ "    7 = White&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F = Bright White<br>"
			+ "If no argument is given, this command restores the color to what it was<br>"
			+ "when Korv Command Line started.  This value either comes from the current console<br>"
			+ "window or from the color array where all the colors are stored"
	}
	if(colorValue == ""){

	} else {
		document.body.style.color = colorValue;
		commandLine.style.color = colorValue;
	}
}

function help() {
	result = "All commands: " + "<br>" + allCommands.join("<br>");
}

function checkDir() {
	result = "The current directory is: " + dir;
}

function shortCuts() {
	result = "Shortcuts:"
	+ "<br>"
	+ "CTRL+C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Clears all previous lines"
	+ "<br>"
	+ "ARROWUP&nbsp;&nbsp;&nbsp;&nbsp;Lets you fill your commandline with your most recent command";
}

function clearLines(){
	before.innerHTML = "";
}

function echo() {
	var message = commandLine.value.substring(4);
	result = message + "<br><br>";
}

function date() {
	var date = new Date();
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var currentDate = date.getDate() + '-' + months[date.getMonth()] + '-' + date.getFullYear();
	result = currentDate;
}

function setTitle() {
	var title = commandLine.value.substring(5);
	if(!title){
		result = 'No valid title value, try something else'
		+ "<br>"
		+ "Example: title Hello"
		+ "<br><br>";
	} else {
		document.title = title;
	}
}

function coinFlip() {
	var randomNumber = Math.floor(Math.random() * 100) + 1;
	console.log(randomNumber);
	if(randomNumber < 50){
		result = "Heads";
	} else {
		result = "Tails";
	}
}

function start() {
	var newWindow = window.open("index.html", "", "width=977, height=467");
	newWindow.focus();
	result = "";
}

function openUrl() {
	url = commandLine.value.substring(8); 
	console.log("url");
	var finalUrl = "";
	if(!url.includes("www.") && !url.includes(".com")){
		result = "Please enter a valid url"
		+ "<br>"
		+ "Example: openurl www.daankorver.com"
		+ "<br><br>";
	} else {
		if(!url.includes('http://')){
			finalUrl = 'http://' + url;
			var newTab = window.open(finalUrl, '_blank');
			newTab.focus();
			result = "";
		} else {
			finalUrl = url;
			var newTab = window.open(finalUrl, '_blank');
			newTab.focus();
			result = "";
		}
	}
}


//Credit goes to https://diafygi.github.io/webrtc-ips/
function getIP() {
	window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
	var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
	pc.createDataChannel('');//create a bogus data channel
	pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
	pc.onicecandidate = function(ice)
	{
	 if (ice && ice.candidate && ice.candidate.candidate)
	 {
		var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];  
		pc.onicecandidate = noop;
	 }
	 result = "Your local IP address is: " + myIP;	
	}
}


//Credit goes to https://stackoverflow.com/users/1029952/pierre
function iOS() {

  var iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()){ 
	  dirLabel.innerHTML = "IDevice: ~ localDevice$";
	  return true; }
    }
  }
	
	return false;
}






	 


	
        



