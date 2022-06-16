//node index.js --modo CLUSTER => PARA EJECUTAR 
// forever start index.js para hacer andar el forever
// forever list => para ver las lista de procesos activos
// ejecutar en powershell => tasklist /fi "imagename eq node.exe" => para corroborar que los procesos esten activos.
// pm2 list => para listar los servidores activos.
// pm2 start index.js –name servidor-8082 – –puerto 8082 –modo CLUSTER
// pm2 start index.js –name servidor-8081 – –puerto 8081
// pm2 start index.js –name servidor-8080 – –puerto 8080
// pm2 start index.js –name servidor-8083 – –puerto 8083 –modo CLUSTER