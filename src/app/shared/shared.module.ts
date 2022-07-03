import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FilterPipe } from './pipes/filter.pipe';

const declares = [
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  FormsModule,
  MatButtonModule,
  MatIconModule
]

@NgModule({
  declarations: [
    FilterPipe
  ],
  imports: [
    CommonModule,
    ...declares,
  ],
  exports:[
    ...declares,
    FilterPipe
  ]
})
export class SharedModule { }
