(function($){ resizeMe = function() {

	wi = $(window).innerWidth();
	$("body").css("overflow-y","auto");
	he = $(window).innerHeight();
	prevmobile = mobile;
	mobile = (wi <= 768) ? true : false;

	if (mobile != prevmobile) mobileChanged = true;

	if (mobile) {	
		
		maxwi = wi;
		minwi = wi;
		scale = maxwi / 800;
		
		$("#header").css("display", "table");

		$(".list").css("font-size", 28*scale);
		$(".think").css("font-size", 32*scale);
		$(".desc").css("font-size", 28*scale);
		$("#phonetext").css("font-size", 28*scale).css("bottom",28*scale);
		$("#mailtext").css("font-size", 28*scale).css("bottom",102*scale);

		$(".d").height(wi*1.3);

		$(".list").css("top", 90*scale);
		$(".think").css("top", 310*scale);
		$(".desc").css("top", 450*scale);
		$(".dac").css("display", "none");
		
 		$("#devartimg1").css("display", "block"); 

		$(".d, .think").width(maxwi); 
		$(".win, .winp").width(320*scale).css("left",80*scale).css("top",5*scale);
		
		forAllDevices();

		if (mobileChanged) { 
			mobileChanged = false;
			
			window.scrollTo(0, 0);

			$("#wrapper").addClass("mobile");	
			$(".d, #div3").addClass("mobile");
		}
		
		$("#pick").css("visibility", "visible").width(maxwi);
		divMobileON();

	} else {
		
		$("#header").css("display", "none");

		if (wi>1280) wi = 1280;
		sc = wi/he;	
		if (sc > 1.4) wi = he * 1.4;
		minwi = wi*0.1875;
		maxwi = wi*0.625;
		scale = wi/1280;
		
		scalePics();
		
		$(".list").css("font-size", 26*scale);
		$(".think").css("font-size", 30*scale);
		$(".desc").css("font-size", 23*scale);
		$("#phonetext").css("font-size", 28*scale).css("bottom",28*scale);
		$("#mailtext").css("font-size", 28*scale).css("bottom",102*scale);
		
		$(".d").height("95%");
		$("#footer").height("5%");
		
		$(".list").css("top", 105*scale);
		$(".think").css("top", 285*scale);
		$(".desc").css("top", 400*scale);
		$(".dac").css("display", "block");
		$("#devartimg1").css("display", "none");
		$(".dac").css("padding", 0);
		$(".win, .winp").width(minwi).css("left",0).css("top",0);
		$(".win.zoom, .winp.zoom").width(320*scale).css("left",80*scale).css("top",5*scale);

		forAllDevices();

		if (mobileChanged) {
			mobileChanged = false;

			window.scrollTo(0, 0);
			$("#wrapper").removeClass("mobile").height("95%");	
			$(".d, #div3").removeClass("mobile").height("100%");
				
		 	divAllOFF();
		 	
		 	setTimeout(function(){
		 		if (whichAnim == 0)
		 			{
				 		div1ON();
				 		whichAnim = 1;	
		 			}
		 	}, 2000);
		 	
		 } else {
			 if (whichAnim == 1) div1ON();
			 if (whichAnim == 2) div2ON();
			 if (whichAnim == 3) div3ON();
		 }
	}
	
	function forAllDevices(){

		$(".desc").width(680*scale).css("left", 55*scale);

		$(".dac").width(240*scale);

		$("#win2fill").css("left", maxwi/2).width(maxwi/2).height(maxwi/2);
		$(".list").css("left", maxwi/2-maxwi/20);
		$(".el").css("right", 65*scale);
		
		$("#devartimg").width(240*scale).css("bottom",170*scale);
		$("#devartimg1").css("left", 65*scale).width(240*scale).css("bottom", 50*scale);
		
		$("#footercell span, #headercell span").css("font-size", 26*scale);
		$("#phoneimg").width(50*scale).css("right", 265*scale).css("bottom",23*scale);
		$("#mailimg").width(50*scale).css("right", 287*scale).css("bottom",107*scale);
		$(".point").width(12*scale).height(12*scale);
		
	  	$("#wrapper").width(wi);
		$("#footer, #header").width(wi);
		var foot = $("#footer").height();
		$("#footerimg, #headerimg").height(foot * 0.6);
		$("#footerimg, #headerimg").width(foot * 0.6 * 160 / 35);
	
	}

}})(jQuery);

