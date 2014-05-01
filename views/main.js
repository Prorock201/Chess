window.onload = startNewGame;

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
    _.each(Desk.x, _.bind(function(xCoordinate, xIindex) {
        $('.board').append('<div class="row ' + counter + '"></div>')
        _.each(Desk.y, _.bind(function(yCoordinate, yIndex) {
            $('.board ' + '.' + counter).append('<div class="' + xCoordinate + yCoordinate +'"></div>');
            Game.cells.push({x:xCoordinate, y:yCoordinate});
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

/*
function initializePieces() {
    var counter = 100;
    $.each(Game.cells, function(index, element) {
        switch (element) {
            case 'a1':
            case 'a8':
                counter++;
                Game.pieces.push({
                    name: 'rock',
                    color: '1',
                    position: element,
                    image: 'pieces/br.png',
                    id: counter
                });
                break;
            case 'a2':
            case 'a7':
                counter++;
                Game.pieces.push({
                    name: 'knight',
                    color: '1',
                    position: element,
                    image: 'pieces/bn.png',
                    id: counter
                });
                break;
            case 'a3':
            case 'a6':
                counter++;
                Game.pieces.push({
                    name: 'bishop',
                    color: '1',
                    position: element,
                    image: 'pieces/bb.png',
                    id: counter
                });
                break;
            case 'a4':
                counter++;
                Game.pieces.push({
                    name: 'queen',
                    color: '1',
                    position: element,
                    image: 'pieces/bq.png',
                    id: counter
                });
                break;
            case 'a5':
                counter++;
                Game.pieces.push({
                    name: 'king',
                    color: '1',
                    position: element,
                    image: 'pieces/bk.png',
                    id: counter
                });
                break;
            case 'b1':
            case 'b2':
            case 'b3':
            case 'b4':
            case 'b5':
            case 'b6':
            case 'b7':
            case 'b8':
                counter++;
                Game.pieces.push({
                    name: 'pawn',
                    color: '1',
                    position: element,
                    image: 'pieces/bp.png',
                    id: counter
                });
                break;
            case 'h1':
            case 'h8':
                counter++;
                Game.pieces.push({
                    name: 'rock',
                    color: '0',
                    position: element,
                    image: 'pieces/wr.png',
                    id: counter
                });
                break;
            case 'h2':
            case 'h7':
                counter++;
                Game.pieces.push({
                    name: 'knight',
                    color: '0',
                    position: element,
                    image: 'pieces/wn.png',
                    id: counter
                });
                break;
            case 'h3':
            case 'h6':
                counter++;
                Game.pieces.push({
                    name: 'bishop',
                    color: '0',
                    position: element,
                    image: 'pieces/wb.png',
                    id: counter
                });
                break;
            case 'h4':
                counter++;
                Game.pieces.push({
                    name: 'queen',
                    color: '0',
                    position: element,
                    image: 'pieces/wq.png',
                    id: counter
                });
                break;
            case 'h5':
                counter++;
                Game.pieces.push({
                    name: 'king',
                    color: '0',
                    position: element,
                    image: 'pieces/wk.png',
                    id: counter
                });
                break;
            case 'g1':
            case 'g2':
            case 'g3':
            case 'g4':
            case 'g5':
            case 'g6':
            case 'g7':
            case 'g8':
                counter++;
                Game.pieces.push({
                    name: 'pawn',
                    color: '0',
                    position: element,
                    image: 'pieces/wp.png',
                    id: counter
                });
                break;
        }
    });
}*/

function Piece(name, color, position, image, id) {
    this.name = name;
    this.color = color;
    this.position = position;
    this.image = 'pieces/' + image + '.png';
    this.id = id;
}

function initializePieces() {
    var counter = 100;
    $.each(Game.cells, function(index, element) {
        var coordinate = element.x + element.y;
        switch (coordinate) {
            case 'a1':
            case 'a8':
                counter++;
                Game.pieces.push(new Piece('rock', 1, coordinate, 'br', counter));
                break;
            case 'a2':
            case 'a7':
                counter++;
                Game.pieces.push(new Piece('knight', 1, coordinate, 'bn', counter));
                break;
            case 'a3':
            case 'a6':
                counter++;
                Game.pieces.push(new Piece('bishop', 1, coordinate, 'bb', counter));
                break;
            case 'a4':
                counter++;
                Game.pieces.push(new Piece('queen', 1, coordinate, 'bq', counter));
                break;
            case 'a5':
                counter++;
                Game.pieces.push(new Piece('king', 1, coordinate, 'bk', counter));
                break;
            case 'b1':
            case 'b2':
            case 'b3':
            case 'b4':
            case 'b5':
            case 'b6':
            case 'b7':
            case 'b8':
                counter++;
                Game.pieces.push(new Piece('pawn', 1, coordinate, 'bp', counter));
                break;
            case 'h1':
            case 'h8':
                counter++;
                Game.pieces.push(new Piece('rock', 0, coordinate, 'wr', counter));
                break;
            case 'h2':
            case 'h7':
                counter++;
                Game.pieces.push(new Piece('knight', 0, coordinate, 'wn', counter));
                break;
            case 'h3':
            case 'h6':
                counter++;
                Game.pieces.push(new Piece('bishop', 0, coordinate, 'wb', counter));
                break;
            case 'h4':
                counter++;
                Game.pieces.push(new Piece('queen', 0, coordinate, 'wq', counter));
                break;
            case 'h5':
                counter++;
                Game.pieces.push(new Piece('king', 0, coordinate, 'wk', counter));
                break;
            case 'g1':
            case 'g2':
            case 'g3':
            case 'g4':
            case 'g5':
            case 'g6':
            case 'g7':
            case 'g8':
                counter++;
                Game.pieces.push(new Piece('pawn', 0, coordinate, 'wp', counter));
                break;
        }
    });
}

function renderPieces() {
    $('.row div').each(function(index, element) {
        $.each(Game.pieces, function(index2, element2) {
             if ($(element).attr('class') == element2.position) {
                 $(element).append('<img src="' + element2.image + '"></img>');
             }
        });
    });
}
