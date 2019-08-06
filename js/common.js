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
    var $pj1 = $('#content #project1');
    var $pj2 = $('#content #project2');
    var $pj2Main = $('#content #project2 .cnt_main .main_img ul');
    var $pj3 = $('#content #project3');

    /* ====================== #main ======================== */
    var i = 0;
    var timer;
    var current = 0;
    var nextPj;
    
    var bgImgArr = [['bg_pj1.jpg','100% 50%'], ['bg_pj2.jpg','100% 100%'], ['bg_pj3.jpg','350px 100%']];
    var bgColArr = [['rotate(145, 850, 200)','#ee1c25'], ['rotate(120, 800, 200)','#99001c'], ['rotate(70, 700, 200)','#164556']]
    //console.log(bgImgArr,bgColArr);

    $mainBg.css({height: winH});
    
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
        var nextPj2 = nextPj + 1;
        if (nextPj2 == $mainTit.children().length) nextPj2 = 0;
        if (nextPj2 == current) {
            console.log('같다');
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
            $profGrph.children().eq(btnNum+1).addClass('on').siblings().removeClass('on');
            $profGrph.find('.img_graph > div').eq(btnNum).addClass('on').siblings().removeClass('on');
        });

        $profile.find('.skills a').on('click', function(e) {
            e.preventDefault();
            $profile.hide();
            $main.show();
            playTimer();
            $('#header .util ul .profile a .fa-off').css({display: 'block'}).next('.fa-on').removeAttr('style').next('.msg').text('ABOUT ME').removeAttr('style');
        })

        $profile.find('.typing > div p').eq(0).addClass('on');
        function typing () {
            timer = setInterval(function () {
                
            }, 1000)
        } 
    })

    /* ====================== #project1 ======================== */
    $pj1.hide();
    $mainTit.find('.tit_pj1 .btn_view').on('click', function(e) {
        e.preventDefault();
        clearInterval(timer);
        $main.hide();
        $('#header').hide();
        $pj1.show().find('.tit_top').css({height: winH});
        
    });

    /* ====================== #project2 ======================== */
    $pj2.hide();
    $mainTit.find('.tit_pj2 .btn_view').on('click', function(e) {
        e.preventDefault();
        clearInterval(timer);
        $main.hide();
        $('#header').hide();
        $pj2.show().find('.tit_top').css({height: winH});
    });

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
        var sub1T = $pj2.find('.cnt_sub1').offset().top;
        //var sub1ImgT = $pj2.find('.cnt_sub1 .sub_img').outerHeight(); //3093
        console.log(sub1T,scrollT);

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
    
    $pj3.hide();
     
    $mainTit.find('.tit_pj3 .btn_view').on('click', function(e) {
        e.preventDefault();
        clearInterval(timer);
        $main.hide();
        $('#header').hide();
        $pj3.show().find('.tit_top').css({height: winH});
    });
    


   $('#content article .tit_top .logo a').on('click', function() {
        location.reload();
    });
});
