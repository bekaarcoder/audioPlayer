var app = angular.module('playerApp', []);

app.controller('PlayerCtrl', ['$scope', function($scope){
	var audio;

	$scope.pause = true;
	$scope.play = false;

	$scope.initAudio = function(element){
		var song = element.attr('song');
		var artist = element.attr('artist');
		var cover = element.attr('cover');

		audio = new Audio('media/' + song);

		if(!audio.currentTime) {
			$('.duration').html("0:00");
		} else {

		}

		$('.song-artist').text(artist);
		$('.song-title').text(song.replace(".mp3", ""));

		$('img.cover-pic').attr('src', 'img/' + cover + '.jpeg');

		$('#playlist li').removeClass('active paused');
		element.addClass('active');
	};

	$scope.initAudio($('#playlist li:first-child'));

	$scope.playAudio = function(){
		audio.play();
		$scope.play = true;
		$scope.pause = false;
		$scope.showDuration();
		$('#playlist li.active').removeClass('paused');
	};

	$scope.pauseAudio = function(){
		audio.pause();
		$scope.play = false;
		$scope.pause = true;
		$('#playlist li.active').addClass('paused');
		// $('#playlist li').removeClass('active');
	};

	$scope.stopAudio = function(){
		audio.pause();
		audio.currentTime = 0;
		$scope.play = false;
		$scope.pause = true;
	}

	$scope.playNext = function(){
		audio.pause();
		var next = $('#playlist li.active').next();
		if(next.length === 0){
			next = $('#playlist li:first-child');
		}
		$scope.initAudio(next);
		$scope.playAudio();
	}

	$scope.playPrev = function(){
		audio.pause();
		var prev = $('#playlist li.active').prev();
		if(prev.length === 0){
			prev = $('#playlist li:last-child');
		}
		$scope.initAudio(prev);
		$scope.playAudio();
	}

	$scope.showDuration = function(){
		audio.ontimeupdate = function(){
			var s = parseInt(audio.currentTime % 60);
			var m = parseInt((audio.currentTime) / 60) % 60;
			if(s < 10){
				s = "0" + s;
			}
			if(audio.duration - audio.currentTime == 0){
				$scope.playNext();
			} else {
				// console.log(audio.duration - audio.currentTime);
			}
			$('.duration').html(m + ":" + s);

			var value = 0;
			if(audio.currentTime > 0){
				value = Math.floor((audio.currentTime/audio.duration) * 100);
				// console.log(audio.currentTime);
			}
			$('.progress').css('width', value + '%');
		};
	};

	$scope.seekBar = function(e){
		var offset = $('.progressbar').offset();
		var relativeX = parseInt(e.pageX - offset.left);
		var wd = parseInt($('.progressbar').width());
		var perc = parseInt((relativeX/wd) * 100);
		// $('.progress').css('width', perc + '%');
		var setTime = Math.floor((perc/100) * audio.duration);
		audio.currentTime = setTime;
		// alert(setTime);
	};

	$scope.setVolume = function(volRange){
		var vol = $scope.volRange/100;
		audio.volume = vol.toFixed(1);
	};

	$scope.volRange = 50;
	$scope.setVolume($scope.volRange);
	
	$scope.changeVol = function(){
		$scope.setVolume($scope.volRange);
	};

}]);
