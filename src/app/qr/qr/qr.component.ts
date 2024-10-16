import { DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [ZXingScannerModule, NgIf, DatePipe],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.css',
})
export class QRComponent {
  scannerEnabled: boolean = false; // Desactivado inicialmente
  information: string = '';

  // Método para activar el escáner al hacer clic en el botón
  public startScan() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = 'Escanea el código QR';
  }

  // Maneja el éxito del escaneo y desactiva el escáner
  public scanSuccessHandler($event: string) {
    this.scannerEnabled = false; // Oculta el escáner tras obtener el resultado
    const data = JSON.parse($event); // Convierte el string JSON a objeto

    // Formatea la información
    this.information = `
      <strong>Nombre:</strong> ${data.name}<br>
      <strong>Documento:</strong> ${data.document}<br>
      <strong>Tipo de Documento:</strong> ${data.documentType}<br>
      <strong>Vehículo:</strong> ${data.vehicle}<br>
      <strong>Patente:</strong> ${data.plate}<br>
      <strong>Fecha Generada:</strong> ${this.formatDate(data.generatedDate)}<br>
      <strong>Fecha de Inicio:</strong> ${this.formatDate(data.startDate)}<br>
      <strong>Fecha de Fin:</strong> ${this.formatDate(data.endDate)}
    `;
  }

  // Método para formatear la fecha
  private formatDate(dateArray: number[]): string {

    if (dateArray.length >= 3) {
      const year = dateArray[0];  // Año
      const month = dateArray[1]; // Mes (0-11)
      const day = dateArray[2];    // Día
  
      return `${day}/${month}/${year}`;
    }
    return 'Fecha no válida';
  }
  
}
