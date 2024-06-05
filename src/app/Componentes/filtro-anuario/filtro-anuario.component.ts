import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Servicios/datafiltro.service';
import { error } from 'toastr';

@Component({
  selector: 'app-filtro-anuario',
  templateUrl: './filtro-anuario.component.html',
  styleUrls: ['./filtro-anuario.component.scss']
})
export class FiltroAnuarioComponent implements OnInit {

  campusOptions = ['Central', 'Jinotepe', 'Doral', 'Extensión Estelí']; // Ejemplo de opciones
  yearOptions = [2024, 2023];
  sessionOptions = ['1', '2'];

  selectedCampus = '';
  selectedYear: number | null = null;
  selectedSession = '';

  filteredImages: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.filterImages();
  }

  filterImages(): void {
    const filters = {
      campus: this.selectedCampus,
      year: this.selectedYear,
      session: this.selectedSession
    };

    this.dataService.getImages(filters).subscribe({
      next:(images) => {
        this.filteredImages = images;
      }, error:(err: any)=>{
        console.error('Error fetching images:', err);
        alert('No se encontraron las imágenes. Por favor, intenta de nuevo.');
      }
    })
  }
}
