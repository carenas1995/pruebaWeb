import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { principalRoutingModule } from './principal-routing.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { DataTableModule } from 'primeng/datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AdduserComponent } from './adduser/adduser.component';

@NgModule({
  imports: [
    CommonModule,
    principalRoutingModule, FormsModule,
    DataTableModule, TableModule, DropdownModule, ReactiveFormsModule],
  declarations: [
    HomeComponent,
    AdduserComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrincipalModule { }
