$(document).ready(function(){

// reply
var fb = new Firebase('https://larcken.firebaseio.com/'), num = 0;

function addReply(data){
		num += 1;
	 	var text = '<ul class="collection with-header">';
  	text 		+= '<li class="collection-header"><h4>['+num+'] '+data.name+'</h4></li>';
  	text 		+= '<li class="collection-item">'+data.message+'</li></ul>';

		$('#view').prepend(text);
}

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

});
