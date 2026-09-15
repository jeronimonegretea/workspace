# Taller: Publicación de proyectos React + Supabase

## Parte 1 — Investigación teórica

### 1. Cómo llega un usuario a tu sitio

Cuando un usuario escribe una URL en el navegador, ocurren varios pasos antes de que pueda visualizar la página.

Primero, el navegador analiza la URL y necesita conocer la dirección IP del servidor. Para eso realiza una consulta DNS. El DNS convierte el nombre de dominio, por ejemplo `github.com`, en una dirección IP.

Después se establece una conexión TCP con el servidor. Si el sitio utiliza HTTPS, se realiza además un handshake TLS. En este proceso el navegador y el servidor negocian los parámetros de seguridad y se valida el certificado del sitio.

Una vez establecida la conexión segura, el navegador envía una petición HTTP, normalmente una petición `GET` para solicitar el recurso principal. El servidor responde con un código HTTP, cabeceras y el contenido solicitado, por ejemplo un archivo `index.html`.

Finalmente, el navegador interpreta el HTML y solicita otros recursos necesarios, como archivos CSS, JavaScript, imágenes y fuentes. Con estos recursos construye y renderiza la página que el usuario puede visualizar.

### Partes de una URL

Ejemplo:

`https://www.ejemplo.com:443/productos?id=25#detalle`

* **Esquema:** `https`
* **Subdominio:** `www`
* **Dominio:** `ejemplo`
* **TLD:** `.com`
* **Puerto:** `443`
* **Ruta:** `/productos`
* **Query string:** `?id=25`
* **Fragmento:** `#detalle`

El **dominio** identifica un sitio dentro del sistema DNS. Un **subdominio** es una subdivisión del dominio, como `api.ejemplo.com` o `blog.ejemplo.com`. El **hosting** es el servicio o infraestructura donde están almacenados y disponibles los archivos y servicios de una aplicación.

Se pueden contratar por separado porque cumplen funciones diferentes. El dominio proporciona el nombre que utilizan los usuarios, mientras que el DNS indica a dónde debe dirigirse ese nombre y el hosting proporciona la infraestructura que sirve la aplicación.

---

## 2. DNS

DNS significa **Domain Name System**. Es el sistema encargado de traducir nombres de dominio fáciles de recordar, como `github.com`, a direcciones IP que pueden utilizar los computadores.

Se suele comparar con una agenda de contactos porque permite buscar un nombre y obtener la dirección correspondiente.

### Jerarquía DNS

La resolución DNS funciona mediante diferentes niveles:

1. **Root servers:** conocen dónde encontrar los servidores responsables de cada TLD.
2. **TLD servers:** administran información sobre dominios como `.com`, `.org`, `.co`, etc.
3. **Servidores autoritativos:** contienen la información definitiva sobre un dominio concreto.
4. **Resolver recursivo:** recibe la consulta del usuario y realiza las búsquedas necesarias hasta obtener la respuesta.

### Tipos de registros DNS

#### A

Relaciona un dominio con una dirección IPv4.

Ejemplo:

```text
ejemplo.com.    A    192.0.2.10
```

#### AAAA

Relaciona un dominio con una dirección IPv6.

Ejemplo:

```text
ejemplo.com.    AAAA    2001:db8::10
```

#### CNAME

Crea un alias de un nombre hacia otro nombre de dominio.

Ejemplo:

```text
www.ejemplo.com.    CNAME    ejemplo.com.
```

No apunta directamente a una dirección IP, sino a otro nombre que posteriormente se resuelve.

#### ALIAS / ANAME

Son mecanismos utilizados por algunos proveedores para permitir un comportamiento similar al de un CNAME en situaciones donde un CNAME tradicional no puede utilizarse, especialmente en el dominio raíz.

Existen porque DNS tiene restricciones para utilizar CNAME directamente en el apex o raíz del dominio. ALIAS y ANAME permiten resolver ese problema dependiendo del proveedor.

#### MX

Indica los servidores responsables de recibir correo electrónico para un dominio.

Ejemplo:

```text
ejemplo.com.    MX    10 mail.ejemplo.com.
```

El número representa la prioridad: normalmente un número menor significa mayor prioridad.

#### TXT

Permite almacenar información textual asociada al dominio.

Se utiliza, entre otras cosas, para:

