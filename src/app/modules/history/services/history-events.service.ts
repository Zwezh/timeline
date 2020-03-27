import { Injectable } from '@angular/core';

import {
  HistoryEventModel,
  HistoryMainModel
} from '../models';

import { HistoryResourceService } from './history-resource.service';

@Injectable()
export class HistoryEventsService {

  private _eventlineModel: HistoryMainModel;

  public get eventlineModel(): HistoryMainModel {
    return this._eventlineModel;
  }

  constructor(resourceService: HistoryResourceService) {
    this._eventlineModel = new HistoryMainModel(resourceService);
  }

  public addNewHistoryEvent(event: HistoryEventModel): void {
    this._eventlineModel.addEvent(event);
  }
}
