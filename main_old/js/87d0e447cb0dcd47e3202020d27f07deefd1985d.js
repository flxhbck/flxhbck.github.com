window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){arguments.callee=arguments.callee.caller;var a=[].slice.call(arguments);(typeof console.log==="object"?log.apply.call(console.log,console,a):console.log.apply(console,a))}};(function(e){function h(){}for(var g="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),f;f=g.pop();){e[f]=e[f]||h}})((function(){try{console.log();return window.console}catch(a){return window.console={}}})());(function(a){var b={divholders:{},divgroups:{},lastactiveingroup:{},preloadimages:[],show:function(d){if(typeof d=="object"){for(var c=0;c<d.length;c++){this.showhide(d[c],"show")}}else{this.showhide(d,"show")}},hide:function(d){if(typeof d=="object"){for(var c=0;c<d.length;c++){this.showhide(d[c],"hide")}}else{this.showhide(d,"hide")}},toggle:function(c){if(typeof c=="object"){c=c[0]}this.showhide(c,"toggle")},addDiv:function(d,c){this.divholders[d]=({id:d,$divref:null,attrs:c});this.divholders[d].getAttr=function(f){var e=new RegExp(f+"=([^,]+)","i");return(e.test(this.attrs)&&parseInt(RegExp.$1)!=0)?RegExp.$1:null};this.currentid=d;return this},showhide:function(f,e){var c=this.divholders[f].$divref;if(this.divholders[f]&&c.length==1){var d=this.divgroups[c.attr("groupname")];if(c.attr("groupname")&&d.count>1&&(e=="show"||e=="toggle"&&c.css("display")=="none")){if(d.lastactivedivid&&d.lastactivedivid!=f){this.slideengine(d.lastactivedivid,"hide")}this.slideengine(f,"show");d.lastactivedivid=f}else{this.slideengine(f,e)}}},slideengine:function(g,f){var c=this.divholders[g].$divref;var d=this.divholders[g].$togglerimage;if(this.divholders[g]&&c.length==1){var e={height:f};if(c.attr("fade")){e.opacity=f}c.animate(e,c.attr("speed")?parseInt(c.attr("speed")):500,function(){if(d){d.attr("src",(c.css("display")=="none")?d.data("srcs").closed:d.data("srcs").open)}if(b.ontoggle){try{b.ontoggle(jQuery,c.get(0),c.css("display"))}catch(h){alert('An error exists inside your "ontoggle" function:\n\n'+h+"\n\nAborting execution of function.")}}});return false}},generatemap:function(){var d={};for(var c=0;c<arguments.length;c++){if(arguments[c][1]!=null){d[arguments[c][0]]=arguments[c][1]}}return d},init:function(){var c=this;jQuery(document).ready(function(g){b.ontoggle=b.ontoggle||null;var h=b.urlparamselect();var d=c.getCookie("acopendivids");var f=c.getCookie("acgroupswithpersist");if(d!=null){d=(d=="nada")?[]:d.split(",")}f=(f==null||f=="nada")?[]:f.split(",");jQuery.each(c.divholders,function(){this.$divref=g("#"+this.id);if((this.getAttr("persist")||jQuery.inArray(this.getAttr("group"),f)!=-1)&&d!=null){var j=(jQuery.inArray(this.id,d)!=-1)?"block":"none"}else{var j=this.getAttr("hide")?"none":null}if(h[0]=="all"||jQuery.inArray(this.id,h)!=-1){j="block"}else{if(h[0]=="none"){j="none"}}this.$divref.css(c.generatemap(["height",this.getAttr("height")],["display",j]));this.$divref.attr(c.generatemap(["groupname",this.getAttr("group")],["fade",this.getAttr("fade")],["speed",this.getAttr("speed")]));if(this.getAttr("group")){var i=c.divgroups[this.getAttr("group")]||(c.divgroups[this.getAttr("group")]={});i.count=(i.count||0)+1;if(jQuery.inArray(this.id,h)!=-1){i.lastactivedivid=this.id;i.overridepersist=1}if(!i.lastactivedivid&&this.$divref.css("display")!="none"||j=="block"&&typeof i.overridepersist=="undefined"){i.lastactivedivid=this.id}this.$divref.css({display:"none"})}});jQuery.each(c.divgroups,function(){if(this.lastactivedivid&&h[0]!="none"){c.divholders[this.lastactivedivid].$divref.show()}});if(b.ontoggle){jQuery.each(c.divholders,function(){b.ontoggle(jQuery,this.$divref.get(0),this.$divref.css("display"))})}var e=g("a[rel]").filter('[rel^="collapse["], [rel^="expand["], [rel^="toggle["]');e.each(function(){this._divids=this.getAttribute("rel").replace(/(^\w+)|(\s+)/g,"").replace(/[\[\]']/g,"");if(this.getElementsByTagName("img").length==1&&c.divholders[this._divids]){b.preloadimage(this.getAttribute("data-openimage"),this.getAttribute("data-closedimage"));
$togglerimage=g(this).find("img").eq(0).data("srcs",{open:this.getAttribute("data-openimage"),closed:this.getAttribute("data-closedimage")});c.divholders[this._divids].$togglerimage=g(this).find("img").eq(0);c.divholders[this._divids].$togglerimage.attr("src",(c.divholders[this._divids].$divref.css("display")=="none")?$togglerimage.data("srcs").closed:$togglerimage.data("srcs").open)}g(this).click(function(){var i=this.getAttribute("rel");var j=(this._divids=="")?[]:this._divids.split(",");if(j.length>0){b[/expand/i.test(i)?"show":/collapse/i.test(i)?"hide":"toggle"](j);return false}})});g(window).bind("unload",function(){c.uninit()})})},uninit:function(){var d="",c="";jQuery.each(this.divholders,function(){if(this.$divref.css("display")!="none"){d+=this.id+","}if(this.getAttr("group")&&this.getAttr("persist")){c+=this.getAttr("group")+","}});d=(d=="")?"nada":d.replace(/,$/,"");c=(c=="")?"nada":c.replace(/,$/,"");this.setCookie("acopendivids",d);this.setCookie("acgroupswithpersist",c)},getCookie:function(c){var d=new RegExp(c+"=[^;]*","i");if(document.cookie.match(d)){return document.cookie.match(d)[0].split("=")[1]}return null},setCookie:function(d,e,f){if(typeof f!="undefined"){var c=new Date();c.setDate(c.getDate()+f);document.cookie=d+"="+e+"; path=/; expires="+c.toGMTString()}else{document.cookie=d+"="+e+"; path=/"}},urlparamselect:function(){window.location.search.match(/expanddiv=([\w\-_,]+)/i);return(RegExp.$1!="")?RegExp.$1.split(","):[]},preloadimage:function(){var c=this.preloadimages;for(var d=0;d<arguments.length;d++){if(arguments[d]&&arguments[d].length>0){c[c.length]=new Image();c[c.length-1].src=arguments[d]}}}}})(jQuery);(function(a){a(document).ready(function(){a("body").append('<div id="supersized-loader"></div><ul id="supersized"></ul>')});a.supersized=function(b){var c="#supersized",d=this;d.$el=a(c);d.el=c;vars=a.supersized.vars;d.$el.data("supersized",d);api=d.$el.data("supersized");d.init=function(){a.supersized.vars=a.extend(a.supersized.vars,a.supersized.themeVars);a.supersized.vars.options=a.extend({},a.supersized.defaultOptions,a.supersized.themeOptions,b);d.options=a.supersized.vars.options;d._build()};d._build=function(){var g=0,e="",j="",h,f="",i;while(g<=d.options.slides.length-1){switch(d.options.slide_links){case"num":h=g;break;case"name":h=d.options.slides[g].title;break;case"blank":h="";break}e=e+'<li class="slide-'+g+'"></li>';if(g==d.options.start_slide-1){if(d.options.slide_links){j=j+'<li class="slide-link-'+g+' current-slide"><a>'+h+"</a></li>"}if(d.options.thumb_links){d.options.slides[g].thumb?i=d.options.slides[g].thumb:i=d.options.slides[g].image;f=f+'<li class="thumb'+g+' current-thumb"><img src="'+i+'"/></li>'}}else{if(d.options.slide_links){j=j+'<li class="slide-link-'+g+'" ><a>'+h+"</a></li>"}if(d.options.thumb_links){d.options.slides[g].thumb?i=d.options.slides[g].thumb:i=d.options.slides[g].image;f=f+'<li class="thumb'+g+'"><img src="'+i+'"/></li>'}}g++}if(d.options.slide_links){a(vars.slide_list).html(j)}if(d.options.thumb_links&&vars.thumb_tray.length){a(vars.thumb_tray).append('<ul id="'+vars.thumb_list.replace("#","")+'">'+f+"</ul>")}a(d.el).append(e);if(d.options.thumbnail_navigation){vars.current_slide-1<0?prevThumb=d.options.slides.length-1:prevThumb=vars.current_slide-1;a(vars.prev_thumb).show().html(a("<img/>").attr("src",d.options.slides[prevThumb].image));vars.current_slide==d.options.slides.length-1?nextThumb=0:nextThumb=vars.current_slide+1;a(vars.next_thumb).show().html(a("<img/>").attr("src",d.options.slides[nextThumb].image))}d._start()};d._start=function(){if(d.options.start_slide){vars.current_slide=d.options.start_slide-1}else{vars.current_slide=Math.floor(Math.random()*d.options.slides.length)}var o=d.options.new_window?' target="_blank"':"";if(d.options.performance==3){d.$el.addClass("speed")}else{if((d.options.performance==1)||(d.options.performance==2)){d.$el.addClass("quality")}}if(d.options.random){arr=d.options.slides;for(var h,m,k=arr.length;k;h=parseInt(Math.random()*k),m=arr[--k],arr[k]=arr[h],arr[h]=m){}d.options.slides=arr
}if(d.options.slides.length>1){if(d.options.slides.length>2){vars.current_slide-1<0?loadPrev=d.options.slides.length-1:loadPrev=vars.current_slide-1;var g=(d.options.slides[loadPrev].url)?"href='"+d.options.slides[loadPrev].url+"'":"";var q=a('<img src="'+d.options.slides[loadPrev].image+'"/>');var n=d.el+" li:eq("+loadPrev+")";q.appendTo(n).wrap("<a "+g+o+"></a>").parent().parent().addClass("image-loading prevslide");q.load(function(){a(this).data("origWidth",a(this).width()).data("origHeight",a(this).height());d.resizeNow()})}}else{d.options.slideshow=0}g=(api.getField("url"))?"href='"+api.getField("url")+"'":"";var l=a('<img src="'+api.getField("image")+'"/>');var f=d.el+" li:eq("+vars.current_slide+")";l.appendTo(f).wrap("<a "+g+o+"></a>").parent().parent().addClass("image-loading activeslide");l.load(function(){d._origDim(a(this));d.resizeNow();d.launch();if(typeof theme!="undefined"&&typeof theme._init=="function"){theme._init()}});if(d.options.slides.length>1){vars.current_slide==d.options.slides.length-1?loadNext=0:loadNext=vars.current_slide+1;g=(d.options.slides[loadNext].url)?"href='"+d.options.slides[loadNext].url+"'":"";var e=a('<img src="'+d.options.slides[loadNext].image+'"/>');var p=d.el+" li:eq("+loadNext+")";e.appendTo(p).wrap("<a "+g+o+"></a>").parent().parent().addClass("image-loading");e.load(function(){a(this).data("origWidth",a(this).width()).data("origHeight",a(this).height());d.resizeNow()})}d.$el.css("visibility","hidden");a(".load-item").hide()};d.launch=function(){d.$el.css("visibility","visible");a("#supersized-loader").remove();if(typeof theme!="undefined"&&typeof theme.beforeAnimation=="function"){theme.beforeAnimation("next")}a(".load-item").show();if(d.options.keyboard_nav){a(document.documentElement).keyup(function(e){if(vars.in_animation){return false}if((e.keyCode==37)||(e.keyCode==40)){clearInterval(vars.slideshow_interval);d.prevSlide()}else{if((e.keyCode==39)||(e.keyCode==38)){clearInterval(vars.slideshow_interval);d.nextSlide()}else{if(e.keyCode==32&&!vars.hover_pause){clearInterval(vars.slideshow_interval);d.playToggle()}}}})}if(d.options.slideshow&&d.options.pause_hover){a(d.el).hover(function(){if(vars.in_animation){return false}vars.hover_pause=true;if(!vars.is_paused){vars.hover_pause="resume";d.playToggle()}},function(){if(vars.hover_pause=="resume"){d.playToggle();vars.hover_pause=false}})}if(d.options.slide_links){a(vars.slide_list+"> li").click(function(){index=a(vars.slide_list+"> li").index(this);targetSlide=index+1;d.goTo(targetSlide);return false})}if(d.options.thumb_links){a(vars.thumb_list+"> li").click(function(){index=a(vars.thumb_list+"> li").index(this);targetSlide=index+1;api.goTo(targetSlide);return false})}if(d.options.slideshow&&d.options.slides.length>1){if(d.options.autoplay&&d.options.slides.length>1){vars.slideshow_interval=setInterval(d.nextSlide,d.options.slide_interval)}else{vars.is_paused=true}a(".load-item img").bind("contextmenu mousedown",function(){return false})}a(window).resize(function(){d.resizeNow()})};d.resizeNow=function(){return d.$el.each(function(){a("img",d.el).each(function(){thisSlide=a(this);var f=(thisSlide.data("origHeight")/thisSlide.data("origWidth")).toFixed(2);var e=d.$el.width(),h=d.$el.height(),i;if(d.options.fit_always){if((h/e)>f){g()}else{j()}}else{if((h<=d.options.min_height)&&(e<=d.options.min_width)){if((h/e)>f){d.options.fit_landscape&&f<1?g(true):j(true)}else{d.options.fit_portrait&&f>=1?j(true):g(true)}}else{if(e<=d.options.min_width){if((h/e)>f){d.options.fit_landscape&&f<1?g(true):j()}else{d.options.fit_portrait&&f>=1?j():g(true)}}else{if(h<=d.options.min_height){if((h/e)>f){d.options.fit_landscape&&f<1?g():j(true)}else{d.options.fit_portrait&&f>=1?j(true):g()}}else{if((h/e)>f){d.options.fit_landscape&&f<1?g():j()}else{d.options.fit_portrait&&f>=1?j():g()}}}}}function g(k){if(k){if(thisSlide.width()<e||thisSlide.width()<d.options.min_width){if(thisSlide.width()*f>=d.options.min_height){thisSlide.width(d.options.min_width);
thisSlide.height(thisSlide.width()*f)}else{j()}}}else{if(d.options.min_height>=h&&!d.options.fit_landscape){if(e*f>=d.options.min_height||(e*f>=d.options.min_height&&f<=1)){thisSlide.width(e);thisSlide.height(e*f)}else{if(f>1){thisSlide.height(d.options.min_height);thisSlide.width(thisSlide.height()/f)}else{if(thisSlide.width()<e){thisSlide.width(e);thisSlide.height(thisSlide.width()*f)}}}}else{thisSlide.width(e);thisSlide.height(e*f)}}}function j(k){if(k){if(thisSlide.height()<h){if(thisSlide.height()/f>=d.options.min_width){thisSlide.height(d.options.min_height);thisSlide.width(thisSlide.height()/f)}else{g(true)}}}else{if(d.options.min_width>=e){if(h/f>=d.options.min_width||f>1){thisSlide.height(h);thisSlide.width(h/f)}else{if(f<=1){thisSlide.width(d.options.min_width);thisSlide.height(thisSlide.width()*f)}}}else{thisSlide.height(h);thisSlide.width(h/f)}}}if(thisSlide.parents("li").hasClass("image-loading")){a(".image-loading").removeClass("image-loading")}if(d.options.horizontal_center){a(this).css("left",(e-a(this).width())/2)}if(d.options.vertical_center){a(this).css("top",(h-a(this).height())/2)}});if(d.options.image_protect){a("img",d.el).bind("contextmenu mousedown",function(){return false})}return false})};d.nextSlide=function(){if(vars.in_animation||!api.options.slideshow){return false}else{vars.in_animation=true}clearInterval(vars.slideshow_interval);var h=d.options.slides,e=d.$el.find(".activeslide");a(".prevslide").removeClass("prevslide");e.removeClass("activeslide").addClass("prevslide");vars.current_slide+1==d.options.slides.length?vars.current_slide=0:vars.current_slide++;var g=a(d.el+" li:eq("+vars.current_slide+")"),i=d.$el.find(".prevslide");if(d.options.performance==1){d.$el.removeClass("quality").addClass("speed")}loadSlide=false;vars.current_slide==d.options.slides.length-1?loadSlide=0:loadSlide=vars.current_slide+1;var k=d.el+" li:eq("+loadSlide+")";if(!a(k).html()){var j=d.options.new_window?' target="_blank"':"";imageLink=(d.options.slides[loadSlide].url)?"href='"+d.options.slides[loadSlide].url+"'":"";var f=a('<img src="'+d.options.slides[loadSlide].image+'"/>');f.appendTo(k).wrap("<a "+imageLink+j+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden");f.load(function(){d._origDim(a(this));d.resizeNow()})}if(d.options.thumbnail_navigation==1){vars.current_slide-1<0?prevThumb=d.options.slides.length-1:prevThumb=vars.current_slide-1;a(vars.prev_thumb).html(a("<img/>").attr("src",d.options.slides[prevThumb].image));nextThumb=loadSlide;a(vars.next_thumb).html(a("<img/>").attr("src",d.options.slides[nextThumb].image))}if(typeof theme!="undefined"&&typeof theme.beforeAnimation=="function"){theme.beforeAnimation("next")}if(d.options.slide_links){a(".current-slide").removeClass("current-slide");a(vars.slide_list+"> li").eq(vars.current_slide).addClass("current-slide")}g.css("visibility","hidden").addClass("activeslide");switch(d.options.transition){case 0:case"none":g.css("visibility","visible");vars.in_animation=false;break;case 1:case"fade":g.animate({opacity:0},0).css("visibility","visible").animate({opacity:1,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 2:case"slideTop":g.animate({top:-d.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 3:case"slideRight":g.animate({left:d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 4:case"slideBottom":g.animate({top:d.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 5:case"slideLeft":g.animate({left:-d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 6:case"carouselRight":g.animate({left:d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()
});e.animate({left:-d.$el.width(),avoidTransforms:false},d.options.transition_speed);break;case 7:case"carouselLeft":g.animate({left:-d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});e.animate({left:d.$el.width(),avoidTransforms:false},d.options.transition_speed);break}return false};d.prevSlide=function(){if(vars.in_animation||!api.options.slideshow){return false}else{vars.in_animation=true}clearInterval(vars.slideshow_interval);var h=d.options.slides,e=d.$el.find(".activeslide");a(".prevslide").removeClass("prevslide");e.removeClass("activeslide").addClass("prevslide");vars.current_slide==0?vars.current_slide=d.options.slides.length-1:vars.current_slide--;var g=a(d.el+" li:eq("+vars.current_slide+")"),i=d.$el.find(".prevslide");if(d.options.performance==1){d.$el.removeClass("quality").addClass("speed")}loadSlide=false;vars.current_slide-1<0?loadSlide=d.options.slides.length-1:loadSlide=vars.current_slide-1;var k=d.el+" li:eq("+loadSlide+")";if(!a(k).html()){var j=d.options.new_window?' target="_blank"':"";imageLink=(d.options.slides[loadSlide].url)?"href='"+d.options.slides[loadSlide].url+"'":"";var f=a('<img src="'+d.options.slides[loadSlide].image+'"/>');f.appendTo(k).wrap("<a "+imageLink+j+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden");f.load(function(){d._origDim(a(this));d.resizeNow()})}if(d.options.thumbnail_navigation==1){prevThumb=loadSlide;a(vars.prev_thumb).html(a("<img/>").attr("src",d.options.slides[prevThumb].image));vars.current_slide==d.options.slides.length-1?nextThumb=0:nextThumb=vars.current_slide+1;a(vars.next_thumb).html(a("<img/>").attr("src",d.options.slides[nextThumb].image))}if(typeof theme!="undefined"&&typeof theme.beforeAnimation=="function"){theme.beforeAnimation("prev")}if(d.options.slide_links){a(".current-slide").removeClass("current-slide");a(vars.slide_list+"> li").eq(vars.current_slide).addClass("current-slide")}g.css("visibility","hidden").addClass("activeslide");switch(d.options.transition){case 0:case"none":g.css("visibility","visible");vars.in_animation=false;d.afterAnimation();break;case 1:case"fade":g.animate({opacity:0},0).css("visibility","visible").animate({opacity:1,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 2:case"slideTop":g.animate({top:d.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 3:case"slideRight":g.animate({left:-d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 4:case"slideBottom":g.animate({top:-d.$el.height()},0).css("visibility","visible").animate({top:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 5:case"slideLeft":g.animate({left:d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});break;case 6:case"carouselRight":g.animate({left:-d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});e.animate({left:0},0).animate({left:d.$el.width(),avoidTransforms:false},d.options.transition_speed);break;case 7:case"carouselLeft":g.animate({left:d.$el.width()},0).css("visibility","visible").animate({left:0,avoidTransforms:false},d.options.transition_speed,function(){d.afterAnimation()});e.animate({left:0},0).animate({left:-d.$el.width(),avoidTransforms:false},d.options.transition_speed);break}return false};d.playToggle=function(){if(vars.in_animation||!api.options.slideshow){return false}if(vars.is_paused){vars.is_paused=false;if(typeof theme!="undefined"&&typeof theme.playToggle=="function"){theme.playToggle("play")}vars.slideshow_interval=setInterval(d.nextSlide,d.options.slide_interval)
}else{vars.is_paused=true;if(typeof theme!="undefined"&&typeof theme.playToggle=="function"){theme.playToggle("pause")}clearInterval(vars.slideshow_interval)}return false};d.goTo=function(f){if(vars.in_animation||!api.options.slideshow){return false}var e=d.options.slides.length;if(f<0){f=e}else{if(f>e){f=1}}f=e-f+1;clearInterval(vars.slideshow_interval);if(typeof theme!="undefined"&&typeof theme.goTo=="function"){theme.goTo()}if(vars.current_slide==e-f){if(!(vars.is_paused)){vars.slideshow_interval=setInterval(d.nextSlide,d.options.slide_interval)}return false}if(e-f>vars.current_slide){vars.current_slide=e-f-1;vars.update_images="next";d._placeSlide(vars.update_images)}else{if(e-f<vars.current_slide){vars.current_slide=e-f+1;vars.update_images="prev";d._placeSlide(vars.update_images)}}if(d.options.slide_links){a(vars.slide_list+"> .current-slide").removeClass("current-slide");a(vars.slide_list+"> li").eq((e-f)).addClass("current-slide")}if(d.options.thumb_links){a(vars.thumb_list+"> .current-thumb").removeClass("current-thumb");a(vars.thumb_list+"> li").eq((e-f)).addClass("current-thumb")}};d._placeSlide=function(e){var h=d.options.new_window?' target="_blank"':"";loadSlide=false;if(e=="next"){vars.current_slide==d.options.slides.length-1?loadSlide=0:loadSlide=vars.current_slide+1;var g=d.el+" li:eq("+loadSlide+")";if(!a(g).html()){var h=d.options.new_window?' target="_blank"':"";imageLink=(d.options.slides[loadSlide].url)?"href='"+d.options.slides[loadSlide].url+"'":"";var f=a('<img src="'+d.options.slides[loadSlide].image+'"/>');f.appendTo(g).wrap("<a "+imageLink+h+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden");f.load(function(){d._origDim(a(this));d.resizeNow()})}d.nextSlide()}else{if(e=="prev"){vars.current_slide-1<0?loadSlide=d.options.slides.length-1:loadSlide=vars.current_slide-1;var g=d.el+" li:eq("+loadSlide+")";if(!a(g).html()){var h=d.options.new_window?' target="_blank"':"";imageLink=(d.options.slides[loadSlide].url)?"href='"+d.options.slides[loadSlide].url+"'":"";var f=a('<img src="'+d.options.slides[loadSlide].image+'"/>');f.appendTo(g).wrap("<a "+imageLink+h+"></a>").parent().parent().addClass("image-loading").css("visibility","hidden");f.load(function(){d._origDim(a(this));d.resizeNow()})}d.prevSlide()}}};d._origDim=function(e){e.data("origWidth",e.width()).data("origHeight",e.height())};d.afterAnimation=function(){if(d.options.performance==1){d.$el.removeClass("speed").addClass("quality")}if(vars.update_images){vars.current_slide-1<0?setPrev=d.options.slides.length-1:setPrev=vars.current_slide-1;vars.update_images=false;a(".prevslide").removeClass("prevslide");a(d.el+" li:eq("+setPrev+")").addClass("prevslide")}vars.in_animation=false;if(!vars.is_paused&&d.options.slideshow){vars.slideshow_interval=setInterval(d.nextSlide,d.options.slide_interval);if(d.options.stop_loop&&vars.current_slide==d.options.slides.length-1){d.playToggle()}}if(typeof theme!="undefined"&&typeof theme.afterAnimation=="function"){theme.afterAnimation()}return false};d.getField=function(e){return d.options.slides[vars.current_slide][e]};d.init()};a.supersized.vars={thumb_tray:"#thumb-tray",thumb_list:"#thumb-list",slide_list:"#slide-list",current_slide:0,in_animation:false,is_paused:false,hover_pause:false,slideshow_interval:false,update_images:false,options:{}};a.supersized.defaultOptions={slideshow:1,autoplay:1,start_slide:1,stop_loop:0,random:0,slide_interval:5000,transition:1,transition_speed:750,new_window:1,pause_hover:0,keyboard_nav:1,performance:1,image_protect:1,fit_always:0,fit_landscape:0,fit_portrait:1,min_width:0,min_height:0,horizontal_center:1,vertical_center:1,slide_links:1,thumb_links:1,thumbnail_navigation:0};a.fn.supersized=function(b){return this.each(function(){(new a.supersized(b))})}})(jQuery);(function(a){theme={_init:function(){if(api.options.slide_links){a(vars.slide_list).css("margin-left",-a(vars.slide_list).width()/2)}if(api.options.autoplay){if(api.options.progress_bar){theme.progressBar()
}}else{if(a(vars.play_button).attr("src")){a(vars.play_button).attr("src",vars.image_path+"play.png")}if(api.options.progress_bar){a(vars.progress_bar).stop().animate({left:-a(window).width()},0)}}a(vars.thumb_tray).animate({bottom:-a(vars.thumb_tray).height()},0);a(vars.tray_button).toggle(function(){a(vars.thumb_tray).stop().animate({bottom:0,avoidTransforms:true},300);if(a(vars.tray_arrow).attr("src")){a(vars.tray_arrow).attr("src",vars.image_path+"button-tray-down.png")}return false},function(){a(vars.thumb_tray).stop().animate({bottom:-a(vars.thumb_tray).height(),avoidTransforms:true},300);if(a(vars.tray_arrow).attr("src")){a(vars.tray_arrow).attr("src",vars.image_path+"button-tray-up.png")}return false});a(vars.thumb_list).width(a("> li",vars.thumb_list).length*a("> li",vars.thumb_list).outerWidth(true));if(a(vars.slide_total).length){a(vars.slide_total).html(api.options.slides.length)}if(api.options.thumb_links){if(a(vars.thumb_list).width()<=a(vars.thumb_tray).width()){a(vars.thumb_back+","+vars.thumb_forward).fadeOut(0)}vars.thumb_interval=Math.floor(a(vars.thumb_tray).width()/a("> li",vars.thumb_list).outerWidth(true))*a("> li",vars.thumb_list).outerWidth(true);vars.thumb_page=0;a(vars.thumb_forward).click(function(){if(vars.thumb_page-vars.thumb_interval<=-a(vars.thumb_list).width()){vars.thumb_page=0;a(vars.thumb_list).stop().animate({left:vars.thumb_page},{duration:500,easing:"easeOutExpo"})}else{vars.thumb_page=vars.thumb_page-vars.thumb_interval;a(vars.thumb_list).stop().animate({left:vars.thumb_page},{duration:500,easing:"easeOutExpo"})}});a(vars.thumb_back).click(function(){if(vars.thumb_page+vars.thumb_interval>0){vars.thumb_page=Math.floor(a(vars.thumb_list).width()/vars.thumb_interval)*-vars.thumb_interval;if(a(vars.thumb_list).width()<=-vars.thumb_page){vars.thumb_page=vars.thumb_page+vars.thumb_interval}a(vars.thumb_list).stop().animate({left:vars.thumb_page},{duration:500,easing:"easeOutExpo"})}else{vars.thumb_page=vars.thumb_page+vars.thumb_interval;a(vars.thumb_list).stop().animate({left:vars.thumb_page},{duration:500,easing:"easeOutExpo"})}})}a(vars.next_slide).click(function(){api.nextSlide()});a(vars.prev_slide).click(function(){api.prevSlide()});if(jQuery.support.opacity){a(vars.prev_slide+","+vars.next_slide).mouseover(function(){a(this).stop().animate({opacity:1},100)}).mouseout(function(){a(this).stop().animate({opacity:0.6},100)})}if(api.options.thumbnail_navigation){a(vars.next_thumb).click(function(){api.nextSlide()});a(vars.prev_thumb).click(function(){api.prevSlide()})}a(vars.play_button).click(function(){api.playToggle()});if(api.options.mouse_scrub){a(vars.thumb_tray).mousemove(function(f){var c=a(vars.thumb_tray).width(),g=a(vars.thumb_list).width();if(g>c){var b=1,d=f.pageX-b;if(d>10||d<-10){b=f.pageX;newX=(c-g)*(f.pageX/c);d=parseInt(Math.abs(parseInt(a(vars.thumb_list).css("left"))-newX)).toFixed(0);a(vars.thumb_list).stop().animate({left:newX},{duration:d*3,easing:"easeOutExpo"})}}})}a(window).resize(function(){if(api.options.progress_bar&&!vars.in_animation){if(vars.slideshow_interval){clearInterval(vars.slideshow_interval)}if(api.options.slides.length-1>0){clearInterval(vars.slideshow_interval)}a(vars.progress_bar).stop().animate({left:-a(window).width()},0);if(!vars.progressDelay&&api.options.slideshow){vars.progressDelay=setTimeout(function(){if(!vars.is_paused){theme.progressBar();vars.slideshow_interval=setInterval(api.nextSlide,api.options.slide_interval)}vars.progressDelay=false},1000)}}if(api.options.thumb_links&&vars.thumb_tray.length){vars.thumb_page=0;vars.thumb_interval=Math.floor(a(vars.thumb_tray).width()/a("> li",vars.thumb_list).outerWidth(true))*a("> li",vars.thumb_list).outerWidth(true);if(a(vars.thumb_list).width()>a(vars.thumb_tray).width()){a(vars.thumb_back+","+vars.thumb_forward).fadeIn("fast");a(vars.thumb_list).stop().animate({left:0},200)}else{a(vars.thumb_back+","+vars.thumb_forward).fadeOut("fast")}}})},goTo:function(){if(api.options.progress_bar&&!vars.is_paused){a(vars.progress_bar).stop().animate({left:-a(window).width()},0);
theme.progressBar()}},playToggle:function(b){if(b=="play"){if(a(vars.play_button).attr("src")){a(vars.play_button).attr("src",vars.image_path+"pause.png")}if(api.options.progress_bar&&!vars.is_paused){theme.progressBar()}}else{if(b=="pause"){if(a(vars.play_button).attr("src")){a(vars.play_button).attr("src",vars.image_path+"play.png")}if(api.options.progress_bar&&vars.is_paused){a(vars.progress_bar).stop().animate({left:-a(window).width()},0)}}}},beforeAnimation:function(b){if(api.options.progress_bar&&!vars.is_paused){a(vars.progress_bar).stop().animate({left:-a(window).width()},0)}if(a(vars.slide_caption).length){(api.getField("title"))?a(vars.slide_caption).html(api.getField("title")):a(vars.slide_caption).html("")}if(vars.slide_current.length){a(vars.slide_current).html(vars.current_slide+1)}if(api.options.thumb_links){a(".current-thumb").removeClass("current-thumb");a("li",vars.thumb_list).eq(vars.current_slide).addClass("current-thumb");if(a(vars.thumb_list).width()>a(vars.thumb_tray).width()){if(b=="next"){if(vars.current_slide==0){vars.thumb_page=0;a(vars.thumb_list).stop().animate({left:vars.thumb_page},{duration:500,easing:"easeOutExpo"})}else{if(a(".current-thumb").offset().left-a(vars.thumb_tray).offset().left>=vars.thumb_interval){vars.thumb_page=vars.thumb_page-vars.thumb_interval;a(vars.thumb_list).stop().animate({left:vars.thumb_page},{duration:500,easing:"easeOutExpo"})}}}else{if(b=="prev"){if(vars.current_slide==api.options.slides.length-1){vars.thumb_page=Math.floor(a(vars.thumb_list).width()/vars.thumb_interval)*-vars.thumb_interval;if(a(vars.thumb_list).width()<=-vars.thumb_page){vars.thumb_page=vars.thumb_page+vars.thumb_interval}a(vars.thumb_list).stop().animate({left:vars.thumb_page},{duration:500,easing:"easeOutExpo"})}else{if(a(".current-thumb").offset().left-a(vars.thumb_tray).offset().left<0){if(vars.thumb_page+vars.thumb_interval>0){return false}vars.thumb_page=vars.thumb_page+vars.thumb_interval;a(vars.thumb_list).stop().animate({left:vars.thumb_page},{duration:500,easing:"easeOutExpo"})}}}}}}},afterAnimation:function(){if(api.options.progress_bar&&!vars.is_paused){theme.progressBar()}},progressBar:function(){a(vars.progress_bar).stop().animate({left:-a(window).width()},0).animate({left:0},api.options.slide_interval)}};a.supersized.themeVars={progress_delay:false,thumb_page:false,thumb_interval:false,image_path:"img/",play_button:"#pauseplay",next_slide:"#nextslide",prev_slide:"#prevslide",next_thumb:"#nextthumb",prev_thumb:"#prevthumb",slide_caption:"#slidecaption",slide_current:".slidenumber",slide_total:".totalslides",slide_list:"#slide-list",thumb_tray:"#thumb-tray",thumb_list:"#thumb-list",thumb_forward:"#thumb-forward",thumb_back:"#thumb-back",tray_arrow:"#tray-arrow",tray_button:"#tray-button",progress_bar:"#progress-bar"};a.supersized.themeOptions={progress_bar:1,mouse_scrub:0}})(jQuery);jQuery(function(a){a.supersized({slide_interval:7000,transition:1,transition_speed:600,slide_links:"blank",slides:[{image:"http://f3-h.de/main/img/slide/wildandtame.jpg",title:"WILD&TAME"},{image:"http://f3-h.de/main/img/slide/echo.jpg",title:"Echo"},{image:"http://f3-h.de/main/img/slide/metadoors.jpg",title:"METADOORS"},]})});(function(a){animatedcollapse.addDiv("projects","fade=1,speed=400,group=srv,hide=1");animatedcollapse.addDiv("infos","fade=1,speed=400,group=srv,hide=0");animatedcollapse.addDiv("experiments","fade=1,speed=400,group=srv,hide=1");animatedcollapse.ontoggle=function(c,d,b){};animatedcollapse.init()})(jQuery);