<?php

// This is a (rather rushed) example of how to parse the JSON game
// state from AI vs AI into a form that PHP can process directly.

$state = $_GET['state'];
$state = urldecode($state);
$state = str_replace('\"', '"', $state);
$state = json_decode($state, true);


$moves = $state['helpers']['validMoves'];
$idx = array_rand($moves);

echo $moves[$idx];

?>