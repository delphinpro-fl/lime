<?php
/**
 * Lime project
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2019 delphinpro
 * @license     licensed under the MIT license
 */

$requestUri = $_SERVER['REQUEST_URI'];

$parsedUrl = parse_url($requestUri);
parse_str($parsedUrl['query'], $query);
$urlPath = $parsedUrl['path'];
$query = array_map(function ($item) {
    return trim($item, '/');
}, $query);

function getPageContent($page)
{
    $filename = str_replace(['/', '//', '.'], '', $page).'.json';
    if (file_exists(__DIR__.'/'.$filename)) {
        readfile(__DIR__.'/'.$filename);
        die;
    }
}


if ($urlPath === '/api/page' && array_key_exists('url', $query) && $query['url']) {
    getPageContent($query['url']);
}

header('Not found', true, 404);
echo json_encode([
    'url'        => $requestUri,
    'parsed_url' => $parsedUrl,
    'query'      => $query,
    'server'     => $_SERVER,
]);
