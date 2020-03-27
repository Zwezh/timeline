import { Component } from '@angular/core';
import { GlobalRes, HistoryRes } from '@appTextResources';

import { HistoryEventModel } from '../../models';
import { HistoryEventsService } from '../../services';

@Component({
  selector: 'history-add-event',
  templateUrl: './history-add-event.component.html',
  styleUrls: ['./history-add-event.component.scss']
})
export class HistoryAddEventComponent {

  public model: HistoryEventModel;

  constructor(
    private _historyEventsService: HistoryEventsService,
    public res: HistoryRes,
    public globalRes: GlobalRes
  ) {
    this.model = new HistoryEventModel();
  }

  public onAddHistoryEvent(): void {
    this._historyEventsService.addNewHistoryEvent(this.model);
  }
}
