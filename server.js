const http = require('http');
const si = require('systeminformation');

const server = http.createServer((req, res) => {
  if (req.url === '/api/hardware') {
    si.get({
      baseboard: 'manufacturer,model',
      cpu: 'brand',
      disks: 'name',
      graphics: 'controllers.model',
      mem: 'total',
    }).then(data => {
  const hardwareInfo = {
  placaMadre: data.baseboard?.manufacturer + ' ' + data.baseboard?.model,
  procesador: data.cpu?.brand,
  discosDuros: data.disks?.map(disk => disk.name),
  tarjetaGrafica: data.graphics.controllers?.length > 0 ? data.graphics.controllers[0].model : null,
  memoriaRAM: data.mem?.total / (1024 * 1024 * 1024),
};


 //     res.setHeader('Content-Type', 'application/json');
      console.log(data)
      res.end(JSON.stringify(hardwareInfo));
    }).catch(error => {
      res.statusCode = 500;
      res.end('Error al obtener la información del hardware: ' + error.message);
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
