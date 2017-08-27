
//轮播图
$(function(){ //页面加载完毕才执行

		//=========设置参数==========
		var images_box_w=730;
		//图片统一高度：
		var images_height = '454px';
		//图片路径/链接(数组形式):
		var images_url = [
			'images/banner2.jpg',
			'images/banner3.jpg',
			'images/banner4.jpg',
			'images/banner6.jpg',
			'images/banner7.jpg'
		];
		var images_count = images_url.length;
		//console.log(images_count);

		//创建节点
		//图片列表节点
		for(var j=0;j<images_count+1;j++){
			$('.banner ul').append('<li></li>')
		}
		//轮播圆点按钮节点
		for(var j=0;j<images_count;j++){
			if(j==0){
				$('.banner ol').append('<li class="current"></li>')
			}else{
				$('.banner ol').append('<li></li>')
			}
		}

		//载入图片
		$('.banner ul li').css('background-image','url('+images_url[0]+')');
		$.each(images_url,function(key,value){
			$('.banner ul li').eq(key).css('background-image','url('+value+')');
		});

		$('.banner').css('height',images_height);

		$('.banner ul').css('width',(images_count+1)*100+'%');

		$('.banner ol').css('width',images_count*20+'px');
		$('.banner ol').css('margin-left',-images_count*20*0.5-10+'px');

		//=========================

		var num = 0;
		//获取窗口宽度
		$(window).resize(function(){

			$('.banner ul li').css({width:images_box_w});
			clearInterval(timer);
			nextPlay();
			timer = setInterval(nextPlay,2000);
		});
		
		$('.banner ul li').width("730px");
		//轮播圆点
		$('.banner ol li').mouseover(function(){//用hover的话会有两个事件(鼠标进入和离开)
			$(this).addClass('current').siblings().removeClass('current');
			//第一张图： 0 * window_width
			//第二张图： 1 * window_width
			//第三张图： 2 * window_width
			//获取当前编号
			var i = $(this).index();
			//console.log(i);
			$('.banner ul').stop().animate({left:-i*730},500);
			num = i;
		});
		//向前
		var timer = null;
		function prevPlay(){
			num--;
			if(num<0){
				//悄悄把图片跳到最后一张图(复制页,与第一张图相同),然后做出图片播放动画，left参数是定位而不是移动的长度
				$('.banner ul').css({left:-images_box_w*images_count}).stop().animate({left:-images_box_w*(images_count-1)},500);
				num=images_count-1;
			}else{
				//console.log(num);
				$('.banner ul').stop().animate({left:-num*images_box_w},500);
			}
			if(num==images_count-1){
				$('.banner ol li').eq(images_count-1).addClass('current').siblings().removeClass('current');
			}else{
				$('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');

			}
		}
		//自动播放   向后
		function nextPlay(){
			num++;
			if(num>images_count){
				//播放到最后一张(复制页)后,悄悄地把图片跳到第一张,因为和第一张相同,所以难以发觉,
				$('.banner ul').css({left:0}).stop().animate({left:-images_box_w},500);
				//css({left:0})是直接悄悄改变位置，animate({left:-window_width},500)是做出移动动画
				//随后要把指针指向第二张图片,表示已经播放至第二张了。
				num=1;
			}else{
				//在最后面加入一张和第一张相同的图片，如果播放到最后一张，继续往下播，悄悄回到第一张(肉眼看不见)，从第一张播放到第二张
				//console.log(num);
				$('.banner ul').stop().animate({left:-num*images_box_w},500);
			}
			if(num==images_count){
				$('.banner ol li').eq(0).addClass('current').siblings().removeClass('current');
			}else{
				$('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');

			}
		}
		timer = setInterval(nextPlay,2000);
		//鼠标经过banner，停止定时器,离开则继续播放
		$('.banner').mouseenter(function(){
			clearInterval(timer);
			//左右箭头显示(淡入)
			$('.banner i').fadeIn();
		}).mouseleave(function(){
			timer = setInterval(nextPlay,2000);
			//左右箭头隐藏(淡出)
			$('.banner i').fadeOut();
		});
		//播放下一张
		$('.banner .right').click(function(){
			nextPlay();
		});
		//返回上一张
		$('.banner .left').click(function(){
			prevPlay();
		});
	});
	


