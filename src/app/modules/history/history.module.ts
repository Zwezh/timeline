import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@appSharedModule';
import { HistoryRes } from '@appTextResources';

import {
  HistoryAddEventComponent,
  HistoryLineComponent,
  HistoryPageComponent
} from './components';
import { HistoryRoutingModule } from './history-routing.module';
import {
  HistoryEventsService,
  HistoryResourceService
} from './services';

const components = [
  HistoryPageComponent,
  HistoryAddEventComponent,
  HistoryLineComponent
];

@NgModule({
  declarations: [components],
  imports: [
    HistoryRoutingModule,
    SharedModule,
    MatNativeDateModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule
  ],
  entryComponents: [HistoryAddEventComponent],
  providers: [
    HistoryRes,
    HistoryEventsService,
    HistoryResourceService
  ]
})
export class HistoryModule { }