import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [ZXingScannerModule,NgIf],
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.css'
})
export class QRComponent {
  scannerEnabled: boolean = false; // Desactivado inicialmente
  information: string = "";

  // Método para activar el escáner al hacer clic en el botón
  public startScan() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "Escanea el código QR";
  }

  // Maneja el éxito del escaneo y desactiva el escáner
  public scanSuccessHandler($event: string) {
    this.scannerEnabled = false;  // Oculta el escáner tras obtener el resultado
    this.information = $event;  // Almacena la información escaneada
  }
}
