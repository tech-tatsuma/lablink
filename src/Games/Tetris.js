import React from "react";
import './Tetris.css';

<script type="module">
  import 'game-tetris/game-tetris.js';
</script>

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
            <game-tetris></game-tetris>
        </div>
    );
}

export default Tetriscontent;
