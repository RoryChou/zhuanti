

$(function(){

    /*tab切换*/

    /**
     * @param
     * tabs tabs对应的jq选择器
     * details 相应tabs点击的内容器jq选择器
     */
    function tabSwitch(tabs, details) {

        //添加默认样式
        $(tabs).eq(0).addClass("active");
        $(details).eq(0).addClass("active");

        //点击切换
        $(tabs).click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            $(details).eq($(this).index()).addClass("active").siblings().removeClass("active");
            //球票在手时，切换tab重置轮播图
            if(tabs = '.mWrap .tickets .tabs-desc'){
                new Swiper('.tickets .active .swiper-container',{
                    btnL:$('.tickets .active .btn-l'),
                    btnR:$('.tickets .active .btn-r')
                });
            }
        })
    }
    //球票在手
    tabSwitch('.mWrap .tickets .tabs-desc','.mWrap .tickets .details')
    //武汉主场
    tabSwitch('.mWrap .wuhan .tabs-desc','.mWrap .wuhan .details')
    //客场出游
    tabSwitch('.mWrap .kechang .tabs-desc','.mWrap .kechang .details')

    /*轮播*/
    /**
     * @param
     * container 外层容器的jq选择器
     * configs 其他配置项
     * */
    function Swiper(container,configs) {
        var s = this;
        configs = configs || {};
        s.container = $(container);
        s.wrapper = s.container.find('.swiper-wrapper');
        s.sliders = s.wrapper.find('.swiper-slide');
        s.sliderWidth = s.sliders.eq(0).width();
        s.sliderHeight = s.sliders.eq(0).height();
        s.sliderNUm = s.sliders.index()+1;
        s.defaults = {
          time: 1000,
          btnL: null,
          btnR: null,
          autoPlay: true,
          mouseOver: true
        };
        s.configs = {};
        s.flag = true;
        //是否使用默认配置
        for(var i in s.defaults){
            if(configs[i]){
                s.configs[i] = configs[i]
            }else {
                s.configs[i] = s.defaults[i]
            }
        }

        //设置初始尺寸
        s.container.css({
            width: s.sliderWidth,
            height: s.sliderHeight
        });
        s.wrapper.css({
            width: s.sliderWidth*s.sliderNUm,
            height: s.sliderHeight
        });

        s.currentIndex=0;
        //下一张
        s.next = function () {
            if(s.flag){
                s.flag = false;
                s.currentIndex++;
                if(s.currentIndex >= s.sliderNUm){
                    s.currentIndex = 0
                }
                s.wrapper.animate({
                    marginLeft: -s.currentIndex*s.sliderWidth
                },s.configs.time,function () {
                    s.flag = true;
                })
            }
        };
        //上一张
        s.last = function () {
            if(s.flag){
                s.flag = false;
                s.currentIndex-- ;
                if(s.currentIndex < 0){
                    s.currentIndex = s.sliderNUm-1
                }
                s.wrapper.animate({
                    marginLeft: -s.currentIndex*s.sliderWidth
                },s.configs.time,function () {
                    s.flag = true;
                })
            }
        };
        //自动轮播
        s.autoPlay = function () {
            s.timer = setInterval(function () {
                s.next()
            },s.configs.time*2)
        };
        //左右按钮
        s.click = function () {
            var btnL = s.configs.btnL || {};
            var btnR = s.configs.btnR || {};
            if(s.configs.btnL){
                btnL.click(function () {
                    console.log('last')
                    s.last()
                })
            }
            if(s.configs.btnR){
                btnR.click(function () {
                    s.next()
                })
            }
        };
        //鼠标悬停
        s.mouseOver = function () {
            s.container.on('mouseover',function () {
                clearInterval(s.timer)
            });
            s.container.on('mouseleave',function () {
                s.autoPlay();
            })
        };
        s.init = function () {
            s.click();
            if(s.configs.autoPlay){
                s.autoPlay();
            }
            if(s.configs.autoPlay&&s.configs.mouseOver){
                s.mouseOver()
            }
        };
        s.init();
        return s;
    }

    //立兵戎马轮播
	new Swiper('.banner1 .swiper-container',{
        btnL:$('.banner1 .btn-l'),
        btnR:$('.banner1 .btn-r')
    });
    //中甲联赛
    new Swiper('.banner2 .swiper-container',{
        btnL:$('.banner2 .btn-l'),
        btnR:$('.banner2 .btn-r')
    });

    //球票在手
    new Swiper('.tickets .active .swiper-container',{
        btnL:$('.tickets .active .btn-l'),
        btnR:$('.tickets .active .btn-r')
    });
});

