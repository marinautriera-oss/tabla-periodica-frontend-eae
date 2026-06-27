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
bash
git clone https://github.com/marinautriera-oss/tabla-periodica-frontend-eae.git
cd tabla-periodica-frontend-eae/tabla-periodica-frontend--


2. Instalar dependencias:
bash
npm install


3. Crear archivo `.env` con la variable:

VITE_API_URL=https://eae-tabla-periodica.vercel.app


4. Correr el servidor de desarrollo:
bash
npm run dev


La app corre en `http://localhost:5173`

## Despliegues públicos

| Servicio | URL |
|----------|-----|
| Frontend | https://tabla-periodica-frontend-eae-92mo.vercel.app |
| Backend API | https://eae-tabla-periodica.vercel.app |

## Funcionalidades

- Tabla Periódica interactiva: visualización con grilla real (18 grupos × 7 períodos), colores neón por categoría, hover con efecto de brillo
- Detalle de elemento: al hacer clic en un elemento se ve su información completa, imagen y dato curioso
- Favoritos: usuarios logueados pueden marcar/desmarcar elementos con ⭐
- Quiz dinámico: 10 preguntas generadas automáticamente desde los elementos de la base de datos, con 6 tipos de pregunta (símbolo, número atómico, categoría, masa atómica, período, grupo) y feedback inmediato
- Autenticación completa: registro con verificación por email, login con JWT
- Panel Admin: CRUD completo de elementos con imagen y descripción (solo para administradores)
- Diseño responsivo: funciona de 320px a 2000px

## Páginas

| Ruta | Descripción | Auth requerida |
|------|-------------|----------------|
| `/` | Tabla periódica principal | No |
| `/login` | Iniciar sesión | No |
| `/register` | Registrarse | No |
| `/verificar/:token` | Verificar email | No |
| `/elemento/:id` | Detalle de elemento | No |
| `/quiz` | Quiz de química | No |
| `/admin` | Panel de administración | Sí (solo ADMIN) |

## Estructura del proyecto

```
src/
├── components/      # Navbar
├── pages/           # Login, Register, Home, Admin, Quiz, ElementoDetalle, Verificar
├── services/        # authService, elementService, favoritoService
├── utils/           # auth.ts (decodificación JWT, verificación de rol)
└── App.tsx          # Rutas principales
```

## Credenciales de prueba

### Usuario Estudiante (ya verificado)
- Email: ma.utriera@gmail.com
- Password: 654321

### Usuario Admin (ya verificado)
- Email: marina.utriera@gmail.com
- Password: 123456