* SPF, que ayuda a indicar qué servidores pueden enviar correo.
* DKIM, relacionado con la autenticación de mensajes de correo.
* Verificación de propiedad de un dominio.
* Configuraciones y verificaciones de diferentes servicios.

Ejemplo:

```text
ejemplo.com.    TXT    "v=spf1 include:_spf.google.com ~all"
```

#### NS

Indica cuáles son los servidores DNS autoritativos para un dominio.

Ejemplo:

```text
ejemplo.com.    NS    ns1.proveedor.com.
```

#### SOA

El registro **Start of Authority** contiene información administrativa sobre la zona DNS, como el servidor autoritativo principal, información de contacto administrativa y diferentes valores utilizados para controlar la zona.

### TTL

TTL significa **Time To Live**. Es el tiempo durante el cual una respuesta DNS puede mantenerse almacenada en caché.

Por ejemplo, si un registro tiene un TTL de 3600 segundos, un resolver puede mantener esa respuesta durante aproximadamente una hora antes de volver a consultarla.

Por eso un cambio DNS no siempre aparece inmediatamente para todos los usuarios.

### Propagación DNS

La llamada propagación DNS ocurre porque diferentes resolvers y dispositivos pueden tener respuestas anteriores almacenadas en caché.

No existe un tiempo universal de propagación. Dependiendo del TTL, del proveedor y de las cachés involucradas, un cambio puede verse rápidamente o tardar varias horas. En algunos casos puede tardar más.

### Ejercicio práctico

Comandos solicitados por el taller:

```bash
nslookup github.io
dig github.com A
dig github.com MX
dig +trace anthropic.com
```

En Windows, si `dig` no está instalado, se puede utilizar:

```bash
nslookup -type=MX github.com
```

También se puede utilizar una herramienta de consulta DNS como DNSChecker.

---

## 3. Dominios

Un **registrador (registrar)** es una empresa que permite registrar y administrar nombres de dominio.

Un **proveedor DNS** administra la información DNS del dominio, mientras que el **hosting** proporciona la infraestructura desde donde se sirve el sitio o aplicación.

Por ejemplo, una persona puede registrar un dominio con un registrador, utilizar los DNS de otro proveedor y alojar su página en una tercera plataforma.

### TLD

Los TLD son las extensiones que aparecen al final de un dominio.

Algunos ejemplos son:

* `.com`
* `.dev`
* `.app`
* `.co`
* `.com.co`

Los TLD genéricos normalmente no representan un país específico. En cambio, los TLD de código de país están asociados con países o territorios.

Algunos dominios pueden tener políticas o requisitos particulares de registro. Por eso es importante comprobar las condiciones específicas del registrador y del TLD antes de realizar una compra.

### WHOIS y privacidad

WHOIS es un sistema utilizado históricamente para consultar información de registro de dominios. Actualmente gran parte de esta información se consulta mediante servicios y protocolos como RDAP.

La privacidad de dominio busca limitar la exposición pública de determinados datos personales del titular del dominio, cuando el registrador y las políticas del TLD lo permiten.

### Nameservers

Los **nameservers** son los servidores que indican dónde se encuentra la información DNS autoritativa de un dominio.

Cuando se dice que se va a "apuntar el dominio a otro proveedor", normalmente significa que se cambian los nameservers o los registros DNS correspondientes para que otro proveedor gestione la resolución del dominio.

### Precios

El precio de un dominio depende del registrador y del TLD. El precio promocional del primer año puede ser inferior al precio de renovación.

Esto sucede porque algunos registradores utilizan promociones para atraer nuevos clientes, mientras que las renovaciones se realizan a la tarifa normal establecida para el dominio.

Antes de comprar un dominio se debe revisar tanto el precio inicial como el precio de renovación.

---

## 4. HTTPS y certificados

**HTTPS** es HTTP funcionando sobre una conexión protegida mediante TLS.

TLS proporciona principalmente:

* Cifrado de la comunicación.
* Integridad de los datos.
* Autenticación del servidor mediante certificados.

Aunque todavía se utiliza comúnmente el término SSL, las versiones modernas utilizadas para HTTPS corresponden a **TLS**.

### Autoridad Certificadora

Una **Autoridad Certificadora (CA)** es una entidad que emite certificados digitales y permite que los navegadores puedan verificar la identidad asociada con un dominio.