(function($){ initMe = function() {

	var preImg = ["images/_win1p.jpg","images/_win1pB.jpg","images/_win2p.jpg","images/_win2pB.jpg","images/win3p.jpg","images/win3pB.jpg","images/_pic1n.jpg","images/_pic2n.jpg","images/_pickn.jpg"];
			
	preloadimages(preImg).done(function(images){
	
		TweenLite.to(["#wrapper, #pic1Cont, #pic2Cont, #footer, #header"], 0.5, { opacity:1});

	 	window.scrollTo(0, 0);
	 	
	 	$(".win, .winp").removeClass("zoom");
	 	
	 	div1Anim = 0; 
	 	div2Anim = 0; 
	 	div3Anim = 0; 
	 	whichAnim = 0;
	 	mobileChanged = false;
	 	mobile = null;
	 	
	 	colorMyGrey  =  $(".g").css("color");
	 	colorMyBlack = $(".b").css("color");
	 	colorMyOrange  = "#E46E49";
	 	colorMyWhite  = "#FFFFFF";
	 	
	 	resizeMe();
	 	
		mousePos = { x: -1, y: -1 };
	
	    $(document).mousemove(function(event) {
	    
	        mousePos.x = event.pageX;
	        mousePos.y = event.pageY;
	
	        if (!mobile) {
	
		        if ((div1Anim == 0) && mouseWithin("#div1")) {
		        	div1Anim = 1;
				 	div2Anim = 0; 
				 	div3Anim = 0;   	       	
		       		div1ON();
		       		whichAnim = 1;
		        }
		
		        if ((div2Anim == 0) && mouseWithin("#div2")) {
		        	div1Anim = 0;
				 	div2Anim = 1; 
				 	div3Anim = 0; 
		       		div2ON();
		       		whichAnim = 2;
		        }
		
		        if ((div3Anim == 0) && mouseWithin("#div3")) {
		        	div1Anim = 0;
				 	div2Anim = 0; 
				 	div3Anim = 1; 
		       		div3ON();
		       		whichAnim = 3;
		        }
	        }
	      
	    });
	
		function mouseWithin(selector) {
		  var pos = $(selector).position();
		  var top = pos.top;
		  var left = pos.left;
		  var height = $(selector).height();
		  var width = $(selector).width();
		    
		  if (mousePos.x >= left && mousePos.y >= top && mousePos.x <= left + width && mousePos.y <= top + height) {
		    return true;
		  }
		  return false;
		}
			
		$(window).on("orientationchange resize",function(){
			resizeMe();
		});
	});

	function preloadimages(arr){
	    var newimages = [], loadedimages=0;
	    var postaction = function(){};
	    var arr = (typeof arr != "object") ? [arr] : arr;
	
	    function imageloadpost(){
	        loadedimages++;
	        if (loadedimages == arr.length) {
	            postaction(newimages);
	        }
	    }
	
	    for (var i=0; i<arr.length; i++) {
	        newimages[i] = new Image();
	        newimages[i].src = arr[i];
	        newimages[i].onload = function(){
	            imageloadpost()
	        }
	        newimages[i].onerror = function(){
	            imageloadpost()
	        }
	    }
	    
	    return { 
	        done:function(f){
	            postaction = f || postaction;
	        }
	    }
	}


}})(jQuery);

(function($){ div1ON = function() {

	if (whichAnim == 0)  TweenLite.to(["#footer"], 0.4, { width: wi-1, ease:Power2.easeInOut });
	
	$("#win1p").attr("src", "images/_win1p.jpg");
	$("#win2p").attr("src", "images/_win2pB.jpg");
	$("#win3p").attr("src", "images/win3pB.jpg");

	TweenLite.to(["#win1", "#win1p"], 0.4, {width:320*scale, left:80*scale, top: 5*scale, ease:Power2.easeInOut });
	TweenLite.to(["#win2", "#win2p"], 0.2, {width:240*scale, left:0, top: 0, ease:Power2.easeInOut });
	TweenLite.to(["#win3", "#win3p"], 0.2, {width:240*scale, left:0, top: 0, ease:Power2.easeInOut });

   	TweenLite.to(["#div1","#think1"], 0.4, { width: maxwi, ease:Power2.easeInOut });
  	TweenLite.to(["#div2","#think2"], 0.4, { width: minwi, ease:Power2.easeInOut });
  	TweenLite.to(["#div3","#think3"], 0.4, { width: minwi-1, ease:Power2.easeInOut });
  	
  	TweenLite.to("#think1", 1, { color: colorMyOrange, scale: 1 });
  	TweenLite.to("#think2", 1, { color: colorMyWhite, scale: 1 });
  	TweenLite.to("#think3", 1, { color: colorMyBlack, scale: 1 });

   	TweenLite.to(["#win1p, #win1c"], 0.2, { opacity: 1.0 });
  	TweenLite.to(["#win2p, #win2c"], 0.2, { opacity: 0.6 });
 	TweenLite.to(["#win3p, #win3c"], 0.2, { opacity: 0.1 });

  	TweenLite.to(["#list1"], 1, { opacity: 1});
  	TweenLite.from(["#list1"], 1, { left: maxwi/2});
  	TweenLite.to(["#desc1"], 2, { opacity: 1});
  	TweenLite.to(["#list2", "#desc2"], 0.2, { opacity: 0});
  	TweenLite.to(["#list3", "#desc3"], 0.2, { opacity: 0});

   	TweenLite.to("#win3p", 1, { scale: 0.8, ease:Power2.easeInOut });
  	TweenLite.to("#win2p", 1, { scale: 0.8, ease:Power2.easeInOut });
  	TweenMax.to("#win1p", 3, { scale: 1, repeat:5, yoyo:true, repeatDelay:0, ease:Power2.easeInOut});

  	$(".win, .winp").removeClass("zoom");
  	$("#win1, #win1p").addClass("zoom");


  	TweenLite.to(".el", 0.2, { scale: 0});

}})(jQuery);


