import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ResourceTemplatesService } from './services';

const COMMON_MODULES = [
  CommonModule,
  FormsModule
];

@NgModule({
  imports: [COMMON_MODULES],
  exports: [COMMON_MODULES],
  declarations: [],
  providers: [
    ResourceTemplatesService
  ]
})
export class SharedModule {

}
