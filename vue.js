var app = new Vue({
	el: '#app',
	data: {
		active: 'indexMain',
		teamsNysl: nysl.teams,
		roundsNysl: nysl.rounds,

		pichichi: [nysl.teams[4].players[4], nysl.teams[3].players[4], nysl.teams[2].players[4], nysl.teams[1].players[4], nysl.teams[0].players[4], nysl.teams[4].players[3], nysl.teams[3].players[3], nysl.teams[2].players[3], nysl.teams[1].players[3], nysl.teams[0].players[3], nysl.teams[4].players[2], nysl.teams[3].players[2], nysl.teams[2].players[2], nysl.teams[1].players[2], nysl.teams[0].players[2], nysl.teams[4].players[1], nysl.teams[3].players[1], nysl.teams[2].players[1], nysl.teams[1].players[1], nysl.teams[0].players[1]],


		match: {},
		homeTeam: {},
		awayTeam: {},
		team: {},
		player: {},
pichi:[]






	},
	methods: {
		makeActive: function (item) {

			this.active = item;
		},

		//funcio per ordenar classif.

		teamSort: function (teamsNysl) {
			// Set slice() to avoid to generate an infinite loop!
			return teamsNysl.slice(teamsNysl).sort(function (a, b) {
				return b.points - a.points;
			});
		},

		
		
		
		
		//funcio per ordenar pichichi
		playerSort: function (pichichi) {
			// Set slice() to avoid to generate an infinite loop!
			return pichichi.slice(pichichi).sort(function (a, b) {
				return b.goals - a.goals;
			});
		},

		
		matchDetail: function (match) {

			this.match = match;
			this.homeTeam = this.teamsNysl.filter(team => team.short_name == match.team1.name)[0];
			this.awayTeam = this.teamsNysl.filter(team => team.short_name == match.team2.name)[0];


		},



	},
//	computed: {	},
//	created(){
//		fetch
//	}


})
//----------------------end data------------------------------//




//-------------functions----------------------------------//




//-----------login chat-------------------//

document.getElementById("login").addEventListener("click", login);
document.getElementById("create-post").addEventListener("click", writeNewPost);


getPosts();

function login() {

	// https://firebase.google.com/docs/auth/web/google-signin

	//Provider
	var provider = new firebase.auth.GoogleAuthProvider();

	//How to signin
	firebase.auth().signInWithPopup(provider)


		.then(function (result) {
			if (result.credential) {
				getPosts()
				document.getElementById("login").style.display = "none"
			}

		})

		.catch(console.log("error"))


	console.log("login")




}




function writeNewPost() {

	// https://firebase.google.com/docs/database/web/read-and-write

	//Values from HTML
	var text = document.getElementById("textInput").value;
	var name = firebase.auth().currentUser.displayName;

	var objectToSend = {

		author: name,
		message: text
	};
	firebase.database().ref("nysl_chat").push(objectToSend);
	reset();

	console.log(objectToSend);
	// Values


	console.log("write");

}


function getPosts() {

	//Get messages

	firebase.database().ref('nysl_chat').on('value', function (data) {
		var posts = document.getElementById("posts");
		posts.innerHTML = "";
		console.log(data.val());
		var messages = data.val();
		for (var key in messages) {
			var element = messages[key];
			var text = document.createElement("div");
			if (element.author == firebase.auth().currentUser.displayName) {
				text.classList.add("myMessage");
			} else {
				text.classList.add("yourMessage");

			}
			var divBoxes = document.createElement("div");
			divBoxes.setAttribute("class", "divBoxesChat");
			var theName = document.createElement("p");
			var messa = document.createElement("p");

			theName.append(element.author);
			
			messa.append(element.message);

			divBoxes.append(theName);
			

			text.append(divBoxes, messa);
			
			posts.append(text);

		}




	})
	//			
	//			text.append(element.message);
	//			text.append(element.author);
	//			posts.append(text);
	console.log("getting posts");
}

function reset(){
	var oldText=document.getElementById("textInput");
		oldText.value="";
		
}




//----------------------------------------------------//
//----------------slide pages---------------------//