(function($){ div2ON = function() {

	if (whichAnim == 0)  TweenLite.to(["#footer"], 0.4, { width: wi-1, ease:Power2.easeInOut });

	$("#win1p").attr("src", "images/_win1pB.jpg");
	$("#win2p").attr("src", "images/_win2p.jpg");
	$("#win3p").attr("src", "images/win3pB.jpg");
	
	TweenLite.to(["#win2", "#win2p"], 0.4, {width:320*scale, left:80*scale, top: 5*scale, ease:Power2.easeInOut });
	TweenLite.to(["#win1", "#win1p"], 0.2, {width:240*scale, left:0, top: 0, ease:Power2.easeInOut });
	TweenLite.to(["#win3", "#win3p"], 0.2, {width:240*scale, left:0, top: 0, ease:Power2.easeInOut });

  	TweenLite.to(["#div1","#think1"], 0.4, { width: minwi, ease:Power2.easeInOut });
  	TweenLite.to(["#div2","#think2"], 0.4, { width: maxwi, ease:Power2.easeInOut });
  	TweenLite.to(["#div3","#think3"], 0.4, { width: minwi-1, ease:Power2.easeInOut });

  	TweenLite.to("#think1", 1, { color: colorMyBlack, scale: 1 });
  	TweenLite.to("#think2", 1, { color: colorMyOrange, scale: 1 });
  	TweenLite.to("#think3", 1, { color: colorMyBlack, scale: 1 });

  	TweenLite.to(["#win1p, #win1c"], 0.2, { opacity: 0.1 });
  	TweenLite.to(["#win2p, #win2c"], 0.2, { opacity: 1.0 });
  	TweenLite.to(["#win3p, #win3c"], 0.2, { opacity: 0.1 });

  	TweenLite.to(["#list1", "#desc1"], 0.2, { opacity: 0});
  	TweenLite.to(["#list2"], 1, { opacity: 1});
  	TweenLite.from(["#list2"], 1, { left: maxwi/2});
  	TweenLite.to(["#desc2"], 2, { opacity: 1});
  	TweenLite.to(["#list3", "#desc3"], 0.2, { opacity: 0});

   	TweenLite.to("#win1p", 1, { scale: 0.8, ease:Power2.easeInOut });
  	TweenLite.to("#win3p", 1, { scale: 0.8, ease:Power2.easeInOut });
  	TweenMax.to("#win2p", 3, { scale: 0.9, repeat:5, yoyo:true, repeatDelay:0, ease:Power2.easeInOut});
  	
  	$(".win, .winp").removeClass("zoom");
  	$("#win2, #win2p").addClass("zoom");

  	TweenLite.to(".el", 0.2, { scale: 0});
  	


}})(jQuery);

(function($){ div3ON = function() {

	if (whichAnim == 0)  TweenLite.to(["#footer"], 0.4, { width: wi-1, ease:Power2.easeInOut });

	$("#win1p").attr("src", "images/_win1pB.jpg");
	$("#win2p").attr("src", "images/_win2pB.jpg");
	$("#win3p").attr("src", "images/win3p.jpg");

	TweenLite.to(["#win3", "#win3p"], 0.4, {width:320*scale, left:80*scale, top: 5*scale, ease:Power2.easeInOut });
	TweenLite.to(["#win2", "#win2p"], 0.2, {width:240*scale, left:0, top: 0, ease:Power2.easeInOut });
	TweenLite.to(["#win1", "#win1p"], 0.2, {width:240*scale, left:0, top: 0, ease:Power2.easeInOut });
 
   	TweenLite.to(["#div1","#think1"], 0.4, { width: minwi, ease:Power2.easeInOut });
  	TweenLite.to(["#div2","#think2"], 0.4, { width: minwi, ease:Power2.easeInOut });
  	TweenLite.to(["#div3","#think3"], 0.4, { width: maxwi-1, ease:Power2.easeInOut });

  	TweenLite.to("#think1", 1, { color: colorMyBlack, scale: 1 });
  	TweenLite.to("#think2", 1, { color: colorMyWhite, scale: 1 });
  	TweenLite.to("#think3", 1, { color: colorMyOrange, scale: 1 });

  	TweenLite.to(["#win1p, #win1c"], 0.2, { opacity: 0.1 });
  	TweenLite.to(["#win2p, #win2c"], 0.2, { opacity: 0.6 });
  	TweenLite.to(["#win3p, #win3c"], 0.2, { opacity: 1.0 });

  	TweenLite.to(["#list1", "#desc1"], 0.2, { opacity: 0});
  	TweenLite.to(["#list2", "#desc2"], 0.2, { opacity: 0});
  	TweenLite.to(["#list3"], 1, { opacity: 1});
  	TweenLite.from(["#list3"], 1, { left: maxwi/2});
  	TweenLite.to(["#desc3"], 2, { opacity: 1});


   	TweenLite.to("#win1p", 1, { scale: 0.8, ease:Power2.easeInOut });
  	TweenLite.to("#win2p", 1, { scale: 0.8, ease:Power2.easeInOut });
  	TweenMax.to("#win3p", 3, { scale: 1, repeat:5, yoyo:true, repeatDelay:0, ease:Power2.easeInOut});

  	$(".win, .winp").removeClass("zoom");
  	$("#win3, #win3p").addClass("zoom");

  	TweenLite.to(".el", 2, { scale: 1, ease:Elastic.easeOut});
  	

}})(jQuery);


