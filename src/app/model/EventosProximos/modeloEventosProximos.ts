export class Eventos{
    _id?: string;
    campus_evento: string;
    year_evento: number;
    img_evento: File;
    sesion: number;
  
  
    constructor(campus_evento: string, year_evento: number, img_evento: File, sesion: number) {
        this.campus_evento = campus_evento;
        this.year_evento = year_evento;
        this.img_evento = img_evento;
        this.sesion = sesion;
      }
  }
  