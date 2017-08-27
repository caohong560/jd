$(function(){
	
	var n;
	$('.nav_list li').hover(
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
	
	

	//!存储地址数组
    var adressArr = []
    //!psm_nav导航区固定的上偏移量
    var old_top = $('.psm_nav').offset().top;
    
    
        $('.big_img').mousemove(function(ev){

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
            $('.magn img').css({"top":-t*2,"left":-l*2});


        });
        //离开隐藏
        $('.big_img').mouseleave(function(){
            $('.drag,.magn').hide();
        });

        //!鼠标悬浮激活对应大图
        $('#small_pic_box li').mouseenter(function(){
            $(this).addClass('ac').siblings().removeClass('ac');
            var _this = $(this);
            var oLink = $(this).find('img').prop('src');
            $('.pic_area .s_pic').prop('src',oLink);     //将小图地址复制给大图
            $('.pic_area .bb_pic').prop('src','images/glass_img/a'+(_this.index()+1)+'big.jpg');
        });
		
		//左右切换
		 var page = 1;
	    var i = 4; //每版放4个图片
	    //向后 按钮
	    $("i.sprite-arrow-next").click(function(){    //绑定click事件
		   var content = $("div.small_img_list");
		   var content_list = $("ul#small_pic_box");
		   var v_width = content.width();
		   var len = content.find("li").length;
		   var page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数
		   if( !content_list.is(":animated") ){    //判断“内容展示区域”是否正在处于动画
		     if( page == page_count ){  //已经到最后一个版面了,如果再向后，必须跳转到第一个版面。
		    content_list.animate({ left : '0px'}, "slow"); //通过改变left值，跳转到第一个版面
		    page = 1;
		     }else{
		    content_list.animate({ left : '-='+v_width }, "slow");  //通过改变left值，达到每次换一个版面
		    page++;
		    }
		   }
		   });
		//往前 按钮
		$("i.sprite-arrow-prev").click(function(){
		   var content = $("div.small_img_list");
		   var content_list = $("ul#small_pic_box");
		   var v_width = content.width();
		   var len = content.find("li").length;
		   var page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数
		   if(!content_list.is(":animated") ){    //判断“内容展示区域”是否正在处于动画
		     if(page == 1 ){  //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
		     content_list.animate({ left : '-='+v_width*(page_count-1) }, "slow");
		    page = page_count;
		   }else{
		    content_list.animate({ left : '+='+v_width }, "slow");
		    page--;
		   }
		  }
	    });
		//!切换商品版本
        $('.version').on('click','.square',function(ev){
            $(this).acOnly();
            var oPrice = 0;
            $('.version .square').each(function(i){
                var oMsg = parseInt($('.version .ac').eq(i).attr('data-price'));    //商品价格

                if (oMsg) {
                    oPrice += oMsg;     //获取总价
                }
            });
            $('.price_area .price').html(oPrice.toFixed(2));    //展示总价

            //商品价格置换
            if($(this).hasClass('ver_price')){
               var oVerPrice =  $(this).attr('data-price');
                var oVerMsg = $(this).html();

                $('#recom_price').html(oVerPrice);
                $('#ver_pic').attr('data-price',oVerPrice);
                $('.ver_msg_cc').html(oVerMsg);
                $('.sm_title_cc').html(oVerMsg)
            }
            //商品颜色置换
            //ver_msg_color  sm_title_color
            if($(this).hasClass('ver_color_f')){
                var oVerColor = $(this).find('.ver_color').html();
                $('.ver_msg_color').html(oVerColor);
                $('.sm_title_color').html(oVerColor);
            }
        });


    //!加入购物车商品数量
    $('#join_car').on('click','span,#join_btn',function(){
        //商品数量
        var num = parseInt($('#join_car input').val());
        //数量增加
        if ($(this).hasClass('plus')) {
            $('#join_car input').val(++num);
            set(num);
        }
        //数量递减
        if ($(this).hasClass('reddu')) {
            //数量为1时空大递减按钮样式
            if (num == 1) {
                set(num);
                return;
            }

            //正常情况递减并设置num
            $('#join_car input').val(--num);
            set(num);
        }
        //加入购物车
        if($(this).hasClass('join_btn')){
            if (confirm('是否加入购物车？')) {
                alert('恭喜，已将商品成功加入购物车！！')
            }
        }
        //数量递减样式
        function set(num){ //num：商品数量
            var cstyle = num == 1 ? 'not-allowed' : 'pointer';
            $('#join_car .reddu').css('cursor',cstyle);
        }
    });


    //!计算推荐区的总价
    $('#recom_cont_list input').click(function(){
        var recom_tatol = 0;
        var n = 0;
        $('#recom_cont_list input').each(function(){
            var r_price = $(this).attr('data-price')*1;
            if($(this).prop('checked')){
                recom_tatol += r_price;
                n++;
            }
        });
        var html = (recom_tatol+$('#ver_pic').attr('data-price')*1).toFixed(2);
        $('#recom_price').html(html);
        $('#recom_num').html(n);
    });


    //!选择地址
    $('#choose').hover(
        function(){
            $(this).children('.adress_list').show();
        },
        function(){
            $(this).children('.adress_list').hide();
        });

    //点击li导航激活对应导航栏及内容区域
    $('#adress_list li').click(function(){
        $(this).acOnly();
        $('#adress_cont>div').eq($(this).index()).acOnly();
    });

    $('#adress_cont').on('click','dd',function(){

        //获取索引及点击的
        var n = $(this).parent().parent().index();
        var val = $(this).html();
        adressArr.push(val);    //将值并放到数组中
        $('#adress_list li').eq(n).html(val);   //将赋值给导航

        //内容及导航点击切换
        $('#adress_cont>div').eq(n+1).acOnly();
        $('#adress_list li').eq(n+1).acOnly();

        //替换数组对应地址
        adressArr.splice(n,n+1,val);
        if(n==2){
            $('#adress_list').hide();
            $('#choose span').html(adressArr.join(' '));
        }
    });


    //!滚动事件
    $(document).scroll(function(){

        //!psm_nav区域随滚动条变化
        var psm_nav_ele = $('.psm_nav');
        var psm_nav_top = psm_nav_ele.offset().top;

        if($(this).scrollTop() > psm_nav_top){  //滚条低于psm_nav上偏移量时激活定位
            psm_nav_ele.addClass('active');
        }else if(old_top >= $(this).scrollTop()){   //反之取消定位
            psm_nav_ele.removeClass('active');
        }



    });


    //!推荐区域
        $('.recom_nav li').tabCard($('.recom_cont ul.recom_list'));
    //!评论区
        $('.psm_nav li').tabCard($('.psm_cont>div'),function(){
            if( $(document).scrollTop() > old_top){     //点击时回到区域块顶部
                $('html,body').animate({scrollTop:old_top},300);
            }
        });

    //!切换帖子
    $('.shop_discuss_nav').on('click','a',function(){
        $(this).acOnly();
        $('.shop_discuss_cont p').eq( $(this).index()).acOnly();
    });


    //!点赞
    $('.dianzan>div:first-child').click(function(){

        //切换样式
        $(this).toggleClass('ac');
        //获取点赞数,根据类名改动点赞数
       var oNum =  $(this).find('i');
        var iVal = parseInt(oNum.html());
        if($(this).hasClass('ac')){
            oNum.html(++iVal);
        }else{
            oNum.html(--iVal);
        }
    });


})