(function($){ divAllOFF = function() {

	scalePics();

  	TweenLite.to(".el", 0, { scale: 0});

  	$("#wrapper").width(wi);
  	$("#footer").width(wi);
  	$(".d, .think").width(wi/3);
  	$(".winp").css("opacity",0.1);
  	$(".win, .winp").css("left",(wi/6)-(240*scale/2));
  	$(".list, .desc").css("opacity",0);
  	TweenLite.to(["#win2p, #win2c"], 0, { opacity: 0.6 });

 	TweenLite.to(".think", 0, { color: colorMyBlack, scale: 1 });
   	TweenLite.to("#think2", 0, { color: colorMyWhite, scale: 1.2 });
 	TweenLite.to(["#win1p"], 0, { scale: 0.8});
  	TweenLite.to(["#win2p"], 0, { scale: 0.8});
  	TweenLite.to(["#win3p"], 0, { scale: 0.8});
 


}})(jQuery);

(function($){ divMobileON = function() {

  	TweenLite.to("#think1", 1, { color: colorMyOrange, scale: 1.2 });
  	TweenLite.to("#think2", 1, { color: colorMyOrange, scale: 1.2 });
  	TweenLite.to("#think3", 1, { color: colorMyOrange, scale: 1.2 });

  	TweenLite.to(["#win1p, #win1c"], 0.2, { opacity: 1.0 });
  	TweenLite.to(["#win2p, #win2c"], 0.2, { opacity: 1.0 });
  	TweenLite.to(["#win3p, #win3c"], 0.2, { opacity: 1.0 });

  	TweenLite.to(["#list1", "#desc1"], 0.2, { opacity: 1});
  	TweenLite.to(["#list2", "#desc2"], 0.2, { opacity: 1});
  	TweenLite.to(["#list3", "#desc3"], 0.2, { opacity: 1});

  	TweenLite.from(["#list1", "#list2", "#list3"], 0, { left: maxwi/2});

  	TweenLite.to(".el", 0.2, { scale: 1});

	$("#win1p").attr("src", "images/_win1p.jpg");
	$("#win2p").attr("src", "images/_win2p.jpg");
	$("#win3p").attr("src", "images/win3p.jpg");

   	TweenLite.to(".winp, .el", 0, { scale: 1});

  	$(".d, .think").width(wi);

  	TweenMax.from("#win1p", 4, { scale: 0.8, repeat:15, yoyo:true, repeatDelay:0, ease:Power2.easeInOut});
  	TweenMax.from("#win2p", 4, { scale: 0.8, repeat:15, yoyo:true, repeatDelay:0, ease:Power2.easeInOut});
  	TweenMax.from("#win3p", 4, { scale: 0.8, repeat:15, yoyo:true, repeatDelay:0, ease:Power2.easeInOut});

			
}})(jQuery);

(function($){ scalePics = function() {

	var picWidth = ($(window).innerWidth() - wi) / 2;
	var winHeight = $(window).innerHeight();
	var winRatio =  winHeight / picWidth;
	
	if (winRatio >= 2.5) {
		var picHeight = winHeight;
		picWidth = picHeight / 2.5;
	} else {
		var picHeight = picWidth * 2.5;
	}
	
	$("#pic1Cont, #pic2Cont, #pickCont").css("display", "block");
	$("#pic1, #pic2").css("visibility", "visible").width(picWidth).height(picHeight);
	$("#pick").css("visibility", "visible").width(maxwi);

}})(jQuery);



