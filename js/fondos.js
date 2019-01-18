$('document').ready(function(){
	$('document').css({opacity: 0.4});
	$.backstretch([
			"images/dinero1.jpg",
			"images/dinero2.jpg",
			"images/dinero3.jpg",
			"images/dinero4.jpg"
		],{

			fade:750,
			duration:8000

			
		});
});

//$( function() {
//     $( "#dialogGanaste" ).dialog({
//       autoOpen: false,
//       show: {
//         effect: "blind",
//         duration: 1000
//       },
//       hide: {
//         effect: "explode",
//         duration: 1000
//       }
//     });
//   });