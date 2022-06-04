const express = require('express');
const router = express.Router();

const validator = require(`libs/validator`);
const member = require(`libs/member`);
const utils = require(`libs/utils`);

const service_member = require(`service/member/member`);

const Message = require(`libs/message`);

const multer = require('multer');
const memory_storage = multer.memoryStorage();
const upload = multer({ storage: memory_storage });

const db = require(`libs/db`);

const ban_str_list = 'admin, 어드민, 관리자';

router.get('/', member.login_check(), async (req, res, next) => {
    res.json(req.member);
});

router.post('/login', async (req, res, next) => {
    const { id, password } = req.body;

    validator.str('id, password', req.body);

    const { member_info, token } = await service_member.login(id, password);

    res.json({token});
});

router.post('/sign_up', async (req, res, next) => {
    const { id, nickname, email } = req.body;
    validator.str('id, nickname, email, password', req.body);

    validator.ban_str(id, ban_str_list);
    validator.ban_str(nickname, ban_str_list);
    validator.ban_str(email, ban_str_list);

    await service_member.id_dup_check(req, id);
    await service_member.nick_dup_check(req, nickname);
    await service_member.email_dup_check(req, email);

    await service_member.sign_up(req);

    res.json(true);
});

router.patch('/', member.login_check(), async (req, res, next) => {
    const require_keys = 'old_password, email, nickname';

    validator.str(require_keys, req.body);

    const { nickname, email, old_password } = req.body;

    if(old_password === undefined || old_password.toString().replace(/\s/g, '') === ''){
        throw Message.INVALID_PARAM('이전 비밀번호');
    }

    await service_member.old_pwd_check(req.member.idx, old_password);

    validator.ban_str(nickname, ban_str_list);
    validator.ban_str(email, ban_str_list);

    await service_member.nick_dup_check(req, nickname);
    await service_member.email_dup_check(req, email);

    req.connector = await db.get_connection();

    await service_member.update_member(req);

    await db.commit(req.connector);

    res.json(true);
});

router.patch('/img', member.login_check(), upload.any(), async (req, res, next) => {
    req.file_keys = [];
    let { file } = utils.file_arranger(req.files);

    if(file !== undefined) {
        file = validator.file_img(file);
    }

    req.connector = await db.get_connection();

    await service_member.update_profile_img(req, file);

    await db.commit(req.connector);

    res.json(true);
}, async (err, req, res, next) => {
    await utils.file_delete(req.file_keys);

    throw err;
});

router.post('/id_check', async (req, res, next) => {
    const { id } = req.body;

    validator.str('id', req.body);

    try{
        await member.login_checker(req, res);
    }catch (e) {}

    await service_member.id_dup_check(req, id);

    res.json(true);
});

router.post('/email_check', async (req, res, next) => {
    const { email } = req.body;

    validator.str('email', req.body);

    try{
        await member.login_checker(req, res);
    }catch (e) {}

    await service_member.email_dup_check(req, email);

    res.json(true);
});

router.post('/nick_check', async (req, res, next) => {
    const { nickname } = req.body;

    validator.str('nickname', req.body);

    try{
        await member.login_checker(req, res);
    }catch (e) {}

    await service_member.nick_dup_check(req, nickname);

    res.json(true);
});



module.exports = router;
