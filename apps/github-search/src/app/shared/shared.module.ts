import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const MODULES = [HttpClientModule, CommonModule, FormsModule];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
})
export class SharedModule {}
