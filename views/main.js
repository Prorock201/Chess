window.onload = startNewGame;

var PieceImg = '';
var WhoseTurn = 'white';
var SelectedPiece = '';
var CurrentBoardPosition = '';
var ShineCell = '';

var Desk = {
    x: [],
    y: []
};

var Game = {
    cells: [],
    pieces: []
};

//function startNewGame - start new game
function startNewGame() {
    initializeBoard();
    renderBoard();
    initializePieces();
    renderPieces();
    drawGraticule(true, false, 2);
    drawGraticule(true, true, 1);
    drawGraticule(false, false, 3);
    drawGraticule(false, true, 4);
    $('.row div').on('click', checkMoves);
}

//function initializeBoard - initialized the board
function initializeBoard() {
    for (var j = 0; j < 8; j++) {
        Desk.x.push(String.fromCharCode(97 + j));
    }
     for (var i = 0; i < 8; i++) {
        Desk.y.push(i + 1);
     }
}

//function renderBoard - draw the board
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

//function drawGraticule - draw frame of graticule
function drawGraticule(before, letter, number) {
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

//function Piece - Piece's constructor
function Piece(name, color, positionX, positionY, image, id) {
    this.name = name;
    this.color = color;
    this.positionX = positionX;
    this.positionY = positionY;
    this.image = 'pieces/' + image + '.png';
    this.id = id;
}

//function initializePieces - initialized the pieces
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

//function renderPieces - draw the pieces
function renderPieces() {
    $('.row div').each(function(index, element) {
        $.each(Game.pieces, function(index2, element2) {
             if ($(element).attr('class') == element2.positionX + element2.positionY) {
                 $(element).append('<img src="' + element2.image + '"></img>');
             }
        });
    });
}

//function checkMoves - move pieces on board by mouse click
function checkMoves(event) {
    //is a piece selected
    if (SelectedPiece) {
        CurrentBoardPosition = $(event.currentTarget).attr('class');
        var originPositionX = SelectedPiece.positionX;
        var originPositionY = SelectedPiece.positionY;
        var targetPositionX = CurrentBoardPosition.substring(0,1);
        var targetPositionY = parseInt(CurrentBoardPosition.substring(1,2));
        //is your turn
        if (SelectedPiece.color == WhoseTurn) {
            //check if piece can do this move
            if (validMove(targetPositionX, targetPositionY, SelectedPiece)) {
                //check if piece kill another
                var found = isOccupied(targetPositionX, targetPositionY);
                if (found) {
                    var deletePiece;
                    $('.' + found.positionX + found.positionY).contents().remove();
                    $.each(Game.pieces, function(index, element) {
                        if (found.id == element.id) {
                            deletePiece = index;
                        }
                    });
                    Game.pieces.splice(deletePiece, 1);
                }
                SelectedPiece.positionX = targetPositionX;
                SelectedPiece.positionY = targetPositionY;
                //is your king in Check after move
                if (isInCheck(SelectedPiece)) {
                    $('.info').text('Cannot move there...You would be in check.');
                    SelectedPiece.positionX = originPositionX;
                    SelectedPiece.positionY = originPositionY;
                //move piece to new position
                } else {
                    $('.info').text('Move ' + SelectedPiece.color + ' ' + SelectedPiece.name + ' to ' + targetPositionX + targetPositionY);
                    $(event.currentTarget).append(PieceImg);
                    $('.row div').each(function(index, element) {
                        if ($(element).hasClass('pickUp')) {
                            $(element).removeClass('pickUp');
                            $(element).contents().remove();
                        }
                    });
                    //change turn
                    if (WhoseTurn == 'white') {
                        WhoseTurn = 'black';
                    } else {
                        WhoseTurn = 'white';
                    }
                }
            //wrong move
            } else {
                $('.info').text('Illegal move..Please try again.');
            }
        //not your turn
        } else {
            $('.info').text('It is ' + WhoseTurn + ' turn.');
        }
        $(ShineCell).removeClass('pickUp');
        PieceImg = null;
        SelectedPiece = null;
    //there is no selected piece
    } else {
        //is a piece's image in the selected cell
        if ($(event.currentTarget).children().is('img')) {
            //change info-text when piece selected
            if ($('.info').text() == 'Pick up a piece please.') {
                $('.info').text('');
            }
            CurrentBoardPosition = $(event.currentTarget).attr('class');
            PieceImg = $(event.currentTarget).find('img').clone();
            $('.row div').each(function(index, element) {
                if ($(element).hasClass('pickUp')) {
                    $(element).removeClass('pickUp');
                }
                ShineCell = event.currentTarget;
                $(ShineCell).addClass('pickUp');
            });
            $.each(Game.pieces, function(index, element) {
                if (CurrentBoardPosition == element.positionX + element.positionY) {
                    SelectedPiece = element;
                }
            });
        //change info-text if there is not piece and cell is empty
        } else {
            $('.info').text('Pick up a piece please.');
        }
    }
}

//function validMove - checks to see if the piece make a move
//@param x - String - target x-position on board
//@param y - Number - target y-position on board
//@param obj - Object - piece that will make a move
//@returns - Boolean - Can do this move?
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
    }
}

