import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from "@angular/material"

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatButtonModule, 
    Material.MatRadioModule,
    Material.MatMenuModule, 
    Material.MatDatepickerModule, 
    Material.MatNativeDateModule, 
    Material.MatIconModule, 
    Material.MatCardModule, 
    Material.MatSidenavModule, 
    Material.MatFormFieldModule,
    Material.MatInputModule, 
    Material.MatTooltipModule, 
    Material.MatToolbarModule
  ],
  exports:[
    Material.MatButtonModule, 
    Material.MatRadioModule,
    Material.MatMenuModule, 
    Material.MatDatepickerModule, 
    Material.MatNativeDateModule, 
    Material.MatIconModule, 
    Material.MatCardModule, 
    Material.MatSidenavModule, 
    Material.MatFormFieldModule,
    Material.MatInputModule, 
    Material.MatTooltipModule, 
    Material.MatToolbarModule
  ]
})
export class MaterialModule { }
