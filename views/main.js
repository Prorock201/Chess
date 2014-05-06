window.onload = startNewGame;

var Img = '';
var Turn = 'white';
var Obj = '';
var CurrentPosition = '';
var CurrentCell = '';

var Desk = {
    x: [],
    y: []
};

var Game = {
    cells: [],
    pieces: []
};

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
                Game.pieces.push(new Piece('rook', 'black', element.x, element.y, 'br', counter));
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
                Game.pieces.push(new Piece('rook', 'white', element.x, element.y, 'wr', counter));
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
    if (Obj) {
        CurrentPosition = $(event.currentTarget).attr('class');
        var oldX = Obj.positionX;
        var oldY = Obj.positionY;
        var newX = CurrentPosition.substring(0,1);
        var newY = parseInt(CurrentPosition.substring(1,2));
        if (Img) {
            if (Obj.color == Turn) {
                if (validMove(newX, newY, Obj)) {
                    console.log('Yes');
                    var found = isOccupied(newX, newY);
                    var deletePiece;
                    if (found) {
                        $('.' + found.positionX + found.positionY).contents().remove();
                        $.each(Game.pieces, function(index, element) {
                            if (found.id == element.id) {
                                deletePiece = index;
                            }
                        });
                        Game.pieces.splice(deletePiece, 1);
                    }
                    Obj.positionX = newX;
                    Obj.positionY = newY;
                    if (isInCheck(Obj)) {
                        $('.info').text('Cannot move there...You would be in check.');
                        Obj.positionX = oldX;
                        Obj.positionY = oldY;
                    } else {
                        $('.info').text('Move ' + Obj.color + ' ' + Obj.name + ' to ' + newX + newY);
                        $(event.currentTarget).append(Img);
                        $('.row div').each(function(index, element) {
                            if ($(element).hasClass('pickUp')) {
                                $(element).removeClass('pickUp');
                                $(element).contents().remove();
                            }
                        });
                        if (Turn == 'white') {
                            Turn = 'black';
                        } else {
                            Turn = 'white';
                        }
                    }
                } else {
                    $('.info').text('Illegal move..Please try again.');
                }
            } else {
                $('.info').text('It is ' + Turn + ' turn.');
            }
            Img = null;
        }
        $(CurrentCell).removeClass('pickUp');
        Obj = null;
    } else {
        if ($(event.currentTarget).children().is('img')) {
            CurrentPosition = $(event.currentTarget).attr('class');
            Img = $(event.currentTarget).find('img').clone();
            $('.row div').each(function(index, element) {
                if ($(element).hasClass('pickUp')) {
                    $(element).removeClass('pickUp');
                }
                CurrentCell = event.currentTarget;
                $(CurrentCell).addClass('pickUp');
            });
            $.each(Game.pieces, function(index, element) {
                if (CurrentPosition == this.positionX + this.positionY) {
                    Obj = element;
                }
            });
        }
    }
}

function validMove(x, y, obj) {
    var found = isOccupied(x, y);
    if (found.color == obj.color) {
        return false;
    } else if (obj.name == 'rook') {
        return rookMove(x, y, obj) && clear(x, y, obj);
    } else if (obj.name == 'knight') {
        return knightMove(x, y, obj);
    } else if (obj.name == 'bishop') {
        return bishopMove(x, y, obj) && clear(x, y, obj);
    } else if (obj.name == 'queen') {
        return queenMove(x, y, obj) && clear(x, y, obj);
    } else if (obj.name == 'king') {
        return kingMove(x, y, obj) && clear(x, y, obj);
    } else if (obj.name == 'pawn') {
        return pawnMove(x, y, obj);
    } else {
        $('.info').text('Unknown type: ' + obj.name);
    }
}

function isOccupied(x, y) {
    var found = false;
    if (typeof(x) == 'number') {
        x = indexToFile(x);
    }
    $.each(Game.pieces, function(index, element) {
        if (this.positionX == x && this.positionY == y) {
            found = element;
        }
    });
    return found;
}

function fileToIndex(x) {
    var num;
    $(Desk.x).each(function(index, element){
        if (x == element) {
            num = index + 1;
        }
    });
    return num;
}

function indexToFile(x) {
    var letter;
    $(Desk.x).each(function(index, element){
        if (x == index + 1) {
            letter = element;
        }
    });
    return letter;
}

function clear(x, y, obj) {
    var xSet = 0;
    var ySet = 0;
    var NewX;
    var NewY;
    var fileX = fileToIndex(x);
    var fileObj = fileToIndex(obj.positionX);
    var found = false;
    if (fileX == fileObj) {
        if (y > obj.positionY) {
            ySet = 1;
        } else {
            ySet = -1;
        }
    } else if (y == obj.positionY) {
        if (fileX > fileObj) {
            xSet = 1;
        } else {
            xSet = -1;
        }
    } else {
        xSet = 1;
        ySet = 1;
        if (fileX < fileObj) {
            xSet = -1;
        }
        if (y < obj.positionY) {
            ySet = -1;
        }
    }
    NewX = fileObj;
    NewY = obj.positionY;
    while (true) {
        NewX += xSet;
        NewY += ySet;
        if ((NewX == fileX) && (NewY == y)) break;
        if ((NewX < 1) || (NewX > 8) || (NewY < 1) || (NewY > 8)) break;
        found = isOccupied(NewX, NewY);
        if (found) break;
    }
    return (!found);
}

function knightMove(x, y, obj) {
    var fileX = fileToIndex(x);
    var fileObj = fileToIndex(obj.positionX);
    return ((fileObj != fileX) && (obj.positionY != y) && (Math.abs(fileObj - fileX) + Math.abs(obj.positionY - y)) == 3);
}

function rookMove(x, y, obj) {
    return ((obj.positionX == x) || (obj.positionY == y));
}

function bishopMove(x, y, obj) {
    var fileX = fileToIndex(x);
    var fileObj = fileToIndex(obj.positionX);
    return (Math.abs(fileObj - fileX) == Math.abs(obj.positionY - y));
}

function queenMove(x, y, obj) {
    return (bishopMove(x, y, obj) || rookMove(x, y, obj));
}

function kingMove(x, y, obj) {
    var fileX = fileToIndex(x);
    var fileObj = fileToIndex(obj.positionX);
    return ((Math.abs(fileObj - fileX) <= 1) && (Math.abs(obj.positionY - y) <= 1));
}

function pawnMove(x, y, obj) {
    var fileX = fileToIndex(x);
    var fileObj = fileToIndex(obj.positionX);
    return ((fileObj - fileX == 0) && (Math.abs(obj.positionY - y) <= 1));
}

function isInCheck(obj) {
    var king = findKing(obj);
    var found = false;
    $.each(Game.pieces, function(index, element) {
        if (obj.color != element.color) {
            if (validMove(king.positionX, king.positionY, element)) {
                found = true;
            }
        }
    });
    return found;
}

function findKing(obj) {
    var found = false;
    $.each(Game.pieces, function(index, element) {
        if ((element.name == 'king') && (element.color == obj.color)) {
            found = element;
        }
    });
    return found;
}