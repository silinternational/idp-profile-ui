<?php
use Sil\PhpEnv\Env;
use Sil\Psr3Adapters\Psr3SamlLogger;

$metadata['profile-idp'] = [
    'host' => '__DEFAULT__',
    'auth' => 'silauth',
    'authproc' => [
        10 => [
            // Required:
            'class' => 'mfa:Mfa',
            'employeeIdAttr' => 'employeeNumber',
            'idBrokerAccessToken' => Env::get('ID_BROKER_ACCESS_TOKEN'),
            'idBrokerAssertValidIp' => Env::get('ID_BROKER_ASSERT_VALID_IP'),
            'idBrokerBaseUri' => Env::get('ID_BROKER_BASE_URI'),
            'idBrokerTrustedIpRanges' => Env::get('ID_BROKER_TRUSTED_IP_RANGES'),
            'idpDomainName' => Env::get('IDP_DOMAIN_NAME'),
            'mfaSetupUrl' => Env::get('MFA_SETUP_URL'),
            'mfaLearnMoreUrl' => Env::get('MFA_LEARN_MORE_URL'),

            // Optional:
            'loggerClass' => Psr3SamlLogger::class,
        ],
        15 => [
            // Required:
            'class' => 'expirychecker:ExpiryDate',
            'accountNameAttr' => 'cn',
            'expiryDateAttr' => 'schacExpiryDate',
            'passwordChangeUrl' => Env::requireEnv('PASSWORD_CHANGE_URL'),

            // Optional:
            'warnDaysBefore' => 14,
        ],
        30 => [
            'class' => 'profilereview:ProfileReview',
            'employeeIdAttr' => 'employeeNumber',
            'profileUrl' => Env::get('PROFILE_URL'),
            'loggerClass' => Psr3SamlLogger::class,
        ],
    ],
];
