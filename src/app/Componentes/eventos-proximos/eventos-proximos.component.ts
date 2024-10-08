import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProximosEventos } from 'src/app/model/EventosProximos/interfazEventos';
import { EventosService } from 'src/app/Servicios/eventosproximos';

@Component({
  selector: 'app-eventos-proximos',
  templateUrl: './eventos-proximos.component.html',
  styleUrls: ['./eventos-proximos.component.scss']
})
export class EventosProximosComponent implements OnInit, OnDestroy {

  listEventos: ProximosEventos[] = [];
  currentIndex: number = 0; // Índice actual del slider
  sliderInterval: any; // Referencia al intervalo

  constructor(private _eventoService: EventosService) {}

  ngOnInit(): void {
    this.vista_eventos();
    this.startSlider(); // Iniciar el slider automático
  }

  ngOnDestroy(): void {
    clearInterval(this.sliderInterval); // Limpiar el intervalo al destruir el componente
  }

  vista_eventos(): void {
    this._eventoService.getGraduaciones_eventos().subscribe({
      next: (data: ProximosEventos[]) => {
        this.listEventos = data;
        data.forEach((item: ProximosEventos) => {
          if (item._id) {
            this._eventoService.obtenerFotoEvento(item._id).subscribe({
              next: (value) => {
                this.convert(value, item);
              },
              error: (err: any) => {
                console.log('Error al obtener la foto ' + err);
              }
            });
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

  //Función para iniciar el slider automático
  startSlider(): void {
    this.sliderInterval = setInterval(() => {
      this.nextSlide();
    },2000); // Cambia cada 3 segundos
  }

  // Función para ir al siguiente slide
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.listEventos.length;
  }

  // Función para ir al slide anterior
  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.listEventos.length) % this.listEventos.length;
  }
}
