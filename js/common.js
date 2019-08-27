$(document).ready(function() {
    var winWid;
    var winH;
    var scrollT;    
    var $main = $('#content #main');
    var $mainBg = $('#content #main .bg');
    var $mainTit = $('#content #main .tit');
    var $mainSlider = $('#content #main .slider'); 
    var $mainSliderV = $('#content #main .slider_v'); 
    var $profile = $('#content #profile');
    var $profGrph = $profile.find('.graph');

    var $work = $('section.pj_detail');
    var $workCnt = $work.find('.cnt');
    var $workAccess = $work.find('.cnt_access .access');
    var $pj1 = $('#project1');
    var $pj2 = $('#project2');
    var $pj3 = $('#project3');
    var $pj2Main = $pj2.find('.cnt_main .main_img ul');
    var $pj2Sub3 = $pj2.find('.cnt_sub3 .ex_white .bg_white');
    var $pjBtn = $('#nav ul');
    var laptopSize = 1440;
    var tabletSize = 1024;
    var mobileSize = 828;
    var isLaptop = $(window).width() <= laptopSize? true : false;
    var isMobile = $(window).width() <= mobileSize? true : false;

    /* ====================== #main ======================== */
    var i = 0;
    var timer;
    var current = 0;
    var nextPj;
    var cntArr = new Array();

    //$('html, body').css({overflow: 'hidden'});
    $('#header .logo a').on('click', function() {
        location.reload();        
    });

    $(window).on('resize load', function () {
        winWid = $(window).width();
        winH = $(window).height();
        //console.log(winWid, winH);

        $mainBg.css({height: winH});
        $mainSlider.css({height: winH,overflow:'hidden'});

        if ( winWid > mobileSize && isMobile == true ) {
            $('#header *').removeAttr('style');
            isMobile  = false;
        }
        else if ( winWid <= mobileSize && isMobile == false ) {
            $('#header *').removeAttr('style');
            isMobile  = true;
        }
    });

    $('#header .util .project a').on('click', function (e) {
        e.preventDefault();
        $profile.hide();
        $main.slideDown();
        playTimer();
        $mainTit.find('p').css({color: '#fff'});
        $('#header .util ul li a').css({color: '#fff'});
        $('#header .util ul .profile a > *').removeAttr('style');
        $('#header .util ul .profile a .msg').text('ABOUT ME').removeAttr('style');
        $('#header .logo a .logo_w').attr({src: 'images/common/logo_w.png'});
    })

    var bgImgArr = [['bg_pj3.jpg','350px 100%'], ['bg_pj2.jpg','100% 100%'], ['bg_pj1.jpg','100% 50%'] ];
    var bgColArr = [['rotate(70, 700, 200)','#164556'], ['rotate(120, 800, 200)','#99001c'], ['rotate(145, 850, 200)','#ee1c25']]
    //console.log(bgImgArr,bgColArr);

    $mainTit.find('.show').on('click', function(e) {
        e.preventDefault();
        nextPj = $(this).parent().index();
        //console.log(nextPj);
        
        $(this).parent().addClass('on').siblings().removeClass('on');
        $mainSlider.children().eq(nextPj).addClass('on').siblings().removeClass('on');
        
        $('#header .util ul li a').css({color: '#fff'});
        if (winWid > tabletSize) {
            $mainTit.find('p').css({color: '#fff'})
        } else {
            $mainTit.find('p').css({color: '#181616'})
        };

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
        if (winWid > laptopSize) {
            $mainSlider.children().eq(nextPj).addClass('on').stop().animate({top: 132,right: 0,width: 950,height: 635}).find('.sub').removeAttr('style').parent().siblings().removeClass('on');
            $mainSlider.children().eq(nextPj2).stop().animate({top: 800,right: 175,width: 540,height: 351}).find('.sub').hide();
            $mainSlider.children().eq(current).stop().animate({top:-300,right: 175,width: 540,height: 351}).find('.sub').hide();
        } else if (winWid <= laptopSize && winWid > tabletSize) {
            $mainSlider.children().eq(nextPj).addClass('on').stop().animate({top: 85,right: 0,width: 800,height: 520}).find('.sub').removeAttr('style').parent().siblings().removeClass('on');
            $mainSlider.children().eq(nextPj2).stop().animate({top: 700,right: 150,width: 450,height: 291}).find('.sub').hide();
            $mainSlider.children().eq(current).stop().animate({top:-300,right: 150,width: 450,height: 291}).find('.sub').hide();
        } else if (winWid <= tabletSize && winWid > mobileSize) {
            $mainSliderV.children().eq(nextPj).addClass('on').stop().animate({left: (winWid * 0.5 - 175),width: 350,height: '50%'}).siblings().removeClass('on');
            $mainSliderV.children().eq(nextPj2).stop().animate({left: (winWid - 70),width: 250,height: '40%'});
            $mainSliderV.children().eq(current).stop().animate({left:-180,width: 250,height: '40%'});
        } else {
            $mainSliderV.children().eq(nextPj).addClass('on').stop().animate({left: (winWid * 0.5 - 175),width: 350,height: '45%'}).siblings().removeClass('on');
            $mainSliderV.children().eq(nextPj2).stop().animate({left: (winWid - 70),width: 250,height: '40%'});
            $mainSliderV.children().eq(current).stop().animate({left:-180,width: 250,height: '40%'});
        }
                
        current = nextPj;
    }

    function playTimer () {
        timer = setInterval(function() {
            nextPj = current + 1;
            if ( nextPj == $mainTit.children().length ) nextPj = 0;
            //console.log(nextPj, current, $mainTit.children().length);
            $mainTit.children().eq(nextPj).addClass('on').siblings().removeClass('on');
            
            $('#header .util ul li a').css({color: '#fff'});

            if (winWid > tabletSize) {
                $mainTit.find('p').css({color: '#fff'})
            } else {
                $mainTit.find('p').css({color: '#181616'})
            };

            $mainBg.find('.bg_img').css({backgroundImage: 'url("images/main/'+ bgImgArr[nextPj][0] + '")', backgroundPosition: bgImgArr[nextPj][1]});

            if (winWid > tabletSize) {
                $mainBg.find('.bg_color svg .rect').attr({transform: bgColArr[nextPj][0], fill: bgColArr[nextPj][1]});
            } else {
                $mainBg.find('.bg_color').css({width: winWid, overflow: 'hidden'});
                $mainBg.find('.bg_color svg .rect').attr({fill: bgColArr[nextPj][1]});
            }

            active ();
        }, 3000)
    };
    playTimer ();

    $mainSlider.find('> div > img').on('click', function () {
        $(this).addClass('on').siblings().removeClass('on');
        var pjNum = $(this).parent().index();
        //console.log($(this).index(), pjNum); 
        if ($(this).index() == 0) {
            $mainTit.children().eq(pjNum).find('.btn_view').click();
        };
    });
    
    $mainSlider.on('click', function (e) {
        e.preventDefault();
        var pjNum = $(this).find('.on').index();
        console.log(pjNum, );
        $(this).prev('.tit').children().eq(pjNum).children('a').click();
    });

    /* ====================== #profile ======================== */
    $profile.hide();

    $('#header .util .profile a').on('click', function() {
        clearInterval(timer);
        $main.hide();
        $('#header .logo a .logo_w').attr({src: 'images/common/logo_b.png'});
        $('#header .util ul li a').css({color: '#181616'});
        $('#header .util ul .profile a .fa-off').css({display: 'none'}).next('.fa-on').css({display: 'block'}).next('.msg').text('HIRE ME!').css('display','block');
        $mainTit.find('p').css({color: '#181616'});
        $profile.show();
        $profile.css({height: winH});


        $profile.find('.skills .skill_btn button').on('click', function(e) {
            e.preventDefault();
            var btnNum = $(this).index();
            
            if (winWid > laptopSize) {
                $(this).css({fontSize: 40,fontFamily: 'NanumSqB'}).siblings().removeAttr('style');
            } else if ((winWid <= laptopSize) && (winWid > tabletSize)){
                $(this).css({fontSize: 30,fontFamily: 'NanumSqB'}).siblings().removeAttr('style');
            } else {
                $(this).css({fontSize: 20,fontFamily: 'NanumSqB'}).siblings().removeAttr('style');
            }
            $profGrph.children().eq(btnNum+1).addClass('on').children().removeAttr('style').parent().siblings().removeClass('on').children().css({color: '#ddd', fontSize: 18});
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
            $('#header .logo a .logo_w').attr({src: 'images/common/logo_w.png'});
        })

        var typing = ['a coffee lover','a dog person', 'beer holic', 'a traveller', 'an Apple user', 'a hard worker', 'a quick-learner', 'passionate'];
        $('#aboutMe').humanTyping(typing);
    })

    /* ====================== .pj_detail ======================== */
    winH = $(window).height();
    
    $(window).on('load', function () {
        if (winWid > mobileSize) autoNav();
        $('section.pj_detail').addClass('show');

        $workCnt.each(function (j) {
            cntArr.push($(this).offset().top + winH);
        })
    })

    $pjBtn.next('.nav_btn').on('click', function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('on');
        if ($pjBtn.parent().hasClass('on')) $pjBtn.slideDown();
        else $pjBtn.slideUp();
    })

    $work.find('.tit_top').css({height: winH});
    $work.find('.tit_top .logo a').on('click', function() {
        location.reload();
    });

    $workAccess.find('.btn_access button').on('click', function (e) {
        e.preventDefault();
        var acsNum = $(this).parents('.acs').index();
        var btnAcs = $(this).index();
        //console.log(acsNum, btnAcs);
        //console.log($(this).parents('.acs').hasClass('openwax'));
        if ($workAccess.find('> div > .acsSlider > ul').is(':animated')) return false;

        if ($(this).parents('.acs').hasClass('openwax') && btnAcs == 0) {
            $workAccess.children().eq(acsNum).find('.acsSlider > ul').prepend($workAccess.children().eq(acsNum).find('.acsSlider > ul > li').last().clone()).css({marginLeft: -300}).animate({marginLeft: 0}, function () {
                $(this).children().last().remove();
            });
        } else if ($(this).parents('.acs').hasClass('openwax') && btnAcs == 1) {
            $workAccess.children().eq(acsNum).find('.acsSlider > ul').append($workAccess.children().eq(acsNum).find('.acsSlider > ul > li').first().clone()).animate({marginLeft: -300}, function() {
                $(this).css({marginLeft: 0}).children().first().remove();
            });
        } else if (($(this).parents('.acs').hasClass('markup') || $(this).parents('.acs').hasClass('css') ) && btnAcs == 0) {
            $workAccess.children().eq(acsNum).find('.acsSlider > ul').prepend($workAccess.children().eq(acsNum).find('.acsSlider > ul > li').last().clone()).css({marginLeft: -350}).animate({marginLeft: 0}, function () {
                $(this).children().last().remove();
            });
        } else if (($(this).parents('.acs').hasClass('markup') || $(this).parents('.acs').hasClass('css') ) && btnAcs == 1) {
            $workAccess.children().eq(acsNum).find('.acsSlider > ul').append($workAccess.children().eq(acsNum).find('.acsSlider > ul > li').first().clone()).animate({marginLeft: -350}, function() {
                $(this).css({marginLeft: 0}).children().first().remove();
            });
        }
    });

    $work.find('.top_btn').on('click', function (e) {
        e.preventDefault();
        $('html, body').stop().animate({scrollTop: winH});
        $('.overview .ov_txt .btn_site a:first').focus();
    });

    $(window).on('scroll', function() {
        clearTimeout(timer);
        scrollT = $(this).scrollTop();
        //console.log(scrollT);
        var overviewT = $work.find('.overview').offset().top;

        if ($work.hasClass('show') && scrollT >= cntArr[0] - 100 && scrollT < cntArr[1]) $workCnt.eq(0).addClass('on').siblings().removeClass('on');
        else if ($work.hasClass('show') && scrollT >= cntArr[1] - 100 && scrollT < cntArr[2]) $workCnt.eq(1).addClass('on').siblings().removeClass('on');
        else if ($work.hasClass('show') && scrollT >= cntArr[2] - 100) $workCnt.eq(2).addClass('on').siblings().removeClass('on');
        else if ($work.hasClass('show') && scrollT >= cntArr[3] - 100) $workCnt.eq(3).addClass('on').siblings().removeClass('on');
        
        //surf
        var x = 100 - (scrollT - overviewT)*0.2;
        //console.log(scrollT,x);
        $flash.css({marginRight: -x});

        //belle
        var y = 140 - (scrollT - overviewT)*0.2;
        var sub1T = $work.find('.cnt_sub1').offset().top;
        var sub2T = $work.find('.cnt_sub2').offset().top;
        $brush.css({top: y})

        if (scrollT >= sub1T && scrollT < (sub2T - 1000)) $pj2.find('.cnt_sub1 .cnt_txt').css({position: 'fixed',top: 150});
        else if ( scrollT >= (sub2T - 1000) || scrollT < sub1T ) $pj2.find('.cnt_sub1 .cnt_txt').css({position: 'relative',top: sub2T - sub1T - 1000 });

        if (scrollT >= (sub1T * 1.3)) {
            $pj2.find('.cnt_sub1 .cnt_txt .sub1_txt1').stop().animate({marginTop: -50, opacity: 0, filter: 'Alpha(opacity=0)'},100);
            $pj2.find('.cnt_sub1 .cnt_txt .text2').stop().animate({marginTop: 0, opacity: 1, filter: 'Alpha(opacity=100)'},100);
        } else {
            $pj2.find('.cnt_sub1 .cnt_txt .sub1_txt1').stop().animate({marginTop: 0, opacity: 1, filter: 'Alpha(opacity=100)'},100);
            $pj2.find('.cnt_sub1 .cnt_txt .text2').stop().animate({marginTop: 50, opacity: 0, filter: 'Alpha(opacity= 0)'},100);
        }

        //illy
        var $cap = $pj1.find('.overview #cap div');
        var capArr = new Array();

        $cap.each(function (i) {
            capArr.push($(this).position().top);
            console.log(capArr);

            var start = $pj1.find('.overview').offset().top - 100;
            var end = $pj1.find('.cnt_main').offset().top;
            var min = capArr[i];
            var max = capArr[i] + 50 * i + 50
            var y = (scrollT - start) * (max - min) / (end - start) + min;
            //console.log(scrollT, start, end, min, max, y)
            $(this).css({top: y})

        });


    });

    function autoNav () {
        setTimeout(function () {
            $pjBtn.next('.nav_btn').trigger('click');
        }, 500)
        setTimeout(function () {
            $pjBtn.next('.nav_btn').click();
        }, 1000)
    }

    /* ================== illy.html (#project1) ================= */
    $pj1.find('.cnt_sub2 button').on('click', function (e) {
        e.preventDefault();
        $(this).next().toggleClass('open');
    });

    /* ================= belle.html (#project2) ================= */
    var $brush = $pj2.find('.overview #brush');
    
    $pj2.find('.cnt_main .main_img div button').on('click', function() {
        if ($pj2Main.is(':animated')) return false;
        
        var btnMain = $(this).index();
        //console.log(btnMain, current);

        if (btnMain == 0 && current <= 0) return false;
        else if (btnMain == 1 && current >= 4) return false;
        
        btnMain == 0? current-- : current++;

        if ($pj2Main.height() == 2310) $pj2Main.stop().animate({marginTop: -462 * current}, 500);/* pc */
        else if ($pj2Main.height() == 2019) $pj2Main.stop().animate({marginTop: -403.8 * current}, 500)
        
    });
    
    /* $pj2.find('.cnt_sub3 .ex_white .btn_white button').on('click', function(e) {
        e.preventDefault();
        var btnWhite = $(this).index();
        
        if ($pj2Sub3.find('> div').is(':animated')) return false;

        btnWhite == 0? current -- : current++;
        console.log(btnWhite, current);
        if (btnWhite == 0 && current <= 0) return false;
        else if (btnWhite == 0 && current > 0) {
            $pj2Sub3.find('> div').eq(current).stop().animate({opacity: 1, filter: 'Alpha(opacity=100'}, 600);
            $pj2Sub3.find('> div').eq(current + 1).stop().animate({opacity: 0, filter: 'Alpha(opacity=0'}, 600);
        } else if (btnWhite == 1 && current == 0) {
            $pj2Sub3.find('> div').eq(current).stop().animate({opacity: 1, filter: 'Alpha(opacity=100'}, 600);
        } else if (btnWhite == 1 && current > 0) {
            $pj2Sub3.find('> div').eq(current).stop().animate({opacity: 1, filter: 'Alpha(opacity=100'}, 600);
            $pj2Sub3.find('> div').eq(current - 1).stop().animate({opacity: 0, filter: 'Alpha(opacity=0'}, 600);
        } else if (btnWhite == 1 && current >= 4) return false;
        
        $pj2Sub3.find('> div').eq(current).stop().animate({opacity: 1, filter: 'Alpha(opacity=100'}, 600);
        
    }); */

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
    

    /* ================== surf.html (#project3) ================== */
    var timerWheel = 0;
    var $cntDetail = $pj3.find('.cnt_main .main_img div');
    var $pj3Cnt = $pj3.find('.cnt');
    var pj3CntArr = new Array();

    var tgIdx = 0;
    var total = $cntDetail.length;
    //console.log(total);
    var $flash = $pj3.find('.overview #flash img');
    

    $pj3Cnt.each(function (j) {
        pj3CntArr.push($(this).offset().top + winH);
    })    

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
