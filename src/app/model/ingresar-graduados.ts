export class IngresarGraduados{
  _id?: string;
  carnet: string;
  nombres:string;
  apellidos:string;
  carrera:string;
  facultad:string;
  campus:string;
  frase_emotiva:string;
  destacado:boolean;
  year_graduado:number;
  estado:boolean;

  constructor(carnet:string,nombres:string,apellidos:string,carrera:string,facultad:string,campus:string,
    frase_emotiva:string,desctacado=true,year_graduado:number,estado=true){
      this.carnet = carnet;
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.carrera = carrera;
      this.facultad = facultad;
      this.campus = campus;
      this.frase_emotiva = frase_emotiva;
      this.destacado = desctacado;
      this.year_graduado = year_graduado;
      this.estado = estado;
    }


}