**Let's Encrypt** es una CA que proporciona certificados TLS de forma automatizada y gratuita.

### DV, OV y EV

Los certificados pueden clasificarse según el nivel de validación:

* **DV (Domain Validation):** comprueba que quien solicita el certificado controla el dominio.
* **OV (Organization Validation):** además de validar el dominio, realiza comprobaciones relacionadas con la organización.
* **EV (Extended Validation):** requiere un proceso de validación organizacional más exhaustivo.

Para una aplicación web común, un certificado DV suele ser suficiente para establecer HTTPS.

### Certificado wildcard

Un certificado **wildcard** permite proteger un dominio y sus subdominios de primer nivel.

Por ejemplo:

```text
*.ejemplo.com
```

podría cubrir:

```text
www.ejemplo.com
api.ejemplo.com
blog.ejemplo.com
```

### Certificado no válido para este nombre

Este error aparece cuando el nombre del dominio utilizado por el navegador no coincide con los nombres incluidos en el certificado.

Por ejemplo, si el certificado fue emitido para:

```text
www.ejemplo.com
```

pero se accede mediante:

```text
api.ejemplo.com
```

y ese nombre no está cubierto por el certificado, el navegador puede mostrar un error.

### HSTS

**HSTS (HTTP Strict Transport Security)** es un mecanismo que indica al navegador que debe utilizar HTTPS para comunicarse con el sitio.

Ayuda a evitar conexiones accidentales mediante HTTP y determinados ataques de downgrade.

---

## 5. Modelos de alojamiento

| Modelo                 | Ejemplos                                              | Ventajas                                        | Desventajas                          | ¿Cuándo usarlo?                                                          |
| ---------------------- | ----------------------------------------------------- | ----------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------ |
| Hosting compartido     | Hostinger, cPanel                                     | Económico y sencillo                            | Recursos compartidos y menor control | Sitios pequeños y páginas personales                                     |
| VPS                    | DigitalOcean Droplet, Linode, AWS EC2                 | Mayor control y recursos dedicados virtualmente | Requiere más administración          | Aplicaciones que necesitan control del servidor                          |
| Servidor dedicado      | OVH, Hetzner                                          | Recursos físicos exclusivos                     | Mayor costo y administración         | Aplicaciones grandes o cargas específicas                                |
| PaaS                   | Render, Railway, Heroku, Fly.io                       | Simplifica el despliegue                        | Menor control que un servidor propio | APIs y aplicaciones web                                                  |
| Serverless / Functions | Vercel Functions, AWS Lambda, Supabase Edge Functions | Escalado y pago basado en uso en muchos casos   | Limitaciones propias del modelo      | Funciones y APIs pequeñas o event-driven                                 |
| Hosting estático + CDN | GitHub Pages, Netlify, Cloudflare Pages, Vercel       | Simple, rápido y económico                      | No ejecuta backend tradicional       | React, Vite, documentación y sitios estáticos                            |
| BaaS                   | Supabase, Firebase, Appwrite                          | Proporciona backend administrado                | Dependencia del proveedor            | Aplicaciones que necesitan autenticación, base de datos o almacenamiento |

### CDN

Un **CDN (Content Delivery Network)** distribuye contenido desde diferentes ubicaciones geográficas.

Esto permite reducir la latencia para los usuarios, disminuir la carga del servidor de origen y aprovechar sistemas de caché.

### Sitio estático vs. dinámico

Un sitio estático entrega archivos que ya están preparados, como:

```text
index.html
styles.css
app.js
```

Un sitio dinámico o renderizado en servidor puede generar contenido cuando recibe una petición.

Una aplicación React creada con Vite se transforma, después de ejecutar el proceso de build, en archivos estáticos que pueden ser servidos por plataformas como GitHub Pages.

### SPA

Una **SPA (Single Page Application)** es una aplicación web que normalmente carga una página principal y utiliza JavaScript para cambiar las vistas sin recargar completamente el documento.

El problema en un hosting estático aparece cuando se intenta acceder directamente a una ruta como:

```text
/dashboard
```

El servidor puede buscar físicamente un archivo o directorio llamado `dashboard` y devolver un error 404, sin saber que esa ruta pertenece al sistema de rutas de la SPA.

