const login = {
  "ok": true,
  "cedula": "101127",
  "airport": {
      "ID_Aeropuerto": 27
  }
}

const getAllAirports = {
    "ok": true,
    "length": 25,
    "airports": [
        {
            "ID_Aeropuerto": 1,
            "Nombre": "Barra de Parismina",
            "Nombre_OACI": "MRBP",
            "Direccion_Exacta": "Pococi, Limón",
            "Pista": "14|32",
            "Coordenada": "10.30250 ° N 83.34583 O",
            "Elevacion": "2 m / 7 pies",
            "Espacio_Aereo": "ND",
            "Numero_Telefono1": "(506) 2710-6571",
            "Horario": "ND"
        },
        {
            "ID_Aeropuerto": 2,
            "Nombre": "Batan",
            "Nombre_OACI": "MRBN",
            "Direccion_Exacta": "Matina, Limón",
            "Pista": "36|18",
            "Coordenada": "38.00 S - 57.40 W",
            "Elevacion": "12 m / 39 pies",
            "Espacio_Aereo": "ND",
            "Numero_Telefono1": "no disponible",
            "Horario": "8:30 - 20:00"
        }
    ]
};

const getAllAirportsByName = {
    "ok": true,
    "length": 1,
    "airports": [
        {
        "ID_Aeropuerto": 2,
        "Nombre": "Batan",
        "Nombre_OACI": "MRBN",
        "Direccion_Exacta": "Matina, Limón",
        "Pista": "36|18",
        "Coordenada": "38.00 S - 57.40 W",
        "Elevacion": "12 m / 39 pies",
        "Espacio_Aereo": "ND",
        "Numero_Telefono1": "no disponible",
        "Horario": "8:30 - 20:00"
        }
    ]
};

const searchAirports = {
  "ok": true,
  "length": 6,
  "airports": [
    {
        "ID_Aeropuerto": 1,
        "Nombre": "Barra de Parismina",
        "Nombre_OACI": "MRBP",
        "NombreICAO": "MRBP",
        "Direccion_Exacta": "Pococi, Limón",
        "Pista": "14|32",
        "Coordenada": "10.30250 ° N 83.34583O",
        "Elevacion": "2 m / 7 pies",
        "Espacio_Aereo": "No disponible",
        "Numero_Telefono1": "(506) 2710-6571",
        "Horario": "No disponible"
    },
    {
        "ID_Aeropuerto": 2,
        "Nombre": "Batan",
        "Nombre_OACI": "MRBN",
        "NombreICAO": "MRBN",
        "Direccion_Exacta": "Matina, Limón",
        "Pista": "36|18",
        "Coordenada": "38.00 S 57.40W",
        "Elevacion": "12 m / 39 pies",
        "Espacio_Aereo": "No disponible",
        "Numero_Telefono1": "No disponible",
        "Horario": "8:30 - 20:00"
    }
  ]
};

const getSizeAirports = {
  "ok": true,
  "size": 26
}

const getIdentifier = {
  "ok": true,
  "msg": "Ok"
}

const getAnAirportById = {
        "ok": true,
        "Aeropuerto": {
          "ID_Aeropuerto": 2,
          "Nombre": "Batan",
          "Nombre_OACI": "MRBN",
          "NombreICAO": "MRBN",
          "Estado_Aeropuerto": "Abierto",
          "Ultima_Actualizacion": "2022-02-28T06:42:00.000Z"
        },
        "Caracteristicas_Especiales": {
          "ID_CarESP_Aero": 2,
          "ID_Aeropuerto": 2,
          "Publico": 1,
          "Controlado": 0,
          "Coordenada": "38.00 S 57.40\"W",
          "Info_Torre": "No disponible",
          "Info_General": "No disponible",
          "Espacio_Aereo": "No disponible",
          "Combustible": "110L",
          "Norma_General": "No disponible",
          "Norma_Particular": "Precaución árboles umbral Pista 36. Precaución árboles a 200 m umbral Pista 18"
        },
        "Frecuencias": [
          {
            "ID_Frecuencia": 2,
            "Frecuencia": 123,
            "TipoFrecuencia": "TWR"
          }
        ],
        "NOTAMS": [
          
        ],
        "Pistas": {
          "ID_Pista": 2,
          "ID_Aeropuerto": 2,
          "Pista": "36|18",
          "Elevacion": "12 m / 39 pies",
          "Superficie_Pista": "asfalto",
          "ASDA_Rwy_1": 2625,
          "ASDA_Rwy_2": 2625,
          "TODA_Rwy_1": 2625,
          "TODA_Rwy_2": 2625,
          "TORA_Rwy_1": 2625,
          "TORA_Rwy_2": 2625,
          "LDA_Rwy_1": 2625,
          "LDA_Rwy_2": 2625
        },
        "Contacto": {
          "ID_Contacto": 2,
          "ID_Aeropuerto": 2,
          "Direccion_Exacta": "Matina, Limón",
          "Numero_Telefono1": "No disponible",
          "Numero_Telefono2": "No disponible",
          "Horario": "8:30 - 20:00"
        }
};

