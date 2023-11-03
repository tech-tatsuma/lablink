import React from "react";
import './Tetris.css';

const Tetris = require('react-tetris');

const Tetriscontent = () => {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col">
                    <h1 className="text-center mb-4">Tetris</h1>
                    <h2>操作一覧：</h2>
                    <ul>
                        <li>下矢印：落とす</li>
                        <li>左矢印：左へ移動</li>
                        <li>右矢印：右へ移動</li>
                        <li>space：ハードドロップ</li>
                        <li>shift：ホールド</li>
                    </ul>
                </div>
            </div>
            {/* 以下のTetrisコンポーネントの記述 */}
            <Tetris
                keyboardControls={{
                    down: 'MOVE_DOWN',
                    left: 'MOVE_LEFT',
                    right: 'MOVE_RIGHT',
                    space: 'HARD_DROP',
                    z: 'FLIP_COUNTERCLOCKWISE',
                    x: 'FLIP_CLOCKWISE',
                    up: 'FLIP_CLOCKWISE',
                    p: 'TOGGLE_PAUSE',
                    c: 'HOLD',
                    shift: 'HOLD'
                }}
            >
                {({
                    HeldPiece,
                    Gameboard,
                    PieceQueue,
                    points,
                    linesCleared,
                    state,
                    controller
                }) => (
                    <div>
                        <HeldPiece />
                        <div>
                            <p>Points: {points}</p>
                            <p>Lines Cleared: {linesCleared}</p>
                        </div>
                        <Gameboard />
                        <PieceQueue />
                        {state === 'LOST' && (
                            <div>
                                <h2>Game Over</h2>
                                <button onClick={controller.restart}>New game</button>
                            </div>
                        )}
                    </div>
                )}
            </Tetris>
        </div>
    );
}

export default Tetriscontent;
