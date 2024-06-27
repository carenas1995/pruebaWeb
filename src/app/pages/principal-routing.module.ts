import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdduserComponent } from './adduser/adduser.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'addusuarios', component: AdduserComponent },
  { path: 'editusuarios/:id', component: AdduserComponent }
]

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class principalRoutingModule {
}
