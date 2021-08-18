console.log("registrado")
// es array porque se colocan todas las rutas del sitio
const CACHE_ELEMENTS = [
    "./",//para cachear la pagina de inicio
    "https://unpkg.com/@babel/standalone/babel.min.js", //cachear todos los enlaces de scripts
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "./style.css",//tambien estilos css
    "./components/Contador.js",

] 

const CACHE_NAME = "v1_cache_ccontador"

//self viene siendo lo mismo que this pero se acostumbra usar self
self.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache =>{
            // para agregar todas las rutass al cache
            cache.addAll(CACHE_ELEMENTS).then(()=>{
                self.skipWaiting()
            }).catch(console.log)
        })
    )// espera a que algo suceda
}) //la primer parte del ciclo de vida de un service woerker 

self.addEventListener("activate",(event)=>{
    const cacheWhitelist = [CACHE_NAME]
    event.waitUntil(
        caches.keys().then(cachesNames => {
            return Promise.all(cachesNames.map(cacheName => {
               return cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName)
            }))
        }).then(()=>{
            self.clients.claim()
        })
    )// espera a que algo suceda
}) 

self.addEventListener("fetch",(event)=>{
    event.respondWith(
        caches.match(event.request).then((res) => {
            if(res){
                return res
            }

            return fetch(event.request)
        })
    )
})