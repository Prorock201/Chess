window.onload = startNewGame;

var Img = '';
var Turn = 'white';
var Obj = '';
var CurrentPosition = '';

var Desk = {
    x: [],
    y: []
};

var Game = {
    cells: [],
    pieces: []
};

var Cell = {
    coordinates: ['a', 1],
    isOccupied: false
};

/*var Piece = {
    name: 'sample',
    color: 0,
    availableGoes: [],
    position: [],
    id: 0,
    move: function() {
        console.log('move');
    }
};*/


function startNewGame() {
    initializeBoard();
    renderBoard();
    initializePieces();
    renderPieces();
    drawFrame(true, false, 2);
    drawFrame(true, true, 1);
    drawFrame(false, false, 3);
    drawFrame(false, true, 4);

    $('.row div').on('click', checkMoves);

    /*$('.row img').draggable({containment:'.board'},{cursor:"auto",cursorAt:{left:20,top:20}});*/

    /*$('.row div').on('mousedown', function(event) {
        var piece;
        var img;
        if ($(event.currentTarget).children().is('img')) {
            img = $(event.currentTarget);
            currentPosition = $(event.currentTarget).attr('class');
            $.each(Game.pieces, function(index, element) {
                if (currentPosition == this.positionX + this.positionY) {
                    piece = element;
                }
            });
        } else {
            console.log('No');
        }
        console.log(piece);

        $('.row div').mouseover(function(event3) {
            console.log(event3.currentTarget);
        });

        $('.row div').mouseup(function(event2) {
            var newX;
            var newY;
            console.log($(img).attr('class'));
            if (piece) {
            }
            piece = null;
        });
    });*/
}

function initializeBoard() {
    for (var j = 0; j < 8; j++) {
        Desk.x.push(String.fromCharCode(97 + j));
    }
     for (var i = 0; i < 8; i++) {
        Desk.y.push(i + 1);
     }
}

function renderBoard() {
    var counter = 1;
    _.each(Desk.y, _.bind(function(yCoordinate, xIindex) {
        $('.board').append('<div class="row ' + counter + '"></div>')
        _.each(Desk.x, _.bind(function(xCoordinate, yIndex) {
            $('.board ' + '.' + counter).append('<div class="' + xCoordinate + yCoordinate +'"></div>');
            Game.cells.push({x:xCoordinate, y:yCoordinate, isOccupied:false});
        }, this));
        ++counter;
    }, this));
}

function drawFrame(before, letter, number) {
    if (before) {
        $('.content-board').prepend('<div class="frame' + number + '"></div>');
    } else {
        $('.content-board').append('<div class="frame' + number + '"></div>');
    }
    if (!letter) {
        for (var i = 1; i <= 8; i++) {
            $('.frame' + number).append('<div>' + i + '</div>');
        }
    } else {
        for (var i = 0; i < 8; i++) {
            $('.frame' + number).append('<div>' + String.fromCharCode(97 + i) + '</div>');
        }
    }
}

function Piece(name, color, positionX, positionY, image, id) {
    this.name = name;
    this.color = color;
    this.positionX = positionX;
    this.positionY = positionY;
    this.image = 'pieces/' + image + '.png';
    this.id = id;
}