---

## 6. Comparativa de plataformas

| Característica        | GitHub Pages                               | Netlify              | Vercel               | Cloudflare Pages     | Render                      |
| --------------------- | ------------------------------------------ | -------------------- | -------------------- | -------------------- | --------------------------- |
| Hosting estático      | Sí                                         | Sí                   | Sí                   | Sí                   | Sí                          |
| CDN                   | Sí                                         | Sí                   | Sí                   | Sí                   | Sí                          |
| Variables de entorno  | Principalmente durante Actions/build       | Sí                   | Sí                   | Sí                   | Sí                          |
| SPA                   | Requiere configuración para rutas directas | Buena compatibilidad | Buena compatibilidad | Buena compatibilidad | Depende de la configuración |
| Funciones/backend     | No como backend tradicional                | Sí                   | Sí                   | Sí                   | Sí                          |
| HTTPS                 | Sí                                         | Sí                   | Sí                   | Sí                   | Sí                          |
| Dominio personalizado | Sí                                         | Sí                   | Sí                   | Sí                   | Sí                          |
| Preview deployments   | Mediante Actions/PR workflows              | Sí                   | Sí                   | Sí                   | Sí                          |

### ¿Cuál elegiría?

Para un proyecto React + Supabase cuyo frontend es estático, elegiría **GitHub Pages** si el objetivo principal es tener una publicación sencilla integrada directamente con el repositorio de GitHub.

GitHub Pages funciona bien para archivos estáticos y puede utilizarse junto con GitHub Actions para automatizar el proceso de build y despliegue. Supabase puede encargarse de las funciones de backend como base de datos y autenticación.

Si el proyecto necesitara funciones serverless integradas en la misma plataforma o un sistema de previews más completo, también consideraría Netlify o Vercel.

---

## 7. Supabase en producción

**Supabase** es un ejemplo de BaaS (Backend as a Service). Proporciona servicios de backend administrados que permiten desarrollar aplicaciones sin tener que administrar toda la infraestructura desde cero.

Entre sus componentes se encuentran:

* PostgreSQL.
* Auth.
* Storage.
* Realtime.
* Edge Functions.

### `anon key` y `service_role`

La `anon key` está diseñada para poder utilizarse desde aplicaciones cliente. Sin embargo, que pueda estar disponible en el frontend no significa que la base de datos quede automáticamente protegida.

La seguridad debe implementarse mediante las políticas correspondientes, especialmente **RLS (Row Level Security)**.

La `service_role` key es diferente. Tiene privilegios elevados y **nunca debe incluirse en el frontend ni exponerse al navegador**.

### RLS

RLS significa **Row Level Security**.

Permite controlar qué filas puede consultar o modificar cada usuario.

Esto es especialmente importante cuando una aplicación utiliza una clave pública en el navegador, porque el cliente no puede considerarse un entorno secreto.

Un ejemplo de política para permitir que un usuario solamente pueda leer sus propias filas sería:

```sql
create policy "Users can read own rows"
on public.items
for select
to authenticated
using (auth.uid() = user_id);
```

Para permitir que también pueda actualizar únicamente sus propias filas:

```sql
create policy "Users can update own rows"
on public.items
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

La columna `user_id` debe almacenar el identificador del usuario correspondiente.

### CORS y URLs de autenticación

En producción es importante configurar correctamente la URL del sitio y las URLs de redirección utilizadas por Supabase Auth.

Si la aplicación continúa configurada solamente con la URL local, por ejemplo:

```text
http://localhost:5173
```

los procesos de autenticación y redirección pueden fallar cuando la aplicación se ejecuta desde el dominio publicado.

La configuración debe incluir la URL real de producción y las redirecciones necesarias.

### Plan gratuito de Supabase

El plan gratuito de Supabase tiene límites de uso y recursos. Estos pueden incluir restricciones relacionadas con almacenamiento, base de datos, tráfico y actividad de los proyectos.

Además, los proyectos gratuitos pueden quedar pausados después de períodos de inactividad, dependiendo de las políticas vigentes del servicio.

Por esta razón, antes de utilizar Supabase en un proyecto real se deben revisar los límites actuales del plan contratado.

---

## 8. Variables de entorno y seguridad

Las variables de entorno permiten separar configuraciones del código fuente.

En desarrollo local se puede utilizar un archivo `.env`:

```env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

