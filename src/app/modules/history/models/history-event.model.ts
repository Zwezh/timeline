import { HistoryEventDto } from '../dto';
import { HistoryChartConstants } from './../constants/history-chart.constants';
export class HistoryEventModel {
  public id: number;
  public title: string;
  public date: Date;
  public description: string;
  public offsetX: number;
  public offsetY: number;

  public initialize(dto: HistoryEventDto): void {
    this.id = dto.id;
    this.title = dto.title;
    this.date = new Date(dto.date);
    this.description = dto.description;
  }

  public getTitleOffsetX(): number {
    return this.offsetX + HistoryChartConstants.TITLE_OFFSET_X;
  }

  public setOffsetY(weight: number) {
    this.offsetY = HistoryChartConstants.Y_OFFSET_HEIGHT * weight;
  }

  public getContainerOffsetY(height: number): number {
    return height - this.offsetY - HistoryChartConstants.Y_OFFSET_HEIGHT;
  }

  public getTitleOffsetY(height: number): number {
    return height - this.offsetY - HistoryChartConstants.Y_TITLE_OFFSET;
  }
  public getVerticalLineOffsetY(height: number): number {
    return height - this.offsetY - HistoryChartConstants.Y_LINE_OFFSET;
  }
}
