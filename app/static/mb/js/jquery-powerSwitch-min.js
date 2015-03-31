/*!
 * powerSwitch.js by sucaiweb(.com)
 * under MIT License
 * you can use powerSwitch to switch anything
*/
(function(b,c,d){var a=typeof history.pushState=="function";c.powerSwitch=function(f,e){c(f).powerSwitch(e)};c.extend(c.powerSwitch,{getRelative:function(f,h){f=c(f);if(f.length==0){return c()}var e=[],g=false;f.each(function(j,k){var i=c(this).attr(h.attribute)||(c(this).attr("href")||"").split("#")[1];if(i&&e[i]!=true){var l=c();if(/^\w+$/.test(i)){l=c("#"+i);if(l.length===0){l=c("."+i)}if(l.length===0){l=c(i)}}else{l=c(i)}l.each(function(m,n){e.push(n)});e[i]=true}else{if(e[i]==true){g=true}}});f.data("isMoreToOne",g);return c(e)},transition:function(h,g,f){var e="transform "+g+"ms linear";if(a==false){return}if(f==true){h.css("webkitTransition","none").css("transition","none").data("hasTransition",false)}else{if(!h.data("hasTransition")){h.css({webkitTransition:"-webkit-"+e,webkitBackfaceVisibility:"hidden",transition:e,BackfaceVisibility:"hidden"}).data("hasTransition",true)}}},translate:function(g,e,f){var h="translate"+e+"("+f+")";a?g.css("webkitTransform",h).css("transform",h):g.css(e=="X"?{left:f}:{top:f})},animation:function(p,h,k){var f=null,n=this,l=k.animation=="none";var i=function(t,r,s){if(parseInt(s)===s){s+="px"}if(a){n.transition(t,k.duration,l);n.translate(t,r,s)}else{t[l?"css":"animate"](r=="X"?{left:s}:{top:s},k.duration)}};if((h&&h.length)||(p&&p.length)){if(k.toggle==true&&k.animation=="translate"){k.animation="none"}switch(k.animation){case"translate":var j=p.data("index"),o=h.data("index");var g={vertical:"Y",horizontal:"X"};if(j!=d&&o!=d){var q=100,e=true;if(k.prevOrNext){switch(k.prevOrNext.attr("data-type")){case"prev":e=false;break;case"next":e=true;break;default:e=j<o}}q=(e*2-1)*100;n.transition(h.show(),k.duration,true);n.translate(h,g[k.direction],q+"%");setTimeout(function(){i(p,g[k.direction],-1*q+"%");i(h,g[k.direction],"0%")},17);k.prevOrNext=null}else{p.hide();h.show()}break;case"slide":if(k.duration!="sync"){if(p){p.slideUp(k.duration)}if(h){h.slideDown(k.duration)}}else{if(p){p.slideUp("normal",function(){if(h){h.slideDown()}})}else{if(h){h.slideDown()}}}break;case"fade":if(k.duration!="sync"){if(p){p.fadeOut(k.duration)}if(h){h.fadeIn(k.duration)}}else{if(p){p.fadeOut("normal",function(){if(h){h.fadeIn()}})}else{if(h){h.fadeIn()}}}break;case"visibility":if(p){p.css("visibility","hidden")}if(h){h.css("visibility","visible")}break;default:if(p){p.hide()}if(h){h.show()}}}else{if(k.container&&k.container.length){var m=k.container.data("position");f=k.container.get(0);if(k.direction=="vertical"){if(f.scrollHeight-f.clientHeight>=Math.max(m.top,1)){k.animation=="auto"?k.container.animate({scrollTop:m.top}):k.container.scrollTop(m.top)}else{i(k.container,"Y",-1*m.top)}}else{if(f.scrollWidth-f.clientWidth>=Math.max(m.left,1)){k.animation=="auto"?k.container.animate({scrollLeft:m.left}):k.container.scrollLeft(m.left)}else{i(k.container,"X",-1*m.left)}}}}}});c.fn.powerSwitch=function(k){var s={direction:"horizontal",eventType:"click",classAdd:"",classRemove:"",classPrefix:"",attribute:"data-rel",animation:"auto",duration:250,container:null,autoTime:0,number:"auto",hoverDelay:200,toggle:false,onSwitch:c.noop};var z=c.extend({},s,k||{});c.each(["disabled","prev","play","pause","next"],function(C,F){F=c.trim(F);var G=F.slice(0,1).toUpperCase()+F.slice(1),E="class"+G,D=z.classPrefix.slice(-1);if(z[E]===d){if(z.classPrefix){if(/\-/g.test(z.classPrefix)){z[E]=D=="-"?(z.classPrefix+F):[z.classPrefix,F].join("-")}else{if(/_/g.test(z.classPrefix)){z[E]=D=="_"?(z.classPrefix+F):[z.classPrefix,F].join("_")}else{z[E]=z.classPrefix+G}}}else{z[E]=F}}});var B=z.indexSelected||-1,h=parseInt(z.number)||1,f=null,w=null,v=c(),l=0;var u=c(this);if(u.length==0){if(z.container==null||z.autoTime==0){return u}}v=c.powerSwitch.getRelative(u,z);if((l=v.length)==0){return u}if(B==-1&&z.toggle==false){if(z.classAdd){u.each(function(C,D){if(B!=-1){return}if(c(D).hasClass(z.classAdd)){B=C}})}else{v.each(function(C,D){if(B!=-1){return}if(z.animation=="visibility"){if(c(D).css("visibility")!="hidden"){B=C}}else{if(c(D).css("display")!="none"){B=C}}})}}var t=false,y=c(),A=c(),g=c();var m=function(C){if(C<=0){y.addClass(z.classDisabled).removeAttr("title").attr("disabled","disabled")}else{y.removeClass(z.classDisabled).attr("title",y.data("title")).removeAttr("disabled")}if((l-C)/h>1){A.removeClass(z.classDisabled).attr("title",A.data("title")).removeAttr("disabled")}else{A.addClass(z.classDisabled).removeAttr("title").attr("disabled","disabled")}};if(u.eq(0).data("isMoreToOne")==true){t=true;if(z.classDisabled){y=u.eq(0),A=u.eq(1);y.data("title",y.attr("title"));A.data("title",A.attr("title"));m(B);if(B<=0&&z.container){c(z.container).scrollLeft(0).scrollTop(0)}}else{if(z.container){v.clone().insertAfter(v.eq(l-1));v=c.powerSwitch.getRelative(u,z);g=u.eq(1)}else{y=u.eq(0),A=u.eq(1);g=A}}}var x=false;if(u.length==1&&l>1){x=true}var r=function(G){var F=v.slice(G,G+h);var H=null,E=null,D=null;if(z.toggle==false){if(t==true){if(z.container){var C=F.position();z.container=c(z.container);z.container.data("position",C);c.powerSwitch.animation(null,null,z);z.classDisabled&&m(G)}else{c.powerSwitch.animation(v.eq(B,B+h),F,z)}z.onSwitch.call(this,F)}else{if(x==true){c.powerSwitch.animation(null,F,z);z.onSwitch.call(this,F)}else{E=u.eq(G);if(B>=0){H=u.eq(B);D=v.eq(B,B+h)}else{H=c();D=c()}E.addClass(z.classAdd).removeClass(z.classRemove);if(B!==G){H.addClass(z.classRemove).removeClass(z.classAdd)}c.powerSwitch.animation(D,F,z);z.onSwitch.call(this,F,H,D)}}B=G}else{if((z.animation=="visibility"&&F.css("visibility")=="hidden")||(z.animation!="visibility"&&F.css("display")=="none")){c.powerSwitch.animation(null,F,z);display=true}else{c.powerSwitch.animation(F,null,z);display=false}z.onSwitch.call(this,F,display)}};var e=location.href.split("#")[1];u.each(function(C,D){c(D).data("index",C);if(t==true){c(D).bind("click",function(){var F,E;if(z.classDisabled){if(c(this).attr("disabled")){return false}if(C==0){F=B-h;F=Math.max(0,F)}else{if(C==1){F=B+h;F=Math.min(F,l-1)}}r.call(this,F)}else{if(z.container&&l>h){if(C==0){F=B-h;if(F<0){E=v.eq(B+l);c(z.container).data("position",E.position());c.powerSwitch.animation(null,null,c.extend({},z,{animation:"none"}));F=B+l-h}}else{if(C==1){F=B+h;if(F>l*2-h){E=v.eq(B-l);c(z.container).data("position",E.position());c.powerSwitch.animation(null,null,c.extend({},z,{animation:"none"}));F=B-l+h}}}r.call(this,F);g=c(this)}else{C?o(this):n(this);g=c(this)}}return false})}else{if(x==true){c(D).bind("click",function(){var E;if(z.number=="auto"){h=l}if(!c(this).attr("disabled")){if(B==-1){E=0}else{E=B+h}r.call(this,E);if(E>=l-1){c(this).addClass(z.classDisabled).attr("disabled","disabled").removeAttr("title")}}return false})}else{if(z.eventType=="click"){c(D).bind("click",function(){z.prevOrNext=c(this);r.call(this,C);return false});if(e&&D.href&&e==D.href.split("#")[1]){c(D).trigger("click")}}else{if(/^hover|mouseover$/.test(z.eventType)){c(D).hover(function(){z.prevOrNext=c(this);clearTimeout(f);f=setTimeout(function(){r.call(D,C)},parseInt(z.hoverDelay)||0)},function(){clearTimeout(f)})}}}}});v.each(function(C,D){c(D).data("index",C)});var o=function(C){var D=B+1;if(D>=l){D=0}r.call(C||u.get(D),D)},n=function(C){var D=B-1;if(D<0){D=l-1}r.call(C||u.get(D),D)},p=function(){g.trigger("click")},j=function(){clearTimeout(w);if(j.flagAutoPlay==true){w=setTimeout(function(){t==false?o():p();j()},z.autoTime)}};if((x==false&&z.toggle==false&&t==false)||(t==true&&!z.classDisabled)){if(z.container&&t==false){var i="";u.length&&c.each(["Prev","Pause","Next"],function(C,D){if(z.autoTime==0&&D=="Pause"){return}i=i+'<a href="javascript:" class="'+z["class"+D]+'" data-type="'+D.toLowerCase()+'"></a>'});z.container.append(i).delegate("a","click",function(){var C=c(this).attr("data-type"),E=z["class"+C.slice(0,1).toUpperCase()+C.slice(1)],D=B;switch(C){case"prev":z.prevOrNext=c(this);n();break;case"play":j.flagAutoPlay=true;c(this).attr("data-type","pause").removeClass(E).addClass(z.classPause);j();break;case"pause":j.flagAutoPlay=false;c(this).attr("data-type","play").removeClass(E).addClass(z.classPlay);j();break;case"next":z.prevOrNext=c(this);o();break}return false})}if(z.autoTime){var q=[u,v,z.container];if(t==true||(document.body.contains&&z.container&&z.container.get(0).contains(v.get(0)))){q=[u,z.container]}c.each(q,function(C,D){if(D){D.hover(function(E){if(E.pageX!==d||z.eventType=="click"){clearTimeout(w)}},function(E){if(E.pageX!==d||z.eventType=="click"){j()}})}});j.flagAutoPlay=true;j()}}return u}})(window,jQuery);