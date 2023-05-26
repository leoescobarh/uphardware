const http = require('http');
const cpuinfo = require('node-cpuinfo');

const server = http.createServer((req, res) => {
  if (req.url === '/api/hardware') {
    cpuinfo.get().then(info => {
      const data = {
        placaMadre: info.baseboard.manufacturer + ' ' + info.baseboard.model,
        procesador: info.cpu.brand,
        discosDuros: info.diskLayout.map(disk => disk.name),
        tarjetaGrafica: info.graphics.controllers.length > 0 ? info.graphics.controllers[0].model : null,
        memoriaRAM: info.mem.total / (1024 * 1024 * 1024)
      };

   //   res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    }).catch(error => {
      res.statusCode = 500;
      res.end('Error al obtener la información del hardware: ' + error.message);
    });
  } else {
    // Ruta no encontrada
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
