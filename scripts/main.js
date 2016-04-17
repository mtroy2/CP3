
function updatePic(args)
{
	
	var xhr = new XMLHttpRequest();
	xhr.open("GET","http://student02.cse.nd.edu:40001/recommendations/9",true);
	xhr.onload = function(e){
		if (xhr.readyState == 4){
			var j = JSON.parse(xhr.responseText);

			var movieRequest = new XMLHttpRequest();
			var path = "http://student02.cse.nd.edu:40001/movies/";
			path = path + j.movie_id;
			console.log("currentMovie = " + currentMovie);
			currentMovie = j.movie_id;
			console.log ("changed to " + currentMovie);
			movieRequest.open("GET",path,true);
			movieRequest.onload = function(f){
				
				if (movieRequest.readyState == 4){
					var k = JSON.parse(movieRequest.responseText);
					args[0].setText(k.title);
					args[1].src="http://www.cse.nd.edu/~cmc/teaching/cse30332_sp16/images" + k.img;
	
					var ratingRequest = new XMLHttpRequest();
					var ratingPath = "http://student02.cse.nd.edu:40001/ratings/" + j.movie_id;
					ratingRequest.open("GET",ratingPath, true);
					ratingRequest.onload = function(g){
						var m = JSON.parse(ratingRequest.responseText);
						if (ratingRequest.readyState == 4){
							args[2].setText(m.rating);
							
				
						}
						else{
							console.log("not ready");
						}
					
					};
					ratingRequest.onerror = function(g){
						console.error(ratingRequest.statusText);
					}
					ratingRequest.send();


				}
			};
			movieRequest.onerror = function(f){
				console.error(movieRequest.statusText);
			}
			movieRequest.send();

		}
	};
	xhr.onerror = function(e){
		console.error(xhr.statusText);
	};
	xhr.send()
	
};
function vote(args)
{
	console.log("in vote, movie = "+currentMovie);
	// make put request
	var putRequest = new XMLHttpRequest();
	var votePath = "http://student02.cse.nd.edu:40001/recommendations/9";
	putRequest.open("PUT","http://student02.cse.nd.edu:40001/recommendations/9", true);
	// make arg string, concatenated w/ currently selected value from drop down menu
	var arg = '{"apikey":"2VfPZprkY8","movie_id":"' + currentMovie + '","rating":"' + args[0] + '"}';
	// run when put finishes
	console.log("Arguments = " + arg );
	putRequest.onload = function(e){
		updatePic(args[1]);
	};
	putRequest.onerror = function(e){
		console.error(putRequest.statusText);

	};
	putRequest.send(arg);
	
;

}
var currentMovie = 0;
Label.prototype = new Item();

movieText = new Label();
movieText.createLabel("Which movie?", "theLabel");


Button.prototype = new Item();

upvote = new Button();
upvote.createButton("Upvote", "upButton");

downvote = new Button();
downvote.createButton("Downvote", "downButton");


ratingLabel = new Label();
ratingLabel.createLabel("Rating", "ratingLabel");



var img = document.createElement("img");

var picArg = [movieText,img,ratingLabel];
updatePic(picArg);
console.log(currentMovie);
downArgs = ["0", picArg];
upArgs = ["5",picArg];
downvote.addClickEventHandler(vote, downArgs);
upvote.addClickEventHandler(vote,upArgs);


Div.prototype = new Item();
mainDiv = new Div();
rightDiv = new Div();
middleDiv = new Div();
leftDiv = new Div();




mainDiv.createDiv("mainDiv");
rightDiv.createDiv("rightDiv");
middleDiv.createDiv("middleDiv");
leftDiv.createDiv("leftDiv");


rightDiv.setClass("rightDiv");
middleDiv.setClass("middleDiv");
leftDiv.setClass("leftDiv");

leftDiv.addChild(upvote.item);
rightDiv.addChild(downvote.item);
middleDiv.addChild(ratingLabel.item);


//img.src ="http://www.cse.nd.edu/~cmc/teaching/cse30332_sp16/images/agy8DheVu5zpQFbXfAdvYivF2FU.jpg";

middleDiv.addChild(movieText.item);
middleDiv.addChild(img);
middleDiv.addChild(ratingLabel.item);

mainDiv.addChild(leftDiv.item);
mainDiv.addChild(middleDiv.item);
mainDiv.addChild(rightDiv.item);
//mainDiv.addToDocument();
document.body.appendChild(mainDiv.item);

