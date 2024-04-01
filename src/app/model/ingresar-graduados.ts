export class IngresarGraduados{
  _id?: string;
  carnet: string;
  nombres:string;
  apellidos:string;
  carrera:string;
  facultad:string;
  campus:string;
  frase_emotiva:string;
  year_graduado:number;
  estado_graduado:boolean;
  destacado_graduado:boolean;
  foto_graduado: string;
  qr_graduado: string;

  constructor(carnet:string,nombres:string,apellidos:string,carrera:string,facultad:string,campus:string,
    frase_emotiva:string,year_graduado:number,estado_graduado=true, destacado_graduado=true, foto_graduado: string,
    qr_graduado: string){
      this.carnet = carnet;
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.carrera = carrera;
      this.facultad = facultad;
      this.campus = campus;
      this.frase_emotiva = frase_emotiva;
      this.year_graduado = year_graduado;
      this.estado_graduado = estado_graduado;
      this.destacado_graduado = destacado_graduado;
      this.foto_graduado = foto_graduado;
      this.qr_graduado = qr_graduado;
    }


}
