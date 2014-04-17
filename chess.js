/**
 * Created by Prorock on 03.04.14.
 */
window.onload = bindEventHandlers;

var Desk2 = [];

var Desk = [
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    [8, 7, 6, 5, 4, 3, 2, 1]
];

var Files = {
    File_A: 'a',
    File_B: 'b',
    File_C: 'c',
    File_D: 'd',
    File_E: 'e',
    File_F: 'f',
    File_G: 'g',
    File_H: 'h'
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
    move: ''
};

var piecePosition = '';
var pieceAbb = '';
var pieceRank = '';
var pieceFile = '';
var pieceRankIndex = '';
var pieceFileIndex = '';
var MoveTo = [];

function bindEventHandlers() {
    var cells = $('.board div div');
    cells.click(function (event) {
        var square = event.currentTarget;
        if ($(event.currentTarget).children()[0]) {
            piecePosition = $(event.currentTarget).attr('class');
            $(cells).each(function (index, element) {
                if ($(element).hasClass('pickUp')) {
                    $(element).removeClass('pickUp')
                }
                $(square).addClass('pickUp');
            });
            var pieceImg = $(event.currentTarget).children()[0];
            pieceAbb = $(pieceImg).attr('src').substr(8,1);
            separatePieceAbb (piecePosition);
            console.log(piecePosition);
            console.log(pieceAbb);
        }

        switch (pieceAbb) {
            case 'b':
                checkBishopMove();
                break;
            case 'n':
                checkKnightMove();
                break
            case 'r':
                checkRockMove();
                break;
            case 'q':
                checkQueenMove();
                break;
            case 'k':
                checkKingMove();
                break;
            case 'p':
                checkPawnMove();
                break;
        }
    });

    $('.board div div').each(function (index, element) {
        Desk2.push($(element).attr('class'));
    });

    console.log(Desk2);
}

function separatePieceAbb (piecePosition) {
    pieceRank = piecePosition.split('')[0];
    pieceFile = piecePosition.split('')[1];
}

function checkKnightMove() {
    $(Desk[0]).each(function (index, element) {
        if (element == pieceRank) {
            pieceRankIndex = index;
        }
    });

    $(Desk[1]).each(function (index2, element2) {
        if (element2 == pieceFile) {
            pieceFileIndex = index2;
        }
    });

    console.log(Desk[0][index - 1]);
    console.log(Desk[1][index - 2]);

    /*MoveTo.push()*/


}
