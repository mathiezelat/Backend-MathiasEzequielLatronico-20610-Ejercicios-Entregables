## Incorporo al proyecto de servidor de trabajo la compresión gzip.

```
npm i compression // instalamos el paquete de compression
```


## Verifico sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y en el otro.

```
ruta /info sin compresión: 1,70 KB 
ruta /info con compresión: 1,05 KB 
```

## Realizo el análisis completo de perfomance sobre la ruta /info en modo fork con artillery

```
// con console.log

node --prof . // iniciamos el test

artillery quick --count 50 -n 20 http://localhost:8080/info > result_con_log.txt // hago el test de carga con 50 conexiones y 20 peticiones cada una

node --prof-process con-log.log > result_prof-con-log.txt


// sin console.log

node --prof . // iniciamos el test

artillery quick --count 50 -n 20 http://localhost:8080/info > result_sin_log.txt // hago el test de carga con 50 conexiones y 20 peticiones cada una

node --prof-process sin-log.log > result_prof-sin-log.txt
```


## Realizo el análisis completo de perfomance sobre la ruta /info en modo fork con Autocannon en línea de comandos, permilamiento del servidor con el modo inspector de node.js --inspect, diagrama de flama con 0x emulando la carga con Autocannon con los mismo parámetros.

```
// con console.log

node --inspect . // iniciamos el servidor en modo inspect

npm test // realizo el test con autocannon

npm start // iniciamos el servidor con 0x

npm test // realizo el test con autocannon

// sin console.log

node --inspect . // iniciamos el servidor en modo inspect

npm test // realizo el test con autocannon

npm start // iniciamos el servidor con 0x

npm test // realizo el test con autocannon
```

Informe sobre las pruebas realizadas incluyendo los resultados de todos los test (texto e imágenes) [REPORT.md](/REPORT.md)