;(function($){
    $.fn.extend({
        acOnly:function(){  //激活当前元素。this为需要激活的对象
            $(this).addClass('ac').siblings().removeClass('ac');
            return this;
        },
        magnPic:function(){ //放大镜
            $(this).mousemove(function(ev){
                // 获取位置
                var l=ev.pageX-$(this).offset().left-$('.drag').width()/2;
                var t=ev.pageY-$(this).offset().top-$('.drag').height()/2;
                //限制拖拽区域
                if(l < 0){
                    l = 0;
                };
                if(t < 0){
                    t=0;
                };
                var maxL=$(this).width()-$('.drag').width();
                var maxT=$(this).height()-$('.drag').height();
                if(l > maxL){
                    l = maxL
                };
                if(t > maxT){
                    t = maxT
                };
                //显示拖拽及图片区域
                $('.drag,.magn').show();
                $('.drag').css({"top":t,"left":l});
                $('.magn img').css({"top":-t*1.77,"left":-l*1.77});
            });
            //离开隐藏
            $(this).mouseleave(function(){
                $('.drag,.magn').hide();
            });
            return this;
        },
	    //选项卡
	    tabCard:function(contObj,fn){  //contObj:需要控制的内容区域  this:控制选项的元素 fn:回调函数
	       return this.each(function(){
	           $(this).click(function(){
	                //激活
	               $(this).acOnly();
	               contObj.eq($(this).index()).acOnly();
	
	                fn && fn(); //回调
	            });
	        });
	    },
	    tab:function(set){//set:设置参数
	    var def={//默认值 ,可设置的set参数
	        auto:true,  //自动切换
	        time:1000   //切换时间
	    };
	    var opt=$.extend(def,set);//合并对象
	    return this.each(function(){
	       var _this=$(this);
	        var aLi=_this.find('span');
	        var tabItem=_this.find('.pic_list li');
	        var timer;
	       var i=0;
	
	        aLi.click(function(){
	            i=$(this).index();
	            $(this).acOnly();
	            tabItem.eq(i).acOnly();
	
	       });

        //自动播放

        if(opt.auto){
           function run(){
                timer=setInterval(function(){
                    i++;
                    if(i==aLi.length){
                        i=0;
                    };
                    aLi.eq(i).acOnly();
                    tabItem.eq(i).acOnly();
                },opt.time);
           };
           run();
            //鼠标 入清,出开
           _this.hover(
               function(){
                   clearInterval(timer);
                },
                function(){
                    run();
                }
           );
      }
      
        
   });
}

    });

$.extend({
    //回到顶部
    backTop:function(){
        //插入元素
       var oBackTop = $('<div Class="back_top"></div>');
        $('body').append(oBackTop);
       oBackTop.click(function(){
           $('body,html').animate({scrollTop:0},500);
        })
    }
      });
 
 
$.fn.imgscroll = function(o){
	var defaults = {
		speed: 40,
		amount: 0,
		width: 1,
		dir: "left"
	};
	o = $.extend(defaults, o);
	
	return this.each(function(){
		var _li = $("li", this);
		_li.parent().parent().css({overflow: "hidden", position: "relative"}); //div
		_li.parent().css({margin: "0", padding: "0", overflow: "hidden", position: "relative", "list-style": "none"}); //ul
		_li.css({position: "relative", overflow: "hidden"}); //li
		if(o.dir == "left") _li.css({float: "left"});
		
		//初始大小
		var _li_size = 0;
		for(var i=0; i<_li.size(); i++)
			_li_size += o.dir == "left" ? _li.eq(i).outerWidth(true) : _li.eq(i).outerHeight(true);
		
		//循环所需要的元素
		if(o.dir == "left") _li.parent().css({width: (_li_size*3)+"px"});
		_li.parent().empty().append(_li.clone()).append(_li.clone()).append(_li.clone());
		_li = $("li", this);

		//滚动
		var _li_scroll = 0;
		function goto(){
			_li_scroll += o.width;
			if(_li_scroll > _li_size)
			{
				_li_scroll = 0;
				_li.parent().css(o.dir == "left" ? { left : -_li_scroll } : { top : -_li_scroll });
				_li_scroll += o.width;
			}
				_li.parent().animate(o.dir == "left" ? { left : -_li_scroll } : { top : -_li_scroll }, o.amount);
		}
		
		//开始
		var move = setInterval(function(){ goto(); }, o.speed);
		_li.parent().hover(function(){
			clearInterval(move);
		},function(){
			clearInterval(move);
			move = setInterval(function(){ goto(); }, o.speed);
		});
	});
};
      
      
      
})(jQuery);
