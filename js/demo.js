
$(function(){

	//初始化
	// $('.file').hide();


	//点击一级目录时二级目录的展开与收起

	$('.bottom-message>li>div').click(function(){
		var $file=$(this).siblings();
		if ($file.is(':hidden')) {
			$(this).find('span').addClass('highlight-text')//一级目录的文字高亮
			.end()
			.siblings().show()//打开二级目录
			.parent().addClass('highlight-backgroundColor')//背景高亮
			.siblings().removeClass('highlight-backgroundColor')//其他一级目录所有的恢复正常
			.find('.file').hide()
			.find('.document').hide()
			.siblings().find('.file-img1').attr('src','img/unfold.png')
			.parent().parent().parent().parent().find('span').removeClass('highlight-text');
	
			//右边面包屑导航相应的改变
			var $column_text=$(this).children('span').html();
			$('.breadcrumb>li').eq(1).show().children('a').html($column_text).addClass('active')
			.parent()
			.nextAll().hide();
			
		}else{
			$(this).parent().removeClass('highlight-backgroundColor')
			.end()
			.find('span').removeClass('highlight-text')
			.end()
			.siblings().hide()
			.find('.document').hide()
			.siblings().find('.file-img1').attr('src','img/unfold.png')
			.parent().parent().parent().parent().find('span').removeClass('highlight-text');;

			//右边面包屑导航相应的改变
			$('.breadcrumb>li').eq(0).nextAll().hide();
		}

	})

	//点击二级目录时三级目录的展开与收起
	$('.file>li>div').click(function(){
		var $document=$(this).siblings('.document');
		if ($document.is(':hidden')) {
			$(this).find('span').addClass('highlight-text')
					.siblings('.file-img1').attr('src','img/fold.png')
					.parent().parent().siblings().find('span').removeClass('highlight-text')
					.siblings('.file-img1').attr('src','img/unfold.png')
					.parent().siblings().hide()
					.find('span').removeClass('highlight-text');

			$document.show();

			//右边面包屑导航相应的改变
			var $file_name=$(this).children('span').html();
			$('.breadcrumb>li').eq(2).show().children('a').html($file_name).addClass('active')
				.parent().nextAll().hide()
				.parent().children().eq(1).children('a').removeClass('active')
				
					
		}else{
			$(this).find('span').removeClass('highlight-text')
					.siblings('.file-img1').attr('src','img/unfold.png')
					.parent()
					.siblings('.document').hide()
					.find('span').removeClass('highlight-text');

			//右边面包屑导航相应的改变
			var $file_name=$(this).children('span').html();

			$('.breadcrumb>li').eq(2).show().children('a').html($file_name).addClass('active')
				.parent().nextAll().hide();
			
		}
		
	})

	//点击三级目录文档时
	$('.document>li>div').click(function(){
		$(this).find('span').addClass('highlight-text')
			.parent().parent().siblings().find('span').removeClass('highlight-text');

		//右边面包屑导航相应的改变
		var $doc_name=$(this).children('span').html();

		$('.breadcrumb>li').eq(3).show().children('a').html($doc_name).addClass('active')
			.parent().prev().children('a').removeClass('active');

	})

	//为面包屑的a添加点击事件
	// $('.breadcrumb>li>a').click(function(){
	// 	if(this.className==""&&!$(this).parent().is(':hidden')){
	// 		swicth($('.breadcrumb>li').index($(this).parent()[0])){
	// 			case 1:
	// 				alert(1);
	// 				break;
	// 			case 2:
	// 				alert(2);
	// 				break;
	// 			case 3:
	// 				alert(3);
	// 				break;	
	// 		}

			
	// 	}
	// })


//history-result中ul的每一个Li添加移入事件
	$('.history-result>ul>li').mouseover(function(event) {
		/* Act on the event */
		$(this).css('borderTop','5px solid #388ac1')
		.siblings().css('borderTop','none');
	});


	var $res_ul=$('.history-result ul');

//点击history-previous时查询的结果显示上一个模块

	$('.history-previous').mousedown(function(){
		if(parseInt($res_ul.css('left'))<0){
			$('.history-next').css('backgroundColor','#fff');

			if(!$res_ul.is(':animated')){
				$res_ul.animate({left:'+=690'},'slow');
			}
		}else{
			$(this).css('backgroundColor','#ccc');
		}
	}).mouseup(function(){
			$(this).css('backgroundColor','#fff');
	})
	
//点击history-next时查询的结果显示下一个模块
	$('.history-next').mousedown(function(){
		if(parseInt($res_ul.css('left'))>-2070){
			$('.history-previous').css('backgroundColor','#fff');
			if(!$res_ul.is(':animated')){
				$res_ul.animate({left:'-=690'},'slow');
			}
		}else{
			$(this).css('backgroundColor','#ccc');
		}
	}).mouseup(function(){
			$(this).css('backgroundColor','#fff');
	})

// statistics-middle-left的选项卡
	var $div_li=$('.project-name>ul>li');
	$div_li.click(function(){
		var index=$div_li.index(this);

		$(this).addClass('selected')
		.siblings().removeClass('selected');

		$('.project-table>div').eq(index).show()
		.siblings().hide();

	})


	//日历
	$('.day td').mouseover(function() {
		if($(this).html()==""){
			$(this).css('border','1px solid #fff');
		}
	});

//carRanking中的表格添加移入事件
	$('.carRanking table tbody tr').mouseover(function(){
		$(this).addClass('selected')
		.siblings().removeClass('selected');
	})

})


//切换content-bottom中的内容
function switchskin(name){
	// var $show_page=$('.content-bottom>div').html();
	// var $act_text=$('.breadcrumb>li>a.active').html();
	
	// $('.content-bottom>div').html('这是'+$act_text);
	alert(name);
}



