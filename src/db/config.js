import dotenv from 'dotenv'
import assert from 'assert'
dotenv.config();
const {PORT,HOST,HOST_URL,SQL_PORT,SQL_USER,SQL_PWD,SQL_DB,SQL_SERVER,JWT_SECRET} = process.env;
const sqLEncrypt = process.env.SQL_ENCRYPTED === "true";  

assert(PORT, 'PORT is required');
assert(HOST, 'PORT is required');

const config ={
    port:PORT,
    host:HOST,
    url:HOST_URL,
    sql:{
        server:SQL_SERVER,
        database:SQL_DB,
        user:SQL_USER,
        password:SQL_PWD,
        options:{
            encrypt:sqLEncrypt,
            enableArithAbort:true
        }
    },
    jwt_secret:JWT_SECRET,
};
export default config;