## 1. Agregado de un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster


```
npm start // inicia en modo fork por defecto
```
```
npm start --mode=FORK // para iniciar en modo fork
```
```
npm start --mode=CLUSTER // para iniciar en modo cluster
```


## 2. Agregado en la vista /info el número de procesadores presentes en el servidor

```
const numCPUs = require('os').cpus().length;
```


## 3. Ejecutar el servidor en modo FORK y CLUSTER con nodemon y verificar el número de procesos tomados por Node

```
// FORK

nodemon start // por defecto se levanta en modo fork

tasklist /fi "imagename eq node.exe" // para ver los procesos de node en windows

// número de procesos: 2


// CLUSTER

nodemon start --mode=CLUSTER // para iniciar en modo cluster

tasklist /fi "imagename eq node.exe" // para ver los procesos de node en windows

// número de procesos: 10
```


## 4. Ejecutar el servidor con los parámetros adecuados utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.

```
// FORK

forever start .\src\index.js // para ejecutar el servidor con forever en modo por defecto fork

forever list // para listar los procesos con forever

// número de procesos por forever: 2

tasklist /fi "imagename eq node.exe" // para listar los procesos de Node por sistema operativo

// número de procesos por sistema operativo: 2


// CLUSTER

forever start .\src\index.js --mode=CLUSTER // para ejecutar el servidor con forever en modo cluster

forever list // para listar los procesos con forever

// número de procesos por forever: 2

tasklist /fi "imagename eq node.exe" // para listar los procesos de Node por sistema operativo

// número de procesos por sistema operativo: 10
```


## 5. Ejecutar el servidor con los parámetros adecuados: modo FORK utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo

```
// FORK

pm2 start .\src\index.js --name="mode-fork" // para ejecutar el servidor con pm2 en modo por fork

pm2 ls // para listar los procesos con pm2

// número de procesos por pm2: 1

tasklist /fi "imagename eq node.exe" // para listar los procesos de Node por sistema operativo

// número de procesos por sistema operativo: 2


// CLUSTER

pm2 start .\src\index.js --name="mode-cluster" -i max // para ejecutar el servidor con pm2 en modo cluster

forever list // para listar los procesos con pm2

// número de procesos por pm2: 8

tasklist /fi "imagename eq node.exe" // para listar los procesos de Node por sistema operativo

// número de procesos por sistema operativo: 9
```


## 6. Tanto en Forever como en PM2 permitir el modo escucha, para la actualización del código del servidor se vea reflajdo inmediatamente en todos los procesos

```
// FOREVER

// FORK

forever start .\src\index.js --watch

// CLUSTER

forever start .\src\index.js --mode=CLUSTER --watch


// PM2

// FORK

pm2 start .\src\index.js --name="mode-fork" --watch

// CLUSTER

pm2 start .\src\index.js --name="mode-cluster" -i max
```


## 7. Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

```
// Sistema operativo

taskkill /fi "imagename eq node.exe" -f // finaliza todos los procesos de node


// FOREVER

forever stopall // finaliza los todos procesos fork y cluster


// PM2

pm2 stop all // finaliza todos los procesos fork y cluster
```


## 8. Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:

Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.

```
pm2 start .\src\index.js --name="mode-cluster-1" -- --mode=cluster --port=8081
```

El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.

```
pm2 start .\src\index.js --name="mode-fork" -- -- --port=8080
```

Modificamos el archivo de Nginx llamado nginx.conf

```
// Para que cuando le de cualquier endpoint se rediriga a un servidor individual con el puerto 8080:
location / {
    proxy_pass http://localhost:8080;
}

// Para que cuando le de al endpoint de /api/randoms se rediriga a un servidor individual con el puerto 8080:
location /api/randoms {
    proxy_pass http://localhost:8081;
}
```

```
./nginx.exe // para iniciar Nginx en Windows
```

Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde Nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084, y 8085 respectivamente.

```
pm2 start .\src\index.js --name="mode-cluster-2" -- --mode=cluster --port=8082

pm2 start .\src\index.js --name="mode-cluster-3" -- --mode=cluster --port=8083

pm2 start .\src\index.js --name="mode-cluster-4" -- --mode=cluster --port=8084

pm2 start .\src\index.js --name="mode-cluster-5" -- --mode=cluster --port=8085
```

Modificamos nuevamente el archivo de Nginx llamado nginx.conf

```
// Para que cuando le de al endpoint /api/randoms se rediriga a un cluster de servidores con el puerto 8082, 8083, 8084 y 8085:

upstream node_app {
    server 127.0.0.1:8082;
    server 127.0.0.1:8083;
    server 127.0.0.1:8084;
    server 127.0.0.1:8085;
}

server {

    location /api/randoms {
        proxy_pass http://node_app;
    }

}

```

```
./nginx -s quit // para terminar con el proceso de nginx en windows
```

Archivos de configuración de nginx en la carpeta de [nginx-conf](./nginx-conf)