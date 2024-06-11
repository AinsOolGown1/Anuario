import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CargarScriptsService} from 'src/app/Servicios/cargar-scripts.service'
import { CargaMasivaCSV } from 'src/app/Servicios/cargamasivaCSV.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subir-excel',
  templateUrl: './subir-excel.component.html',
  styleUrls: ['./subir-excel.component.scss']
})
export class SubirExcelComponent implements OnInit {

  backgroundImage = environment.svg_background_login;

  constructor(private _CargarScript: CargarScriptsService,
    private _cargaMasivaService: CargaMasivaCSV,
    private _snackBar: MatSnackBar
  ){
    _CargarScript.Carga(["VistaSubirExcel/subirexcel"])
  }

  ngOnInit(): void {
    this.ekUpload();
  }

  archivoSeleccionado(event: Event): void {
    const archivo = (event.target as HTMLInputElement).files?.[0];
    if (archivo) {
      const formData = new FormData();
      formData.append('file', archivo);
      this._cargaMasivaService.importarCSV(formData).subscribe({
        next: (response) =>{
          this._snackBar.open('Archivo importado correctamente', 'Aceptar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
        });
        console.log('Archivo subido exitosamente:', response);
      }, error: (err: any) => {
        this._snackBar.open('Error al importar el archivo', 'Aceptar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
          console.error('Error al subir el archivo:', err);
        }
      });
    }
  }
  private ekUpload(): void {
    function Init() {
      console.log("Upload Initialised");

      const fileSelect = document.getElementById('file-upload') as HTMLInputElement;
      const fileDrag = document.getElementById('file-drag');
      const saveButton = document.getElementById('save-button');

      if (fileSelect && fileDrag && saveButton) {
        fileSelect.addEventListener('change', fileSelectHandler, false);
        saveButton.addEventListener('click', saveFileHandler, false);
      }

      const xhr = new XMLHttpRequest();
      if (xhr.upload) {
        if (fileDrag) {
          fileDrag.addEventListener('dragover', fileDragHover, false);
          fileDrag.addEventListener('dragleave', fileDragHover, false);
          fileDrag.addEventListener('drop', fileSelectHandler, false);
        }
      }
    }

    function fileDragHover(e: Event) {
      const fileDrag = document.getElementById('file-drag');

      e.stopPropagation();
      e.preventDefault();

      if (fileDrag) {
        fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
      }
    }

    function fileSelectHandler(e: Event) {
      let files: FileList | null = null;
      if (e.target instanceof HTMLInputElement) {
        files = e.target.files;
      } else if (e instanceof DragEvent && e.dataTransfer) {
        files = e.dataTransfer.files;
      }

      if (files) {
        fileDragHover(e);
        for (let i = 0; i < files.length; i++) {
          parseFile(files[i]);
          const saveButton = document.getElementById('save-button');
          if (saveButton) {
            saveButton.classList.remove('hidden');
          }
        }
      }
    }

    function output(msg: string) {
      const m = document.getElementById('messages');
      if (m) {
        m.innerHTML = msg;
      }
    }

    function parseFile(file: File) {
      console.log(file.name);
      output('<strong>' + encodeURI(file.name) + '</strong>');

      const excelName = file.name;
      const isGood = (/\.(?=xls|xlsx)/gi).test(excelName);

      const start = document.getElementById('start');
      const response = document.getElementById('response');
      const notExcel = document.getElementById('notexcel');
      const fileExcel = document.getElementById('file-excel')!;
      const fileUploadForm = document.getElementById('file-upload-form') as HTMLFormElement;
      if(fileUploadForm){
        fileUploadForm.reset();
      }

      if (isGood && start && response && notExcel && fileExcel && fileUploadForm) {
        start.classList.add("hidden");
        response.classList.remove("hidden");
        notExcel.classList.add("hidden");
        fileExcel.classList.remove("hidden");
        fileExcel.setAttribute('src', URL.createObjectURL(file));
      } else if (notExcel && start && response && fileUploadForm) {
        fileExcel.classList.add("hidden");
        notExcel.classList.remove("hidden");
        start.classList.remove("hidden");
        response.classList.add("hidden");
        const saveButton = document.getElementById('save-button');
        if (saveButton) {
          saveButton.classList.add('hidden');
        }
      }
    }

    function setProgressMaxValue(e: ProgressEvent) {
      const pBar = document.getElementById('file-progress') as HTMLProgressElement;

      if (pBar && e.lengthComputable) {
        pBar.max = e.total;
      }
    }

    function updateFileProgress(e: ProgressEvent) {
      const pBar = document.getElementById('file-progress') as HTMLProgressElement;

      if (pBar && e.lengthComputable) {
        pBar.value = e.loaded;
      }
    }

    function saveFileHandler() {
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        uploadFile(fileInput.files[0]);
      }
    }

    function uploadFile(file: File) {
      const xhr = new XMLHttpRequest();
      const pBar = document.getElementById('file-progress') as HTMLProgressElement;
      const fileSizeLimit = 1024; // In MB

      if (xhr.upload && pBar) {
        if (file.size <= fileSizeLimit * 1024 * 1024) {
          xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
          xhr.upload.addEventListener('progress', updateFileProgress, false);

          xhr.onreadystatechange = function(e) {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                output('Archivo guardado correctamente');
              } else {
                output('Error al subir el archivo');
              }
              const saveButton = document.getElementById('save-button');
              if (saveButton) {
                saveButton.classList.add('hidden');
              }
            }
          };

          const formData = new FormData();
          formData.append('fileUpload', file);

          const fileUploadForm = document.getElementById('file-upload-form') as HTMLFormElement;
          if (fileUploadForm) {
            xhr.open('POST', fileUploadForm.action, true);
            xhr.send(formData);
          }
        } else {
          output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
        }
      }
    }

    if (window.File && window.FileList && window.FileReader) {
      Init();
    } else {
      const fileDrag = document.getElementById('file-drag');
      if (fileDrag) {
        fileDrag.style.display = 'none';
      }
    }
  }



}