El cliente de Supabase puede utilizar estas variables:

```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

El archivo `.env` no debe subirse al repositorio si contiene información que no debe quedar publicada.

En GitHub Actions se pueden configurar variables y secretos desde:

```text
Settings
→ Secrets and variables
→ Actions
→ New repository secret
```

Para este proyecto se pueden utilizar:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

Es importante aclarar que las variables `VITE_` utilizadas por una aplicación frontend terminan formando parte del código generado para el navegador.

Por eso una `anon key` no debe considerarse un secreto absoluto. La seguridad debe depender principalmente de las políticas RLS.

La `service_role` key, en cambio, nunca debe enviarse al navegador ni incluirse en el frontend.

---

## 9. Build y despliegue

Cuando se ejecuta:

```bash
npm run build
```

Vite compila el proyecto y genera una versión optimizada para producción.

Normalmente los archivos generados se encuentran dentro de:

```text
dist/
```

Durante el build pueden realizarse procesos como:

* **Minificación:** reducción del tamaño de los archivos eliminando espacios y simplificando código.
* **Tree shaking:** eliminación de código que no se utiliza.
* **Code splitting:** división del código en diferentes archivos para cargar únicamente lo necesario.
* **Hashing:** incorporación de identificadores en los nombres de archivos para facilitar la caché y detectar cambios.

### CI/CD

**CI/CD** significa integración continua y entrega/despliegue continuo.

En lugar de ejecutar manualmente todos los pasos cada vez que cambia el código, una herramienta automatizada puede ejecutar el build y publicar el resultado.

**GitHub Actions** permite crear workflows que se ejecutan cuando ocurren eventos dentro del repositorio, como un `push` a `main`.

Una diferencia importante entre publicar mediante una rama como `gh-pages` y utilizar Actions es que Actions permite definir explícitamente todo el proceso de construcción y despliegue.

---

# Parte 2 — Tutorial: publicar React + Supabase en GitHub Pages

## Paso 0 — Verificar que el proyecto compila

Primero se debe instalar las dependencias:

```bash
npm install
```

Después:

```bash
npm run build
```

Y se puede comprobar el resultado mediante:

```bash
npm run preview
```

El servidor de preview permite comprobar el build real antes de publicarlo.

Si `npm run build` falla, primero deben corregirse los errores antes de continuar.

---

## Paso 1 — Entender la URL de GitHub Pages

Si el repositorio es de tipo usuario:

```text
usuario.github.io
```

la URL normalmente será:

```text
https://usuario.github.io/
```

y Vite puede utilizar:

```js
base: '/'
```

Si el repositorio es:

```text
usuario/mi-proyecto
```

la URL será:

```text
https://usuario.github.io/mi-proyecto/
```

y Vite debe utilizar:

```js
base: '/mi-proyecto/'
```

El nombre debe coincidir exactamente con el nombre del repositorio.

---

## Paso 2 — Configurar `base` en Vite

En `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mi-proyecto/',
})
```

Después se debe ejecutar:

```bash
npm run build
```

Al revisar `dist/index.html`, las rutas de los archivos JavaScript y CSS deben incluir:

```text
/mi-proyecto/
```

Esto evita que el navegador intente cargar los recursos desde:

```text
/assets/
```

cuando realmente están publicados en:

```text
/mi-proyecto/assets/
```

---

## Paso 3 — Arreglar el enrutamiento de la SPA

GitHub Pages es un hosting estático. Por eso una ruta como:

```text
/mi-proyecto/dashboard
```

puede producir un 404 al recargar directamente.

### Opción A — HashRouter

La solución más sencilla para el taller es utilizar `HashRouter`:

```jsx
import { HashRouter } from 'react-router-dom'

<HashRouter>
  <App />
</HashRouter>
```

Las rutas quedarían así:

```text
https://usuario.github.io/mi-proyecto/#/dashboard
```

La parte después de `#` no se envía al servidor, por lo que GitHub Pages continúa entregando `index.html`.

### Opción B — BrowserRouter

También se puede utilizar `BrowserRouter` con un `basename`:

```jsx
<BrowserRouter basename="/mi-proyecto">
```

En este caso se puede generar un `404.html` igual al `index.html`.

