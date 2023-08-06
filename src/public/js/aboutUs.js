document.addEventListener('DOMContentLoaded', function () {
    var testimonialBodyItems = $(".fui-testimonial-1 .testimonialBodyItem");
    var testimoniaPersonalItems = $(".fui-testimonial-1 .testimoniaPersonalItem");

    // handle click tab testimonial
    var numberTabTestimonial = 0;

    testimoniaPersonalItems.on("click", function () {
        var PersonalTab = $(this).data("tab");
        numberTabTestimonial = $(this).data("tab");
        testimoniaPersonalItems.removeClass("active");
        testimonialBodyItems.removeClass("active");
        $(this).addClass("active");
        testimonialBodyItems.each(function () {
            var itemContent = $(this);
            if (PersonalTab === itemContent.data("tab")) {
                $(this).addClass("active");
            }
        });
        refresh
    });

    let refresh = setInterval(function () {
        numberTabTestimonial++;
        if (numberTabTestimonial > 7) {
            numberTabTestimonial = 0;
        }
        testimoniaPersonalItems.removeClass("active");
        testimonialBodyItems.removeClass("active");
        testimoniaPersonalItems.eq(numberTabTestimonial).addClass("active");
        testimonialBodyItems.eq(numberTabTestimonial).addClass("active");
    }, 4000);
});