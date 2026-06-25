# Tabla Periódica EAE - Frontend

Aplicación web desarrollada con React + TypeScript + Vite para visualizar la tabla periódica de forma interactiva.

## Tecnologías

- React 18 + TypeScript
- Vite
- React Router DOM
- CSS Modules
- Diseño neón sobre fondo negro

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/marinautriera-oss/tabla-periodica-frontend-eae.git
cd tabla-periodica-frontend-eae/tabla-periodica-frontend--
```

2. Instalar dependencias:
```bash
npm install
```

3. Correr el servidor de desarrollo:
```bash
npm run dev
```

La app corre en `http://localhost:5173`

## Funcionalidades

- **Tabla Periódica interactiva**: visualización con grilla real (18 grupos × 7 períodos), colores neón por categoría, hover con efecto de brillo
- **Detalle de elemento**: al hacer clic en un elemento se ve su información completa
- **Favoritos**: usuarios logueados pueden marcar/desmarcar elementos con ⭐
- **Quiz dinámico**: preguntas generadas automáticamente desde los elementos de la base de datos, con feedback inmediato
- **Autenticación completa**: registro con verificación por email, login con JWT
- **Panel Admin**: CRUD completo de elementos (solo para administradores)
- **Diseño responsivo**: funciona de 320px a 2000px

## Páginas

| Ruta | Descripción | Auth |
|------|-------------|------|
| `/` | Tabla periódica principal | No |
| `/login` | Iniciar sesión | No |
| `/register` | Registrarse | No |
| `/verificar/:token` | Verificar email | No |
| `/elemento/:id` | Detalle de elemento | No |
| `/quiz` | Quiz de química | No |
| `/admin` | Panel de administración | Sí |

## Estructura del proyecto
# Tabla Periódica EAE - Frontend

Aplicación web desarrollada con React + TypeScript + Vite para visualizar la tabla periódica de forma interactiva.

## Tecnologías

- React 18 + TypeScript
- Vite
- React Router DOM
- CSS Modules
- Diseño neón sobre fondo negro

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/marinautriera-oss/tabla-periodica-frontend-eae.git
cd tabla-periodica-frontend-eae/tabla-periodica-frontend--
```

2. Instalar dependencias:
```bash
npm install
```

3. Correr el servidor de desarrollo:
```bash
npm run dev
```

La app corre en `http://localhost:5173`

## Funcionalidades

- **Tabla Periódica interactiva**: visualización con grilla real (18 grupos × 7 períodos), colores neón por categoría, hover con efecto de brillo
- **Detalle de elemento**: al hacer clic en un elemento se ve su información completa
- **Favoritos**: usuarios logueados pueden marcar/desmarcar elementos con ⭐
- **Quiz dinámico**: preguntas generadas automáticamente desde los elementos de la base de datos, con feedback inmediato
- **Autenticación completa**: registro con verificación por email, login con JWT
- **Panel Admin**: CRUD completo de elementos (solo para administradores)
- **Diseño responsivo**: funciona de 320px a 2000px

## Páginas

| Ruta | Descripción | Auth |
|------|-------------|------|
| `/` | Tabla periódica principal | No |
| `/login` | Iniciar sesión | No |
| `/register` | Registrarse | No |
| `/verificar/:token` | Verificar email | No |
| `/elemento/:id` | Detalle de elemento | No |
| `/quiz` | Quiz de química | No |
| `/admin` | Panel de administración | Sí |

## Estructura del proyecto
# Tabla Periódica EAE - Frontend

Aplicación web desarrollada con React + TypeScript + Vite para visualizar la tabla periódica de forma interactiva.

## Tecnologías

- React 18 + TypeScript
- Vite
- React Router DOM
- CSS Modules
- Diseño neón sobre fondo negro

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/marinautriera-oss/tabla-periodica-frontend-eae.git
cd tabla-periodica-frontend-eae/tabla-periodica-frontend--
```

2. Instalar dependencias:
```bash
npm install
```

3. Correr el servidor de desarrollo:
```bash
npm run dev
```

La app corre en `http://localhost:5173`

## Funcionalidades

- **Tabla Periódica interactiva**: visualización con grilla real (18 grupos × 7 períodos), colores neón por categoría, hover con efecto de brillo
- **Detalle de elemento**: al hacer clic en un elemento se ve su información completa
- **Favoritos**: usuarios logueados pueden marcar/desmarcar elementos con ⭐
- **Quiz dinámico**: preguntas generadas automáticamente desde los elementos de la base de datos, con feedback inmediato
- **Autenticación completa**: registro con verificación por email, login con JWT
- **Panel Admin**: CRUD completo de elementos (solo para administradores)
- **Diseño responsivo**: funciona de 320px a 2000px

## Páginas

| Ruta | Descripción | Auth |
|------|-------------|------|
| `/` | Tabla periódica principal | No |
| `/login` | Iniciar sesión | No |
| `/register` | Registrarse | No |
| `/verificar/:token` | Verificar email | No |
| `/elemento/:id` | Detalle de elemento | No |
| `/quiz` | Quiz de química | No |
| `/admin` | Panel de administración | Sí |

## Estructura del proyecto

src/

├── components/      # Navbar

├── pages/           # Login, Register, Home, Admin, Quiz, ElementoDetalle, Verificar

├── services/        # authService, elementService, favoritoService

└── App.tsx          # Rutas principales

Usuario de prueba
email:ma.utriera@gmail.com
password:123456