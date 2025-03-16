$(document).ready(function() {
    // Đảm bảo các menu-item hiển thị đúng cách
    $('.menu-item').addClass('animate__animated animate__fadeInUp');
    
    // Đảm bảo các team-member hiển thị đúng cách
    $('.team-member').addClass('animate__animated animate__fadeInUp');
    
    // Xử lý form đặt bàn
    $('#reservationForm').submit(function(e) {
        e.preventDefault();
        
        // Lấy dữ liệu từ form
        var name = $('#name').val();
        var phone = $('#phone').val();
        var date = $('#date').val();
        var time = $('#time').val();
        var guests = $('#guests').val();
        var email = $('#email').val();
        
        // Hiển thị thông báo xác nhận
        Swal.fire({
            title: 'Đặt bàn thành công!',
            html: `Cảm ơn <b>${name}</b> đã đặt bàn!<br>Chúng tôi sẽ liên hệ với bạn qua số điện thoại <b>${phone}</b> để xác nhận.`,
            icon: 'success',
            confirmButtonText: 'Đóng',
            confirmButtonColor: '#e74c3c'
        });
        
        // Reset form
        this.reset();
    });
    
    // Xử lý form liên hệ
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Lấy dữ liệu từ form
        var name = $('#name').val();
        var email = $('#email').val();
        
        // Hiển thị thông báo xác nhận
        Swal.fire({
            title: 'Gửi tin nhắn thành công!',
            html: `Cảm ơn <b>${name}</b> đã gửi tin nhắn!<br>Chúng tôi sẽ phản hồi qua email <b>${email}</b> trong thời gian sớm nhất.`,
            icon: 'success',
            confirmButtonText: 'Đóng',
            confirmButtonColor: '#e74c3c'
        });
        
        // Reset form
        this.reset();
    });
    
    // Hiệu ứng counter cho số liệu thống kê
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
    
    // Hiệu ứng đếm ngược cho sự kiện đặc biệt
    if ($('.hero-section').length) {
        // Thêm HTML cho countdown
        $('.hero-section .container').append('<div class="countdown-container mt-4"><h4 class="text-white animate__animated animate__fadeInUp">Sự kiện đặc biệt sắp diễn ra:</h4><div id="countdown" class="d-flex justify-content-center"></div></div>');
        
        // Thiết lập ngày đếm ngược (1 tháng từ ngày hiện tại)
        var countDownDate = new Date();
        countDownDate.setMonth(countDownDate.getMonth() + 1);
        
        // Cập nhật đếm ngược mỗi 1 giây
        var x = setInterval(function() {
            // Lấy thời gian hiện tại
            var now = new Date().getTime();
            
            // Tính thời gian còn lại
            var distance = countDownDate - now;
            
            // Tính toán ngày, giờ, phút, giây
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Hiển thị kết quả
            document.getElementById("countdown").innerHTML = 
                '<div class="countdown-item mx-2 p-3 bg-white text-dark rounded animate__animated animate__fadeInUp"><span class="h3 d-block">' + days + '</span>Ngày</div>' +
                '<div class="countdown-item mx-2 p-3 bg-white text-dark rounded animate__animated animate__fadeInUp" style="animation-delay: 0.2s"><span class="h3 d-block">' + hours + '</span>Giờ</div>' +
                '<div class="countdown-item mx-2 p-3 bg-white text-dark rounded animate__animated animate__fadeInUp" style="animation-delay: 0.4s"><span class="h3 d-block">' + minutes + '</span>Phút</div>' +
                '<div class="countdown-item mx-2 p-3 bg-white text-dark rounded animate__animated animate__fadeInUp" style="animation-delay: 0.6s"><span class="h3 d-block">' + seconds + '</span>Giây</div>';
            
            // Nếu đếm ngược kết thúc
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown").innerHTML = "Sự kiện đã bắt đầu!";
            }
        }, 1000);
    }
    
    // Hiệu ứng typing cho tiêu đề trang chủ
    if ($('.hero-section').length) {
        var text = $('.hero-section h1').text();
        $('.hero-section h1').text('');
        
        var i = 0;
        var speed = 100;
        
        function typeWriter() {
            if (i < text.length) {
                $('.hero-section h1').text($('.hero-section h1').text() + text.charAt(i));
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Bắt đầu hiệu ứng typing sau khi trang đã tải xong
        setTimeout(typeWriter, 1000);
    }
    
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
    
    // Tự động chuyển tab sau mỗi 5 giây trong trang menu
    if ($('#menuTab').length) {
        var tabCycle;
        
        function startTabCycle() {
            var tabs = $('#menuTab .nav-link');
            var activeIndex = tabs.index($('#menuTab .nav-link.active'));
            
            tabCycle = setInterval(function() {
                activeIndex = (activeIndex + 1) % tabs.length;
                tabs.eq(activeIndex).click();
            }, 5000);
        }
        
        // Bắt đầu chu kỳ chuyển tab
        startTabCycle();
        
        // Dừng chu kỳ khi người dùng tương tác với tab
        $('#menuTab .nav-link').click(function() {
            clearInterval(tabCycle);
            // Khởi động lại sau 10 giây không tương tác
            setTimeout(startTabCycle, 10000);
        });
    }
    
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
    
    // Thêm hiệu ứng preloader
    $(window).on('load', function() {
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });
    });
    
    // Thêm preloader HTML vào body
    $('body').prepend('<div id="preloader"><div class="spinner"></div></div>');
    
    // Thêm CSS cho preloader
    $('<style>#preloader{position:fixed;top:0;left:0;right:0;bottom:0;background-color:#fff;z-index:9999}.spinner{width:40px;height:40px;position:absolute;top:50%;left:50%;margin-top:-20px;margin-left:-20px;border:4px solid #f3f3f3;border-top:4px solid #e74c3c;border-radius:50%;animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>').appendTo('head');
}); 