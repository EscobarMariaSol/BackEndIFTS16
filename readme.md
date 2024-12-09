# Informe Trabajo Práctico Final BackEnd IFTS N°16

## Objetivos específicos:

    1- Desarrollar una aplicación web utilizando Node.js y Express.

    2- Integrar una base de datos (MongoDB Atlas).

    3- Implementar un sistema de rutas dinámicas y middleware. 

    4- Crear una API y probarla

    5- Seguir buenas prácticas de desarrollo.

## Objetivos generales:

    1- Desarrollar software por encargo 

    2- Integrar equipos de proyecto para el desarrollo

    3- Liderar grupos de trabajo y asumir roles especializados.

    4- Desempeñarse de manera autónoma en el desarrollo de sistemas de baja complejidad.

## Resolución

1. Para el desarrollo de esta aplicación, he decidido reutilizar el modelo desarrollado en el trabajo práctico anterior, para hacer esto de manera coherente se pensó en diseñar una una plataforma para gestionar cursos y sus respectivos integrantes, generando así dos colecciones relacionadas, cursos e integrantes.

2. Para integrar la base de datos se realizaron las modificaciones correspondientes en el código, permitiendo que las rutas de Postman consulten directamente a la base de datos, dejando obsoleto el modelo anterior, que consultaba a un archivo .JSON.

## Como probar la aplicación

