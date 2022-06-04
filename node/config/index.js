let server_type = SERVER_TYPE;

// server_type = 'production';

function data_separator(product_data, develop_data){
    return server_type.indexOf('production') !== -1 ? product_data : develop_data;
}

function data_separator_triple(product_data, product_dev_data, develop_data){
    return server_type === 'production' ? product_data : server_type === 'production_dev' ? product_dev_data : develop_data;
}

const config = {
    server: {
        port: 22222
    },

    mysql_config: {
        connectionLimit : 20,
        user : 'root',
        password : 'root',
        database : 'test_db',
        multipleStatements: true,
        port : 3306,
        host:'127.0.0.1', // mysql-server가 있는 aws의 아이피를 넣어두됨 ex) 172.18.0.1
        charset : 'utf8mb4'
    },

    cipher: {
        key: 'VB!(Aja9ah7621!BZhda67a213asg3wk',
        two_way_algorithm: 'aria-256-cbc'
    },

    member: {
        salt: 'Vgj(Aja#HHasjdf7',
        jwt_secret: 'UASBzx9zxd!@#askd',
        hash_algorithm: 'sha512'
    },

    files : {
        imgs : {
            profile : 'imgs/profile/'
        }
    },
};


module.exports = config;