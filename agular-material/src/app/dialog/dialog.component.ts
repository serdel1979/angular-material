import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  listaEquipos = ["Nuevo", "Segunda mano", "Reciclado"]
  equipForm !: FormGroup;

  accionBtb: string = "Guardar";
  constructor(private formBuilder: FormBuilder, private services: ApiService, @Inject(MAT_DIALOG_DATA) public editData: any, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.equipForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      fecha: ['', Validators.required],
      tipo: ['', Validators.required],
      precio: ['', Validators.required],
      comentario: ['', Validators.required],
    });

    if (this.editData) {
      this.accionBtb = "Actualizar";
      this.equipForm.controls['nombre'].setValue(this.editData.nombre);
      this.equipForm.controls['categoria'].setValue(this.editData.categoria);
      this.equipForm.controls['fecha'].setValue(this.editData.fecha);
      this.equipForm.controls['tipo'].setValue(this.editData.tipo);
      this.equipForm.controls['precio'].setValue(this.editData.precio);
      this.equipForm.controls['comentario'].setValue(this.editData.comentario);
    }
  }



  agregarEquipo() {
    if (this.accionBtb === "Guardar") {
      if (this.equipForm.valid) {
        this.services.agregarEquipo(this.equipForm.value).subscribe({
          next: (data) => {
            this.equipForm.reset();
            this.dialogRef.close('guardar');
          },
          error: () => {
            alert("Error al agregar equipo...")
          }
        })
      }
    } else {
      this.actualizarEquipo();
    }
  }

  actualizarEquipo() {
    this.services.actualizarEquipo(this.equipForm.value, this.editData.id).subscribe({
      next: (data) => {
        this.equipForm.reset();
        this.dialogRef.close('actualizar');
      },
      error: () => {
        alert("Error al actualizar equipo...")
      }
    })
  }


}
