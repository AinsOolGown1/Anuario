import { Component, OnInit } from '@angular/core';
import { ProximosEventos } from 'src/app/model/EventosProximos/interfazEventos';
import { Eventos } from 'src/app/model/EventosProximos/modeloEventosProximos';
import { EventosService } from 'src/app/Servicios/eventosproximos';

@Component({
  selector: 'app-eventos-proximos',
  templateUrl: './eventos-proximos.component.html',
  styleUrls: ['./eventos-proximos.component.scss']
})
export class EventosProximosComponent implements OnInit {

  
  listEventos: ProximosEventos[] = [];

  constructor(
    private _eventoService: EventosService
  ){

  }

  ngOnInit(): void{
    this.vista_eventos();
  }

  vista_eventos(): void {
    this._eventoService.getGraduaciones_eventos().subscribe({
      next: (data: ProximosEventos []) => {
        this.listEventos = data;
        console.log(this.listEventos);
        data.forEach((item: ProximosEventos) => {
          console.log('ID del evento:', item._id);  // Verifica que el _id no es undefined
          if (item._id) {
            this._eventoService.obtenerFotoEvento(item._id).subscribe({
              next: (value) => {
                this.convert(value, item);
              },
              error: (err: any) => {
                console.log('Error al obtener la foto ' + err);
              }
            });
          } else {
            console.log('ID no definido para el evento:', item);
          }
        });
      },
      error: (err: any) => {
        console.log('Error al obtener el evento' + err);
      }
    });
  }
  

  convert(value_file: any, item: ProximosEventos): void {
    if (['image/jpeg', 'image/jpg', 'image/png'].includes(value_file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        item.ruta_fotos = reader.result as string;
      };
      reader.readAsDataURL(value_file);
    } else {
      console.log('Esto no es una imagen');
    }
  }

}