const getTokens = {
  "ok": true,
  "tokens": [
      "token",
      "token",
      "token",
      "token",
      "token",
  ]
}

const getFile = {
    "ok": true,
    "airports": {
        "ID_Aeropuerto": 23,
        "Nombre": "Aeropuerto Internacional Juan Santamaría",
        "Nombre_OACI": "MROC",
        "NombreICAO": "SJO"
    },
    "file": "src/access/files/MROC.pdf"
}

const getExist = {
  "ok": true,
  "exists": true
}

const postCreateFavorite = {
  "ID_Aeropuerto": 2,
  "Identificador": "4343434343",
  "Nombre": "Barra de Parismina",
  "Nombre_OACI": "MRBP",
  "NombreICAO": "MRBP",
  "Usuario_Creacion": "305350175"
}

const updateAirport = {
  "Nombre_OACI": "ABC",
  "NombreICAO": "ABC",
  "Estado_Aeropuerto": "ABC",
  "Usario": "101110127",
  "Notam": "ABC",
  "Publico": "1",
  "Controlado": "1",
  "Coordenada": "11",
  "Info_Torre": "ABC",
  "Info_General": "ABC",
  "Espacio_Aereo": "ABC",
  "Combustible": "ABC",
  "Norma_General": "ABC",
  "Norma_Particular": "ABC",
  "Direccion_Exacta": "ABC", 
  "Numero_Telefono1": "11",
  "Numero_Telefono2": "11",
  "Horario": "11",
  "ATIS": "120,10",
  "TWR": "121,10",
  "GRND": "122,10",
  "EMERGENCY": "123,10",
  "Otras": "124,10",
  "Pista": "11",
  "Elevacion": "11",
  "Superficie_Pista": "11",
  "ASDA_Rwy_1": "11",
  "ASDA_Rwy_2": "11",
  "TODA_Rwy_1": "11",
  "TODA_Rwy_2": "11",
  "TORA_Rwy_1": "11",
  "TORA_Rwy_2": "11",
  "LDA_Rwy_1": "11",
  "LDA_Rwy_2": "11"
}

const saveToken = {
  "identifier" : "229",
  "token" : "123456789"
}

const sendNotification = {
  "idAirport" : 27,
  "title" : "title",
  "body" : "body"
}

document.getElementById('JSONLogin').innerHTML = JSON.stringify(login, undefined, 2);

document.getElementById('JSONGetAllAirports').innerHTML = JSON.stringify(getAllAirports, undefined, 2);

document.getElementById('JSONSearch').innerHTML = JSON.stringify(searchAirports, undefined, 2);

document.getElementById('JSONGetAirportByName').innerHTML = JSON.stringify(getAllAirportsByName, undefined, 2);

document.getElementById('JSONGetAnAirportById').innerHTML = JSON.stringify(getAnAirportById, undefined, 2);

document.getElementById('JSONGetSizeAirports').innerHTML = JSON.stringify(getSizeAirports, undefined, 2);

document.getElementById('JSONGetFavoritebyId').innerHTML = JSON.stringify(getIdentifier, undefined, 2);

document.getElementById('JSONCreateFavorite').innerHTML = JSON.stringify(postCreateFavorite, undefined, 2);

document.getElementById('JSONGetExistFavorite').innerHTML = JSON.stringify(getIdentifier, undefined, 2);

document.getElementById('JSONDeleteFavorite').innerHTML = JSON.stringify(getIdentifier, undefined, 2);

document.getElementById('JSONUpdateAirport').innerHTML = JSON.stringify(updateAirport, undefined, 2);

document.getElementById('JSONGetFile').innerHTML = JSON.stringify(getFile, undefined, 2);

document.getElementById('JSONSaveToken').innerHTML = JSON.stringify(saveToken, undefined, 2);

document.getElementById('JSONGetAllTokens').innerHTML = JSON.stringify(getTokens, undefined, 2);

document.getElementById('JSONSendNotification').innerHTML = JSON.stringify(sendNotification, undefined, 2);

document.getElementById('JSONGetExistIdentificador').innerHTML = JSON.stringify(getExist, undefined, 2);