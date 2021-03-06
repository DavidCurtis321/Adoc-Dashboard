(function($){$.fn.ticker=function(options){settings=jQuery.extend({pxpersec:30},options);if(this.length!=1)throw"Ticker can only be attached to a single element";if(this.children('ul').length!=1)throw"Ticker container must contain a UL, eg <div id='ticker'><ul></ul></div>";return new $.ticker(this,settings);}
$.ticker=function(el,settings){var addqueue=[];var removequeue=[];var numsegs;var updatecount=0;var thisticker=this;var msgwidth=0;var isscrolling=0;var elcont=el;var eltape=el.children().first();eltape.css({"margin":0,"padding":0,"listStyleType":'none',"whiteSpace":'nowrap','float':'left',"position":'absolute',"right":0,"oTransition":'right 0s linear 0',"webkitTransition":'right 0s linear 0',"mozTransition":'right 0s linear 0',"transition":'right 0s linear 0'});elcont.css({overflow:'hidden'});if(!elcont.css('float')||elcont.css('float')=='none')elcont.css('display','block');if(eltape.children('li').length)initTape();function initTape(){numsegs=1;if(!eltape.children('li').length)throw"Cannot initialise ticker: Nothing in it";eltape.children('li').each(function(){if(!$(this).attr('id'))$(this).attr('id','msg'+Math.ceil(Math.random()*99999999));$(this).addClass('seg1').attr('seg',1);});isscrolling=1;updatecount=1;eltape.bind('webkitTransitionEnd',slide);eltape.bind('oTransitionEnd',slide);eltape.bind('mozTransitionEnd',slide);eltape.bind('transitionEnd',slide);slide();}
function slide(e){if(updatecount){if(numsegs>1){for(var i=(numsegs-1);i>=1;i--){eltape.find('.seg'+(i+1)).remove();eltape.find('.seg'+i).clone().removeClass('seg'+i).removeAttr('id').addClass('seg'+(i+1)).attr('seg',(i+1)).insertBefore(eltape.find('.seg'+i).first());}}
if(eltape.find('.empty').length){eltape.unbind().css({webkitTransitionDuration:'0s'}).children().remove();isscrolling=0;return;}
var widths=calcWidths();if(widths.total<(elcont.width()+widths.seg1)){var content=eltape.children('.seg'+numsegs);var content=content.clone().removeAttr('id').removeClass('seg'+numsegs);if(!widths['seg'+numsegs])throw"Ticker is zero-width"
var numrequired=Math.ceil((elcont.width()+widths.seg1-widths.total)/widths['seg'+numsegs]);for(var i=1;i<=numrequired;i++){numsegs++;eltape.prepend(content.clone().addClass('seg'+numsegs).attr('seg',numsegs));widths['seg'+numsegs]=widths['seg'+(numsegs-1)];widths.total+=widths['seg'+numsegs];}}
if(widths.total>(elcont.width()+(widths.seg1*2))){eltape.find('.seg'+numsegs).remove();numsegs--;widths.total-=widths['seg'+(numsegs+1)];delete widths['seg'+(numsegs+1)];}
msgwidth=widths.seg1;eltape.width(widths.total);updatecount--;}
if(removequeue.length||addqueue.length){if(removequeue.length){for(var i=removequeue.length-1;i>=0;i--)$(removequeue[i]).remove();removequeue=[];if(!eltape.find('.seg1').length)$('<li class="seg1 empty"></li>').width(elcont.width()).appendTo(eltape);}
if(addqueue.length){for(var i=addqueue.length-1;i>=0;i--){$(addqueue[i]).addClass('seg1').attr('seg',1).appendTo(eltape);}
addqueue=[];eltape.find('.seg1').filter('.empty').remove();}
var widths=calcWidths();msgwidth=widths.seg1;eltape.width(widths.total);updatecount=numsegs;}
eltape.css({"webkitTransitionDuration":'0s',"mozTransitionDuration":'0s',"oTransitionDuration":'0s',"transitionDuration":'0s'});eltape.css({"right":'-'+msgwidth+'px'});dur=Math.floor(msgwidth/settings.pxpersec);setTimeout(function(){eltape.css({"webkitTransitionDuration":dur+'s',"mozTransitionDuration":dur+'s',"oTransitionDuration":dur+'s',"transitionDuration":'0s'});eltape.css({right:0+'px'});},0);}
function calcWidths(){var widths={total:0}
eltape.children().each(function(){if(typeof widths['seg'+$(this).attr('seg')]=='undefined')widths['seg'+$(this).attr('seg')]=0;widths['seg'+$(this).attr('seg')]+=$(this).outerWidth();widths.total+=$(this).outerWidth();});return widths;}
this.addMsg=function(el){if(typeof el=='string')el=$('<li>'+el+'</li>');if(!el.attr('id'))el.attr('id','msg'+Math.ceil(Math.random()*99999999));if(isscrolling){addqueue.push(el);}else{eltape.append(el);}
return el.attr('id');}
this.removeMsg=function(el){if(typeof el=='string')el=$('#'+el);removequeue.push(el);}
this.start=function(){if(!isscrolling)initTape();}
this.isScrolling=function(){return(isscrolling==true);}}})(jQuery);

(function($){ 
     $.fn.extend({  
         airport: function(array) {
			
			var self = $(this);
			var chars = ['a','b','c','d','e','f','g',' ','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','!'];
			var longest = 0;
			var items = items2 = array.length;

			function pad(a,b) { return a + new Array(b - a.length + 1).join(' '); }
			
			$(this).empty();
			
			while(items--)
				if(array[items].length > longest) longest = array[items].length;

			while(items2--)
				array[items2] = pad(array[items2],longest);
				
			spans = longest;
			while(spans--)
				$(this).prepend("<span class='c" + spans + "'></span>");
				
			
			function testChar(a,b,c,d){
				if(c >= array.length)
					setTimeout(function() { testChar(0,0,0,0); }, 1000);				
				else if(d >= longest)
					setTimeout(function() { testChar(0,0,c+1,0); }, 1000);
				else {
					$(self).find('.c'+a).html((chars[b]==" ")?"&nbsp;":chars[b]);
					setTimeout(function() {
						if(b > chars.length)
							testChar(a+1,0,c,d+1);
						else if(chars[b] != array[c].substring(d,d+1).toLowerCase())
							testChar(a,b+1,c,d);
						else
							testChar(a+1,0,c,d+1);
					}, 20);
				}
			}
			
			testChar(0,0,0,0);
        } 
    }); 
})(jQuery);