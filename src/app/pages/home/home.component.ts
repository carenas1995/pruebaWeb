import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { TecnicosService } from 'src/app/services/tecnicos.service';
import { TecsucuService } from 'src/app/services/tecsucu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cargando: boolean;
  columnas: any[] = [];
  listData: any[] = [];

  constructor(private router: Router, private tecsucuService: TecsucuService, private tecnicosService: TecnicosService, private sucursalesService:SucursalesService) { }

  ngOnInit() {
    this.cargando = true;
    this.listData = [];
    this.columnas = [];
    this.columnas = [
      { field: 'id', header: 'id', sort: false },
      { field: 'tecnico', header: 'tecnico', sort: false },
      { field: 'sucursal', header: 'sucursal', sort: false },
      { field: 'cantidad', header: 'cantidad', sort: false }
    ];
    this.cargar();
  }

  cargar() {
    this.tecsucuService.getAll().subscribe(res1 => {
      for (var r1 of res1) {
        var data = {
          id: r1.id,
          tecnicoid: r1.tecnico,
          tecnico: "",
          sucursalid: r1.sucursal,
          sucursal: "",
          cantidad: 0
        };
        this.listData.push(data);
      }
      this.tecnicosService.getAll().subscribe(res2 => {
        for(var ld1 of this.listData){
          ld1.tecnico = res2.find(x => ld1.tecnicoid == x.id).nombre;
        }
      }, err => {
        console.log('Error data');
      });
      this.sucursalesService.getAll().subscribe(res2 => {
        for(var ld2 of this.listData){
          ld2.sucursal = res2.find(x => ld2.sucursalid == x.id).nombre;
        }
      }, err => {
        console.log('Error data');
      });
    }, err => {
      console.log('Error data');
    });
  }

  add() {
    this.router.navigate(['addusuarios']);
  }

  edit(id: number) {
    this.router.navigate(['editusuarios/' + id]);
  }
}
