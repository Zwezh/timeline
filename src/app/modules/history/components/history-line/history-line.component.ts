import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent } from 'rxjs';

import {
  HistoryChartConstants,
  HistoryPointColorConstants
} from '../../constants';
import {
  HistoryEventModel,
  HistoryMainModel
} from '../../models';
import { HistoryEventsService } from '../../services';

import * as d3 from 'd3';

@Component({
  selector: 'history-line',
  templateUrl: './history-line.component.html',
  styleUrls: ['./history-line.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryLineComponent implements AfterViewInit {
  private _model: HistoryMainModel;
  private _updatedCollection: Array<HistoryEventModel>;
  private hostElement: HTMLElement;

  @Input() collection: Array<HistoryEventModel>;
  @ViewChild('chartContainer', { static: false }) chartContainer: ElementRef;

  public isLoaded: boolean;
  public startDate: string;
  public endDate: string;

  public get leftEdge() {
    return HistoryChartConstants.MARGIN.left;
  }

  public get rightEdge() {
    return this.chartContainer.nativeElement.offsetWidth - HistoryChartConstants.MARGIN.right;
  }

  public get height() {
    return this.chartContainer.nativeElement.offsetHeight - HistoryChartConstants.MARGIN.top - HistoryChartConstants.MARGIN.bottom;
  }

  public get deadlineHeight() {
    return this.height + HistoryChartConstants.DEADLINES.heightLine;
  }

  public get endDateX(): number {
    return this.hostElement.offsetWidth - HistoryChartConstants.DEADLINES.dateWidth;
  }

  public get dateY(): number {
    return this.height + HistoryChartConstants.DEADLINES.dateOffsetY;
  }

  constructor(historyEventsService: HistoryEventsService, private cdRef: ChangeDetectorRef) {
    this.isLoaded = false;
    this._model = historyEventsService.eventlineModel;
    this.collection = historyEventsService.eventlineModel.eventCollection;
    this._model.loadedEvent.subscribe(() => {
      this.startDate = this._model.startDate.getStringDate();
      this.endDate = this._model.endDate.getStringDate();
      this.fillChartItems();
      this.isLoaded = true;
      this.cdRef.detectChanges();
      fromEvent(window, 'resize').subscribe(() => {
        this.fillChartItems();
        this.cdRef.detectChanges();

      });
    });
  }

  ngAfterViewInit() {
    this.hostElement = this.chartContainer.nativeElement;
  }

  public getColorById(id): string {
    return HistoryPointColorConstants[id % 7];
  }

  public getCircleX(date): number {
    return this.scaleLine(date.getTime());
  }

  public getTitleText(title): string {
    let result = title;
    if (title.length > 13) {
      result = title.slice(0, 12) + '...';
    }
    return result;
  }

  public getVerticalLineX(date: Date): number {
    return this.getXOffset(date.getTime(), 0);
  }

  public onOpenDetailsPopup(historyEvent: HistoryEventModel): void {
    const svg = d3.select(this.hostElement);
    const popup = svg.append('g');
    popup.attr('id', 'details-popup')
      .attr('class', 'details-popup')
      .transition()
      .duration(700)
      .style('opacity', 1);

    const details = popup.append('div').attr('class', 'content');
    details.append('i').classed('material-icons close-icon', true).text('close')
      .on('click', () => {
        details.transition().duration(700).style('opacity', 0);
        setTimeout(() => { popup.remove(); }, 700);
      });
    details.append('h2').attr('class', 'text-subtitle').text(historyEvent.title);
    details.append('h3').attr('class', 'text-title').text(historyEvent.date.getStringDate());
    details.append('div').attr('class', 'text-description').text(historyEvent.description);
  }

  private fillChartItems(): void {
    this._updatedCollection = new Array<HistoryEventModel>();
    this.calculateElementYOffset(this._model.eventCollection, 0);
  }

  private calculateElementYOffset(collection: Array<HistoryEventModel>, weight: number): void {
    if (!collection.length) { return; }
    let closestEdge: number;
    collection = collection.filter((element: HistoryEventModel) => {
      let result = true;
      element.offsetX = this.getXOffset(element.date.getTime(), HistoryChartConstants.CONTENT_WIDTH);
      if (!closestEdge || element.offsetX > closestEdge) {
        element.setOffsetY(weight);
        this._updatedCollection.push(element);
        closestEdge = element.offsetX + HistoryChartConstants.CONTENT_WIDTH;
        result = false;
      }
      return result;
    });
    this.calculateElementYOffset(collection, ++weight);
  }

  private scaleLine(xOffset: number): number {
    const scaleLine = d3.scaleLinear()
      .domain([this._model.startDate.getTime(), this._model.endDate.getTime()])
      .range([HistoryChartConstants.MARGIN.left, this.hostElement.offsetWidth - HistoryChartConstants.MARGIN.right]);
    return scaleLine(xOffset);
  }

  private getXOffset(date: number, width: number): number {
    let xOffset = this.scaleLine(date) - (width / 2);
    const halfSize = width / 2;
    if (xOffset < halfSize - HistoryChartConstants.MARGIN.left) {
      xOffset = 0;
    } else if (xOffset > (this.hostElement.offsetWidth - halfSize)) {
      xOffset = this.hostElement.offsetWidth - halfSize;
    }
    return xOffset;
  }
}