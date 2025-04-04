const isDevelopment = process.env.NODE_ENV !== "production";
// Configuración de cookies para el entorno de desarrollo y producción

export const cookiesConfig = {
  httpOnly: true, // Previene acceso desde JavaScript del cliente
  secure: !isDevelopment, // HTTPS en producción, HTTP permitido en desarrollo
  sameSite: isDevelopment ? "lax" as const : "none" as const, // Necesario para cross-site en producción
  maxAge: 3 * 24 * 60 * 60 * 1000, // 3 días en milisegundos
  path: "/", // Accesible en todas las rutas
  domain: isDevelopment ? "localhost" : ".frontend.com", // Dominio apropiado
};
