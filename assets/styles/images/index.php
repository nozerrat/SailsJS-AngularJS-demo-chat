<?php
if(!defined('ERROR')) define('ERROR',403);
$separator = $_SERVER["SERVER_SIGNATURE"] ? 'public_html' : 'planseguro';
$dir = explode($separator,__DIR__);
require_once $dir[0].$separator.'/desaqwerty/error.php';