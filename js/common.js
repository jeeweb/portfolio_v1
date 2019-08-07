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
    var $pjTop = $('#content #pjWrap #pjImg > div');
    var $pj1 = $('#content #pjWrap #project1');
    var $pj2 = $('#content #pjWrap #project2');
    var $pj2Main = $('#content #pjWrap #project2 .cnt_main .main_img ul');
    var $pj3 = $('#content #pjWrap #project3');

    /* ====================== #main ======================== */
    var i = 0;
    var timer;
    var current = 0;
    var nextPj;
    
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
        $('#header').hide();

        var pjNum = $(this).parent().index();
        //console.log(pjNum);
        $pjTop.eq(pjNum).stop().animate({height: winH}, 'slow', function() {
            $('#pjWrap > article').eq(pjNum).show().find('.tit_top').css({height: winH}).delay(300).animate({opacity: 1, filter:'Alpha(opacity=100)'});
            $(this).delay(500).animate({height: 0});
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

        var typing = $('#aboutMe');
        var typewriter = new Typewriter(typing, {loop: true});

        typewriter.typeString('a coffee lover').pauseFor(2000).deleteChars(12)
            .typeString('dog person').pauseFor(2000).deleteChars(10)
            .typeString('beer holic').pauseFor(2000).deleteChars(10)
            .typeString('traveller').pauseFor(2000).deleteChars(10)
            .typeString('n Apple user').pauseFor(2000).deleteChars(12)
            .typeString('hard worker').pauseFor(2000).deleteChars(11)
            .typeString('quick-learner').pauseFor(2000).deleteAll()
            .typeString('passionate').pauseFor(2000).deleteAll();
       /*  function typing () {
            timer = setInterval(function () {
                var $word = $profile.find('.typing > div > div');
                
                if ($word.is(':animated')) return false;
                $word.append($word.children().first().clone()).animate({marginTop: -23}, function() {
                    $(this).children().first().remove();
                });
            }, 2000)
        } 
        typing(); */
    })

    /* ====================== #project1 ======================== */
    $pj1.slideUp();
    var $cap = $pj1.find('.overview #cap div');
    var capArr = new Array();
    
    //console.log(capArr);
    $(window).on('scroll', function() {
        scrollT = $(this).scrollTop();
        
        $cap.each(function (i) {
            capArr.push($(this).position().top);

            var start = $pj1.find('.overview').offset().top;
            var end = $pj1.find('.cnt_main').offset().top;
            var min = capArr[i];
            var max = capArr[i] + 150 * i + 100

            var y = (scrollT - start) * (max - min) / (end - start) + min;
            $(this).css({top: y})
        });
    })

    /* ====================== #project2 ======================== */
    $pj2.slideUp();
    var $brush = $pj2.find('.overview #brush');

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
    $pj3.slideUp();
    
    var timerWheel = 0;
    var $cntDetail = $pj3.find('.cnt_main .main_img div');
    var tgIdx = 0;
    var total = $cntDetail.length;
    //console.log(total);
    var $flash = $pj3.find('.overview #flash img');

    $(window).on('scroll', function () {
        clearTimeout(timer);
        scrollT = $(this).scrollTop();

        var overviewT = $pj3.find('.overview').offset().top;
        var x = 100 - (scrollT - overviewT)*0.2;
        //console.log(scrollT,y);
        $flash.css({marginRight: -x});
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


   $('#content article .tit_top .logo a').on('click', function() {
        location.reload();
    });
});
