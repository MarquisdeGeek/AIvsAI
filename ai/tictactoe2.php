<?php

// This is a (rather rushed) example of how to parse the JSON game
// state from AI vs AI into a form that PHP can process directly.

$state = $_GET['state'];
$state = urldecode($state);
$state = str_replace('\"', '"', $state);
$state = json_decode($state, true);

// A less rushed AI, which considers the best move by assigning a score
$weAre        = $state['state']['playerToMove'];
$bestLocation = 0;
$bestScore    = 0;
for ($i = 0; $i < 9; ++$i) {
    $score = getScoreFor($state['state']['board'], $i, $weAre);
    
    if ($score > $bestScore) {
        $bestScore    = $score;
        $bestLocation = $i;
    }
}

echo $bestLocation;


function getScoreFor($board, $position, $player)
{
    $score = 0;
    
    // Ignore any position we can't move
    if ($board[$position] !== NULL) {
        return $score;
    }
    
    if ($position === 4 && $board[$position] === NULL) {
        $score = max($score, 3);
    }
    
    // Score 10 for any move that wins
    // 7 that stops the opponent winning
    // 5 for adding to a line
    for ($i = 0; $i < 3; ++$i) {
        $inRow = countInRow($board, $i, $player);
        if ($inRow === 3) {
            $score = max($score, 10);
        } else if ($inRow === 2) {
            $score = max($score, 5);
        }
        $inRow = countInRow($board, $i, 1 - $player); // check opponent
        if ($inRow === 3) {
            $score = max($score, 7);
        }
        
        $inColumn = countInColumn($board, $i, $player);
        if ($inColumn === 3) {
            $score = max($score, 10);
        } else if ($inColumn === 2) {
            $score = max($score, 5);
        }
        $inColumn = countInColumn($board, $i, 1 - $player); // check opponent
        if ($inColumn === 3) {
            $score = max($score, 7);
        }
        
        $inDiagonal = countInDiagonal($board, $i, $player);
        if ($inDiagonal === 3) {
            $score = max($score, 10);
        } else if ($inDiagonal === 2) {
            $score = max($score, 5);
        }
        $inDiagonal = countInDiagonal($board, $i, 1 - $player); // check opponent
        if ($inDiagonal === 3) {
            $score = max($score, 7);
        }
        
        $inDiagonal = countInDiagonal2($board, $i, $player);
        if ($inDiagonal === 3) {
            $score = max($score, 10);
        } else if ($inDiagonal === 2) {
            $score = max($score, 5);
        }
        $inDiagonal = countInDiagonal2($board, $i, 1 - $player); // check opponent
        if ($inDiagonal === 3) {
            $score = max($score, 7);
        }
    }
    
    return 1;
}

function countInRow($board, $row, $player)
{
    return countLinear($board, $row, 1, 3, $player);
    $c = 0;
    for ($i = 0; $i < 3; ++$i) {
        $c += $board[$row * 3 + $i] === $player;
    }
    return $c;
}

function countInColumn($board, $column, $player)
{
    return countLinear($board, $column, 3, 1, $player);
    $c = 0;
    for ($i = 0; $i < 3; ++$i) {
        $c += $board[$i * 3 + $column] === $player;
    }
    return $c;
}

function countInDiagonal($board, $player)
{
    return countLinear($board, 0, 4, 0, $player); // i.e. 0,4,8
}

function countInDiagonal2($board, $player)
{
    return countLinear($board, 2, 2, 1, $player); // i.e. 2,4,6
}

function countLinear($board, $seq, $m1, $m2, $player)
{
    $c = 0;
    for ($i = 0; $i < 3; ++$i) {
        $c += $board[$i * $m1 + $seq * $m2] === $player;
    }
    return $c;
}


?>