function initializePieces() {
    var counter = 100;
    $.each(Game.cells, function(index, element) {
        var coordinate = element.x + element.y;
        switch (coordinate) {
            case 'a1':
            case 'h1':
                counter++;
                Game.pieces.push(new Piece('rock', 'black', element.x, element.y, 'br', counter));
                element.isOccupied = true;
                element.occupiedColor = 'black';
                break;
            case 'b1':
            case 'g1':
                counter++;
                Game.pieces.push(new Piece('knight', 'black', element.x, element.y, 'bn', counter));
                element.isOccupied = true;
                element.occupiedColor = 'black';
                break;
            case 'c1':
            case 'f1':
                counter++;
                Game.pieces.push(new Piece('bishop', 'black', element.x, element.y, 'bb', counter));
                element.isOccupied = true;
                element.occupiedColor = 'black';
                break;
            case 'd1':
                counter++;
                Game.pieces.push(new Piece('queen', 'black', element.x, element.y, 'bq', counter));
                element.isOccupied = true;
                element.occupiedColor = 'black';
                break;
            case 'e1':
                counter++;
                Game.pieces.push(new Piece('king', 'black', element.x, element.y, 'bk', counter));
                element.isOccupied = true;
                element.occupiedColor = 'black';
                break;
            case 'a2':
            case 'b2':
            case 'c2':
            case 'd2':
            case 'e2':
            case 'f2':
            case 'g2':
            case 'h2':
                counter++;
                Game.pieces.push(new Piece('pawn', 'black', element.x, element.y, 'bp', counter));
                element.isOccupied = true;
                element.occupiedColor = 'black';
                break;
            case 'a8':
            case 'h8':
                counter++;
                Game.pieces.push(new Piece('rock', 'white', element.x, element.y, 'wr', counter));
                element.isOccupied = true;
                element.occupiedColor = 'black';
                break;
            case 'b8':
            case 'g8':
                counter++;
                Game.pieces.push(new Piece('knight', 'white', element.x, element.y, 'wn', counter));
                element.isOccupied = true;
                break;
            case 'c8':
            case 'f8':
                counter++;
                Game.pieces.push(new Piece('bishop', 'white', element.x, element.y, 'wb', counter));
                element.isOccupied = true;
                element.occupiedColor = 'black';
                break;
            case 'd8':
                counter++;
                Game.pieces.push(new Piece('queen', 'white', element.x, element.y, 'wq', counter));
                element.isOccupied = true;
                element.occupiedColor = 'black';
                break;
            case 'e8':
                counter++;
                Game.pieces.push(new Piece('king', 'white', element.x, element.y, 'wk', counter));
                element.isOccupied = true;
                element.occupiedColor = 'black';
                break;
            case 'a7':
            case 'b7':
            case 'c7':
            case 'd7':
            case 'e7':
            case 'f7':
            case 'g7':
            case 'h7':
                counter++;
                Game.pieces.push(new Piece('pawn', 'white', element.x, element.y, 'wp', counter));
                element.isOccupied = true;
                element.occupiedColor = 'black';
                break;
        }
    });
}

function renderPieces() {
    $('.row div').each(function(index, element) {
        $.each(Game.pieces, function(index2, element2) {
             if ($(element).attr('class') == element2.positionX + element2.positionY) {
                 $(element).append('<img src="' + element2.image + '"></img>');
             }
        });
    });
}

function checkMoves(event) {
    if ($(event.currentTarget).children().is('img')) {
        CurrentPosition = $(event.currentTarget).attr('class');
        Img = $(event.currentTarget).find('img').clone();
        $('.row div').each(function(index, element) {
            if ($(element).hasClass('pickUp')) {
                $(element).removeClass('pickUp');
            }
            $(event.currentTarget).addClass('pickUp');
        });
        $.each(Game.pieces, function(index, element) {
            if (CurrentPosition == this.positionX + this.positionY) {
                Obj = element;
            }
        });
        console.log(CurrentPosition);
        console.log(Obj);
    } else {
        CurrentPosition = $(event.currentTarget).attr('class');
        var newX = CurrentPosition.substring(0,1);
        var newY = CurrentPosition.substring(1,2);
        if (Img) {
            if (Obj.color == Turn) {
                if (validMove(newX, newY, Obj)) {
                    Obj.positionX = newX;
                    Obj.positionY = newY;
                    $(event.currentTarget).append(Img);
                    $('.row div').each(function(index, element) {
                        if ($(element).hasClass('pickUp')) {
                            $(element).removeClass('pickUp');
                            $(element).contents().remove();
                        }
                    });
                    Img = null;
                }
                if (Turn == 'white') {
                    Turn = 'black';
                } else {
                    Turn = 'white';
                }
                $('.info').text('');
            } else {
                $('.info').text('It is ' + Turn + ' turn.');
            }
        }
    }
}

function validMove(x, y, obj) {
    return true;
}
