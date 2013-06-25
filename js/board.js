// Generated by CoffeeScript 1.4.0
(function() {
  var Board;

  Board = (function() {
    var CROSS, Cell, EMPTY, NOUGHT, PLAYER_MARKERS, SIZE;

    SIZE = 3;

    EMPTY = ' ';

    NOUGHT = 'O';

    CROSS = 'X';

    PLAYER_MARKERS = [NOUGHT, CROSS];

    function Board() {
      this.reset();
    }

    Board.prototype.reset = function() {
      var _i, _results;
      this.won = false;
      this.current_player = 0;
      return this.grid = (function() {
        _results = [];
        for (var _i = 1; 1 <= SIZE ? _i <= SIZE : _i >= SIZE; 1 <= SIZE ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function() {
        var _i, _results;
        return (function() {
          _results = [];
          for (var _i = 1; 1 <= SIZE ? _i <= SIZE : _i >= SIZE; 1 <= SIZE ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this).map(function() {
          return new Cell(EMPTY);
        });
      });
    };

    Board.prototype.playCell = function(cell) {
      var move, _i, _len, _results;
      if (cell.hasBeenPlayed()) {
        return;
      }
      if (this.won) {
        return;
      }
      cell.mark(this.currentPlayerMarker());
      if (move = this.winningMove(this.currentPlayerMarker())) {
        this.won = true;
        this.winning_marker = this.currentPlayerMarker();
        _results = [];
        for (_i = 0, _len = move.length; _i < _len; _i++) {
          cell = move[_i];
          _results.push(cell.winning = true);
        }
        return _results;
      } else {
        return this.switchPlayer();
      }
    };

    Board.prototype.currentPlayerMarker = function() {
      return PLAYER_MARKERS[this.current_player];
    };

    Board.prototype.switchPlayer = function() {
      return this.current_player ^= 1;
    };

    Board.prototype.winningMove = function(marker) {
      return this._winningRow(this.grid, marker) || this._winningColumn(this.grid, marker) || this._winningDiagonal(this.grid, marker);
    };

    Board.prototype._winningRow = function(grid, marker) {
      return _(grid).find(function(row) {
        return _(row).all(function(cell) {
          return cell.marker === marker;
        });
      });
    };

    Board.prototype._winningColumn = function(grid, marker) {
      return this._winningRow(_.zip.apply(null, grid), marker);
    };

    Board.prototype._winningDiagonal = function(grid, marker) {
      var antidiagonal, diagonal, n, _cellMatches;
      _cellMatches = function(cell) {
        return cell.marker === marker;
      };
      diagonal = (function() {
        var _i, _ref, _results;
        _results = [];
        for (n = _i = 0, _ref = SIZE - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; n = 0 <= _ref ? ++_i : --_i) {
          _results.push(grid[n][n]);
        }
        return _results;
      })();
      if (_(diagonal).all(_cellMatches)) {
        return diagonal;
      }
      antidiagonal = (function() {
        var _i, _ref, _results;
        _results = [];
        for (n = _i = 0, _ref = SIZE - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; n = 0 <= _ref ? ++_i : --_i) {
          _results.push(grid[n][SIZE - 1 - n]);
        }
        return _results;
      })();
      if (_(antidiagonal).all(_cellMatches)) {
        return antidiagonal;
      }
      return void 0;
    };

    Cell = (function() {

      function Cell(marker, winning) {
        this.marker = marker;
        this.winning = winning != null ? winning : false;
      }

      Cell.prototype.mark = function(marker) {
        this.marker = marker;
      };

      Cell.prototype.hasBeenPlayed = function() {
        return this.marker !== EMPTY;
      };

      return Cell;

    })();

    return Board;

  })();

  angular.module("ngOughts").factory("Board", function() {
    return Board;
  });

}).call(this);
