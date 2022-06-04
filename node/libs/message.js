class Message extends Error {
    constructor(status, code, message) {
        super(message);

        this.status = status;
        this.code = code;
        this.message = message;
    }

    toJSON() {
        return {
            status: this.status,
            code: this.code,
            message: this.message
        };
    }

    /**
     * Not Founds
     */
    static INVALID_PARAM(name) {
        return new Message(400, `invalid_parameter_${name}`, name + '을(를) 입력해주세요.');
    }

    static WRONG_PARAM(name) {
        return new Message(400, 'wrong_param_' + name, name + '을(를) 잘못 입력했습니다.');
    }

    static ALREADY_EXIST(name) {
        return new Message(400, 'already_exist_' + name, '이미 존재하는 ' + name + ' 입니다.');
    }

    static NOT_EXIST(name) {
        return new Message(400, 'not_exist_' + name, '존재하지 않는 ' + name + ' 입니다.');
    }

    static TOO_LARGE_SIZE_FILE(size) {
        return new Message(400, 'too_large_size_file', size+'MB 이하 파일만 업로드 할 수 있습니다.');
    }

    static INCLUDE_BAN_KEYWORD(name, ban_keyword) {
        return new Message(400, 'include_ban_keyword_' + name, name + '에 사용할 수 없는 값 ' + '"' + ban_keyword + '"' + '이 포함되어있습니다.');
    }

    static DETAIL_ERROR(message) {
        return new Message(400, 'detail_error', message);
    }


    static get EXPIRED_TOKEN(){
        return new Message(401, 'expired_token', '토큰이 만료되었습니다.');
    }

    static get UNAUTHORIZED() {
        return new Message(401, 'unauthorized', '로그인 정보가 존재하지 않습니다.\n로그인 해주세요.');
    }

    static get INVALID_TOKEN() {
        return new Message(401, 'invalid_token', '로그인 정보가 올바르지 않습니다.\n다시 로그인해주세요');
    }



    static get FORBIDDEN() {
        return new Message(403, 'forbidden', '권한 없음');
    }



    static get SERVER_ERROR() {
        return new Message(500, 'Server_error', 'Please try again.');
    }


    static is(target, message) {
        if (!(target instanceof Message)) {
            return false;
        }

        if (arguments.length === 1) {
            return true;
        }

        return target.status === message.status &&
            target.code === message.code;
    }

}

const code = [
    200, // 0
    201, // 1
    201, // 2
    201, // 3
    204 // 4
];

const message = [
    'Success',  // 0 - 200
    'Created', // 1 - 201
    'Updated', // 2 - 201
    'Deleted', // 3 - 201
    'No content' // 4 - 204
];

Message.json = function (num, idx) {
    const json = { code: code[num], message: message[num] };

    if (idx) json.idx = idx;

    return json;
};


module.exports = Message;
