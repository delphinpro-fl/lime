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
$urlPath = trim(str_replace('/api', '', $parsedUrl['path']), '/');

parse_str($parsedUrl['query'], $query);
$query = array_map(function ($item) { return trim($item, '/'); }, $query);

$segments = explode('/', $urlPath);
$object = array_shift($segments);
$path = '';
$filename = '';

switch ($object) {
    case 'page':
        if (array_key_exists('url', $query)) {
            $path = str_replace(['\\', '.'], '', $query['url']);
            $path = $path ?: 'index';
            $filename = 'page/'.$path.'.json';
        }
        break;
    default:
        if (count($segments)) {
            $path = str_replace(['\\', '.'], '', $urlPath);
            $filename = $path.'.json';
        } else {
            $filename = $object.'.json';
        }
}

if ($filename && file_exists(__DIR__.'/'.$filename)) {
    readfile(__DIR__.'/'.$filename);
    die;
}

header('Not found', true, 404);
echo json_encode([
    'errors'     => [
        [
            'text' => 'Ресурс не найден',
            'code' => 404,
        ],
    ],
    'debug_info' => [
        'url'        => $requestUri,
        'parsed_url' => $parsedUrl,
        'query'      => $query,
        'urlPath'    => $urlPath,
        'object'     => $object,
        'segments'   => $segments,
        'path'       => $path,
        'mock_file'  => $filename,
    ],
]);
