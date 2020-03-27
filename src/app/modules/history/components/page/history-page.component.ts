import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HistoryRes } from '@appTextResources';

import { HistoryMainModel } from '../../models';
import { HistoryEventsService } from '../../services';
import { HistoryAddEventComponent } from '../add-event/history-add-event.component';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent {

  public model: HistoryMainModel;
  public startDate: Date;
  public endDate: Date;

  public get isDisableLoad(): boolean {
    return !this.startDate || !this.endDate;
  }

  constructor(
    private _dialog: MatDialog,
    public res: HistoryRes,
    historyEventsService: HistoryEventsService
  ) {
    this.model = historyEventsService.eventlineModel;
  }

  public onOpenNewEventPopup(): void {
    this._dialog.open<HistoryAddEventComponent>(HistoryAddEventComponent, {
      width: '300px'
    });
  }

  public onLoadEvents(): void {
    this.initModel();
  }

  public initModel(): void {
    this.model.load(this.startDate, this.endDate).subscribe();
  }
}
