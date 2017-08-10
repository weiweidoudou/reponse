 
$(function(){

	//点击一级目录时二级目录的展开与收起
	$('.bottom-message>li>div').click(function(){
		var $file=$(this).siblings();
		//二级目录收起时展开
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

			$('.breadcrumb>li').eq(0).children('a').removeClass('active');
			$('.breadcrumb>li').eq(1).show().children('a').html($column_text).addClass('active')
				.parent()
				.nextAll().hide();
		}else{//二级目录展开时收起
			$(this).parent().removeClass('highlight-backgroundColor')//移除背景高亮样式
				.end()
				.siblings().hide()//隐藏二级目录
				.find('.document').hide()//隐藏三级目录
				.siblings().find('.file-img1').attr('src','img/unfold.png')//小图标箭头向右
				.parent().parent().parent().parent().find('span').removeClass('highlight-text');//所有span移除高亮样式

			//右边面包屑导航相应的改变
			$('.breadcrumb>li').eq(0).children('a').addClass('active')
				.end().nextAll().hide();
		}
	})

	//点击二级目录时三级目录的展开与收起
	$('.file>li>div').click(function(){
		var $document=$(this).siblings('.document');
		//三级目录收起时展开
		if ($document.is(':hidden')) {
			$(this).find('span').addClass('highlight-text')//添加文字高亮
					.siblings('.file-img1').attr('src','img/fold.png')//小图标箭头向下
					.parent().parent().siblings().find('span').removeClass('highlight-text')//其他同辈二级目录移除文字高亮样式
					.siblings('.file-img1').attr('src','img/unfold.png')//其他同辈二级目录小图标箭头向右
					.parent().siblings().hide()//其他同辈二级目录的三级目录隐藏
					.find('span').removeClass('highlight-text');//其他同辈二级目录的三级目录移除文字高亮样式

			$document.show();//二级目录的三级目录展开

			//右边面包屑导航相应的改变
			var $file_name=$(this).children('span').html();
			$('.breadcrumb>li').eq(2).show().children('a').html($file_name).addClass('active')
				.parent().nextAll().hide()
				.parent().children().eq(1).children('a').removeClass('active')
				
					
		}else{//三级目录展开时收起
			$(this).find('span').removeClass('highlight-text')//移除文字高亮样式
					.siblings('.file-img1').attr('src','img/unfold.png')//二级目录小图标箭头向右
					.parent()
					.siblings('.document').hide()//三级目录隐藏
					.find('span').removeClass('highlight-text');//并移除文字高亮

			//右边面包屑导航相应的改变
			var $file_name=$(this).children('span').html();

			$('.breadcrumb>li').eq(2).show().children('a').html($file_name).addClass('active')
				.parent().nextAll().hide();
			
		}
		
	})

	//点击三级目录文档时
	$('.document>li>div').click(function(){
		$(this).find('span').addClass('highlight-text')//文字高亮
			.parent().parent().siblings().find('span').removeClass('highlight-text');//同辈三级目录移除文字高亮样式

		//右边面包屑导航相应的改变
		var $doc_name=$(this).children('span').html();

		$('.breadcrumb>li').eq(3).show().children('a').html($doc_name).addClass('active')
			.parent().prev().children('a').removeClass('active');

	})

	//为面包屑的a添加点击事件
	//点击的超链接
	var $cli_a=$('.breadcrumb>li>a');
	$cli_a.click(function(){
		
		if(this.className==""&&!$(this).parent().is(':hidden')){

			var index=$cli_a.index(this);
			var a_text=$(this).html();
			
			var len=$('.bottom-message>li>div>span').length;


			$(this).addClass('active')
					.parent().nextAll().hide()
					.children('a').removeClass('active');


			switch(index){
				//点击面包屑中第一个超链接时左侧个人信息栏相应变化
				case 0:
					$('.bottom-message .file').hide();
					$('.bottom-message .document').hide();
					$('.bottom-message .file-img1').attr('src','img/unfold.png');
					$('.bottom-message>li').removeClass('highlight-backgroundColor');
					$('.bottom-message span').removeClass('highlight-text');

					break;

				//点击面包屑中第二个超链接时左侧个人信息栏相应变化
				case 1:
				//
					for (var i = 0; i < len; i++) {
						var a1=$('.bottom-message>li>div>span').eq(i).html();
						if(a1==a_text){

							$('.bottom-message>li').eq(i).children('.file').find('.document').hide()
								.end()
								.find('span').removeClass('highlight-text')
								.end()
								.find('.file-img1').attr('src','img/unfold.png');
						}
					}

					break;

				//点击面包屑中第三个超链接时左侧个人信息栏相应变化
				case 2:
					var a_text2=$(this).parent().prev().children('a').html();

					for (var i = 0; i < len; i++) {
						var a1=$('.bottom-message>li>div>span').eq(i).html();
						var len2=$('.bottom-message>li>.file').eq(i).children('li').children('div')
								.children('span').length;

						if(a1==a_text2){
							for (var j = 0; j <len2; j++) {
								var a2=$('.bottom-message>li>.file').eq(i).children('li')
							.children('div').children('span').eq(j).html();

								if(a2==a_text){

									$('.bottom-message>li>.file').eq(i).children('li').children('.document')
										.eq(j).find('span').removeClass('highlight-text');
								}
							}
						}
					}

					break;
			}


		}else{
				alert('内容区呈现的已是您选择的文档的内容');
			}
	})


//history-result中ul的每一个Li添加移入事件
	$('.history-result>ul>li').mouseover(function(event) {
		$(this).css('borderTop','5px solid #388ac1')
		.siblings().css('borderTop','none');
	}).mouseout(function(){
		$(this).css('borderTop','none');
	});


//点击history-previous时查询的结果显示上一个模块
	var $res_ul=$('.history-result ul');
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

//.statistics-middle-left的选项卡切换内容
	var $div_li=$('.project-name>ul>li');
	$div_li.click(function(){
		var index=$div_li.index(this);

		$(this).addClass('selected')
		.siblings().removeClass('selected');

		$('.project-table>div').eq(index).show()
		.siblings().hide();

	})


	//日历移入事件
	$('.day td').mouseover(function() {
		if($(this).html()==""){
			$(this).css('border','1px solid #fff');
		}
	});

//.carRanking中的表格添加移入事件
	$('.carRanking table tbody tr').mouseover(function(){
		$(this).addClass('selected')
		.siblings().removeClass('selected');
	})
})





