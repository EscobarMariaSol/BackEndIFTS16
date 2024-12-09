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
    
    2.1. Localhost:3000/ => Deberá recibir un mensaje que informe que la API funciona correctamente
    
    2.2. Localhost:3000/integrantes => Deberá recibir una lista de todos los integrantes registrados en la base de datos, con sus respectivos datos registrados.
    
    2.3. Localhost:3000/cursos => Deberá recibir una lista de todos los cursos registrados en la base de datos, con sus respectivos datos registrados.
    
    2.2. Localhost:3000/integrantes => Deberá recibir una lista de todos los integrantes registrados en la base de datos, con sus respectivos datos registrados.

3- POST: 
    3.1- Localhost:3000/integrantes => Para cargar un integrante deberá cargar un archivo .json con los siguientes datos: nombre, apellido, email y dni. => Deberá recibir un mensaje que informe que el integrante se cargó correctamente y visualizar los datos caargados.

4- PUT: 
    4.1- Localhost:3000/integrantes/:dni => Para modificar el email de un integrante, ubicando al mismo por su número de dni. Como respuesta deberá recibir el mensaje de éxito y los datos actualizados del integrante.

5- DELETE:
    5.1- Localhost:3000/integrantes/:dni => Para eliminar un integrante con todos sus datos. Como respuesta recibirá un mensaje que confirme que el integrante se eliminó correctamente, junto con los datos eliminados.
