// Loaded content dom
document.addEventListener('DOMContentLoaded', function () {
    let zoom = $('.zoom');
    let imgZoom = $('#imgZoom');

    zoom.mousemove(function (event) {
        imgZoom.css('opacity', '1');
        let positionPx = event.pageX - zoom.offset().left;
        let positionX = (positionPx / zoom.width()) * 100;

        let positionPy = event.pageY - zoom.offset().top;
        let positionY = (positionPy / zoom.height()) * 100;

        imgZoom.css({
            '--zoom-x': positionX + '%',
            '--zoom-y': positionY + '%'
        });

        let transformX = -(positionX - 50) / 3.5;
        let transformY = -(positionY - 50) / 3.5;
        imgZoom.css('transform', `scale(1.3) translateX(${transformX}px) translateY(${transformY}px)`);
    });

    zoom.mouseout(function () {
        imgZoom.css('opacity', '0');
    });
});