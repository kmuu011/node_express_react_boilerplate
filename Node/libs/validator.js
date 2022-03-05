const Message = require(`libs/message`);

const validator = {};

validator.type = {
    img : { reg: /^jpg$|^jpeg$|^gif$|^png$|^bmp$/, msg : 'jpg, jpeg, gif, png, bmp 파일 형식만 업로드 할 수 있습니다.'},
};

validator.str = async (keys, obj) => {
    keys = keys.replace(/\s/g, '').split(',');

    for(let k of keys){
        if(obj[k] === undefined || obj[k].toString().replace(/\s/g, '') === ''){
            throw Message.INVALID_PARAM(k);
        }

        obj[k] = obj[k].toString();

        if(obj[k].constructor !== String){
            throw Message.WRONG_PARAM(k)
        }
    }

    return true;
};

validator.int = async (keys, obj) => {
    keys = keys.replace(/\s/g, '').split(',');

    for(let k of keys){
        if(obj[k] === undefined || isNaN(parseInt(obj[k]))){
            throw Message.INVALID_PARAM(k);
        }

        obj[k] = parseInt(obj[k]);

        if(obj[k].constructor !== Number){
            throw Message.WRONG_PARAM(k)
        }
    }

    return true;
};

validator.ban_str = async (value, list) => {
    list = list.replace(/\s/g, '').split(',');

    for(let k of list){
        if(value.indexOf(k) !== -1){
            throw Message.INCLUDE_BAN_KEYWORD(value, list[value.indexOf(k)]);
        }
    }
    return true;
};

validator.file_img = async (files) => {
    let file_list = [];

    if(files === undefined || files.length === 0){
        throw Message.INVALID_PARAM('image_file');
    }

    for(let f of files){
        let name, type, size, buffer, mime_type;

        type = f.originalname.substring(f.originalname.lastIndexOf('.')+1);
        type = type.toLowerCase();
        name = f.originalname.substring(0, f.originalname.lastIndexOf('.'));
        size = f.size;
        buffer = f.buffer;
        mime_type = f.mimetype.replace('image/', '').toLowerCase();

        if(!validator.type.img.reg.test(type) && !validator.type.img.reg.test(mime_type)){
            throw Message.WRONG_PARAM(validator.type.img.msg);
        }

        if(size/1024/1024 > 10){
            throw Message.TOO_LARGE_SIZE_FILE(10);
        }

        file_list.push({name, type, size, buffer});
    }

    return file_list;
};



module.exports = validator;
