<?php
/**
 * Lime project
 *
 * @author      delphinpro <delphinpro@gmail.com>
 * @copyright   copyright © 2019 delphinpro
 * @license     licensed under the MIT license
 */

function getPageContent($page)
{
    $filename = 'page-'.str_replace(['/', '//', '.'], '', $page).'.json';
    if ($page === '') {
        $filename = 'page-home.json';
    }
    if (file_exists(__DIR__.'/'.$filename)) {
        readfile(__DIR__.'/'.$filename);
        die;
    }
}

function getMenu($type){
    $filename = 'menu-'.str_replace(['/', '//', '.'], '', $type).'.json';
    if (file_exists(__DIR__.'/'.$filename)) {
        readfile(__DIR__.'/'.$filename);
        die;
    }
}


$requestUri = $_SERVER['REQUEST_URI'];

$parsedUrl = parse_url($requestUri);
parse_str($parsedUrl['query'], $query);
$urlPath = trim(str_replace('/api', '', $parsedUrl['path']), '/');
$query = array_map(function ($item) {
    return trim($item, '/');
}, $query);
$segments = explode('/', $urlPath);
$object = array_shift($segments);

switch ($object) {
    case 'page':
        if (array_key_exists('url', $query)) {
            getPageContent($query['url']);
        }
        break;
    case 'menu':
        if (count($segments)) {
            getMenu($segments[0]);
        }
        break;
    default:
        // nop
}

header('Not found', true, 404);
echo json_encode([
    'url'        => $requestUri,
    'parsed_url' => $parsedUrl,
    'query'      => $query,
    'urlPath'    => $urlPath,
    'object'    => $object,
    'segments'    => $segments,
]);
