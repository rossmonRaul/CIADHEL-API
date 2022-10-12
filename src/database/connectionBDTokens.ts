import sql from 'mssql';

import config from '../config';

const dbSettings = {
    user     : 'db_a8e272_nuviantoken2_admin',
    password : 'Nuvian123',
    server   : 'SQL8001.site4now.net',
    database : 'db_a8e272_nuviantoken2',
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
