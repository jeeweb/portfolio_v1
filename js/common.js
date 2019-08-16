$(document).ready(function() {

    var winH = $(window).height();
    //console.log(winH);
    var scrollT;    
    var $main = $('#content #main');
    var $mainBg = $('#content #main .bg');
    var $mainTit = $('#content #main .tit');
    var $mainSlider = $('#content #main .slider') 
    var $profile = $('#content #profile');
    var $profGrph = $profile.find('.graph');
    var $pjWrap = $('#content #pjWrap');
    var $pjTop = $pjWrap.find('#pjImg > div');
    var $pj1 = $pjWrap.find('#project1');
    var $pj2 = $pjWrap.find('#project2');
    var $pj2Main = $pj2.find('.cnt_main .main_img ul');
    var $pj3 = $pjWrap.find('#project3');
    var $pjBtn = $pjWrap.find('.quick_menu');

    /* ====================== #main ======================== */
    var i = 0;
    var timer;
    var current = 0;
    var nextPj;
    var cntArr = new Array();

    $pjBtn.hide();

    $('#header .logo a').on('click', function() {
        location.reload();        
    });

    var bgImgArr = [['bg_pj1.jpg','100% 50%'], ['bg_pj2.jpg','100% 100%'], ['bg_pj3.jpg','350px 100%']];
    var bgColArr = [['rotate(145, 850, 200)','#ee1c25'], ['rotate(120, 800, 200)','#99001c'], ['rotate(70, 700, 200)','#164556']]
    //console.log(bgImgArr,bgColArr);

    $mainBg.css({height: winH});
    $mainSlider.css({height: winH,overflow:'hidden'});
    
    $mainTit.find('.show').on('click', function(e) {
        e.preventDefault();
        nextPj = $(this).parent().index();
        //console.log(nextPj);
        
        $(this).parent().addClass('on').siblings().removeClass('on');
        $mainSlider.children().eq(nextPj).addClass('on').siblings().removeClass('on');
        
        $('#header .logo a .img_logo').attr({src: 'images/common/logo_w.png'});
        $('#header .util ul li a').css({color: '#fff'});
        $mainTit.find('p').css({color: '#fff'});

        clearInterval(timer);
        
        if (current == nextPj) return false;
        
        $mainBg.find('.bg_img').css({backgroundImage: 'url("images/main/'+ bgImgArr[nextPj][0] + '")', backgroundPosition: bgImgArr[nextPj][1]});
        $mainBg.find('.bg_color svg .rect').attr({transform: bgColArr[nextPj][0], fill: bgColArr[nextPj][1]});
        active ();
    });
    
    function active () {
        var arr1 = [0,1,2];
        var arr2 = new Array();

        var nextPj2 = nextPj + 1;
        if (nextPj2 == $mainTit.children().length) nextPj2 = 0;
        
        arr2[0] = current;
        arr2[1] = nextPj;
        //console.log(arr2);

        if (nextPj2 == current) {
            //console.log('같다');
            arr1 = arr1.filter(function(val) {
                return arr2.indexOf(val) == -1;
            });
            nextPj2 = arr1[0];
        }

        $mainSlider.children().eq(nextPj).addClass('on').stop().animate({top: 132,right: 0,width: 950,height: 635}).find('.sub').removeAttr('style').parent().siblings().removeClass('on');
        $mainSlider.children().eq(nextPj2).stop().animate({top: 800,right: 175,width: 540,height: 351}).find('.sub').hide();
        $mainSlider.children().eq(current).stop().animate({top:-300,right: 175,width: 540,height: 351}).find('.sub').hide();
                
        current = nextPj;
    }

    function playTimer () {
        timer = setInterval(function() {
            nextPj = current + 1;
            if ( nextPj == $mainTit.children().length ) nextPj = 0;
            $mainTit.children().eq(nextPj).addClass('on').siblings().removeClass('on');
            
            $('#header .util ul li a').css({color: '#fff'});
            $mainTit.find('p').css({color: '#fff'});

            $mainBg.find('.bg_img').css({backgroundImage: 'url("images/main/'+ bgImgArr[nextPj][0] + '")', backgroundPosition: bgImgArr[nextPj][1]});
            $mainBg.find('.bg_color svg .rect').attr({transform: bgColArr[nextPj][0], fill: bgColArr[nextPj][1]});
                        
            active ();

        }, 3000)
    };
    playTimer ();

    $('#content #main .slider > div img').on('click', function () {
		$(this).addClass('on').siblings().removeClass('on');
    });
    
    $mainTit.find('> div > .btn_view').on('click', function (e) {
        e.preventDefault();
        clearInterval(timer);
        $main.hide();
        $pjBtn.show();

        $('#header').hide();

        var pjNum = $(this).parent().index();
        //console.log(pjNum);
        $pjTop.eq(pjNum).stop().animate({height: winH}, 'slow', function() {
            $('#pjWrap > article').eq(pjNum).show().addClass('show').find('.tit_top').css({height: winH}).delay(300).animate({opacity: 1, filter:'Alpha(opacity=100)'});
            $(this).delay(500).animate({height: 0});
            $('#pjWrap > article').eq(pjNum).find('.cnt').each(function (i) {
                cntArr.push($(this).offset().top);
            });
            //console.log(cntArr);
        });
    });

    /* ====================== #profile ======================== */
    $profile.hide();

    $('#header .util .profile a').on('click', function() {
        clearInterval(timer);
        $main.hide();
        $('#header .logo a .img_logo').attr({src: 'images/common/logo_b.png'});
        $('#header .util ul li a').css({color: '#181616'});
        $('#header .util ul .profile a .fa-off').css({display: 'none'}).next('.fa-on').css({display: 'block'}).next('.msg').text('HIRE ME!').css('display','block');
        $mainTit.find('p').css({color: '#181616'});
        $profile.show();
        $profile.css({height: winH});


        $profile.find('.skills .skill_btn button').on('click', function(e) {
            e.preventDefault();
            var btnNum = $(this).index();
            
            $(this).css({fontSize: 40,fontFamily: 'NanumSqB'}).siblings().removeAttr('style');
            $profGrph.children().eq(btnNum+1).addClass('on').children().removeAttr('style').parent().siblings().removeClass('on').children().css({color: '#ddd', fontSize: '18px'});
            $profGrph.find('.img_graph > svg').eq(btnNum).addClass('on').siblings().removeClass('on');
        });

        $profile.find('.skills a').on('click', function(e) {
            e.preventDefault();
            $profile.hide();
            $main.slideDown();
            playTimer();
            $mainTit.find('p').css({color: '#fff'});
            $('#header .util ul li a').css({color: '#fff'});
            $('#header .util ul .profile a .fa-off').css({display: 'block'}).next('.fa-on').removeAttr('style').next('.msg').text('ABOUT ME').removeAttr('style');
            $('#header .logo a .img_logo').attr({src: 'images/common/logo_w.png'});
        })

        var typing = ['a coffee lover','a dog person', 'beer holic', 'a traveller', 'an Apple user', 'a hard worker', 'a quick-learner', 'passionate'];
        $('#aboutMe').humanTyping(typing);
    })

    /* ====================== #content ======================== */
    $('#content article .tit_top .logo a').on('click', function() {
        location.reload();
    });

    $pjBtn.children('button').on('click', function (e) {
        e.preventDefault();

        var pjNum = $(this).index();
        var currentPj = $('#content article.show').index() - 1;
        //console.log(pjNum, currentPj);
        if (pjNum == currentPj) return false;
        else {
            $pjTop.eq(pjNum).stop().animate({height: winH}, 'slow', function() {
                $('#pjWrap > article').eq(pjNum).show().addClass('show').siblings('article').removeClass('show').hide();
                $('#pjWrap > article').eq(pjNum).find('.tit_top').css({height: winH}).delay(300).animate({opacity: 1, filter:'Alpha(opacity=100)'});
                $(this).delay(500).animate({height: 0});
                $('#pjWrap > article').eq(pjNum).find('.cnt').each(function (i) {
                    cntArr.push($(this).offset().top);
                });
                //console.log(cntArr);
                $('html, body').stop().animate({scrollTop: 0});
            });
        }
    });

    $pjBtn.find('.top_btn').on('click', function (e) {
        e.preventDefault();

        $('html, body').stop().animate({scrollTop: winH});
        $('#content article.show .overview').find('.btn_site a').focus();
    });

    /* ====================== #project1 ======================== */
    $pj1.slideUp();
    var $cap = $pj1.find('.overview #cap div');
    var capArr = new Array();
    //console.log(capArr);
    var $pj1Cnt = $pj1.find('.cnt');
    //console.log($pj1.find('.cnt_main').offset().top);

    $(window).on('scroll', function() {
        scrollT = $(this).scrollTop();
        //console.log(scrollT);

        $cap.each(function (i) {
            capArr.push($(this).position().top);

            var start = $pj1.find('.overview').offset().top;
            var end = $pj1.find('.cnt_main').offset().top;
            var min = capArr[i];
            var max = capArr[i] + 150 * i + 100

            var y = (scrollT - start) * (max - min) / (end - start) + min;
            $(this).css({top: y})
            //console.log(capArr);
        });
        
        //console.log(scrollT, CntArr[0],CntArr[1],CntArr[2])
        if ($pj1.hasClass('show') && scrollT >= cntArr[0] - 100 && scrollT < cntArr[1]) $pj1Cnt.eq(0).addClass('on').siblings().removeClass('on');
        else if ($pj1.hasClass('show') && scrollT >= cntArr[1] - 100 && scrollT < cntArr[2]) $pj1Cnt.eq(1).addClass('on').siblings().removeClass('on');
        else if ($pj1.hasClass('show') && scrollT >= cntArr[2] - 100) $pj1Cnt.eq(2).addClass('on').siblings().removeClass('on');
    });
    $pj1.find('.cnt_sub2 button').on('click', function (e) {
        e.preventDefault();
        $(this).next().toggleClass('open');
    });

    /* ====================== #project2 ======================== */
    var $brush = $pj2.find('.overview #brush');
    var $pj2Cnt = $pj2.find('.cnt');
    var pj2CntArr = new Array();
    
    $pj2.slideUp();
    $pj2.find('.cnt_main .main_img div button').on('click', function() {
        if ($pj2Main.is(':animated')) return false;
        
        var btnMain = $(this).index();
        //console.log(btnMain, current);

        if (btnMain == 0 && current <= 0) return false;
        else if (btnMain == 1 && current >= 4) return false;
        
        btnMain == 0? current-- : current++;
        $pj2Main.stop().animate({marginTop: -513 * current}, 500)
    });

    $(window).on('scroll', function() {
        clearTimeout(timer);
        scrollT = $(this).scrollTop();

        var overviewT = $pj2.find('.overview').offset().top;
        var y = 140 - (scrollT - overviewT)*0.2;
        //console.log(scrollT,y);
        $brush.css({top: y})

        var sub1T = $pj2.find('.cnt_sub1').offset().top;
        //console.log(sub1T,scrollT);

        if (scrollT >= sub1T && scrollT < (sub1T + 2200)) $pj2.find('.cnt_sub1 .cnt_txt').css({position: 'fixed',top: 150});
        else if ( scrollT >= (sub1T + 2200) || scrollT < sub1T ) $pj2.find('.cnt_sub1 .cnt_txt').css({position: 'relative'});

        if (scrollT >= (sub1T + 1000)) {
            $pj2.find('.cnt_sub1 .cnt_txt .sub1_txt1').stop().animate({marginTop: -50, opacity: 0, filter: 'Alpha(opacity=0)'},100);
            $pj2.find('.cnt_sub1 .cnt_txt .text2').stop().animate({marginTop: 50, opacity: 1, filter: 'Alpha(opacity=100)'},100);
        } else {
            $pj2.find('.cnt_sub1 .cnt_txt .sub1_txt1').stop().animate({marginTop: 0, opacity: 1, filter: 'Alpha(opacity=100)'},100);
            $pj2.find('.cnt_sub1 .cnt_txt .text2').stop().animate({marginTop: 0, opacity: 0, filter: 'Alpha(opacity= 0)'},100);
        }

         //console.log(scrollT, cntArr[0],cntArr[1],cntArr[2],cntArr[3])
         if ($pj2.hasClass('show') && scrollT >= cntArr[0] - 100 && scrollT < cntArr[1]) $pj2Cnt.eq(0).addClass('on').siblings().removeClass('on');
         else if ($pj2.hasClass('show') && scrollT >= cntArr[1] - 100 && scrollT < cntArr[2]) $pj2Cnt.eq(1).addClass('on').siblings().removeClass('on');
         else if ($pj2.hasClass('show') && scrollT >= cntArr[2] - 100 && scrollT < cntArr[3]) $pj2Cnt.eq(2).addClass('on').siblings().removeClass('on');
         else if ($pj2.hasClass('show') && scrollT >= cntArr[3] - 100) $pj2Cnt.eq(3).addClass('on').siblings().removeClass('on');
    });
    
    function modal(){
        $pj2.find('.cnt_sub2 .cnt_txt .sub2_txt2 a').on('click', function (e) {
            e.preventDefault();
            var $tg = $(this);
            var $modalCnt = $( $(this).attr('href') );		//#modal1 => $('#modal1')
            var $closeBtn = $modalCnt.find('.close_btn');

            $modalCnt.before('<div class="mask"></div>');

            $(window).on('resize', function () {
                var topPos = ($(this).height() - $modalCnt.outerHeight())/2;
                var leftPos = ($(this).width() - $modalCnt.outerWidth())/2;
                //console.log(topPos, leftPos);
                $modalCnt.css({top: topPos, left:leftPos});
            });
            $(window).trigger('resize');
            
            var $mask = $('.mask');
            $mask.add($modalCnt).stop().fadeIn('fast');

            $closeBtn.on('click', function () {
                $mask.add($modalCnt).stop().fadeOut('fast', function () {
                    $mask.remove();
                    $tg.focus();
                });
            });
            
            $mask.on('click', function () {
                $closeBtn.click();
            });	

            $(window).on('keydown', function (e) {
                if (e.keyCode==27) $closeBtn.click();
            });
        })
    };
    modal();

    /* ====================== #project3 ======================== */
    var timerWheel = 0;
    var $cntDetail = $pj3.find('.cnt_main .main_img div');
    var $pj3Cnt = $pj3.find('.cnt');
    var pj3CntArr = new Array();

    var tgIdx = 0;
    var total = $cntDetail.length;
    //console.log(total);
    var $flash = $pj3.find('.overview #flash img');
    
    $pj3.slideUp();

    $pj3Cnt.each(function (j) {
        pj3CntArr.push($(this).offset().top + winH);
    })

    $(window).on('scroll', function () {
        clearTimeout(timer);
        scrollT = $(this).scrollTop();

        var overviewT = $pj3.find('.overview').offset().top;
        var x = 100 - (scrollT - overviewT)*0.2;
        //console.log(scrollT,y);
        $flash.css({marginRight: -x});

        //console.log(scrollT, cntArr[0], cntArr[1], cntArr[2])
        if ($pj3.hasClass('show') && scrollT >= cntArr[0] - 100 && scrollT < cntArr[1]) $pj3Cnt.eq(0).addClass('on').siblings().removeClass('on');
        else if ($pj3.hasClass('show') && scrollT >= cntArr[1] - 100 && scrollT < cntArr[2]) $pj3Cnt.eq(1).addClass('on').siblings().removeClass('on');
        else if ($pj3.hasClass('show') && scrollT >= cntArr[2] - 100) $pj3Cnt.eq(2).addClass('on').siblings().removeClass('on');
    });

    $pj3.find('.cnt_main').on('mousewheel DOMMouseScroll', function (e) {
        e.preventDefault();
        clearTimeout(timerWheel);
        setTimeout(function () {
            if ($cntDetail.is(':animated')) return false;
            TweenLite.to('html, body', 1, {scrollTop: $pj3.find('.cnt_main').offset().top, ease:Power1.easeOut});

            var delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
            //console.log(delta); //120, -120
            
            if (delta < 0 && tgIdx <= total) {
                $cntDetail.eq(tgIdx).stop().animate({left: 0,opacity: 1, filter: 'alpha(opacity=100)'}); 
                if (tgIdx == total) {                    
                    TweenLite.to('html, body', 1, {scrollTop: $pj3.find('.cnt_sub1').offset().top, ease:Power1.easeOut});
                    return false;
                }
                tgIdx++;	//1,2,3,4
            }
            else if (delta > 0 && tgIdx >= 0) {
                $cntDetail.eq(tgIdx).stop().animate({left: 810,opacity: 0, filter: 'alpha(opacity=0)'}); 
                if (tgIdx == 0) {
                    TweenLite.to('html, body', 1, {scrollTop: $pj3.find('.overview').offset().top, ease:Power1.easeOut});
                    return false;
                }
                tgIdx--;	//3,2,1,0
            }
            console.log(tgIdx);

        }, 50);
    });


   
});
