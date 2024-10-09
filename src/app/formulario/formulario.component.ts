import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent {
  constructor(private restForm: RestService) {}

  onSubmit(userForm: NgForm) {
    const formData = {
      newAuthRangeDto: {
        neighbor_id: 0, // Este campo se genera en el backend
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
}
