$(document).ready(function(){
	$('#btnReplay').on('click',function(e){
		e.preventDefault();
		var name = $('#name').val(), message = $('#message').val();
		if(name && message) {
			fb.push({name:name,message:message});
			$('#message').val('');
		}
	});

	fb.on('child_added',function(s){
		addReply(s.val());
	})

	setMap();
});


// reply
var fb = new Firebase('https://larcken.firebaseio.com/'), num = 0;

function addReply(data){
		num += 1;
	 	var text = '<ul class="collection with-header">';
  	text 		+= '<li class="collection-header"><h4>['+num+'] '+data.name+'</h4></li>';
  	text 		+= '<li class="collection-item">'+data.message+'</li></ul>';

		$('#view').prepend(text);
}

function scrollLink(obj){
	 var position = $("#"+obj).offset();
	 $('html, body').animate({scrollTop : position.top}, 1000);
}

function setMap() {
	//지도를 삽입할 HTML 엘리먼트 또는 HTML 엘리먼트의 id를 지정합니다.
	var mapDiv = document.getElementById('map'); // 'map' 으로 선언해도 동일

	var map = new naver.maps.Map('map', {
	    center: new naver.maps.LatLng(37.4501224, 127.1272767),
	    zoom: 10
	});

	var marker = new naver.maps.Marker({
	    position: new naver.maps.LatLng(37.4501224, 127.1272767),
	    map: map
	});
}
