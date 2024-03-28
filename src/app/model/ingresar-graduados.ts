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
  estado:boolean;
  destacado:boolean;
  foto_graduado: string;
  qr_graduado: string;

  constructor(carnet:string,nombres:string,apellidos:string,carrera:string,facultad:string,campus:string,
    frase_emotiva:string,year_graduado:number,estado=true, desctacado=true, foto_graduado: string,
    qr_graduado: string){
      this.carnet = carnet;
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.carrera = carrera;
      this.facultad = facultad;
      this.campus = campus;
      this.frase_emotiva = frase_emotiva;
      this.year_graduado = year_graduado;
      this.estado = estado;
      this.destacado = desctacado;
      this.foto_graduado = foto_graduado;
      this.qr_graduado = qr_graduado;
    }


}
