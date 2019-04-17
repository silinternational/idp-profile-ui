<?php

use common\helpers\MySqlDateTime;
use yii\db\Migration;

class m991231_235959_insert_test_users extends Migration
{

    public function safeUp()
    {
        $this->batchInsert('{{user}}',
            ['id','uuid'                                ,'employee_id','first_name','last_name' ,'username','email'               ,'active','locked','last_changed_utc'   ,'last_synced_utc'    ,'require_mfa','review_profile_after' ,'nag_for_mfa_after'    ,'nag_for_method_after' ,'manager_email'        ],[
            [ 1  ,'2b2d424e-8cb0-49c7-8c0b-7f660340f5fa','11111'      ,'Testy'     ,'Testerson' ,'a'       ,'primaryA@example.org','yes'   ,'no'    , MySqlDateTime::now(), MySqlDateTime::now(),'no'         , MySqlDateTime::today(), MySqlDateTime::today(), MySqlDateTime::today(),'managerA@example.org' ],
            [ 2  ,'2b2d424e-8cb0-49c7-8c0b-7f660340f5fb','22222'      ,'Firsty'    ,'Firsterson','b'       ,'primaryB@example.org','yes'   ,'no'    , MySqlDateTime::now(), MySqlDateTime::now(),'no'         , MySqlDateTime::today(), MySqlDateTime::today(), MySqlDateTime::today(),'managerB@example.org' ],
        ]);

        $this->batchInsert('{{password}}',
            ['id','user_id','hash'                                                        ,'created_utc'        ,'expires_on'                       ,'grace_period_ends_on'             ],[
            [ 1  , 1       ,'$2y$10$rKbAp0M8gewGpQKhD.U6qOSGDlMqKFkxK9tQZ15SZoieqYHYNsD/y', MySqlDateTime::now(), MySqlDateTime::relative('+1 year'), MySqlDateTime::relative('+1 year')], // password is 'a'
        ]);

        $this->batchInsert('{{invite}}',
            ['id','user_id','uuid'                                ,'created_utc'        ,'expires_on'                       ],[
            [ 1  , 2       ,'2b2d424e-8cb0-49c7-8c0b-7f6603INVITE', MySqlDateTime::now(), MySqlDateTime::relative('+1 year')],
        ]);

        $this->update('{{user}}', ['current_password_id' => 1], 'id=1');
    }

    public function safeDown()
    {
        $this->delete('{{password}}', [
            'user_id' => [1]
        ]);

        $this->delete('{{invite}}', [
            'user_id' => [2]
        ]);

        $this->delete('{{user}}', [
            'id' => [1, 2]
        ]);
    }
}