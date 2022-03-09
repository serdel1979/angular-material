import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'agular-material';

  equipos : any;

  constructor(public dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.mostrarTodos();
  }
  


  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{ width:'30%'});
  }

  mostrarTodos(){
    this.api.getEquipos().subscribe(data=>{
      this.equipos = data;
    })
  }

}

