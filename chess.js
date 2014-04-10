/**
 * Created by Prorock on 03.04.14.
 */
window.onload = bindEventHandlers;

var Board = {}

var figure = {};

function bindEventHandlers() {
    var cells = $('.board div div');
    cells.click(function (event) {
        var square = event.currentTarget;
        if ($(event.currentTarget).children()[0]) {
            console.log($(square).children()[0]);
            $(cells).each(function (index, element) {
                if ($(element).hasClass('pickUp')) {
                    $(element).removeClass('pickUp')
                }
                $(square).addClass('pickUp');
            });
        }
    });
}
