import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [ZXingScannerModule, NgIf],
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
      <strong>Fecha Generada:</strong> ${this.formatDate(
        data.generatedDate
      )}<br>
      <strong>Fecha de Inicio:</strong> ${this.formatDate(data.startDate)}<br>
      <strong>Fecha de Fin:</strong> ${this.formatDate(data.endDate)}
    `;
  }

  // Método para formatear la fecha
  private formatDate(dateArray: number[]): string {
    // Asegúrate de que el array tenga al menos la longitud adecuada
    if (dateArray.length >= 7) {
      const [year, month, day, hours, minutes, seconds, milliseconds] =
        dateArray;
      // Se suma 1 al mes porque los meses en JavaScript son 0-indexed
      let date = new Date(
        year,
        month - 1,
        day,
        hours,
        minutes,
        seconds,
        milliseconds
      );
      return date.toLocaleString(); // Formato de fecha y hora
    }
    return 'Fecha no válida';
  }
}
