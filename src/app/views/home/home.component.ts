import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../services/app.service';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { MESSAGES } from '../../helper/message.helper';
import { FormControl, FormGroup } from '@angular/forms';
import { CanvasJS } from '@canvasjs/angular-charts';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
    selectedDateRange = new FormGroup({
        start: new FormControl<Date | null>(new Date()),
        end: new FormControl<Date | null>(new Date()),
    });
    startDate: any;
    endDate: any;

    billChart: any;
    salesChart: any;

    constructor(
        private appSvc: AppService,
        private datePipe: DatePipe,
    ) {}

    ngOnInit(): void {
        this.startDate = moment().startOf('month').toDate();
        this.endDate = moment().toDate();
        this.selectedDateRange = new FormGroup({
            start: new FormControl<Date | null>(this.startDate),
            end: new FormControl<Date | null>(this.endDate),
        });
        this.createChart();
        this.fetchChartData();
        this.selectedDateRange
            .get('start')
            ?.valueChanges.subscribe((value) => {
                if (value !== null) {
                    this.startDate = value;
                }
            });
        this.selectedDateRange
            .get('end')
            ?.valueChanges.subscribe((value) => {
                if (value !== null) {
                    this.endDate = value;
                    this.fetchChartData();
                }
            });
    }

    createChart() {
        this.billChart = new CanvasJS.Chart('billChartContainer', {
            title: {
                text: 'Bill',
            },
            subtitles: [{text:''}],
            data: [
                {
                    type: 'column',
                    color: 'red',
                    dataPoints: [{ label: '', y: '0' }],
                },
            ],
        });
        this.billChart.render();
        this.salesChart = new CanvasJS.Chart('salesChartContainer', {
            title: {
                text: 'Sales',
            },
            subtitles: [{text:''}],
            data: [
                {
                    type: 'column',
                    color: 'red',
                    dataPoints: [{ label: '', y: '0' }],
                },
            ],
        });
        this.salesChart.render();
    }

    fetchChartData(): void {
        let start = this.startDate;
        let end = this.endDate;
        const params = {
            startDate: start
                ? this.datePipe.transform(start, 'yyyy-MM-dd')
                : '',
            endDate: end ? this.datePipe.transform(end, 'yyyy-MM-dd') : '',
        };
        this.appSvc
            .upsertDataTable('/dashboard/main-transaction-chart', params)
            .subscribe({
                next: (response: any) => {
                    let labels = response?.data?.map((item: any) =>
                        this.formatDateWithDay(item.transDate),
                    );
                    if (labels?.length > 0) {
                        const formattedDataSales = response?.data?.map(
                            (item: any) => ({
                                label: this.formatDateWithDay(
                                    item.transDate,
                                ),
                                y: item.totalSales,
                            }),
                        );
                        const formattedDataBill = response?.data?.map(
                            (item: any) => ({
                                label: this.formatDateWithDay(
                                    item.transDate,
                                ),
                                y: item.totalBill,
                            }),
                        );

                        const dateSubtitle =
                            this.datePipe.transform(start, 'yyyy-MM-dd') +
                            ' - ' +
                            this.datePipe.transform(end, 'yyyy-MM-dd');

                        this.billChart.options.data[0].dataPoints =
                            formattedDataBill;
                        this.billChart.options.subtitles[0].text =
                            dateSubtitle;

                        this.billChart.render();

                        this.salesChart.options.data[0].dataPoints =
                            formattedDataSales;
                        this.salesChart.options.subtitles[0].text =
                            dateSubtitle;
                        this.salesChart.render();
                    } else {
                        this.appSvc.showSnackbar(
                            MESSAGES.ERROR_SHOW_MESSAGE,
                        );
                    }
                },
                error: (error: any) => {
                    console.error('Error fetching chart data', error);
                },
                complete: () => {
                },
            });
    }

    formatDateWithDay(dateString: string): string {
        const day = moment(dateString).format('dddd');
        return day.substring(0, 3) + ' ' + dateString;
    }
}
