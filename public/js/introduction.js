/**
 * Created by Administrator on 2016/3/25.
 */

$(function () {

    // nav-header
    // ============================

    $('#info').on('mouseenter',function(){
        $(this).find('.info_p1').text('Resume')
        $(this).find('.info_p2').text('前端工程师')
    }).on('mouseleave',function(){
        $(this).find('.info_p1').text('F2E')
        $(this).find('.info_p2').text('个人简历')
    })

    // part id  offsetTop
    // =============================

    var partArr    = []
    var partTopArr = []
    $('.container .slide-part').each(function (i) {

        var part       = new Object();
        part.id        = $(this).attr('id')
        part.offsetTop = $(this).offset().top

        partArr.push(part)
        partTopArr.push(part.offsetTop)
    })

    document.body.scrollTop  = partTopArr[1] - 100

    // 监听滚动条
    // =============================

    $(document).scroll(function () {
        slide(partArr)
    })

    // pages bar 点击事件
    // =============================

    $('.box-circle').on('click', function () {
        var current = $(this).data('slide-to')
        var target  = $(this).data('target')

        $(target).find('.page').each(function (i) {
            if(i == current){
                $(this).addClass('active')
                $(this).siblings().removeClass('active')
            }
        })
        $(this).addClass('active')
        $(this).siblings().removeClass('active')

        var pageSize = $(target).find('.page').length

        if(current == 0){
            $(target).find(".slide-control[data-slide='prev']").addClass('disabled')
        }
        else if(current == pageSize-1){
            $(target).find(".slide-control[data-slide='next']").addClass('disabled')
        }
        else{
            $(target).find(".slide-control[data-slide='prev']").removeClass('disabled')
            $(target).find(".slide-control[data-slide='next']").removeClass('disabled')
        }
    })


    // 上一页 下一页
    // =============================

    $('.slide-control').on('click',function(){
        var pageTarget = $(this).data('target')
        var direction  = $(this).data('slide')
        swipe(pageTarget,direction)
    })


    // 留言板
    // =============================

    $('#leave-words').on('mouseenter click',function(){
        $(this).addClass('active')
        $('body').find('.popover').addClass('active')
    })


    // 留言
    // =============================

    $('#submit').on('click', function (e) {
        e.stopPropagation()
        $('#leave-words').removeClass('active')
        $(this).parents('.popover').removeClass('active')
    })


    // 取消留言
    // =============================

    $('#cancel').on('click', function (e) {
        e.stopPropagation()
        $('#leave-words').removeClass('active')
        $(this).parents('.popover').removeClass('active')
    })
})


    // pages
    // =============================

    function swipe(dom,direction){
        var $dom    = $(dom)
        var current = 0
        var next    = 0

        $dom.find('.page').each(function (i) {
            if($(this).hasClass('active')){
                current = i
            }
        })

        switch (direction){
            case 'prev':
                next = current - 1;
                break;
            case 'next':
                next = current + 1;
                break;
        }

        var next_t  = ".box-circle[data-slide-to = next]"
        var next_id = next_t.replace('next',next)
        $(next_id).trigger('click')

    }



    // 滚动条
    // =============================

    function slide(obj){
        var scrollY   = $(document).scrollTop() +　400
        var next      = 0

        var indicators = $('.slide .indicators li')

        // 当超过最后一个slide-part
        var silde_last  = $('#'+ obj[obj.length-1].id)

        var min_height = obj[0].offsetTop
        var max_height = silde_last.height()*1 + obj[obj.length-1].offsetTop

        if(scrollY < min_height || scrollY >= max_height){
            indicators.removeClass('active')
        }
        else if(scrollY >= (obj[obj.length-1].offsetTop - 200) && scrollY <= max_height){

            indicators.each(function (i) {
                if($(this).data('target') == obj[obj.length-1].id){
                    $(this).addClass('active')
                    $(this).siblings().removeClass('active')

                    //var $next = $('#'+obj[next].id)
                    silde_last.find('.title .subtitle').addClass('active')
                    silde_last.find('.content').addClass('active')

                    silde_last.siblings().find('.title .subtitle').removeClass('active')
                    silde_last.siblings().find('.content').removeClass('active')

                }
            })
        }
        else{
            var partTopArr = []
            for(var i = 0; i < obj.length ;i++){
                partTopArr.push(obj[i].offsetTop)
            }

            var prevArr = $.grep(partTopArr, function (n,i) {
                return n >= scrollY;
            },false)

            var prev = Math.min.apply(null,prevArr)
            for(var i = 0;i < obj.length;i++){
                if( obj[i].offsetTop == prev){
                    next = i-1;
                    break;
                }
            }
            if( prev > scrollY ){
                indicators.each(function (i) {
                    var dataT = $(this).data('target')
                    if(dataT == obj[next].id){
                        $(this).addClass('active')
                        $(this).siblings().removeClass('active')

                        // 显示slide-part 的content内容
                        var $next = $('#'+obj[next].id)
                        $next.find('.title .subtitle').addClass('active')
                        $next.find('.content').addClass('active')

                        $next.siblings().find('.title .subtitle').removeClass('active')
                        $next.siblings().find('.content').removeClass('active')
                    }
                })
            }
        }
    }




