# LunchUIS 🍽️

## 📋 Descripción del Proyecto

**LunchUIS** es una plataforma web para la gestión automatizada de compra de "combos saludables" en la Universidad Industrial de Santander. El sistema elimina las largas filas presenciales, previene compras fraudulentas mediante autenticación robusta, y digitaliza el proceso de reclamación con tokens QR.

### 🎯 Problemática

- **Largas filas:** Los estudiantes pierden tiempo valioso esperando para comprar
- **Inseguridad:** Posibilidad de compras múltiples con carnets ajenos
- **Ineficiencia:** Tickets físicos generan desperdicio y pueden perderse
- **Accesibilidad limitada:** Estudiantes que viven lejos pierden oportunidades

### ✨ Solución

Sistema de gestión digital que permite:
- Compra online desde cualquier lugar
- Autenticación de dos factores (JWT + correo institucional)
- Generación de QR para reclamación sin contacto
- Una compra por usuario por día
- Disponibilidad 7am-8pm, lunes a viernes

---

## 🏗️ Arquitectura del Sistema

### Arquitectura de Microservicios

<div align="center">
  <img src="doc/diagrams/ComponentDiagram.jpg" alt="Diagrama de Componentes" width="800"/>
  <p><em>Figura 1: Arquitectura de microservicios del sistema LunchUIS</em></p>
</div>

El sistema implementa una **arquitectura orientada a microservicios** con los siguientes componentes:

#### 🔧 Componentes Principales

| Microservicio | Puerto | Responsabilidad | Base de Datos |
|--------------|--------|-----------------|---------------|
| **Config Server** | 8888 | Configuración centralizada | - |
| **Identity Service** | 8081 | Autenticación y autorización | Schema `identity` |
| **Combo Service** | 8082 | Gestión de combos (CRUD) | Schema `combos` |
| **Order Service** | 8083 | Procesamiento de pedidos | Schema `orders` |
| **API Gateway (Kong)** | 8000/8080 | Enrutamiento y seguridad | - |

## 🔐 Seguridad y Autenticación

### Flujo de Autenticación JWT
```
1. Usuario → POST /auth/login (código + contraseña)
2. Identity Service → Valida credenciales
3. Identity Service → Genera JWT firmado (HS256)
4. Cliente → Recibe token (válido 24h)
5. Cliente → Incluye token en header: Authorization: Bearer <token>
6. Servicios → Validan JWT con clave compartida
```

### Características de Seguridad

- ✅ **Stateless Authentication**: JWT sin sesiones del lado del servidor
- ✅ **Role-Based Access Control (RBAC)**: Roles `STUDENT` y `ADMIN`
- ✅ **Password Hashing**: BCrypt con salt automático
- ✅ **2FA (Planeado)**: Código de verificación por correo institucional
- ✅ **Protection Endpoints**: `@PreAuthorize("hasRole('ADMIN')")`

---

## 🚀 Requerimientos Funcionales

### RF1: Ingresar al Sistema
- **Actores**: Estudiante, Administrador
- **Entrada**: Código institucional + contraseña
- **Validación**: Máximo 3 intentos fallidos → bloqueo 24h
- **Salida**: JWT token de autenticación

### RF2: Crear Combo (Admin)
- **Actores**: Administrador de combos
- **Entrada**: Nombre, descripción, precio, imagen, tipo (DAILY/MONTHLY), cuota, fecha validez
- **Validación**: Todos los campos obligatorios
- **Salida**: Combo disponible para compra

### RF3: Modificar Combo (Admin)
- **Actores**: Administrador de combos
- **Validación**: Cuota total ≥ combos vendidos
- **Salida**: Combo actualizado

### RF4: Eliminar Combo (Admin)
- **Restricción**: Solo si no hay órdenes asociadas
- **Validación**: Confirmación requerida

---

## ⚙️ Requerimientos No Funcionales

### RNF1: Arquitectura de Microservicios
- **Objetivo**: Modularidad, escalabilidad y facilidad de mantenimiento
- **Implementación**: Servicios independientes con comunicación HTTP/REST
- **Ventajas**: Despliegue independiente, resiliencia ante fallos

### RNF2: Disponibilidad
- **Horario**: 7:00 AM - 8:00 PM (13 horas), Lunes a Viernes
- **SLA**: 99.96% uptime (máximo 30 min downtime/semana)
- **Monitoreo**: Spring Boot Actuator + health checks

### RNF3: Concurrencia
- **Capacidad**: Mínimo 500 transacciones simultáneas
- **Tecnología**: Pooling de conexiones, transacciones ACID
- **Pruebas**: Simulaciones de carga con JMeter

### RNF4: Seguridad
- **Encriptación**: Contraseñas con BCrypt (factor 10)
- **Tokens**: JWT firmados con HS256
- **Protocolos**: HTTPS en producción
- **Validación**: Jakarta Bean Validation en DTOs

---

## 👥 Equipo de Desarrollo

| Rol | Nombre | Responsabilidad |
|-----|--------|-----------------|
| **Product Owner** | Mag. Carlos Adolfo Beltrán Castro | Definición de requisitos y prioridades |
| **Scrum Master** | Kevin Daniel Castro Mendoza | Facilitación y remoción de impedimentos |
| **Developer Architecture** | Andrea Juliana Portilla Barrera | Diseño de arquitectura y patrones |
| **Developer Coding** | Kevin Castro, Sebastián Mantilla, Andrea Portilla | Implementación backend |
| **QA Member** | Juan Sebastián Mantilla Serrano | Pruebas y validación de calidad |

---

## 🎓 Contexto Académico

**Asignatura**: Entornos de Programación  
**Semestre**: II - 2025  
**Institución**: Universidad Industrial de Santander  
**Escuela**: Ingeniería de Sistemas e Informática

---

## 📄 Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---

## 🔗 Enlaces Útiles

- [Documentación Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Security Reference](https://docs.spring.io/spring-security/reference/index.html)
- [JWT.io](https://jwt.io/) - Debugger de tokens
- [Docker Documentation](https://docs.docker.com/)

---

<div align="center">
  <p><strong>Desarrollado con ❤️ por el Equipo LunchUIS</strong></p>
  <p>Universidad Industrial de Santander - 2025</p>
</div>
