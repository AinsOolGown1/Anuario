export class IngresarGraduados{
  _id?: string;
  carnet: string;
  nombres: string;
  apellidos: string;
  carrera: string;
  facultad: string;
  campus: string;
  frase_emotiva: string;
  year_graduado: number;
  telefono_graduado: number;
  correo_graduado: string;
  estado_graduado: boolean;
  destacado_graduado: boolean;
  foto_graduado: File; // Cambiado a tipo File
  qr_graduado: string;


  constructor(carnet: string, nombres: string, apellidos: string, carrera: string, facultad: string, campus: string,
    frase_emotiva: string, year_graduado: number, telefono_graduado: number, correo_graduado: string, estado_graduado = true, destacado_graduado = true, foto_graduado: File, qr_graduado: string,
    ) { // Cambiado a tipo File
      this.carnet = carnet;
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.carrera = carrera;
      this.facultad = facultad;
      this.campus = campus;
      this.frase_emotiva = frase_emotiva;
      this.year_graduado = year_graduado;
      this.telefono_graduado = telefono_graduado;
      this.correo_graduado = correo_graduado;
      this.estado_graduado = estado_graduado;
      this.destacado_graduado = destacado_graduado;
      this.foto_graduado = foto_graduado;
      this.qr_graduado = qr_graduado;

    }
}
