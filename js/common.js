$(document).ready(function() {

    var winH = $(window).height();
    //console.log(winH);
    var $main = $('#content #main');
    var $mainBg = $('#content #main .bg');
    var $mainTit = $('#content #main .tit');
    var $mainSlider = $('#content #main .slider') 
    var $profile = $('#content #profile');
    var $profGrph = $profile.find('.graph');
    var $pj1 = $('#content #project1');

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
        $mainBg.addClass('on');
        $mainSlider.children().eq(nextPj).addClass('on').siblings().removeClass('on');
        
        $('#header .logo a .img_logo').attr({src: 'images/common/logo_w.png'});
        $('#header .util ul li a').css({color: '#fff'});
        $mainTit.find('p').css({color: '#fff'});

        clearInterval(timer);
        
        if (current == nextPj) return false;
        
        $mainBg.find('.bg_img').css({backgroundImage: 'url("images/main/'+ bgImgArr[nextPj][0] + '")', backgroundPosition: bgImgArr[nextPj][1]});
        active ();
    });
    
    function active () {
        current = nextPj;
        /* 수직 슬라이드 움직임 추가하기 */
    }

    function playTimer () {
        timer = setInterval(function() {
            nextPj = current;
            $mainBg.addClass('on');
            $mainTit.children().eq(nextPj).addClass('on').siblings().removeClass('on');
            
            $('#header .logo a .img_logo').attr({src: 'images/common/logo_w.png'});
            $('#header .util ul li a').css({color: '#fff'});
            $mainTit.find('p').css({color: '#fff'});

            $mainBg.find('.bg_img').css({backgroundImage: 'url("images/main/'+ bgImgArr[nextPj][0] + '")', backgroundPosition: bgImgArr[nextPj][1]});
            $mainBg.find('.bg_color svg .rect').attr({transform: bgColArr[nextPj][0], fill: bgColArr[nextPj][1]});
            
            nextPj = current + 1;
            if ( nextPj == $mainTit.children().length ) nextPj = 0;
            //console.log(current, nextPj, $mainTit.find('.tit_pj1').hasClass('on'))
            
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
});