//function isOccupied - checks to see if enemy piece on target cell
//@param x - String - target x-position on board
//@param y - Number - target y-position on board
//@returns - Boolean - Was find enemy piece?
function isOccupied(x, y) {
    var found = false;
    if (typeof(x) == 'number') {
        x = convertValue(x);
    }
    $.each(Game.pieces, function(index, element) {
        if (element.positionX == x && element.positionY == y) {
            found = element;
        }
    });
    return found;
}

//function convertValue - converts the number to a string and back
//@param x - String or Number - target x-position on board
//@returns - String or Number - convertible value
function convertValue(x) {
    var value;
    if (typeof(x) == 'string') {
        $(Desk.x).each(function(index, element){
            if (x == element) {
                value = index + 1;
            }
        });
    } else {
        $(Desk.x).each(function(index, element){
            if (x == index + 1) {
                value = element;
            }
        });
    }
    return value;
}

//function clear - checks cells are occupied on the way to the goal
//@param x - String - target x-position on board
//@param y - Number - target y-position on board
//@param obj - Object - piece that will make a move
//@returns - Boolean - Was clear?
function clear(x, y, obj) {
    var xStep = 0;
    var yStep = 0;
    var newX = obj.positionX;
    var newY = obj.positionY;
    var found = false;
    x = convertValue(x);
    obj.positionX = convertValue(obj.positionX);
    if (x == obj.positionX) {
        if (y > obj.positionY) {
            yStep = 1;
        } else {
            yStep = -1;
        }
    } else if (y == obj.positionY) {
        if (x > obj.positionX) {
            xStep = 1;
        } else {
            xStep = -1;
        }
    } else {
        xStep = 1;
        yStep = 1;
        if (x < obj.positionX) {
            xStep = -1;
        }
        if (y < obj.positionY) {
            yStep = -1;
        }
    }
    while (true) {
        newX += xStep;
        newY += yStep;
        if ((newX == x) && (newY == y)) break;
        if ((newX < 1) || (newX > 8) || (newY < 1) || (newY > 8)) break;
        found = isOccupied(newX, newY);
        if (found) break;
    }
    return (!found);
}

//function knightMove - checks knight's avaliable move
//@param x - String - target x-position on board
//@param y - Number - target y-position on board
//@param obj - Object - piece that will make a move
//@returns - Boolean - Can knight do this move?
function knightMove(x, y, obj) {
    var fileX = convertValue(x);
    var fileObj = convertValue(obj.positionX);
    return ((fileObj != fileX) && (obj.positionY != y) && (Math.abs(fileObj - fileX) + Math.abs(obj.positionY - y)) == 3);
}

//function rookMove - checks rook's available move
//@param x - String - target x-position on board
//@param y - Number - target y-position on board
//@param obj - Object - piece that will make a move
//@returns - Boolean - Can rook do this move?
function rookMove(x, y, obj) {
    return ((obj.positionX == x) || (obj.positionY == y));
}

//function bishopMove - checks bishop's available move
//@param x - String - target x-position on board
//@param y - Number - target y-position on board
//@param obj - Object - piece that will make a move
//@returns - Boolean - Can bishop do this move?
function bishopMove(x, y, obj) {
    var fileX = convertValue(x);
    var fileObj = convertValue(obj.positionX);
    return (Math.abs(fileObj - fileX) == Math.abs(obj.positionY - y));
}

//function queenMove - checks queen's available move
//@param x - String - target x-position on board
//@param y - Number - target y-position on board
//@param obj - Object - piece that will make a move
//@returns - Boolean - Can queen do this move?
function queenMove(x, y, obj) {
    return (bishopMove(x, y, obj) || rookMove(x, y, obj));
}

//function kingMove - checks king's available move
//@param x - String - target x-position on board
//@param y - Number - target y-position on board
//@param obj - Object - piece that will make a move
//@returns - Boolean - Can king do this move?
function kingMove(x, y, obj) {
    var fileX = convertValue(x);
    var fileObj = convertValue(obj.positionX);
    return ((Math.abs(fileObj - fileX) <= 1) && (Math.abs(obj.positionY - y) <= 1));
}

//function pawnMove - checks pawn's available move
//@param x - String - target x-position on board
//@param y - Number - target y-position on board
//@param obj - Object - piece that will make a move
//@returns - Boolean - Can pawn do this move?
function pawnMove(x, y, obj) {
    var fileX = convertValue(x);
    var fileObj = convertValue(obj.positionX);
    return ((fileObj - fileX == 0) && (Math.abs(obj.positionY - y) <= 1));
}

//function isInCheck - find the piece that can kill your king after move
//@param obj - Object - piece that will make a move
//@returns - Boolean - Is your king under attack?
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

//function findKing - find king's piece on the board
//@param obj - Object - piece that will make a move
//@returns - Object - king
function findKing(obj) {
    var found = false;
    $.each(Game.pieces, function(index, element) {
        if ((element.name == 'king') && (element.color == obj.color)) {
            found = element;
        }
    });
    return found;
}