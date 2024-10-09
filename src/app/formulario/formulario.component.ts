import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RestService } from '../services/rest.service';
import { NgIf } from '@angular/common';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, NgIf, ZXingScannerModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent {
  constructor(private restForm: RestService) {}
  qrImageUrl: string | null = null; // Variable para almacenar la URL de la imagen del QR
  information: string = "";
  scannerEnabled: boolean = true;

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = "Espera recuperando información... ";
    this.information = $event;
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "No se  detectado información de ningún código. Acerque un código QR para escanear.";
  }













  onSubmit(userForm: NgForm) {
    const formData = {
      newAuthRangeDto: {
        init_date: userForm.value.initDate,
        end_date: userForm.value.endDate,
        allowedDaysDtos: [
          {
            day: userForm.value.initDate,
            init_date: userForm.value.initDate,
            end_date: userForm.value.endDate,
          },
        ],
      },
      newUserAllowedDto: {
        document: userForm.value.document,
        name: userForm.value.name,
        documentType: {
          /* QUEDA FIJO POR AHORA */
          description: 'DNI', // Valor fijo
        },
        user_allowed_Type: {
          /* QUEDA FIJO POR AHORA */
          description: 'Visitor', // Valor fijo
        },
        email: userForm.value.email,
      },
      newVehicleDto: {
        plate: userForm.value.plate,
        vehicleTypeId: {
          /* QUEDA FIJO POR AHORA */
          description: 'Car', // Valor fijo
        },
        insurace: userForm.value.insurance,
      },
    };

    // Imprime formData para validar la estructura
    console.log('Datos enviados:', formData);

    // Llama al servicio para enviar los datos a la API
    this.restForm.postFormulario(formData).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        alert('Formulario enviado exitosamente');

        /* Para generar QR */
        this.restForm.postQRDATA(response).subscribe((responseQR) => {
          console.log('respuesta QR servidor', responseQR);
          alert('QR generado exitosamente');

          this.restForm.getQrImage(responseQR.id).subscribe((responseIMGQR) => {
            let img = URL.createObjectURL(responseIMGQR);
            this.qrImageUrl = img;
            console.log(this.qrImageUrl);
            alert('imagen creada!');
          });
        });

        userForm.reset();
      },
      (error) => {
        console.error('Error al enviar el formulario:', error);

        if (error.status === 500) {
          alert(
            'Error interno del servidor. Verifica los datos enviados o consulta los logs del backend.'
          );
        } else {
          alert(`Error al enviar el formulario: ${error.message}`);
        }
      }
    );
  }

  descargarQR(): void {
    if (this.qrImageUrl) {
      let enlaceDescarga = document.createElement('a');
      enlaceDescarga.href = this.qrImageUrl;
      enlaceDescarga.download = 'codigo-qr.png';
      enlaceDescarga.click();
    }
  }
}