//菜单
$(function(){
	// banner_right区开关
	var show = true;

	// ! banner_right 的二级菜单
	$('.has_menu').hover(function(){
		if (show) {
			$('.has_menu').addClass('active');
			$('.banner_nav_menu').addClass('moveToTop');
		}
	},
	function(){
		show = true;
	});
	
	
	// 点击关闭二级菜单
	$('#banner_nav_btn').click(function(){
		$(this).parent().removeClass('moveToTop');
		$('.has_menu').removeClass('active');
		show = false;
	});

	// 激活对应大标题
	$('.has_menu').mouseover(function(){
		$(this).addClass('ac').siblings().removeClass('ac');
		$('.banner_nav_menu_cont_list').eq($(this).index()).addClass('ac').siblings().removeClass('ac');
	});

	// 激活小标题对应内容块
	$('.banner_nav_menu').on('mouseover','li',function(){
		$(this).addClass('ac').siblings().removeClass('ac');
		$(this).parent().next().children('.banner_cont_mid_list').eq($(this).index()).addClass('ac').siblings().removeClass('ac');
	});

	// 显示价格
	$('.banner_nav_menu').on('change','select',function(){
		var pVal = ($(this).val())*1;
		if(pVal<300){
			$(this).next().html('¥ '+(pVal-1.5).toFixed(1)+' ~ '+'¥ '+(pVal-0.5).toFixed(1));
		}else{
			$(this).next().html('¥ '+(pVal-Math.random()*10-50).toFixed(1)+' ~ '+'¥ '+(pVal-Math.random()*20-30).toFixed(1));
		}

	});

	// 往返单程切换
	$('.banner_cont_top').on('change','input',function(){
		if ($(this).hasClass('fangcheng_btn')) {
			$(this).parent().parent().find('input.fancheng').show();
			return;
		}else{
			$(this).parent().parent().find('input.fancheng').hide();
			return;
		}
	});





	var n;
	$('.wrap ul li').hover(
		function(){
			var _this=$(this);
			n=_this.index();
			_this.addClass('current').siblings().removeClass('current');
			$('.section').hide();
			var id=_this.attr('data-index');
			$('.popup,#cate_item'+id).show();
		},
		function(){
			$('.nav_list li').removeClass('current');
			$('.popup').hide();
		}
	);
	$('.popup').hover(
		function(){
			$(this).show();
			$('.wrap li:eq('+n+')').addClass('current');
		},
		function(){
			$(this).hide();
			$('.wrap li').removeClass('current');
		}
	);
	
	
	
	//无缝向上滚动
	
	$(".scrolltop").imgscroll({
		speed: 40,    //图片滚动速度
		amount: 0,    //图片滚动过渡时间
		width: 1,     //图片滚动步数
		dir: "up"   // "left" 或 "up" 向左或向上滚动
	});
});




//左侧导航开始
$(function(){
	
	$(window).on('scroll',function(){
		if($(window).scrollTop()>$('#f1').offset().top-300){//判断滚动条的高度是否大于屏幕的一半
			$('.jd_nav_list').fadeIn();//大于则显示
		}else{
			$('.jd_nav_list').fadeOut();//小于则隐藏
		}
		var newHeight=$(window).scrollTop()+$(window).height()/2-200;
		
		$('.floor').each(function(){//遍历每一个floor内容
			///console.log($(this));
			var every=$(this).offset().top;
			if(every<newHeight){
				$('.nav_items li').eq($(this).index()-5).addClass('ac').siblings().removeClass('ac');
			}
		})
	})
	
	
	$('.nav_items li').on('click',function(){
		$(this).addClass('ac').siblings().removeClass('ac');
		$('html,body').animate({'scrollTop':$('.floor').eq($(this).index()).offset().top-20},800);
	})
        
        //3.回到顶部
      $('.s_fore1').on('click',function(){
          $('html,body').animate({//$('html,body')兼容问题body属于chrome
             scrollTop:0
         })
      });


		$('#f1 .tit_list li').hover(function(){
			var idx=$(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('#f1 .m_wrap').children('div').eq(idx).show().siblings().hide();
		})
		$('#f2 .tit_list li').hover(function(){
			var idx=$(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('#f2 .m_wrap').children('div').eq(idx).show().siblings().hide();
		})
		$('#f3 .tit_list li').hover(function(){
			var idx=$(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('#f3 .m_wrap').children('div').eq(idx).show().siblings().hide();
		})
		$('#f4 .tit_list li').hover(function(){
			var idx=$(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('#f4 .m_wrap').children('div').eq(idx).show().siblings().hide();
		})
		$('#f5 .tit_list li').hover(function(){
			var idx=$(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('#f5 .m_wrap').children('div').eq(idx).show().siblings().hide();
		})
		$('#f6 .tit_list li').hover(function(){
			var idx=$(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('#f6 .m_wrap').children('div').eq(idx).show().siblings().hide();
		})
		$('#f7 .tit_list li').hover(function(){
			var idx=$(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('#f7 .m_wrap').children('div').eq(idx).show().siblings().hide();
		})
		$('#f8 .tit_list li').hover(function(){
			var idx=$(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('#f8 .m_wrap').children('div').eq(idx).show().siblings().hide();
		})
		$('#f9 .tit_list li').hover(function(){
			var idx=$(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('#f9 .m_wrap').children('div').eq(idx).show().siblings().hide();
		})
		$('#f10 .tit_list li').hover(function(){
			var idx=$(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('#f10 .m_wrap').children('div').eq(idx).show().siblings().hide();
		})
		$('#f11 .tit_list li').hover(function(){
			var idx=$(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$('#f11 .m_wrap').children('div').eq(idx).show().siblings().hide();
		})
    })
//左侧导航结束