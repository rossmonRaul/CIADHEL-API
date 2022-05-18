# CIIADHEL API REST

### Version V1.0.0

### Routes

1. /api/aiports
2. /api/users
3. /api/notifications
4. /api/files

### Actions

#### Airports

1. Get all airports Verb = GET Try: [https://ciiadhel-api-rest.herokuapp.com/api/airports](https://ciiadhel-api-rest.herokuapp.com/api/airports)
2. Get all airports by Name Verb = GET Try: [https://ciiadhel-api-rest.herokuapp.com/api/airports/name/Batan](https://ciiadhel-api-rest.herokuapp.com/api/airports/name/Batan)
3. Get an airport by Id Verb = GET Try: [https://ciiadhel-api-rest.herokuapp.com/api/airports/id/14](https://ciiadhel-api-rest.herokuapp.com/api/airports/id/14)
4. Get size of airports Verb = GET Try: [https://ciiadhel-api-rest.herokuapp.com/api/airports/size](https://ciiadhel-api-rest.herokuapp.com/api/airports/size)
5. Update validation Verb = POST: https://ciiadhel-api-rest.herokuapp.com/api/airports/lastDate/4
6. Get favorite by identifier = GET Try: https://ciiadhel-api-rest.herokuapp.com/api/airports/favorito/1/358240051111110
7. Create Favorite = POST =  https://ciiadhel-api-rest.herokuapp.com/api/airports/favorito
8. Get Exists by identifier = GET Try: https://ciiadhel-api-rest.herokuapp.com/api/airports/favorito/1/358240051111110
9. Delete favorite = DELETE Try: https://ciiadhel-api-rest.herokuapp.com/api/airports/favorito/1/358240051111110

#### Users

1. Login for users Verb = POST https://ciiadhel-api-rest.herokuapp.com/api/users/login/cedula/password

#### Notifications

1. Save tokens and identification Verb = POST https://ciiadhel-api-rest.herokuapp.com/api/notifications/tokens
2. Get all tokens Verb = GET https://ciiadhel-api-rest.herokuapp.com/api/notifications/tokens
3. Send notification push Verb = POST = https://ciiadhel-api-rest.herokuapp.com/api/notifications
4. Exist identificador Verb = GET = https://ciiadhel-api-rest.herokuapp.com/api/notifications/identifier/12345678

#### Files

1. Get file = GET https://ciiadhel-api-rest.herokuapp.com/api/files/file/sjo

#### Release data

> - Date: 08 April, 2022
> - Back-end: CIIADHEL
