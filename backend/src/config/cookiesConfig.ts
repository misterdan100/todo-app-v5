export const cookiesConfig = {
    httpOnly: true,
    secure: false, // FALSE en desarrollo local
    sameSite: 'lax' as const, // Importante para desarrollo cross-origin
    maxAge: 1000 * 60 * 60 * 24 // 24 horas
  }