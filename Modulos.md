# 📌 Documentación de Alcance y Módulos del Sistema (AccessApp)

Este documento detalla la estructura, objetivos y funcionalidades clave de cada módulo del sistema de control de accesos y administración del condominio.

---

## 🔑 1. Accesos
Este módulo se enfoca en la gestión de entradas físicas, automatización de barreras y administración de credenciales digitales.

*   **Comandos de Apertura Remota:** Botones de acción rápida en la interfaz web (React) para accionar de forma manual y asíncrona el relé **Shelly 1 Gen4**, permitiendo la apertura del portón vehicular o peatonal desde la garita.
*   **Llaves Virtuales (QR / Tokens):** Generación de códigos QR dinámicos o tokens numéricos temporales/permanentes para residentes, trabajadores recurrentes o servicios autorizados.
*   **Horarios de Acceso Restringido:** Definición de reglas horarias y días específicos en los que una credencial digital o llave virtual es válida para efectuar una apertura.

## 🚗 2. Vehículos
Módulo diseñado para centralizar el parque vehicular del condominio y automatizar los accesos mediante integraciones de hardware y software (LPR/Tags).

*   **Registro de Vehículos de Residentes:** Base de datos vinculada al departamento correspondiente que almacena patentes (placas), marca, modelo, color y estado activo del vehículo.
*   **Integración LPR (Lectura de Patentes):** Backend asíncrono en **FastAPI** preparado para procesar lecturas de cámaras en tiempo real, validar la autorización en PostgreSQL y gatillar WebSockets automáticos hacia el front.
*   **Asignación de Tags RFID:** Soporte para el registro de identificadores Tag UID para la apertura automática de barreras mediante lectores de proximidad de largo alcance.
*   **Lista de Vehículos Frecuentes:** Registro de vehículos secundarios o recurrentes (familiares) autorizados para optimizar el control en la zona de estacionamiento de visitas.

## 👥 3. Visitas
Optimiza y agiliza el flujo de ingreso de personas externas en la conserjería, disminuyendo la carga operativa del personal de seguridad.

*   **Pre-autorizaciones de Invitados:** Permite al residente pre-registrar un invitado desde la app y generar un enlace de invitación estructurado con código único para envío rápido por WhatsApp.
*   **Registro de Proveedores de Servicios:** Control específico para personal de Delivery, mudanzas o técnicos de telecomunicaciones, con tiempos de permanencia preestablecidos.
*   **Alertas y Monitoreo en Tiempo Real:** Notificaciones automáticas e instantáneas en la pantalla de la conserjería mediante WebSockets en el momento exacto en que un visitante es registrado o validado en el acceso.

## 🏘️ 4. Residentes
Actúa como el padrón oficial y base de datos centralizada de la comunidad.

*   **Fichas de Copropietarios y Arrendatarios:** Gestión de perfiles con nombres, identificación (RUT/DNI), correos electrónicos y teléfonos de contacto, vinculados estrictamente a su respectiva torre y departamento.
*   **Fichas de Co-residentes:** Registro del núcleo familiar o habitantes secundarios que residen en la misma unidad para control de flujo y seguridad.
*   **Registro de Mascotas:** Perfiles de las mascotas del condominio que incluyen fotografía, datos de vacunas y contacto del dueño para la gestión de incidencias de convivencia y emergencias.

## 👤 5. Usuarios y Personal
Módulo de administración interna encargado de gestionar las cuentas que operan la plataforma web bajo el modelo de control de accesos basado en roles (RBAC).

*   **Cuentas para Conserjes / Guardias:** Panel simplificado con permisos limitados. Tienen acceso exclusivo al monitor de accesos en tiempo real, registro de visitas, visualización del historial y reporte de incidencias.
*   **Cuentas para Administradores:** Acceso total y sin restricciones al sistema, incluyendo finanzas, métricas, analíticas de concurrencia y edición de catálogos.
*   **Cuentas para el Comité de Administración:** Perfiles con permisos de auditoría (lectura de reportes, bitácoras de logs e historial de accesos) para labores de supervisión.

## ⚙️ 6. Configuración y Diagnóstico
Central de control operacional e integraciones tecnológicas del sistema (Exclusivo para Administradores/Desarrolladores).

*   **Parámetros de Red y Hardware Local:** Configuración dinámica de variables del sistema desde la interfaz web (como la IP local del **Shelly 1 Gen4** y tiempos de pulso en segundos) sin necesidad de modificar el entorno del servidor.
*   **Políticas de Convivencia y Tiempos:** Ajuste de reglas de negocio globales, tales como el tiempo de expiración por defecto de los QR de visitas o los límites de tiempo de uso para el estacionamiento común.
*   **Herramientas de Desarrollo y Diagnóstico:** Sección aislada para el monitoreo técnico que incluye logs en vivo del servidor ASGI (Uvicorn), estados de conexiones de red y botoneras de testeo manual de pulsos de hardware.