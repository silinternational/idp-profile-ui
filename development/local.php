<?php

use Sil\PhpEnv\Env;
use yii\helpers\ArrayHelper;

return [
    'params' => [
    ],
    'components' => [
       'personnel' => ArrayHelper::merge(
           ['class' => 'Sil\IdpPw\Common\Personnel\IdBroker\IdBroker'],
           Env::getArrayFromPrefix('ID_BROKER_')
       ),
        'auth' => [
            'class' => Sil\IdpPw\Auth\Saml::class,
            'signRequest' => false,
            'checkResponseSigning' => false,
            'requireEncryptedAssertion' => false,
            'idpCertificate' => '',
            'spCertificate' => '',
            'spPrivateKey' => '',
            'entityId' => 'profile-api.gtis.guru',
            'ssoUrl' => 'http://localhost:8088/saml2/idp/SSOService.php',
            'sloUrl' => 'http://localhost:8088/saml2/idp/SingleLogoutService.php',
            'attributeMap' => [
                'idp_username' => ['field' => 'eduPersonPrincipalName', 'element' => 0 ],
                'first_name' => ['field' => 'givenName', 'element' => 0 ],
                'last_name' => ['field' => 'sn', 'element' => 0 ],
                'email' => ['field' => 'mail', 'element' => 0 ],
                'employee_id' => ['field' => 'employeeNumber', 'element' => 0],
            ],
        ],
        'phone' => [
            'class' => 'tests\mock\phone\Component',
            'codeLength' => 4,
        ],
        'passwordStore' => ArrayHelper::merge(
            ['class' => 'Sil\IdpPw\PasswordStore\IdBroker\IdBroker'],
            Env::getArrayFromPrefix('ID_BROKER_')
        ),
    ],
];