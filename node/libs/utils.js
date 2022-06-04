const utils = {};
const Message = require(`libs/message`);

const ran_str = 'QWERTYUIOPASDFGHJKLZXCVBNM0123456789';

const fs = require('fs');

const mysql = require('mysql');
const db = require(`libs/db`);

utils.unique_check = async (table_name, key, col) => {
    if(col === undefined) col = 'idx';

    let sql = "SELECT idx " +
        "FROM " + table_name + " WHERE " + col + " = ?";
    sql = mysql.format(sql, [key]);

    const dup_check = await db.query(sql);

    return dup_check.length === 0;
};

utils.create_key = (count) => {
    count = parseInt(count) || 20;

    let key = '';

    for (let i=0; i<count; i++) {
        const ran_int = parseInt(Math.random() * ran_str.length);

        key += ran_str[ran_int];
    }

    return key;
};

utils.file_upload = async (key, buffer) => {
    if(fs.existsSync(BASE_PATH + key)){
        throw Message.SERVER_ERROR;
    }

    try {
        fs.writeFileSync(BASE_PATH + key, buffer);
    }catch (e) {
        console.log(e);
        throw Message.SERVER_ERROR;
    }

    return true;
};

utils.file_delete = async (key_list) => {
    if(key_list === undefined) return;

    for(let key of key_list) {
        key = BASE_PATH + "/" + key;

        if (fs.existsSync(key)) {
            try {
                fs.unlinkSync(key);
            } catch (e) {
                console.log(e);
                throw Message.SERVER_ERROR;
            }
        }
    }

    return true;
};

utils.file_arranger = (files) => {
    const storage = {};

    if(files !== undefined) {
        for (const f of files) {
            const k = f.fieldname;

            if (k === undefined) {
                throw Message.WRONG_PARAM('파일 구분');
            }

            if (storage[k] === undefined) {
                storage[k] = [f];
            } else {
                storage[k].push(f);
            }
        }
    }

    return storage;
};

utils.object_delete_undefined = (data_obj) => {
    for(const k in data_obj){
        if(data_obj[k] === undefined) delete data_obj[k];
    }
};

utils.arrange_data = (data) => {
    if(data.constructor === Array){
        for(let v of data){
            if(v === undefined) continue;

            if((v.constructor === Array && v.length !== 0) || v.constructor === Object){
                v = utils.arrange_data(v);
            }

            if(v !== undefined && v.constructor === String){
                v = v.toString().replace(/\?/g, '？');
            }
        }
    }else if(data.constructor === Object || Object.keys(data).length !== 0){
        for(const k in data){
            if(data[k] === undefined) continue;

            if((data[k].constructor === Array && data[k].length !== 0) || data[k].constructor === Object){
                data[k] = utils.arrange_data(data[k]);
            }

            if(data[k] !== undefined && data[k].constructor === String){
                data[k] = data[k].toString().replace(/\?/g, '？');
            }
        }
    }
};


module.exports = utils;