1. Ingresar a [Postman](https://web.postman.co/) para probar las rutas

2. GET: 
    
    2.1. *Consultar estado del servidor* `Localhost:3000/`: Deberá recibir un mensaje que informe que la API funciona correctamente.

    ```
    ¡Mi aplicación está funcionando correctamente!
    ``` 

    2.2. *Consultar todos los integrantes* `Localhost:3000/integrantes`: Deberá recibir una lista de todos los integrantes registrados en la base de datos, con sus respectivos datos registrados.

    ```
    [
        {
            "_id": "674e49de1f995268db7073bc",
            "nombre": "nombre1",
            "apellido": "apellido1",
            "email": "mail1@gmail.com",
            "dni": "1234",
            "__v": 0
        },
        {
            "_id": "6750cd27c580fdd057ce2c5e",
            "nombre": "nombre2",
            "apellido": "apellido2",
            "email": "mail2@gmail.com",
            "dni": "5678",
            "__v": 0
        }
    ]
    ```

    _Error:_ en caso de error se recibirá el mensaje `Error al obtener los integrantes`, junto con una descripción del error.
    
    2.3. *Consultar todos los cursos* `Localhost:3000/cursos`: Deberá recibir una lista de todos los cursos registrados en la base de datos, con sus respectivos datos registrados.

    ```
    [
        {
            "_id": "67573ab2f70710aa90f20b91",
            "nombre": "curso1",
            "codigo": 1,
            "descripcion": "descripcion1",
            "duracion": 50,
            "integrantes": [],
            "__v": 0
        },
        {
            "_id": "67573adff70710aa90f20b93",
            "nombre": "curso2",
            "codigo": 2,
            "descripcion": "descripcion2",
            "duracion": 35,
            "integrantes": [
                {
                "_id": "6750cd27c580fdd057ce2c5e",
                "nombre": "nombre",
                "apellido": "apellido",
                "email": "mail@gmail.com"
                }
            ],
            "__v": 1
        }
    ]
    ```

    _Error:_ en caso de error se recibirá el mensaje `Error al obtener los cursos`, junto con una descripción del error.
    
    2.2. *Consultar todos los cursos asignados a un integrante según su DNI* `Localhost:3000/cursos/cursos/:dni`: Deberá recibir una lista de todos los cursos a los que fue asignado el integrante cuyo dni ha ingresado, con sus respectivos datos registrados.

    ```
    {
        "message": "Cursos del integrante con DNI 0",
        "cursos": [
            {
                "_id": "67573b1ff70710aa90f20b97",
                "nombre": "curso1",
                "codigo": 4,
                "descripcion": "descripcion1",
                "duracion": 35,
                "integrantes": [
                    "id1",
                    "id2",
                    "id3",
                    "id4"
                ],
                "__v": 4
            },
            {
                "_id": "67573c37f70710aa90f20ba9",
                "nombre": "curso2",
                "codigo": 10,
                "descripcion": "descripcion2",
                "duracion": 25,
                "integrantes": [
                    "id5",
                    "id6",
                    "id7",
                    "id8"
                ],
                "__v": 4
            }
        ]
    }
    ```
    _Errores:_ 
        En caso de que el dni no sea de un integrante registrado se recibirá el mensaje `El DNI del integrante no es válido`. En caso de algún otro error, recibirá el mensaje `Error al consultar los cursos del integrante`, junto con una descripción del error.

3. POST: 

    3.1. *Agregar un integrante* `Localhost:3000/integrantes`: Para cargar un integrante deberá cargar un archivo .json con los siguientes datos: 
    ``` 
    {
        "nombre": "Nombre",
        "apellido": "Apellido",
        "email": "mail@example.com",
        "dni": 12345678
    }
    ```
    Si no se genera ningún error, recibirá un mensaje que informe que el integrante se cargó correctamente y visualizará los datos cargados.

    ```
    {
        "mensaje": "Integrante cargado correctamente",
        "nuevoIntegrante": {
            "nombre": "Nombre",
            "apellido": "Apellido",
            "email": "mail@example.com",
            "dni": "12345678",
            "_id": "675756e5134da4929d963ff9",
            "__v": 0
        }   
    }
    ```

    _Errores:_
        En caso de que no se ingresen todos los datos necesarios para crear a un integrante, se recibirá el siguiente mensaje `Faltan datos en el cuerpo de la solicitud`. En caso de algún otro error se recibirá el siguiente mensaje `Error al agregar el integrante`, junto con una descripción del error.

    3.2. *Agregar un curso* `Localhost:3000/cursos`: Para cargar un nuevo curso deberá cargar un archivo .json con los siguientes datos: 
    ```
    {
        "nombre": "nombre",
        "codigo": 1,
        "descripcion": "descripcion opcional",
        "duracion": 23
    }
    ```
    Si no se genera ningún error, recibirá un mensaje que informe que el curso se cargó correctamente y visualizará los datos cargados.

    ```
    {
        "mensaje": "Curso cargado correctamente",
        "cursoGuardado": {
            "nombre": "nombre",
            "codigo": 0,
            "descripcion": "descripcion opcional",
            "duracion": 23,
            "integrantes": [],
            "_id": "675758c0bbfc47611cc3a2e3",
            "__v": 0
        }
    }
    ```

    _Errores:_
        En caso de que no se ingresen todos los datos necesarios para crear a un curso, se recibirá el siguiente mensaje `Faltan datos en el cuerpo de la solicitud`. En caso de algún otro error se recibirá el siguiente mensaje `Error al agregar el curso`, junto con una descripción del error.

4. PUT: 

    4.1. *Modificar el email de un integrante ingresando su DNI* `Localhost:3000/integrantes/:dni`: Para modificar el email de un integrante, ubicando al mismo por su número de dni, deberá ingresar como dato, en formato .json, el nuevo email del integrante:
    ```
    {
        "email": "mail@example.com"
    }
    ```
    Como respuesta deberá recibir el mensaje de éxito y los datos actualizados del integrante.

    ```
    {
        "mensaje": "Email actualizado correctamente",
        "integrante": {
            "_id": "idintegrante",
            "nombre": "nombre",
            "apellido": "apellido",
            "email": "mail@example.com",
            "dni": "0000",
            "__v": 0
        }
    }
    ```
    _Errores:_
        En caso de que no se ingrese el nuevo email, se recibirá el siguiente mensaje `Falta el nuevo email`. En caso de que el dni no corresponda al de un integrante registrado, se recibirá el siguiente mensaje `Integrante no encontrado`. En caso de algún otro error se recibirá el siguiente mensaje `Error al modificar el email`, junto con una descripción del error.

    
    4.2. *Asignar un integrante a un curso* `Localhost:3000/cursos/asignar`: Para asignar un integrante dentro de un determinado curso debe ingresar los datos en el siguiente formato .json:
     ```
    {
        "nombreCurso": "curso",
        "dniIntegrante": 1234
    }
    ```
    Si todo se ejecuta sin errores recibirá un mensaje de éxito y los datos del curso junto con el id de los integrantes del mismo.

    ```
    {
        "message": "Integrante asignado al curso con éxito",
        "curso": {
            "_id": "67573adff70710aa90f20b93",
            "nombre": "curso",
            "codigo": 2,
            "descripcion": "descripcion",
            "duracion": 35,
            "integrantes": [
                "integrante1",
                "integrante2"
            ],
            "__v": 2
        }
    }
    ```
    _Errores:_
        En caso de que el curso ingresado no exista, se recibirá el siguiente mensaje `Curso no encontrado`. En caso de que el integrante ingresado no exista, se recibirá el siguiente mensaje `Integrante no encontrado`. En caso de que el integrante ya este asignado al curso se recibirá el siguiente mensaje `El integrante ya está asignado a este curso`. En caso de algún otro error se recibirá el siguiente mensaje `Error al asigna el integrante`, junto con una descripción del error.

5. DELETE:

    5.1. *Eliminar un integrante* `Localhost:3000/integrantes/:dni`: Para eliminar un integrante con todos sus datos. Si el integrante cuyo dni ha ingresado existe, como respuesta recibirá un mensaje que confirme que el integrante se eliminó correctamente, junto con los datos eliminados.

    ```
    {
        "mensaje": "Integrante eliminado correctamente",
        "integrante": {
            "_id": "67573674ed31f086ee4a7990",
            "nombre": "nombre",
            "apellido": "apellido",
            "email": "mail@example.com",
            "dni": "11111",
            "__v": 0
        }
    }
    ```
    _Errores:_
        En caso de que el integrante no exista, se recibirá el siguiente mensaje `Integrante no encontrado`. En caso de algún otro error se recibirá el siguiente mensaje `Error al eliminar el integrante`, junto con una descripción del error.

    5.2. *Eliminar un curso* `Localhost:3000/cursos/:codigo`:  Para eliminar un curso con todos sus datos. Si el curso cuyo código ha ingresado existe, como respuesta recibirá un mensaje que confirme que el integrante se eliminó correctamente, junto con los datos eliminados.

    ````
    {
        "message": "Curso eliminado con éxito",
        "curso": {
            "_id": "6757589cbbfc47611cc3a2e1",
            "nombre": "curso",
            "codigo": 11,
            "descripcion": "descripción",
            "duracion": 20,
            "integrantes": [],
            "__v": 0
        }
    }
    ```

     _Errores:_ 
En caso de que el integrante no exista, se recibirá el siguiente mensaje `Curso no encontrado`. En caso de algún otro error se recibirá el siguiente mensaje `Error al eliminar el curso`, junto con una descripción del error.

