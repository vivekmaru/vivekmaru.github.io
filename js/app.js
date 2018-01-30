/**
 * Hi! Thanks for chekcing out my code :)
 * Please note: this JavaScript has been left unprocessed so that you can look at it easily!
 * If you have any feedback please let me know!
 */

(function () {

    const model = {
        skillCounter: 0,
        navToggled: false,
    }

    const app = {

        init: function () {
            this.cacheDOM();
            this.bindEvents();
            this.toggleScroll();
            this.showSkill(model.skillCounter);
        },

        cacheDOM: function () {
            this.$skill = document.getElementsByClassName('skill');
            this.$skillArrow = $('.slider-arrow');
            this.$navOverlay = $('.nav-overlay');
            this.$toggleNav = $('.toggle-nav');
            this.$formSubmit = $('#submit');
        },

        bindEvents: function () {
            this.$skillArrow.on('click', this.skillSlider.bind(this));
            this.$toggleNav.on('click', this.toggleNav.bind(this));
            this.$formSubmit.on('click', this.validateForm);
            $(window).scroll(this.toggleScroll);
            $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(this.smoothScroll);
        },

        toggleScroll: function () {
            if ($(document).scrollTop() > 0) {
                $('nav').addClass('nav-scroll');
            } else {
                $('nav').removeClass('nav-scroll');
            }

            var scrollBarLocation = $(this).scrollTop();
            $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').each(function () {
                var sectionOffset = $(this.hash).offset().top;
                if (Math.floor(sectionOffset) <= scrollBarLocation) {
                    $(this).addClass('active');
                    $(this).siblings().removeClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });
        },

        showSkill: function (j) {
            var length = this.$skill.length;
            for (var i = 0; i < length; i++) {
                $(this.$skill[i]).hide();
            }
            $(this.$skill[j]).show();
        },

        validateForm: function (e) {
            var error = false;
            const fields = {
                name: $('#name'),
                email: $('#email'),
                message: $('#message')
            };
            if (fields.name.val() == "") {
                console.log(fields.name.addClass);
                fields.name.addClass("error");
                error = true;
            }
            if (fields.email.val() == "") {
                fields.email.addClass("error");
                error = true;
            } else {
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if (!reg.test(fields.email.val())) {
                    fields.email.addClass("error");
                    error = true;
                }
            }
            if (fields.message.val() == "") {
                fields.message.addClass("error");
                error = true;
            }
            if(!error) {
                $.ajax({
                    type: $("form").attr("method"),
                    url: $("form").attr("action"),
                    data: "name=" + $("#name").val() + "&email=" + $("#email").val() + "&message=" + $("#message").val().replace('&','%26'),
                    dataType: "json",
                    beforeSend: function() {
                        $("#status button").hide();
                    },
                    success: function(html) {
                        $("#status #success").show();
                        console.log(html);
                    },
                    error: function(html) {
                        $("#status button").show();
                        //$("#status #error").html(html).show();
                    }
                });
            }
            e.preventDefault();
        },

        skillSlider: function (e) {
            var i = $(e.target).data('value');
            model.skillCounter += Number(i);
            if (model.skillCounter < 0) {
                model.skillCounter = this.$skill.length - 1;
            }
            this.showSkill(model.skillCounter % this.$skill.length);
        },

        toggleNav: function () {
            if (model.navToggled) {
                this.$navOverlay.css('width', '0%');
                model.navToggled = false;
            } else {
                this.$navOverlay.css('width', '100%');
                model.navToggled = true;
            }
        },

        smoothScroll: function (e) {
            e.preventDefault();
            (model.navToggled) ? app.toggleNav(): '';
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top
            }, 1000);
        },
    }

    app.init()

})();