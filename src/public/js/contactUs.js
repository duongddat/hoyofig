AOS.init()

var typingEffect = new Typed(".multiText", {
    strings: ["coder", "designer", "UI/UX developer"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 1500,
});

document.addEventListener("DOMContentLoaded", function () {
    $("#next").click(function () {
        let lists = $(".item");
        $("#slide").append(lists[0]);
    });

    $("#prev").click(function () {
        let lists = $(".item");
        $("#slide").prepend(lists[lists.length - 1]);
        setTime;
    });

    const setTime = setInterval(() => {
        $("#next").click();
    }, 7000);
});