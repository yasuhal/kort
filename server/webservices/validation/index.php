<?php
require_once('../../../lib/Slim-2.1.0/Slim/Slim.php');
require_once('../../../server/php/ClassLoader.php');

// Load Slim library
\Slim\Slim::registerAutoloader();
Kort\ClassLoader::registerAutoLoader();

// create Slim app
$app = new \Slim\Slim();

$validationHandler = new \Webservice\Validation\ValidationHandler();
$voteHandler = new \Webservice\Vote\VoteHandler();

$app->get(
    '/position/:lat,:lng',
    function ($lat, $lng) use ($validationHandler, $app) {
        $limit = $app->request()->params('limit');
        $radius = $app->request()->params('radius');

        $app->response()->write($validationHandler->getValidationsByOwnPosition($lat, $lng, $limit, $radius));
    }
);

$app->post(
    '/vote',
    function () use ($voteHandler, $app) {
        $data = json_decode($app->request()->getBody(), true);

        if (!isset($_SESSION) || $data['user_id'] != $_SESSION['user_id']) {
            $app->response()->status(403);
            $app->response()->write("Wrong user_id");
            return;
        }

        if (empty($data) || json_last_error() !== JSON_ERROR_NONE) {
            $app->response()->status(400);
            $app->response()->write("Invalid JSON given!");
            return;
        }
        $result = $voteHandler->insertVote($data);
        if (!$result) {
            $app->response()->status(400);
            $app->response()->write("Could not insert record: " . $result);
        } else {
            $app->response()->write($result);
        }
    }
);

if (!isset($_SESSION)) {
    session_cache_limiter(false);
    session_start();
}

// start Slim app
$app->run();