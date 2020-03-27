import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import {
  HistoryEventCollectionDto,
  HistoryEventDto
} from '../dto';
import { HistoryResourceService } from '../services';

import { HistoryEventModel } from './history-event.model';

export class HistoryMainModel {
  public startDate: Date;
  public endDate: Date;
  public eventCollection: Array<HistoryEventModel>;
  public loadedEvent: EventEmitter<void>;

  constructor(private _resourceService: HistoryResourceService) {
    this.eventCollection = new Array<HistoryEventModel>();
    this.loadedEvent = new EventEmitter<void>();
  }

  public load(startDate: Date, endDate: Date): Observable<any> {
    const dto: HistoryEventCollectionDto = { startDate, endDate };
    return new Observable((observer: any) => {
      this._resourceService.getHistoryEvents(dto).subscribe(
        (response: Array<HistoryEventDto>) => {
          this.startDate = startDate;
          this.endDate = endDate;
          this.initialize(response);
          this.loadedEvent.emit();
          observer.next();
        },
        (error) => { observer.error(error); },
        () => observer.complete()
      );
    });
  }

  public addEvent(event: HistoryEventModel): void {
    const dto = this.buildDto(event);
    this._resourceService.addNewHistoryEvent(dto).subscribe((response: HistoryEventDto) => {
      const historyEvent = new HistoryEventModel();
      historyEvent.initialize(response);
      this.eventCollection = [... this.eventCollection, historyEvent];
      this.loadedEvent.emit();
    });

  }

  private initialize(dto: Array<HistoryEventDto>): void {
    this.eventCollection = dto.map((item: HistoryEventDto) => {
      const historyEvent = new HistoryEventModel();
      historyEvent.initialize(item);
      return historyEvent;
    });
  }

  private buildDto(event: HistoryEventModel): HistoryEventDto {
    const dto = new HistoryEventDto();
    dto.id = event.id;
    dto.title = event.title;
    dto.date = event.date;
    dto.description = event.description;
    return dto;
  }
}
