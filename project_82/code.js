// Load the IFrame Player API code asynchronously.
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
	player = new YT.Player("player", {
		height: "315",
		width: "560",
		videoId: "iicfmXFALM8",
		events: {
			onReady: onPlayerReady
		}
	});
}

let playerElem;
function onPlayerReady(e) {
	playerElem = e.target;
}

$(window).mousemove(function (e) {
	$(".player").css(
		"transform",
		`translateX(calc(${e.clientX}px - 280px)) translateY(calc(${e.clientY}px - 167.5px))`
	);
});
$(".button").click(function () {
	$(".player").css("display", "block");
	console.log("player", playerElem);
	playerElem.playVideo();
});
