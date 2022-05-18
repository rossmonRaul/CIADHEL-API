import sql from 'mssql';

import config from '../config';

const dbSettings = {
    user     : config.user_db,
    password : config.pass_db,
    server   : config.server_db,
    database : config.name_db,
    options  : {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

export const getConnetion = async ()  => {

    try {
       return await sql.connect(dbSettings);
    } catch (error : any) {
        throw new Error( error );
    }

}
