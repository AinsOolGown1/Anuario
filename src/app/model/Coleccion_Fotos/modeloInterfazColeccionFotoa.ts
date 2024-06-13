export class ColeccionesDeFotos{
  _id?: string;
  campus: string;
  year_graduacion: number;
  fotos_graduaciones: File[];
  sesion: number;


  constructor(campus: string, year_graduacion: number, fotos_graduaciones: File[], sesion: number) { //* Cambiado a tipo File
      this.campus = campus;
      this.year_graduacion = year_graduacion;
      this.fotos_graduaciones = fotos_graduaciones;
      this.sesion = sesion;
    }
}
