# LAEM

Red social de comida Hispanohablante

# Instrucciones para ejecutar el proyecto

1.  Instalar angular, maven, neo4j y nodejs.
2.  Clonar el repositorio.
3.  Entrar a la carpeta "client", una vez allí ejecutar el comando npm install para instalar las librerías necesarias.
4.  Dentro de la misma carpeta, ejecutar el comando ng serve, el cual ejecuta la aplicación en la dirección url: http://localhost:4200/
5.  Dentro de la carpeta "server", ejecutar el proyecto de java usando el IDE preferido.
6.  Crear y configurar una nueva base de datos en neo4j, para ello dirigirse a la carpeta "server/src/main/resources" y configurar la base de datos de acuerdo al archivo application.properties.
7.  Ejecutar la base de datos en el gestor de neo4j.

# Criterios para aceptar codigo

1.  Documentación
*  Front-end: Comentarios en HTML y CSS indicando la organización de los distintos elementos visuales
*  Back-end: Documentación en Javadoc y Typedoc que como mínimo tenga descripción, parametros y retorno
2.  Sintaxis
*  Front-end: Identación de etiquetas HTML ( usar la herramienta W3C para comprobar que siguen buenas prácticas de HTML )
*  Back-end: Ni un solo warning por sintaxis ( prohibido deshabilitar manualmente los warnings )
3.  Funcionalidad
*  Front-end y Back-end: Reporte de pruebas con porcentaje de aprobación superior a 90%

# Subir contenido al repostorio
1. Clonar proyecto en Visual Code
2. Crear rama empleando la siguiente sintaxis "INICIALES"_"FUNCIONALIDAD"
*  INICIALES: Iniciales del nombre de la persona que trabaja en esa rama, ej: db, nn, ag, etc.
*  FUNCIONALIDAD: nombre de la funcionalidad que se desarrolla en esa rama, ej: login, landing, leer_receta, ver_perfil
3. Compilar proyecto ( comando: ng serve )
4. Realizar cambios al codigo
5. Guardar y realizar commit
*  Asegurarse de estar ubicados sobre la rama que crearon
6. Realizar push a la rama correspondiente
7. Realizar reporte de pruebas ( 1 vez a la semana ) y subir a OneDrive

Cuando terminen de realizar todos los cambios, deben marcar en Asana el chulito indicando que completaron esa funcionalidad.

