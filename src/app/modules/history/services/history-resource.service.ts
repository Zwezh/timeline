import { Injectable } from '@angular/core';
import { ResourceTemplatesService } from '@appServices';
import { Observable } from 'rxjs';

import { HistoryResourceConstants } from '../constants';
import {
  HistoryEventCollectionDto,
  HistoryEventDto
} from '../dto';

@Injectable()
export class HistoryResourceService {

  constructor(private _resourceTemplates: ResourceTemplatesService) { }

  public getHistoryEvents(dto: HistoryEventCollectionDto): Observable<Array<HistoryEventDto>> {
    const data = this._resourceTemplates.get(HistoryResourceConstants.GET_HISTORY, dto);
    return data;
  }
  public addNewHistoryEvent(dto: HistoryEventDto): Observable<HistoryEventDto> {
    const data = this._resourceTemplates.post(HistoryResourceConstants.GET_HISTORY, dto);
    return data;
  }
}
