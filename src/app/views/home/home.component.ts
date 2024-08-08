import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../services/app.service';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { MESSAGES } from '../../helper/message.helper';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UtilService } from '../../services/util.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit {
    @ViewChild('salesChart') salesChart: BaseChartDirective | undefined;
    @ViewChild('billChart') billChart: BaseChartDirective | undefined;

    selectedDateRange = new FormGroup({
        start: new FormControl<Date | null>(new Date()),
        end: new FormControl<Date | null>(new Date()),
    });
    startDate: any;
    endDate: any;
    today: any;

    dataSales = {
        labels: [''],
        datasets: [
            {
                label: '',
                backgroundColor: '#CCE2F7',
                data: [0],
            },
        ],
    };
    dataBill = this.dataSales;

    billBarChartOptions: ChartConfiguration<'bar'>['options'] = {
        scales: {
            x: {
                min: 0,
            },
            y: {
                min: 0,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Bill',
            },
        },
    };
    salesBarChartOptions: ChartConfiguration<'bar'>['options'] = {
        scales: {
            x: {
                min: 0,
            },
            y: {
                min: 0,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Sales',
            },
        },
    };

    constructor(
        private appSvc: AppService,
        private datePipe: DatePipe,
        private util: UtilService,
    ) {}

    ngOnInit(): void {
        this.startDate = moment().startOf('month').toDate();
        this.endDate = moment().toDate();
        this.selectedDateRange = new FormGroup({
            start: new FormControl<Date | null>(this.startDate),
            end: new FormControl<Date | null>(this.endDate),
        });
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

    fetchChartData(): void {
        const start = this.startDate
            ? this.datePipe.transform(this.startDate, 'yyyy-MM-dd')
            : '';
        const end = this.endDate
            ? this.datePipe.transform(this.endDate, 'yyyy-MM-dd')
            : '';
        if (
            this.salesBarChartOptions &&
            this.salesBarChartOptions.plugins &&
            this.salesBarChartOptions.plugins.title
        ) {
            this.salesBarChartOptions.plugins.title.text =
                'Grafik Sales ' + start + ' - ' + end;
        }
        if (
            this.billBarChartOptions &&
            this.billBarChartOptions.plugins &&
            this.billBarChartOptions.plugins.title
        ) {
            this.billBarChartOptions.plugins.title.text =
                'Grafik Bill ' + start + ' - ' + end;
        }
        const params = {
            startDate: start,
            endDate: end,
        };
        this.appSvc
            .upsertDataTable('/dashboard/main-transaction-chart', params)
            .subscribe({
                next: (response: any) => {
                    let labels = response?.data?.map((item: any) =>
                        this.util.formatDateWithDay(item.transDate),
                    );
                    if (labels?.length > 0) {
                        this.dataSales = {
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Total Sales',
                                    backgroundColor: '#CCE2F7',
                                    data: response?.data?.map(
                                        (item: any) => item.totalSales,
                                    ),
                                },
                            ],
                        };
                        this.dataBill = {
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Total Bill',
                                    backgroundColor: '#DED2FD',
                                    data: response?.data?.map(
                                        (item: any) => item.totalBill,
                                    ),
                                },
                            ],
                        };
                    } else {
                        this.appSvc.showSnackbar(
                            MESSAGES.ERROR_MESSAGE_EMPTY_DATA,
                        );
                    }
                },
                error: (error: any) => {
                    console.error('Error fetching chart data', error);
                },
                complete: () => {
                    // console.log('Fetching chart data completed.');
                },
            });
    }
}
