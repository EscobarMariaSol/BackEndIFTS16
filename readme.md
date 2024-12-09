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

1- Para el desarrollo de esta aplicación, he decidido reutilizar el modelo desarrollado en el trabajo práctico anterior, para hacer esto de manera coherente se pensó en diseñar una una plataforma para gestionar cursos y sus respectivos integrantes, generando así dos tablas relacionadas, cursos e integrantes.
2- Para integrar la base de datos se realizaron las modificaciones correspondientes en el código, permitiendo que las rutas de Postman consulten directamente a la base de datos, dejando obsoleto el modelo anterior, que consultaba a un archivo .JSON.

## Como probar la aplicación

1. Ingresar a [Postma](https://web.postman.co/) para probar las rutas

2. GET: 
    
    2.1. *Consultar estado del servidor* `Localhost:3000/`: Deberá recibir un mensaje que informe que la API funciona correctamente
    
    2.2. *Consultar todos los integrantes* `Localhost:3000/integrantes`: Deberá recibir una lista de todos los integrantes registrados en la base de datos, con sus respectivos datos registrados.
    
    2.3. *Consultar todos los cursos* `Localhost:3000/cursos`: Deberá recibir una lista de todos los cursos registrados en la base de datos, con sus respectivos datos registrados.
    
    2.2. *Consultar todos los cursos asignados a un integrante según su DNI* `Localhost:3000/cursos/cursos/:dni`: Deberá recibir una lista de todos los cursos a los que fue asignado el integrante cuyo dni ha ingresado, con sus respectivos datos registrados.

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


4. PUT: 

    4.1. *Modificar el email de un integrante ingresando su DNI* `Localhost:3000/integrantes/:dni`: Para modificar el email de un integrante, ubicando al mismo por su número de dni, deberá ingresar como dato, en formato .json, el nuevo email del integrante:
    ```
    {
        "email": "mail@example.com"
    }
    ```
    Como respuesta deberá recibir el mensaje de éxito y los datos actualizados del integrante.

    4.2. *Asignar un integrante a un curso* `Localhost:3000/cursos/cursos/:dni`: Para asignar un integrante dentro de un determinado curso debe ingresar los datos en el siguiente formato .json:
     ```
    {
        "nombreCurso": "curso",
        "dniIntegrante": 1234
    }
    ```
    Si todo se ejecuta sin errores recibirá un mensaje de éxito y los datos del curso junto con el id de los integrantes del mismo.

5. DELETE:

    5.1. *Eliminar un integrante* `Localhost:3000/integrantes/:dni`: Para eliminar un integrante con todos sus datos. Si el integrante cuyo dni ha ingresado existe, como respuesta recibirá un mensaje que confirme que el integrante se eliminó correctamente, junto con los datos eliminados.

    5.2. *Eliminar un curso* `Localhost:3000/cursos/:codigo`:  Para eliminar un curso con todos sus datos. Si el curso cuyo código ha ingresado existe, como respuesta recibirá un mensaje que confirme que el integrante se eliminó correctamente, junto con los datos eliminados.
