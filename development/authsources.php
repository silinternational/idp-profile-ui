<?php

use SimpleSAML\Module\silauth\Auth\Source\config\ConfigManager;

$config = [
    'admin' => [
        'core:AdminPassword',
    ],
    'silauth' => ConfigManager::getSspConfig(),
];
