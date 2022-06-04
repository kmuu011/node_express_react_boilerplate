const service_member = {};

const dao_member = require(`dao/member/member`);

const config = require(`config`);

const utils = require(`libs/utils`);
const member = require(`libs/member`);
const organizer = require(`libs/organizer`);

service_member.select_member = async (member_idx) => {
    return await dao_member.select_member(member_idx);
};

service_member.login = async (id, password) => {
    password = await member.encrypt(password);

    const member_info = await dao_member.login(id, password);

    const token = await member.token(member_info);

    return { member_info, token };
};

service_member.sign_up = async (req) => {
    let { id, password, email, nickname } = req.body;

    password = await member.encrypt(password);

    let data_obj = { id, password, email, nickname };

    req.organized_sql = await organizer.get_sql(data_obj, Object.keys(data_obj).toString());

    return await dao_member.sign_up(req);
};

service_member.update_member = async (req) => {
    let { email, nickname, password } = req.body;
    let data_obj = { email, nickname };

    if(email !== req.member.email){
        await dao_member.email_dup_check(email);
    }

    if(password !== undefined){
        password = await member.encrypt(password);
        data_obj.password = password;
    }

    req.organized_sql = await organizer.get_sql(data_obj, Object.keys(data_obj).toString());

    return await dao_member.update_member(req);
};

service_member.update_profile_img = async (req, file) => {
    let key = undefined;

    let { profile_img_key: before_profile_img_key } = req.member;

    //파일을 업로드 하지 않으면 프로필 이미지 초기화
    if(file !== undefined) {
        while (true) {
            key = await utils.create_key(28);
            key = config.files.imgs.profile + key + '.' + file[0].type;
            if (await utils.unique_check('member', key, 'profile_img_key')) break;
        }

        await utils.file_upload(key, file[0].buffer);
        req.file_keys.push(key);
    }

    await dao_member.update_profile_img(req, key);

    if(before_profile_img_key !== undefined && before_profile_img_key !== null){
        try {
            await utils.file_delete([before_profile_img_key]);
        } catch (e) {}
    }

    return true;
};

service_member.id_dup_check = async (req, id) => {
    if(id === req?.member?.id) return true;

    return await dao_member.id_dup_check(id);
};

service_member.email_dup_check = async (req, email) => {
    if(email === req?.member?.email) return true;

    return await dao_member.email_dup_check(email);
};

service_member.nick_dup_check = async (req, nickname) => {
    if(nickname === req?.member?.nickname) return true;

    return await dao_member.nick_dup_check(nickname);
};

service_member.old_pwd_check = async (member_idx, old_password) => {
    old_password = await member.encrypt(old_password);

    return await dao_member.old_pwd_check(member_idx, old_password);
};


module.exports = service_member;
