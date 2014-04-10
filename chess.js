/**
 * Created by Prorock on 03.04.14.
 */
window.onload = bindEventHandlers;

var Files = {
    File_A: 'A',
    File_B: 'B',
    File_C: 'C',
    File_D: 'D',
    File_E: 'E',
    File_F: 'F',
    File_G: 'G',
    File_H: 'H'
}

var Ranks = {
    Rank_1: 1,
    Rank_2: 2,
    Rank_3: 3,
    Rank_4: 4,
    Rank_5: 5,
    Rank_6: 6,
    Rank_7: 7,
    Rank_8: 8
}

var Colors = {
    White: 1,
    Black: 0
}

var Board = {
    cells: new Array(),
}

var Figure = {
    name: '',
    color: '',
    move: genValidMove()
};

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
