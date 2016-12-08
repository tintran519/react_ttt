class Square extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null
    };
  }

  render() {
    // move state to board and send value as prop
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor() {
    // hold state in the board to keep all important data together
    super();
    this.state = {
      squares: Array(9).fill(null) // Start with 9 empty cells
    };
  }

  handleClick(i) {
    // Its convention to name stateful container's functions
    // "handleXYZ" while the smaller component uses "onXYZ"
    // In this case, we're handling a click for the Square

    // slice is an immutable function.
    // now you know your raw data is always safe
    const squares = this.state.squares.slice();
    // change to X
    squares[i] = "X";
    // REPLACE the state
    this.setState({squares: squares})
  }

  renderSquare(i) {
    // pass the value in as a prop
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const status = 'Next player: X';
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
