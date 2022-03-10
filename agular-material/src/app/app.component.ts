import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  subscription: Subscription | undefined;

  displayedColumns: string[] = ['nombre', 'categoria', 'tipo', 'fecha', 'precio', 'comentario', 'accion'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'agular-material';

  equipos: any;

  constructor(public dialog: MatDialog, private api: ApiService, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.mostrarTodos();

    this.subscription = this.api.refresh$().subscribe(() => {
      this.mostrarTodos()
    })
  }



  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '40%'
    });
    this.mostrarTodos();
  }

  mostrarTodos() {
    this.api.getEquipos().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  editProducto(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(result => {
      this.mostrarTodos()
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  borrarEquipo(row: any) {
    this.api.borrarEquipo(row).subscribe(data => {
      alert("Equipo borrado!!!");
      this.mostrarTodos();
    })
  }

}

