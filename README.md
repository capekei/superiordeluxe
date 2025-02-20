# Superior Deluxe - Tienda de Electrodomésticos

Aplicación web moderna para la gestión y venta de electrodomésticos, construida con Next.js y TailwindCSS.

## Características

- 🛍️ Catálogo de productos con filtrado por categorías
- 🛒 Carrito de compras con persistencia local
- 💬 Integración con WhatsApp para consultas
- 🌓 Modo oscuro/claro
- 📱 Diseño responsivo
- 👤 Panel de administración para gestión de productos

## Tecnologías Utilizadas

- Next.js 14
- React
- TypeScript
- TailwindCSS
- Framer Motion
- Context API

## Requisitos Previos

- Node.js 18.x o superior
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/superiordeluxe.git
cd superiordeluxe
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Crear archivo .env.local y configurar variables de entorno:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=tu-numero-whatsapp
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

5. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Estructura del Proyecto

```
superiordeluxe/
├── app/                    # Páginas y rutas de la aplicación
├── components/            # Componentes reutilizables
├── contexts/             # Contextos de React (Cart, Inventory)
├── lib/                  # Utilidades y configuraciones
├── public/               # Archivos estáticos
└── types/               # Definiciones de TypeScript
```

## Despliegue

La aplicación está optimizada para ser desplegada en Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/superiordeluxe)

## Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

## Contacto

Tu Nombre - [@tu_twitter](https://twitter.com/tu_twitter)

Link del proyecto: [https://github.com/tu-usuario/superiordeluxe](https://github.com/tu-usuario/superiordeluxe)
