# LunchUIS 🍽️

Sistema automatizado para la gestión y compra del "Combo Saludable" en la Universidad Industrial de Santander.

## 📖 Contexto del Proyecto
**Problema:** Largas filas y tiempos de espera en el servicio de comedores presencial de la UIS.
**Solución:** Una aplicación web/móvil que permite:
* Compra remota.
* Validación de identidad (Un combo por estudiante/día).
* Generación de QR para el reclamo (Tokenización).

## 🚀 Tecnologías
* **Frontend:** Angular (SPA, Componentes reactivos).
* **Backend:** [Tu lenguaje aquí, ej: Java/Spring Boot, Node.js, Python].
* **Base de Datos:** [PostgreSQL/MySQL].

## 🛠️ Módulos Principales (Funcionalidad)
1.  **Autenticación:** Validación contra base de datos institucional.
2.  **Compras:** Gestión de stock diario y pasarela de pagos.
3.  **Administración:** Reportes y estadísticas de ventas.
4.  **Entregas:** Sistema de validación `Bit-to-Pixel` mediante códigos QR.

## 💡 Desafío Técnico Destacado: El Motor de QR
Implementación de la norma ISO/IEC 18004 para la generación dinámica de tokens de entrega y la serialización de datos binarios hacia el cliente.
