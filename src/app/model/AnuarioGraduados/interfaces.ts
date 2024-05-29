export interface IGraduado{
  _id?: string;
  carnet: string;
  nombres: string;
  apellidos: string;
  carrera: string;
  facultad: string;
  campus: string;
  frase_emotiva: string;
  year_graduado: number;
  estado_graduado: boolean;
  destacado_graduado: boolean;
  foto_graduado: File; // Cambiado a tipo File
  ruta_foto: string;
  qr_graduado: string;
}
