# Creamos el proyecto en Heroku

### 1. Refactorizamos todo lo necesario para el correcto funcionamiento en la nube.

### 2. Subimos el código a Heroku.

```
// antes del git init hacemos un archivo llamado .gitignore e ignoramos node_modules y .env

git init // iniciamos git
git

heroku git:clone -a ecommerce-mel-ch // clonamos el repositorio remoto de heroku

git add . // agregamos los archivos o cambios al area de stage

git commit -m "entregable - clase 34" // hacemos un commit de los cambios

git push heroku master // hacemos un push del commit al repositorio remoto de heroku

heroku config // para ver las variables de entorno que tiene nuestro servidor en heroku

heroku config:set MONGODB_CNN="" // agregamos una variable de entorno para el url de mongo atlas

heroku config:set SECRET_SESSION="" // agregamos una variable de entorno para el secreto de session
```

### 3. Cambio de la vista en el endpoint /vista

Se agrego un título `Heroku`

### 4. Revisamos a través de la consola local los mensajes enviador por nuestro servidor en Heroku a su propia consola.

```
heroku logs // para ver los logs del servidor en heroku
```