Por ejemplo:

```json
{
  "scripts": {
    "build": "vite build && cp dist/index.html dist/404.html"
  }
}
```

En Windows sin Bash se puede utilizar `shx`:

```json
{
  "scripts": {
    "build": "vite build && shx cp dist/index.html dist/404.html"
  }
}
```

---

## Paso 4 — Configurar las variables de Supabase

En local:

```env
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Y en GitHub:

```text
Settings
→ Secrets and variables
→ Actions
→ New repository secret
```

Crear:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

El código puede utilizar:

```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

La `anon key` puede terminar visible en el JavaScript publicado. Esto es esperado en una aplicación frontend. La protección debe realizarse mediante RLS.

La `service_role` key nunca debe utilizarse en el frontend.

---

## Paso 5 — Activar GitHub Pages

Dentro del repositorio:

```text
Settings
→ Pages
```

En **Source**, seleccionar:

```text
GitHub Actions
```

---

## Paso 6 — Crear el workflow

Crear:

```text
.github/workflows/deploy.yml
```

Contenido:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

Después se realiza un `push` a `main`.

GitHub Actions ejecutará el workflow, instalará las dependencias, construirá el proyecto y publicará la carpeta `dist`.

---

## Paso 7 — Verificar el despliegue

Después de que el workflow termine correctamente, se debe abrir la URL de GitHub Pages.

Por ejemplo:

```text
https://usuario.github.io/mi-proyecto/
```

Se debe comprobar:

* Que la página cargue.
* Que los archivos CSS funcionen.
* Que JavaScript cargue correctamente.
* Que las imágenes aparezcan.
* Que las rutas funcionen.
* Que la aplicación pueda comunicarse con Supabase.
* Que el login y logout funcionen, si existen.
* Que las operaciones de base de datos respeten las políticas RLS.

---

## Paso 8 — Configurar Supabase para producción

En Supabase se debe configurar la URL de producción correspondiente.

Por ejemplo:

```text
https://usuario.github.io/mi-proyecto/
```

También se deben configurar las Redirect URLs necesarias para autenticación.

Si esto no se configura, el usuario puede ser enviado a una dirección incorrecta después de iniciar sesión o cerrar sesión.

---

## Paso 9 — Dominio personalizado

Si se utiliza un dominio personalizado, primero se registra el dominio y posteriormente se configura el DNS.

Dependiendo de la configuración, pueden utilizarse registros como:

```text
A
AAAA
CNAME
```

La configuración exacta depende del proveedor y de si se utiliza el dominio raíz o un subdominio.

Después de configurar DNS, GitHub Pages puede utilizar el dominio personalizado y proporcionar HTTPS.

---

# Conclusiones

Publicar una aplicación React creada con Vite en GitHub Pages requiere comprender cómo funcionan DNS, dominios, HTTPS, hosting y las SPA.

El punto más importante para una aplicación React en GitHub Pages es configurar correctamente el `base` de Vite, porque un repositorio de proyecto se publica normalmente bajo una ruta como:

```text
/mi-proyecto/
```

También se debe solucionar correctamente el enrutamiento de la SPA. Para este taller, `HashRouter` representa una alternativa sencilla.

En una aplicación React + Supabase, la seguridad no depende de esconder la `anon key`. Esta clave puede estar presente en el frontend. La protección debe realizarse mediante autenticación y políticas RLS correctamente configuradas.

Finalmente, GitHub Actions permite automatizar el proceso de build y publicación. De esta forma, cada cambio enviado a la rama principal puede generar automáticamente una nueva versión del sitio.

# Evidencias prácticas

Para completar la entrega final del taller se deben adjuntar las evidencias solicitadas, por ejemplo:

1. Salida de `nslookup github.io`.
2. Salida de `dig github.com A`.
3. Salida de `dig github.com MX`.
4. Salida de `dig +trace anthropic.com`.
5. Captura del proyecto funcionando localmente.
6. Captura del workflow de GitHub Actions ejecutándose correctamente.
7. Captura de GitHub Pages mostrando la aplicación.
8. Captura de la configuración de Supabase.
9. Evidencia de que la autenticación funciona.
10. Evidencia de las políticas RLS.

Estas evidencias deben corresponder a pruebas realizadas sobre el proyecto y entorno reales del estudiante.
