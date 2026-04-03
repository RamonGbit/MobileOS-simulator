📱 MobileOS Simulator

Un simulador de entorno operativo móvil diseñado para la exploración de arquitecturas de sistemas, gestión de procesos y servicios de telecomunicaciones simulados.

Este proyecto surge como respuesta al desafío académico de diseñar un entorno operativo funcional en tiempo récord. En lugar de una aplicación monolítica, MobileOS Simulator implementa una separación estricta entre el Kernel, los Servicios del Sistema y la Capa de Aplicación.
🏗️ Arquitectura del Sistema

El proyecto está estructurado siguiendo principios de diseño modular para garantizar la escalabilidad y el desacoplamiento:

    Core Kernel: Gestiona el ciclo de vida de las aplicaciones (ProcessManager), la profundidad de las ventanas (WindowManager) y la persistencia de datos persistente (FileSystem).

    System Services: Capa de servicios en segundo plano que maneja la lógica de autenticación, notificaciones push y el stack de telefonía.

    Telephony Stack: Implementación de un servicio de comunicación basado en eventos para simular llamadas entrantes/salientes y gestión de estados de red.

    UI Shell: Una interfaz reactiva de alta fidelidad que incluye un StatusBar dinámico, un Dock de acceso rápido y un sistema de multitarea.

🛠️ Stack Tecnológico

    Lenguaje: TypeScript (Tipado fuerte para robustez del Kernel).

    Frontend: React + Vite (Renderizado de alta performance).

    Estilos: Tailwind CSS (Arquitectura basada en utilidades para UI/UX moderna).

    Comunicación: WebSockets / PeerJS (Para el sistema de llamadas).

🚀 Características Principales

    [ ] Multitarea Real: Gestión de procesos independientes.

    [ ] Sistema de Llamadas: Simulación de señal y comunicación entre instancias.

    [ ] Persistencia: Almacenamiento local simulando un sistema de archivos.

    [ ] UI Adaptativa: Interfaz diseñada con principios de diseño móvil moderno (Glassmorphism).