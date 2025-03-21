$(document).ready(function() {

    $('.menu-item').addClass('animate__animated animate__fadeInUp');
    

    $('.team-member').addClass('animate__animated animate__fadeInUp');
    

    $('#reservationForm').submit(function(e) {
        e.preventDefault();
        

        var name = $('#name').val();
        var phone = $('#phone').val();
        var date = $('#date').val();
        var time = $('#time').val();
        var guests = $('#guests').val();
        var email = $('#email').val();
        

        Swal.fire({
            title: 'Đặt bàn thành công!',
            html: `Cảm ơn <b>${name}</b> đã đặt bàn!<br>Chúng tôi sẽ liên hệ với bạn qua số điện thoại <b>${phone}</b> để xác nhận.`,
            icon: 'success',
            confirmButtonText: 'Đóng',
            confirmButtonColor: '#e74c3c'
        });
        

        this.reset();
    });
    

    $('#contactForm').submit(function(e) {
        e.preventDefault();
        

        var name = $('#name').val();
        var email = $('#email').val();
        

        Swal.fire({
            title: 'Gửi tin nhắn thành công!',
            html: `Cảm ơn <b>${name}</b> đã gửi tin nhắn!<br>Chúng tôi sẽ phản hồi qua email <b>${email}</b> trong thời gian sớm nhất.`,
            icon: 'success',
            confirmButtonText: 'Đóng',
            confirmButtonColor: '#e74c3c'
        });
        

        this.reset();
    });
    

    function startCounter() {
        $('.counter').each(function() {
            var $this = $(this);
            var countTo = $this.attr('data-count');
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }
    
    // Bắt đầu đếm khi phần tử hiển thị trong viewport
    var counterStarted = false;
    $(window).scroll(function() {
        var hT = $('.counter-section').offset().top,
            hH = $('.counter-section').outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();
        if (wS > (hT+hH-wH) && !counterStarted){
            startCounter();
            counterStarted = true;
        }
    });
    
    // Tự động chuyển slide cho carousel
    $('.carousel').carousel({
        interval: 5000
    });
    
    // Hiệu ứng smooth scroll cho các liên kết
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-bs-toggle="tab"]').not('[data-bs-toggle="carousel"]').click(function(event) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && 
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 1000);
            }
        }
    });
    
    // Hiệu ứng hover cho các mục menu
    $('.menu-item').hover(
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1.05)');
            $(this).css('box-shadow', '0 10px 20px rgba(0,0,0,0.2)');
        },
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1)');
            $(this).css('box-shadow', '0 0 0 rgba(0,0,0,0.1)');
        }
    );
    
    // Nút back-to-top
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    
    // Thêm nút back-to-top vào body
    $('body').append('<a id="back-to-top" class="btn btn-primary btn-lg back-to-top" role="button"><i class="fas fa-arrow-up"></i></a>');
    
    // Xử lý sự kiện click cho nút back-to-top
    $('#back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    
    // Thêm CSS cho nút back-to-top
    $('<style>.back-to-top { position: fixed; bottom: 25px; right: 25px; display: none; z-index: 99; }</style>').appendTo('head');
    
    // Hiệu ứng parallax cho header
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        $('.hero-section, .page-header').css('background-position', 'center ' + (scrollTop * 0.5) + 'px');
    });
    
    
    // Xử lý nút đặt món trong trang menu
    $('.order-btn').click(function() {
        var dishName = $(this).closest('.card-body').find('.card-title').text();
        var dishPrice = $(this).closest('.card-body').find('.text-primary').text();
        
        Swal.fire({
            title: 'Đặt món thành công!',
            html: `Bạn đã đặt món: <b>${dishName}</b> - <b>${dishPrice}</b><br>Món ăn sẽ được chuẩn bị và phục vụ trong thời gian sớm nhất!`,
            icon: 'success',
            confirmButtonText: 'Đóng',
            confirmButtonColor: '#e74c3c'
        });
    });
    
    // Xử lý gallery ảnh
    if ($('.gallery-item').length) {
        $('.gallery-item').click(function() {
            var imgSrc = $(this).find('img').attr('src');
            var imgAlt = $(this).find('img').attr('alt');
            
            Swal.fire({
                imageUrl: imgSrc,
                imageAlt: imgAlt,
                showCloseButton: true,
                showConfirmButton: false
            });
        });
    }
    
    // Xử lý đăng ký sự kiện
    $('#eventRegistrationForm').submit(function(e) {
        e.preventDefault();
        
        var name = $('#name').val();
        var email = $('#email').val();
        var eventName = $('#eventName').val();
        
        Swal.fire({
            title: 'Đăng ký thành công!',
            html: `Cảm ơn <b>${name}</b> đã đăng ký tham gia sự kiện <b>${eventName}</b>!<br>Chúng tôi sẽ gửi thông tin chi tiết qua email <b>${email}</b>.`,
            icon: 'success',
            confirmButtonText: 'Đóng',
            confirmButtonColor: '#e74c3c'
        });
        
        this.reset();
    });
    
    // Thêm hiệu ứng cho các phần tử khi scroll
    function animateOnScroll() {
        $('.animate-on-scroll').each(function() {
            var position = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            if (scroll + windowHeight > position) {
                var delay = $(this).data('delay') ? $(this).data('delay') : 0;
                setTimeout(function() {
                    $(this).addClass('animated');
                }.bind(this), delay);
            }
        });
    }
    
    $(window).scroll(animateOnScroll);
    animateOnScroll();
}); 