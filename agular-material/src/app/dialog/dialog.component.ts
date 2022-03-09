import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  listaEquipos = ["Nuevo", "Segunda mano", "Reciclado"]
  equipForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private services: ApiService, private dialogRef: MatDialogRef<DialogComponent> ) { }

  ngOnInit(): void {
    this.equipForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      fecha: ['', Validators.required],
      tipo: ['', Validators.required],
      precio: ['', Validators.required],
      comentario: ['', Validators.required],
    })
  }



  agregarEquipo() {
    if (this.equipForm.valid) {
      this.services.agregarEquipo(this.equipForm.value).subscribe({
        next: (data) => {
          alert("Agregado...");
          this.equipForm.reset();
          this.dialogRef.close();
        },
        error: () => {
          alert("Error al agregar equipo...")
        }
      })
    }
  }

}
