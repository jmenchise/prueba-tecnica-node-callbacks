import net from 'node:net'
import fs from 'node:fs'

export const ping = (ip, cb) => {
   const startTime = process.hrtime()

   const client = net.connect({ port: 80, host: ip }, () => {
      client.end()
      cb(null, { time: process.hrtime(startTime), ip })
   })

   client.on('error', (err) => {
      cb(err)
      client.end()
   })
}

ping('midu.dev', (err, info) => {
   if (err) console.error(err)
   console.log(info)
})


export function obtenerDatosPromise() {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve({ data: 'datos importantes' });
      }, 2000);
   })
}

obtenerDatosPromise()
   .then(data => {
      console.log(data);
   });



export async function procesarArchivo() {
   let contenido;
   try {
      contenido = await fs.promises.readFile('input.txt', 'utf8');
   } catch (error) {
      console.error('Error leyendo archivo:', error.message);
   }
   const textoProcesado = contenido.toUpperCase();
   try {
      await fs.promises.writeFile('output.txt', textoProcesado);
      console.log('Archivo procesado y guardado con éxito');
   } catch (error) {
      console.error('Error guardando archivo:', error.message);
   }
}

procesarArchivo();


export async function leerArchivos() {
   const [archivo1, archivo2, archivo3] = await Promise.allSettled([
      fs.promises.readFile('archivo1.txt', 'utf8'),
      fs.promises.readFile('archivo2.txt', 'utf8'),
      fs.promises.readFile('archivo3.txt', 'utf8')
   ]);
   return `${archivo1.value} ${archivo2.value} ${archivo3.value}`
}

const info = await leerArchivos();
console.log(info);

export async function delay(t) {
   return new Promise((resolve, reject) => {
      setTimeout(resolve, t)
   })
}

delay(3000).then(() => console.log('Hola mundo'));
