import sql from 'mssql';

import config from '../config';

const dbSettings = {
    user     : config.user_db_tokens,
    password : config.password_db_tokens,
    server   : config.server_db_tokens,
    database : config.name_db_tokens,
    options  : {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

export const getConnetionTokens = async ()  => {

    try {
       return await sql.connect(dbSettings);
    } catch (error : any) {
        throw new Error( error );
    }

}
