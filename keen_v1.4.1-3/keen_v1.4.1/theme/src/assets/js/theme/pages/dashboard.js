//
// Dashboard
//



// Class definition
var KTDashboard = function() {

    var mediumCharts = function() {
        KTLib.initMediumChart('kt_widget_mini_chart_1', [20, 45, 20, 10, 20, 35, 20, 25, 10, 10], 70, KTApp.getStateColor('brand'));
        KTLib.initMediumChart('kt_widget_mini_chart_2', [10, 15, 25, 45, 15, 30, 10, 40, 15, 25], 70, KTApp.getStateColor('danger'));
        KTLib.initMediumChart('kt_widget_mini_chart_3', [22, 15, 40, 10, 35, 20, 30, 50, 15, 10], 70, KTApp.getBaseColor('shape', 4));
    }

    var latestProductsMiniCharts = function() {
        KTLib.initMiniChart($('#kt_widget_latest_products_chart_1'), [6, 12, 9, 18, 15, 9, 11, 8], KTApp.getStateColor('info'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_latest_products_chart_2'), [8, 6, 13, 16, 9, 6, 11, 14], KTApp.getStateColor('warning'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_latest_products_chart_3'), [8, 6, 13, 16, 9, 6, 11, 14], KTApp.getStateColor('warning'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_latest_products_chart_4'), [3, 9, 9, 18, 15, 9, 11, 8], KTApp.getStateColor('success'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_latest_products_chart_5'), [5, 7, 9, 18, 15, 9, 11, 8], KTApp.getStateColor('brand'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_latest_products_chart_6'), [3, 9, 5, 18, 15, 7, 11, 6], KTApp.getStateColor('danger'), 2, false, false);
    }

    var generalStatistics = function() {
        // Mini charts
        KTLib.initMiniChart($('#kt_widget_general_statistics_chart_1'), [6, 8, 3, 18, 15, 7, 11, 7], KTApp.getStateColor('warning'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_general_statistics_chart_2'), [8, 6, 9, 18, 15, 7, 11, 16], KTApp.getStateColor('brand'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_general_statistics_chart_3'), [4, 12, 9, 18, 15, 7, 11, 12], KTApp.getStateColor('danger'), 2, false, false);
        KTLib.initMiniChart($('#kt_widget_general_statistics_chart_4'), [3, 14, 5, 12, 15, 8, 14, 16], KTApp.getStateColor('success'), 2, false, false);

        // Main chart
        if (!document.getElementById("kt_widget_general_statistics_chart_main")) {
            return;
        }

        var ctx = document.getElementById("kt_widget_general_statistics_chart_main").getContext("2d");

        var gradient1 = ctx.createLinearGradient(0, 0, 0, 350);
        gradient1.addColorStop(0, Chart.helpers.color(KTApp.getStateColor('brand')).alpha(0.3).rgbString());
        gradient1.addColorStop(1, Chart.helpers.color(KTApp.getStateColor('brand')).alpha(0).rgbString());

        var gradient2 = ctx.createLinearGradient(0, 0, 0, 350);
        gradient2.addColorStop(0, Chart.helpers.color(KTApp.getStateColor('danger')).alpha(0.3).rgbString());
        gradient2.addColorStop(1, Chart.helpers.color(KTApp.getStateColor('danger')).alpha(0).rgbString());

        var mainConfig = {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
                datasets: [{
                    label: 'Sales',
                    borderColor: KTApp.getStateColor('brand'),
                    borderWidth: 2,
                    backgroundColor: gradient1,
                    pointBackgroundColor: KTApp.getStateColor('brand'),
                    data: [30, 60, 25, 7, 5, 15, 30, 20, 15, 10],
                }, {
                    label: 'Orders',
                    borderWidth: 1,
                    borderColor: KTApp.getStateColor('danger'),
                    backgroundColor: gradient2,
                    pointBackgroundColor: KTApp.getStateColor('danger'),
                    data: [10, 15, 25, 35, 15, 30, 55, 40, 65, 40]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false,
                    text: ''
                },
                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10,
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: KTApp.getStateColor('brand'),
                    titleFontColor: '#ffffff',
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                },
                legend: {
                    display: false,
                    labels: {
                        usePointStyle: false
                    }
                },
                hover: {
                    mode: 'index'
                },
                scales: {
                    xAxes: [{
                        display: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true
                        }
                    }],
                    yAxes: [{
                        display: true,
                        stacked: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        },
                        gridLines: {
                            color: '#eef2f9',
                            drawBorder: false,
                            offsetGridLines: true,
                            drawTicks: false
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true
                        }
                    }]
                },
                elements: {
                    point: {
                        radius: 0,
                        borderWidth: 0,
                        hoverRadius: 0,
                        hoverBorderWidth: 0
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                }
            }
        };

        var chart = new Chart(ctx, mainConfig);

        // Update chart on window resize
        KTUtil.addResizeHandler(function() {
            chart.update();
        });
    }

    var widgetTechnologiesChart = function() {
        if ($('#kt_widget_technologies_chart').length == 0) {
            return;
        }

        var randomScalingFactor = function() {
            return Math.round(Math.random() * 100);
        };

        var config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        35, 30, 35
                    ],
                    backgroundColor: [
                        KTApp.getBaseColor('shape', 3),
                        KTApp.getBaseColor('shape', 4),
                        KTApp.getStateColor('brand')
                    ]
                }],
                labels: [
                    'Angular',
                    'CSS',
                    'HTML'
                ]
            },
            options: {
                cutoutPercentage: 75,
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                    position: 'top',
                },
                title: {
                    display: false,
                    text: 'Technology'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10,
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: KTApp.getStateColor('brand'),
                    titleFontColor: '#ffffff',
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                }
            }
        };

        var ctx = document.getElementById('kt_widget_technologies_chart').getContext('2d');
        var myDoughnut = new Chart(ctx, config);
    }

    var widgetTechnologiesChart2 = function() {
        if ($('#kt_widget_technologies_chart_2').length == 0) {
            return;
        }

        var randomScalingFactor = function() {
            return Math.round(Math.random() * 100);
        };

        var config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        35, 30, 35
                    ],
                    backgroundColor: [
                        KTApp.getStateColor('warning'),
                        KTApp.getStateColor('brand'),
                        KTApp.getStateColor('success')
                    ]
                }],
                labels: [
                    'CSS',
                    'Angular',
                    'HTML'
                ]
            },
            options: {
                cutoutPercentage: 75,
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                    position: 'top',
                },
                title: {
                    display: false,
                    text: 'Technology'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10,
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: KTApp.getStateColor('brand'),
                    titleFontColor: '#ffffff',
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                }
            }
        };

        var ctx = document.getElementById('kt_widget_technologies_chart_2').getContext('2d');
        var myDoughnut = new Chart(ctx, config);
    }

    var widgetTotalOrdersChart = function() {
        if (!document.getElementById('kt_widget_total_orders_chart')) {
            return;
        }

        // Main chart
        var max = 80;
        var color = KTApp.getStateColor('brand');
        var ctx = document.getElementById('kt_widget_total_orders_chart').getContext("2d");
        var gradient = ctx.createLinearGradient(0, 0, 0, 120);
        gradient.addColorStop(0, Chart.helpers.color(color).alpha(0.3).rgbString());
        gradient.addColorStop(1, Chart.helpers.color(color).alpha(0).rgbString());

        var data = [30, 35, 45, 65, 35, 50, 40, 60, 35, 45];

        var mainConfig = {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
                datasets: [{
                    label: 'Orders',
                    borderColor: color,
                    borderWidth: 3,
                    backgroundColor: gradient,
                    pointBackgroundColor: KTApp.getStateColor('brand'),
                    data: data,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                title: {
                    display: false,
                    text: 'Stacked Area'
                },
                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10,
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: KTApp.getStateColor('brand'),
                    titleFontColor: '#ffffff',
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                },
                legend: {
                    display: false,
                    labels: {
                        usePointStyle: false
                    }
                },
                hover: {
                    mode: 'index'
                },
                scales: {
                    xAxes: [{
                        display: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true,
                        }
                    }],
                    yAxes: [{
                        display: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        },
                        gridLines: {
                            color: '#eef2f9',
                            drawBorder: false,
                            offsetGridLines: true,
                            drawTicks: false
                        },
                        ticks: {
                            max: max,
                            display: false,
                            beginAtZero: true
                        }
                    }]
                },
                elements: {
                    point: {
                        radius: 0,
                        borderWidth: 0,
                        hoverRadius: 0,
                        hoverBorderWidth: 0
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                }
            }
        };

        var chart = new Chart(ctx, mainConfig);

        // Update chart on window resize
        KTUtil.addResizeHandler(function() {
            chart.update();
        });
    }

    var widgetTotalOrdersChart2 = function() {
        if (!document.getElementById('kt_widget_total_orders_chart_2')) {
            return;
        }

        // Main chart
        var max = 80;
        var color = KTApp.getStateColor('danger');
        var ctx = document.getElementById('kt_widget_total_orders_chart_2').getContext("2d");
        var gradient = ctx.createLinearGradient(0, 0, 0, 120);
        gradient.addColorStop(0, Chart.helpers.color(color).alpha(0.3).rgbString());
        gradient.addColorStop(1, Chart.helpers.color(color).alpha(0).rgbString());

        var data = [30, 35, 45, 65, 35, 50, 40, 60, 35, 45];

        var mainConfig = {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
                datasets: [{
                    label: 'Orders',
                    borderColor: color,
                    borderWidth: 3,
                    backgroundColor: gradient,
                    pointBackgroundColor: KTApp.getStateColor('brand'),
                    data: data,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                title: {
                    display: false,
                    text: 'Stacked Area'
                },
                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10,
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: KTApp.getStateColor('brand'),
                    titleFontColor: '#ffffff',
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                },
                legend: {
                    display: false,
                    labels: {
                        usePointStyle: false
                    }
                },
                hover: {
                    mode: 'index'
                },
                scales: {
                    xAxes: [{
                        display: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true,
                        }
                    }],
                    yAxes: [{
                        display: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        },
                        gridLines: {
                            color: '#eef2f9',
                            drawBorder: false,
                            offsetGridLines: true,
                            drawTicks: false
                        },
                        ticks: {
                            max: max,
                            display: false,
                            beginAtZero: true
                        }
                    }]
                },
                elements: {
                    point: {
                        radius: 0,
                        borderWidth: 0,
                        hoverRadius: 0,
                        hoverBorderWidth: 0
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                }
            }
        };

        var chart = new Chart(ctx, mainConfig);

        // Update chart on window resize
        KTUtil.addResizeHandler(function() {
            chart.update();
        });
    }

    var widgetSalesStatisticsChart = function() {
        if (!document.getElementById('kt_chart_sales_statistics')) {
            return;
        }

        var MONTHS = ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug'];

        var color = Chart.helpers.color;
        var barChartData = {
            labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug'],
            datasets: [{
                label: 'Sales',
                backgroundColor: color(KTApp.getStateColor('brand')).alpha(1).rgbString(),
                borderWidth: 0,
                data: [20, 30, 40, 35, 45, 55, 45]
            }, {
                label: 'Orders',
                backgroundColor: color(KTApp.getBaseColor('shape', 1)).alpha(1).rgbString(),
                borderWidth: 0,
                data: [25, 35, 45, 40, 50, 60, 50]
            }]
        };

        var ctx = document.getElementById('kt_chart_sales_statistics').getContext('2d');
        var myBar = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: false,
                scales: {
                    xAxes: [{
                        categoryPercentage: 0.35,
                        barPercentage: 0.70,
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        },
                        gridLines: false,
                        ticks: {
                            display: true,
                            beginAtZero: true,
                            fontColor: KTApp.getBaseColor('shape', 3),
                            fontSize: 13,
                            padding: 10
                        }
                    }],
                    yAxes: [{
                        categoryPercentage: 0.35,
                        barPercentage: 0.70,
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        },
                        gridLines: {
                            color: KTApp.getBaseColor('shape', 2),
                            drawBorder: false,
                            offsetGridLines: false,
                            drawTicks: false,
                            borderDash: [3, 4],
                            zeroLineWidth: 1,
                            zeroLineColor: KTApp.getBaseColor('shape', 2),
                            zeroLineBorderDash: [3, 4]
                        },
                        ticks: {
                            max: 70,
                            stepSize: 10,
                            display: true,
                            beginAtZero: true,
                            fontColor: KTApp.getBaseColor('shape', 3),
                            fontSize: 13,
                            padding: 10
                        }
                    }]
                },
                title: {
                    display: false
                },
                hover: {
                    mode: 'index'
                },
                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10,
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: KTApp.getStateColor('brand'),
                    titleFontColor: '#ffffff',
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 5,
                        bottom: 5
                    }
                }
            }
        });
    }

    var widgetRevenueGrowthChart = function() {
        if (!document.getElementById('kt_chart_revenue_growth')) {
            return;
        }

        var color = Chart.helpers.color;
        var barChartData = {
            labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 Aug', '8 Aug', '9 Aug', '10 Aug', '11 Aug', '12 Aug'],
            datasets: [{
                label: 'Sales',
                backgroundColor: color(KTApp.getStateColor('brand')).alpha(1).rgbString(),
                borderWidth: 0,
                data: [10, 40, 20, 40, 40, 60, 40, 80, 40, 70, 40, 70],
                borderColor: KTApp.getStateColor('brand'),
                fill: true
            }]
        };

        var ctx = document.getElementById('kt_chart_revenue_growth').getContext('2d');
        var myBar = new Chart(ctx, {
            type: 'line',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: false,
                scales: {
                    xAxes: [{
                        categoryPercentage: 0.35,
                        barPercentage: 0.70,
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        },
                        gridLines: false,
                        ticks: {
                            display: true,
                            beginAtZero: true,
                            fontColor: KTApp.getBaseColor('shape', 3),
                            fontSize: 13,
                            padding: 10
                        }
                    }],
                    yAxes: [{
                        categoryPercentage: 0.35,
                        barPercentage: 0.70,
                        display: true,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        },
                        gridLines: {
                            color: KTApp.getBaseColor('shape', 2),
                            drawBorder: false,
                            offsetGridLines: false,
                            drawTicks: false,
                            borderDash: [3, 4],
                            zeroLineWidth: 1,
                            zeroLineColor: KTApp.getBaseColor('shape', 2),
                            zeroLineBorderDash: [3, 4]
                        },
                        ticks: {
                            max: 100,
                            stepSize: 20,
                            display: true,
                            beginAtZero: true,
                            fontColor: KTApp.getBaseColor('shape', 3),
                            fontSize: 13,
                            padding: 10
                        }
                    }]
                },
                title: {
                    display: false
                },
                hover: {
                    mode: 'index'
                },
                elements: {
                    line: {
                        tension: 0.5
                    },
                    point: {
                        radius: 0
                    }
                },
                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10,
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: KTApp.getStateColor('brand'),
                    titleFontColor: '#ffffff',
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 5,
                        bottom: 5
                    }
                }
            }
        });
    }

    var daterangepickerInit = function() {
        if ($('#kt_dashboard_daterangepicker').length == 0) {
            return;
        }

        var picker = $('#kt_dashboard_daterangepicker');
        var start = moment();
        var end = moment();

        function cb(start, end, label) {
            var title = '';
            var range = '';

            if ((end - start) < 100 || label == 'Today') {
                title = 'Today:';
                range = start.format('MMM D');
            } else if (label == 'Yesterday') {
                title = 'Yesterday:';
                range = start.format('MMM D');
            } else {
                range = start.format('MMM D') + ' - ' + end.format('MMM D');
            }

            picker.find('#kt_dashboard_daterangepicker_date').html(range);
            picker.find('#kt_dashboard_daterangepicker_title').html(title);
        }

        picker.daterangepicker({
            direction: KTUtil.isRTL(),
            startDate: start,
            endDate: end,
            opens: 'left',
            applyClass: "btn btn-sm btn-primary",
            cancelClass: "btn btn-sm btn-secondary",
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end, '');
    }

    var recentOrdersInit = function() {
        if ($('#kt_recent_orders').length === 0) {
            return;
        }

        var dataJSONArray = [{"id":1,"employee_id":"463978155-5","first_name":"Carroll","last_name":"Maharry","email":"cmaharry0@topsy.com","phone":"420-935-0970","gender":"Male","department":"Legal","address":"72460 Bunting Trail","hire_date":"3/18/2018","website":"https://gmpg.org","notes":"euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis","status":6,"type":2,"salary":"$339.37"},
            {"id":2,"employee_id":"590410601-7","first_name":"Jae","last_name":"Frammingham","email":"jframmingham1@ucoz.com","phone":"377-986-0708","gender":"Male","department":"Human Resources","address":"976 Eagle Crest Junction","hire_date":"10/22/2017","website":"https://telegraph.co.uk","notes":"consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia","status":5,"type":2,"salary":"$1568.00"},
            {"id":3,"employee_id":"562079447-4","first_name":"Natalie","last_name":"Stuchberry","email":"nstuchberry2@jimdo.com","phone":"718-320-9991","gender":"Female","department":"Legal","address":"9971 Rigney Pass","hire_date":"6/1/2018","website":"http://nbcnews.com","notes":"tempus sit amet sem fusce consequat nulla nisl nunc nisl duis","status":1,"type":1,"salary":"$2014.50"},
            {"id":4,"employee_id":"078485871-3","first_name":"Abran","last_name":"Ivett","email":"aivett3@pinterest.com","phone":"784-922-2482","gender":"Male","department":"Accounting","address":"9 Mesta Court","hire_date":"2/6/2018","website":"http://wikipedia.org","notes":"vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra","status":2,"type":1,"salary":"$1205.64"},
            {"id":5,"employee_id":"048140516-X","first_name":"Viola","last_name":"Ends","email":"vends4@squarespace.com","phone":"613-457-5253","gender":"Female","department":"Research and Development","address":"2 Paget Court","hire_date":"3/16/2018","website":"https://dot.gov","notes":"id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit","status":2,"type":2,"salary":"$1376.93"},
            {"id":6,"employee_id":"115191539-4","first_name":"Marabel","last_name":"Foystone","email":"mfoystone5@example.com","phone":"731-391-3134","gender":"Female","department":"Support","address":"2498 Tennyson Way","hire_date":"5/10/2018","website":"http://booking.com","notes":"nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis","status":1,"type":1,"salary":"$1498.25"},
            {"id":7,"employee_id":"053408526-1","first_name":"Maiga","last_name":"Frogley","email":"mfrogley6@flavors.me","phone":"559-339-1188","gender":"Female","department":"Legal","address":"6 Sage Circle","hire_date":"10/24/2017","website":"http://ustream.tv","notes":"in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur","status":4,"type":1,"salary":"$2420.50"},
            {"id":8,"employee_id":"996172199-3","first_name":"Leia","last_name":"Rapelli","email":"lrapelli7@amazonaws.com","phone":"882-958-3554","gender":"Female","department":"Training","address":"5 Bellgrove Park","hire_date":"3/11/2018","website":"https://va.gov","notes":"ullamcorper purus sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus","status":5,"type":3,"salary":"$479.73"},
            {"id":9,"employee_id":"290771439-2","first_name":"Lilias","last_name":"Stollsteiner","email":"lstollsteiner8@opensource.org","phone":"725-615-6480","gender":"Female","department":"Product Management","address":"5 Shoshone Park","hire_date":"4/26/2018","website":"http://163.com","notes":"blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem","status":6,"type":3,"salary":"$815.69"},
            {"id":10,"employee_id":"475138305-1","first_name":"Chrissie","last_name":"Trenouth","email":"ctrenouth9@addtoany.com","phone":"653-550-6039","gender":"Male","department":"Product Management","address":"6753 Fulton Drive","hire_date":"4/5/2018","website":"https://nifty.com","notes":"erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in","status":5,"type":2,"salary":"$1011.26"},
            {"id":11,"employee_id":"909173505-8","first_name":"Tisha","last_name":"Timewell","email":"ttimewella@photobucket.com","phone":"372-765-5253","gender":"Female","department":"Legal","address":"5142 7th Terrace","hire_date":"3/21/2018","website":"https://360.cn","notes":"dolor morbi vel lectus in quam fringilla rhoncus mauris enim","status":4,"type":1,"salary":"$1169.55"},
            {"id":12,"employee_id":"930860193-7","first_name":"Abie","last_name":"Adamec","email":"aadamecb@ask.com","phone":"728-535-2654","gender":"Male","department":"Marketing","address":"7 Prentice Point","hire_date":"6/28/2018","website":"https://epa.gov","notes":"mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi","status":4,"type":1,"salary":"$256.18"},
            {"id":13,"employee_id":"302125353-9","first_name":"Saidee","last_name":"Christol","email":"schristolc@reverbnation.com","phone":"575-573-3469","gender":"Female","department":"Sales","address":"753 Moose Road","hire_date":"1/9/2018","website":"https://soup.io","notes":"erat fermentum justo nec condimentum neque sapien placerat ante nulla","status":1,"type":1,"salary":"$1888.02"},
            {"id":14,"employee_id":"264870457-4","first_name":"Merna","last_name":"Studman","email":"mstudmand@bloomberg.com","phone":"301-593-9922","gender":"Female","department":"Sales","address":"32617 Merchant Park","hire_date":"12/14/2017","website":"https://dyndns.org","notes":"risus semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis","status":2,"type":1,"salary":"$525.89"},
            {"id":15,"employee_id":"458961353-0","first_name":"Carey","last_name":"De Paepe","email":"cdepaepee@vistaprint.com","phone":"437-166-5682","gender":"Male","department":"Business Development","address":"57299 Hintze Terrace","hire_date":"3/5/2018","website":"https://ed.gov","notes":"etiam justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut","status":4,"type":3,"salary":"$380.12"},
            {"id":16,"employee_id":"668397107-2","first_name":"Elana","last_name":"Fontel","email":"efontelf@ox.ac.uk","phone":"295-591-0290","gender":"Female","department":"Legal","address":"6 Lyons Alley","hire_date":"2/23/2018","website":"http://amazon.co.uk","notes":"in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis","status":1,"type":2,"salary":"$557.74"},
            {"id":17,"employee_id":"633477701-7","first_name":"Martyn","last_name":"Palethorpe","email":"mpalethorpeg@hhs.gov","phone":"602-830-1929","gender":"Male","department":"Human Resources","address":"82 Johnson Trail","hire_date":"6/11/2018","website":"http://domainmarket.com","notes":"metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque","status":4,"type":3,"salary":"$692.98"},
            {"id":18,"employee_id":"649247266-7","first_name":"Banky","last_name":"Scrafton","email":"bscraftonh@rakuten.co.jp","phone":"582-430-5651","gender":"Male","department":"Business Development","address":"9931 Charing Cross Road","hire_date":"10/8/2017","website":"http://com.com","notes":"morbi odio odio elementum eu interdum eu tincidunt in leo","status":3,"type":2,"salary":"$2251.69"},
            {"id":19,"employee_id":"353134888-4","first_name":"Carl","last_name":"Cartlidge","email":"ccartlidgei@topsy.com","phone":"788-594-5978","gender":"Male","department":"Support","address":"01023 Loftsgordon Court","hire_date":"6/10/2018","website":"https://w3.org","notes":"montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis","status":5,"type":2,"salary":"$1098.95"},
            {"id":20,"employee_id":"217229894-8","first_name":"Cecil","last_name":"Dovidaitis","email":"cdovidaitisj@friendfeed.com","phone":"871-276-5383","gender":"Male","department":"Accounting","address":"47936 Park Meadow Place","hire_date":"10/19/2017","website":"http://archive.org","notes":"interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien","status":5,"type":1,"salary":"$2023.29"},
            {"id":21,"employee_id":"502127380-9","first_name":"Charlene","last_name":"Pulsford","email":"cpulsfordk@google.es","phone":"334-897-8875","gender":"Female","department":"Support","address":"0622 Ronald Regan Junction","hire_date":"5/1/2018","website":"http://forbes.com","notes":"ipsum dolor sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit","status":5,"type":1,"salary":"$2125.68"},
            {"id":22,"employee_id":"954387630-4","first_name":"Agnes","last_name":"Eslinger","email":"aeslingerl@ucsd.edu","phone":"127-200-2804","gender":"Female","department":"Engineering","address":"1372 John Wall Terrace","hire_date":"1/6/2018","website":"http://pagesperso-orange.fr","notes":"diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus","status":1,"type":3,"salary":"$429.41"},
            {"id":23,"employee_id":"332655163-0","first_name":"Felic","last_name":"Mathiasen","email":"fmathiasenm@pagesperso-orange.fr","phone":"563-844-1190","gender":"Male","department":"Business Development","address":"9416 Little Fleur Pass","hire_date":"10/21/2017","website":"http://feedburner.com","notes":"fusce congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed augue aliquam","status":1,"type":3,"salary":"$1501.00"},
            {"id":24,"employee_id":"281704570-X","first_name":"Stephani","last_name":"Rowell","email":"srowelln@ucla.edu","phone":"159-771-9442","gender":"Female","department":"Training","address":"10 Aberg Circle","hire_date":"2/13/2018","website":"http://nydailynews.com","notes":"vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin","status":2,"type":2,"salary":"$637.61"},
            {"id":25,"employee_id":"757531800-3","first_name":"Jackson","last_name":"Kettlestring","email":"jkettlestringo@prnewswire.com","phone":"411-365-5414","gender":"Male","department":"Marketing","address":"0 Dorton Plaza","hire_date":"12/15/2017","website":"http://fda.gov","notes":"purus phasellus in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat","status":5,"type":3,"salary":"$1777.79"},
            {"id":26,"employee_id":"687935758-X","first_name":"Marius","last_name":"Bembrick","email":"mbembrickp@jigsy.com","phone":"386-209-3865","gender":"Male","department":"Research and Development","address":"6 Nancy Plaza","hire_date":"9/4/2017","website":"https://apple.com","notes":"orci luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a feugiat","status":1,"type":1,"salary":"$508.32"},
            {"id":27,"employee_id":"676433511-7","first_name":"Darnell","last_name":"Edes","email":"dedesq@surveymonkey.com","phone":"500-702-1594","gender":"Male","department":"Support","address":"373 Maryland Drive","hire_date":"12/10/2017","website":"http://walmart.com","notes":"euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc","status":6,"type":3,"salary":"$2139.18"},
            {"id":28,"employee_id":"336040872-1","first_name":"Margaux","last_name":"O'Feeny","email":"mofeenyr@amazon.co.jp","phone":"114-808-0574","gender":"Female","department":"Support","address":"59849 Packers Point","hire_date":"9/21/2017","website":"http://tmall.com","notes":"at nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem","status":1,"type":3,"salary":"$909.79"},
            {"id":29,"employee_id":"736038403-6","first_name":"Ly","last_name":"Blaszkiewicz","email":"lblaszkiewiczs@live.com","phone":"193-583-6061","gender":"Male","department":"Research and Development","address":"8 Prentice Place","hire_date":"6/18/2018","website":"https://prweb.com","notes":"purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in","status":5,"type":1,"salary":"$1789.96"},
            {"id":30,"employee_id":"599372101-4","first_name":"Dayle","last_name":"Rablin","email":"drablint@jugem.jp","phone":"639-124-8424","gender":"Female","department":"Services","address":"35 Kenwood Point","hire_date":"6/30/2018","website":"https://csmonitor.com","notes":"vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante","status":3,"type":1,"salary":"$1594.26"},
            {"id":31,"employee_id":"306503794-7","first_name":"Jaquenette","last_name":"Laurence","email":"jlaurenceu@topsy.com","phone":"809-291-9012","gender":"Female","department":"Product Management","address":"1 Holy Cross Circle","hire_date":"5/15/2018","website":"http://cornell.edu","notes":"turpis a pede posuere nonummy integer non velit donec diam neque vestibulum","status":3,"type":1,"salary":"$541.85"},
            {"id":32,"employee_id":"708872496-0","first_name":"Bryn","last_name":"Gaukrodge","email":"bgaukrodgev@1688.com","phone":"197-490-4415","gender":"Male","department":"Product Management","address":"88036 Springs Center","hire_date":"3/12/2018","website":"https://bing.com","notes":"lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque","status":3,"type":3,"salary":"$1433.56"},
            {"id":33,"employee_id":"820772036-0","first_name":"Quintina","last_name":"Tromans","email":"qtromansw@t.co","phone":"150-592-4259","gender":"Female","department":"Business Development","address":"503 Grim Junction","hire_date":"1/30/2018","website":"https://dagondesign.com","notes":"nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti","status":4,"type":2,"salary":"$1763.79"},
            {"id":34,"employee_id":"306191423-4","first_name":"North","last_name":"Linforth","email":"nlinforthx@devhub.com","phone":"311-987-2066","gender":"Male","department":"Human Resources","address":"46 Spenser Drive","hire_date":"6/16/2018","website":"https://delicious.com","notes":"mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec","status":6,"type":3,"salary":"$1598.27"},
            {"id":35,"employee_id":"896478886-9","first_name":"Abbie","last_name":"Clampe","email":"aclampey@ameblo.jp","phone":"829-922-0897","gender":"Female","department":"Services","address":"0 Alpine Pass","hire_date":"10/31/2017","website":"http://nationalgeographic.com","notes":"sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est","status":3,"type":2,"salary":"$918.46"},
            {"id":36,"employee_id":"345166971-4","first_name":"Ivonne","last_name":"Benstead","email":"ibensteadz@ftc.gov","phone":"239-904-6612","gender":"Female","department":"Human Resources","address":"32 Utah Avenue","hire_date":"3/27/2018","website":"http://sitemeter.com","notes":"curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend","status":6,"type":3,"salary":"$939.94"},
            {"id":37,"employee_id":"271776454-2","first_name":"Brennen","last_name":"Duplain","email":"bduplain10@paginegialle.it","phone":"847-233-6429","gender":"Male","department":"Support","address":"64832 Sutherland Avenue","hire_date":"10/25/2017","website":"http://goo.gl","notes":"donec posuere metus vitae ipsum aliquam non mauris morbi non","status":1,"type":2,"salary":"$2153.00"},
            {"id":38,"employee_id":"159362791-2","first_name":"Floris","last_name":"Rowntree","email":"frowntree11@goodreads.com","phone":"145-701-7289","gender":"Female","department":"Human Resources","address":"1 Prairieview Terrace","hire_date":"1/22/2018","website":"https://wordpress.com","notes":"sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat","status":1,"type":2,"salary":"$1469.21"},
            {"id":39,"employee_id":"591823535-3","first_name":"Arlette","last_name":"Neumann","email":"aneumann12@google.it","phone":"626-427-8715","gender":"Female","department":"Legal","address":"5 Comanche Terrace","hire_date":"9/15/2017","website":"https://drupal.org","notes":"cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum","status":3,"type":1,"salary":"$2285.73"},
            {"id":40,"employee_id":"760095255-6","first_name":"Jasper","last_name":"Blennerhassett","email":"jblennerhassett13@ovh.net","phone":"493-589-6952","gender":"Male","department":"Services","address":"48770 Hansons Center","hire_date":"6/3/2018","website":"http://imdb.com","notes":"integer tincidunt ante vel ipsum praesent blandit lacinia erat vestibulum sed magna","status":3,"type":3,"salary":"$1261.12"},
            {"id":41,"employee_id":"293876593-2","first_name":"Daniela","last_name":"Cauley","email":"dcauley14@si.edu","phone":"913-991-1546","gender":"Female","department":"Training","address":"327 Waubesa Pass","hire_date":"2/13/2018","website":"https://techcrunch.com","notes":"accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a","status":5,"type":3,"salary":"$1354.71"},
            {"id":42,"employee_id":"754195998-7","first_name":"Allsun","last_name":"Cosin","email":"acosin15@seattletimes.com","phone":"890-332-0597","gender":"Female","department":"Business Development","address":"19242 Forest Dale Avenue","hire_date":"10/8/2017","website":"http://yellowbook.com","notes":"eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis","status":1,"type":1,"salary":"$463.81"},
            {"id":43,"employee_id":"874856299-8","first_name":"Shalne","last_name":"Abramow","email":"sabramow16@1688.com","phone":"859-996-2703","gender":"Female","department":"Support","address":"678 Cardinal Trail","hire_date":"10/22/2017","website":"http://meetup.com","notes":"mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis","status":3,"type":3,"salary":"$2143.95"},
            {"id":44,"employee_id":"274796603-8","first_name":"Britt","last_name":"Brameld","email":"bbrameld17@wiley.com","phone":"844-159-2313","gender":"Female","department":"Business Development","address":"01741 Truax Way","hire_date":"7/12/2018","website":"https://digg.com","notes":"a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id","status":2,"type":1,"salary":"$2400.44"},
            {"id":45,"employee_id":"383491864-4","first_name":"Tammy","last_name":"Cordrey","email":"tcordrey18@photobucket.com","phone":"609-503-1223","gender":"Male","department":"Training","address":"3 Leroy Junction","hire_date":"8/6/2017","website":"https://aol.com","notes":"sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus","status":5,"type":2,"salary":"$1838.70"},
            {"id":46,"employee_id":"981710394-3","first_name":"Vanya","last_name":"Stygall","email":"vstygall19@comsenz.com","phone":"347-830-1157","gender":"Female","department":"Sales","address":"49 Twin Pines Alley","hire_date":"2/23/2018","website":"https://istockphoto.com","notes":"quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus","status":4,"type":1,"salary":"$1612.69"},
            {"id":47,"employee_id":"859972565-3","first_name":"Ilene","last_name":"Longden","email":"ilongden1a@seesaa.net","phone":"367-599-8104","gender":"Female","department":"Research and Development","address":"3317 Chinook Drive","hire_date":"4/16/2018","website":"http://time.com","notes":"condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo","status":3,"type":3,"salary":"$377.64"},
            {"id":48,"employee_id":"969985171-6","first_name":"Chrysler","last_name":"Havick","email":"chavick1b@reference.com","phone":"878-108-5011","gender":"Female","department":"Accounting","address":"0 Buena Vista Crossing","hire_date":"11/18/2017","website":"https://weather.com","notes":"odio cras mi pede malesuada in imperdiet et commodo vulputate justo in","status":1,"type":3,"salary":"$778.85"},
            {"id":49,"employee_id":"216013804-5","first_name":"Fifine","last_name":"Haggus","email":"fhaggus1c@oaic.gov.au","phone":"633-912-8346","gender":"Female","department":"Research and Development","address":"520 Tomscot Avenue","hire_date":"6/18/2018","website":"https://mozilla.org","notes":"vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in","status":5,"type":1,"salary":"$635.37"},
            {"id":50,"employee_id":"966655811-4","first_name":"Ali","last_name":"Chue","email":"achue1d@vkontakte.ru","phone":"605-172-0203","gender":"Male","department":"Business Development","address":"0 Lyons Pass","hire_date":"8/2/2017","website":"http://springer.com","notes":"volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat","status":4,"type":2,"salary":"$2110.01"},
            {"id":51,"employee_id":"861821671-2","first_name":"Celene","last_name":"Ledes","email":"cledes1e@opera.com","phone":"271-211-2956","gender":"Female","department":"Services","address":"9 Manley Terrace","hire_date":"4/27/2018","website":"http://4shared.com","notes":"libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum","status":3,"type":2,"salary":"$996.88"},
            {"id":52,"employee_id":"416647881-8","first_name":"Luciano","last_name":"Lighterness","email":"llighterness1f@bizjournals.com","phone":"808-427-6621","gender":"Male","department":"Sales","address":"1 Bluejay Plaza","hire_date":"1/30/2018","website":"http://hud.gov","notes":"sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed interdum venenatis turpis enim blandit mi","status":4,"type":2,"salary":"$2194.47"},
            {"id":53,"employee_id":"716498565-0","first_name":"Oren","last_name":"Rixon","email":"orixon1g@paypal.com","phone":"640-688-8978","gender":"Male","department":"Research and Development","address":"03588 Randy Circle","hire_date":"12/16/2017","website":"http://tripod.com","notes":"sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis","status":4,"type":1,"salary":"$1590.74"},
            {"id":54,"employee_id":"846826707-4","first_name":"Pearce","last_name":"Stark","email":"pstark1h@vk.com","phone":"724-173-2759","gender":"Male","department":"Marketing","address":"9134 Del Mar Alley","hire_date":"6/6/2018","website":"http://wp.com","notes":"fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget","status":1,"type":3,"salary":"$369.47"},
            {"id":55,"employee_id":"817466406-8","first_name":"Paco","last_name":"Halden","email":"phalden1i@cbsnews.com","phone":"142-137-8107","gender":"Male","department":"Training","address":"9 Pennsylvania Place","hire_date":"3/31/2018","website":"http://gov.uk","notes":"ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla","status":6,"type":3,"salary":"$644.30"},
            {"id":56,"employee_id":"486286979-3","first_name":"Merissa","last_name":"Tindle","email":"mtindle1j@sina.com.cn","phone":"645-520-7142","gender":"Female","department":"Sales","address":"672 Onsgard Way","hire_date":"4/4/2018","website":"http://oracle.com","notes":"id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras","status":5,"type":2,"salary":"$1821.01"},
            {"id":57,"employee_id":"165434032-4","first_name":"Montague","last_name":"Coventon","email":"mcoventon1k@sbwire.com","phone":"933-259-7571","gender":"Male","department":"Training","address":"8 Lakeland Court","hire_date":"8/14/2017","website":"https://geocities.com","notes":"ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac","status":5,"type":3,"salary":"$1533.95"},
            {"id":58,"employee_id":"154965026-2","first_name":"Kristel","last_name":"La Croce","email":"klacroce1l@noaa.gov","phone":"405-768-8955","gender":"Female","department":"Services","address":"630 Marcy Drive","hire_date":"10/17/2017","website":"http://ucsd.edu","notes":"vivamus in felis eu sapien cursus vestibulum proin eu mi nulla","status":6,"type":1,"salary":"$572.43"},
            {"id":59,"employee_id":"531973169-8","first_name":"Felecia","last_name":"Aishford","email":"faishford1m@surveymonkey.com","phone":"308-335-5646","gender":"Female","department":"Marketing","address":"4169 Spenser Lane","hire_date":"1/14/2018","website":"https://accuweather.com","notes":"vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula","status":2,"type":2,"salary":"$535.61"},
            {"id":60,"employee_id":"398015522-6","first_name":"Gabbey","last_name":"Faunch","email":"gfaunch1n@lulu.com","phone":"312-420-7864","gender":"Female","department":"Marketing","address":"66 Del Sol Crossing","hire_date":"10/12/2017","website":"https://tinypic.com","notes":"vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec","status":5,"type":3,"salary":"$454.67"},
            {"id":61,"employee_id":"811193945-0","first_name":"Kiah","last_name":"MacGragh","email":"kmacgragh1o@nih.gov","phone":"585-387-4897","gender":"Female","department":"Accounting","address":"0082 8th Street","hire_date":"10/21/2017","website":"http://unblog.fr","notes":"turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at turpis a","status":3,"type":1,"salary":"$1998.31"},
            {"id":62,"employee_id":"768660578-7","first_name":"Mireielle","last_name":"Danilishin","email":"mdanilishin1p@go.com","phone":"772-806-1933","gender":"Female","department":"Support","address":"9475 Transport Pass","hire_date":"8/12/2017","website":"https://i2i.jp","notes":"elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit","status":1,"type":3,"salary":"$332.09"},
            {"id":63,"employee_id":"087657628-5","first_name":"Kaitlin","last_name":"Slowley","email":"kslowley1q@etsy.com","phone":"857-196-0908","gender":"Female","department":"Product Management","address":"136 Harbort Way","hire_date":"6/28/2018","website":"https://umn.edu","notes":"eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum","status":6,"type":2,"salary":"$2008.41"},
            {"id":64,"employee_id":"247247211-0","first_name":"Ellissa","last_name":"Bench","email":"ebench1r@issuu.com","phone":"770-716-1929","gender":"Female","department":"Support","address":"07536 Atwood Street","hire_date":"1/17/2018","website":"https://goo.gl","notes":"egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla","status":3,"type":1,"salary":"$662.94"},
            {"id":65,"employee_id":"229767685-9","first_name":"Renato","last_name":"Loftie","email":"rloftie1s@photobucket.com","phone":"806-232-0956","gender":"Male","department":"Legal","address":"49603 Hanover Drive","hire_date":"9/4/2017","website":"https://apache.org","notes":"nunc proin at turpis a pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel","status":5,"type":1,"salary":"$315.88"},
            {"id":66,"employee_id":"303250444-9","first_name":"Eamon","last_name":"Chater","email":"echater1t@github.io","phone":"843-377-6351","gender":"Male","department":"Support","address":"1 Gina Lane","hire_date":"6/27/2018","website":"https://bravesites.com","notes":"id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat","status":6,"type":2,"salary":"$575.88"},
            {"id":67,"employee_id":"118110309-6","first_name":"Jeramey","last_name":"Guye","email":"jguye1u@bloglines.com","phone":"966-388-3378","gender":"Male","department":"Research and Development","address":"7141 Forest Dale Plaza","hire_date":"5/13/2018","website":"http://blogspot.com","notes":"habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur","status":4,"type":1,"salary":"$883.94"},
            {"id":68,"employee_id":"604717575-9","first_name":"Ermentrude","last_name":"Caygill","email":"ecaygill1v@posterous.com","phone":"325-412-1846","gender":"Female","department":"Research and Development","address":"8 Vahlen Road","hire_date":"8/23/2017","website":"http://pinterest.com","notes":"vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci","status":4,"type":2,"salary":"$1261.05"},
            {"id":69,"employee_id":"354395696-5","first_name":"Tyler","last_name":"Bearward","email":"tbearward1w@stanford.edu","phone":"264-480-4084","gender":"Male","department":"Engineering","address":"0 Oakridge Pass","hire_date":"9/23/2017","website":"http://toplist.cz","notes":"tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra","status":2,"type":2,"salary":"$1916.86"},
            {"id":70,"employee_id":"448117293-2","first_name":"Cordelia","last_name":"Dod","email":"cdod1x@google.nl","phone":"904-991-9112","gender":"Female","department":"Services","address":"1 Oak Trail","hire_date":"5/19/2018","website":"http://nifty.com","notes":"at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget orci","status":2,"type":1,"salary":"$728.99"},
            {"id":71,"employee_id":"078622063-5","first_name":"Jud","last_name":"Hugonnet","email":"jhugonnet1y@bravesites.com","phone":"793-605-5368","gender":"Male","department":"Human Resources","address":"2 Blue Bill Park Crossing","hire_date":"3/5/2018","website":"http://theatlantic.com","notes":"rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus","status":4,"type":3,"salary":"$1122.09"},
            {"id":72,"employee_id":"177821412-6","first_name":"Bliss","last_name":"Wormell","email":"bwormell1z@google.es","phone":"923-926-7137","gender":"Female","department":"Services","address":"97487 Vernon Way","hire_date":"2/9/2018","website":"https://slashdot.org","notes":"turpis a pede posuere nonummy integer non velit donec diam neque vestibulum","status":6,"type":3,"salary":"$1325.37"},
            {"id":73,"employee_id":"167412899-1","first_name":"Pennie","last_name":"Miles","email":"pmiles20@wikipedia.org","phone":"402-175-4814","gender":"Female","department":"Accounting","address":"25 Calypso Street","hire_date":"8/25/2017","website":"https://networkadvertising.org","notes":"orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet","status":3,"type":1,"salary":"$1857.52"},
            {"id":74,"employee_id":"766232726-4","first_name":"Alethea","last_name":"Kubis","email":"akubis21@nytimes.com","phone":"195-533-0554","gender":"Female","department":"Research and Development","address":"7 Badeau Junction","hire_date":"12/20/2017","website":"https://columbia.edu","notes":"congue diam id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu","status":2,"type":1,"salary":"$1731.13"},
            {"id":75,"employee_id":"148106817-2","first_name":"Niven","last_name":"Leckey","email":"nleckey22@rediff.com","phone":"419-694-8836","gender":"Male","department":"Research and Development","address":"41429 Texas Pass","hire_date":"8/22/2017","website":"https://chron.com","notes":"maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque volutpat","status":2,"type":3,"salary":"$835.59"},
            {"id":76,"employee_id":"218188716-0","first_name":"Gav","last_name":"Denkin","email":"gdenkin23@phoca.cz","phone":"109-349-2084","gender":"Male","department":"Product Management","address":"866 Vermont Parkway","hire_date":"12/27/2017","website":"https://nytimes.com","notes":"eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris","status":1,"type":1,"salary":"$2271.20"},
            {"id":77,"employee_id":"949856193-1","first_name":"Haroun","last_name":"McDermott","email":"hmcdermott24@gnu.org","phone":"650-332-8136","gender":"Male","department":"Legal","address":"18 Farragut Junction","hire_date":"1/12/2018","website":"https://techcrunch.com","notes":"orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet","status":3,"type":1,"salary":"$555.57"},
            {"id":78,"employee_id":"816956055-1","first_name":"Enrico","last_name":"Marzelli","email":"emarzelli25@elegantthemes.com","phone":"931-285-9268","gender":"Male","department":"Services","address":"8 Stephen Center","hire_date":"7/16/2018","website":"https://cyberchimps.com","notes":"dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut nunc","status":2,"type":2,"salary":"$820.63"},
            {"id":79,"employee_id":"135814107-X","first_name":"Shermy","last_name":"Tersay","email":"stersay26@scientificamerican.com","phone":"459-559-9053","gender":"Male","department":"Engineering","address":"280 Muir Trail","hire_date":"8/31/2017","website":"https://facebook.com","notes":"sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus","status":3,"type":1,"salary":"$314.22"},
            {"id":80,"employee_id":"214238400-5","first_name":"Kimberley","last_name":"Slorach","email":"kslorach27@ovh.net","phone":"408-346-4135","gender":"Female","department":"Legal","address":"33408 Dryden Center","hire_date":"4/18/2018","website":"https://live.com","notes":"congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus","status":2,"type":3,"salary":"$1960.21"},
            {"id":81,"employee_id":"364281767-X","first_name":"Shirlee","last_name":"Heugel","email":"sheugel28@jiathis.com","phone":"823-228-8386","gender":"Female","department":"Research and Development","address":"4825 Autumn Leaf Junction","hire_date":"7/26/2017","website":"http://goodreads.com","notes":"est lacinia nisi venenatis tristique fusce congue diam id ornare","status":6,"type":1,"salary":"$1122.94"},
            {"id":82,"employee_id":"197212989-9","first_name":"Lazar","last_name":"Fryatt","email":"lfryatt29@smugmug.com","phone":"529-726-0197","gender":"Male","department":"Business Development","address":"7434 Stephen Park","hire_date":"5/5/2018","website":"http://businessinsider.com","notes":"risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante","status":2,"type":2,"salary":"$1950.44"},
            {"id":83,"employee_id":"184011545-9","first_name":"Ainslie","last_name":"Dobbings","email":"adobbings2a@newsvine.com","phone":"543-769-3230","gender":"Female","department":"Accounting","address":"9670 Parkside Way","hire_date":"5/18/2018","website":"https://seattletimes.com","notes":"facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla","status":5,"type":3,"salary":"$1025.26"},
            {"id":84,"employee_id":"550071613-1","first_name":"Nola","last_name":"Dolder","email":"ndolder2b@nationalgeographic.com","phone":"660-563-6589","gender":"Female","department":"Sales","address":"41 Harper Trail","hire_date":"11/7/2017","website":"http://intel.com","notes":"donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat","status":4,"type":3,"salary":"$658.49"},
            {"id":85,"employee_id":"549482172-2","first_name":"Stacy","last_name":"Flanaghan","email":"sflanaghan2c@prlog.org","phone":"803-731-1786","gender":"Female","department":"Sales","address":"9884 Carberry Terrace","hire_date":"3/30/2018","website":"https://dropbox.com","notes":"sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum","status":2,"type":3,"salary":"$2020.80"},
            {"id":86,"employee_id":"367901888-6","first_name":"Uri","last_name":"Langdridge","email":"ulangdridge2d@sciencedaily.com","phone":"514-481-8237","gender":"Male","department":"Research and Development","address":"1873 Sunnyside Circle","hire_date":"3/25/2018","website":"https://hubpages.com","notes":"vestibulum sit amet cursus id turpis integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan","status":6,"type":3,"salary":"$369.40"},
            {"id":87,"employee_id":"131679327-3","first_name":"Magdalena","last_name":"Rivelin","email":"mrivelin2e@123-reg.co.uk","phone":"475-989-2264","gender":"Female","department":"Engineering","address":"11 Pleasure Terrace","hire_date":"7/26/2017","website":"https://photobucket.com","notes":"justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse","status":1,"type":3,"salary":"$802.14"},
            {"id":88,"employee_id":"962685709-9","first_name":"Seana","last_name":"Lackeye","email":"slackeye2f@w3.org","phone":"870-403-9921","gender":"Female","department":"Engineering","address":"1688 Northland Lane","hire_date":"7/8/2018","website":"https://topsy.com","notes":"turpis a pede posuere nonummy integer non velit donec diam neque vestibulum","status":3,"type":3,"salary":"$639.17"},
            {"id":89,"employee_id":"031798299-0","first_name":"Marshal","last_name":"Kelf","email":"mkelf2g@vkontakte.ru","phone":"680-707-7861","gender":"Male","department":"Accounting","address":"87835 Kropf Circle","hire_date":"1/21/2018","website":"https://mit.edu","notes":"nulla quisque arcu libero rutrum ac lobortis vel dapibus at","status":1,"type":1,"salary":"$1644.11"},
            {"id":90,"employee_id":"666187814-2","first_name":"Olag","last_name":"Suffield","email":"osuffield2h@topsy.com","phone":"920-122-4995","gender":"Male","department":"Human Resources","address":"00792 Buhler Place","hire_date":"5/5/2018","website":"https://hubpages.com","notes":"sed tincidunt eu felis fusce posuere felis sed lacus morbi","status":3,"type":1,"salary":"$1405.49"},
            {"id":91,"employee_id":"972507663-X","first_name":"Andy","last_name":"Elgram","email":"aelgram2i@utexas.edu","phone":"198-157-8848","gender":"Female","department":"Support","address":"42 Garrison Point","hire_date":"10/1/2017","website":"http://mapy.cz","notes":"nam dui proin leo odio porttitor id consequat in consequat ut nulla sed accumsan felis","status":5,"type":2,"salary":"$684.75"},
            {"id":92,"employee_id":"950510229-1","first_name":"Lennard","last_name":"Amberson","email":"lamberson2j@artisteer.com","phone":"611-164-2821","gender":"Male","department":"Engineering","address":"5985 Merry Drive","hire_date":"10/7/2017","website":"http://mysql.com","notes":"donec posuere metus vitae ipsum aliquam non mauris morbi non","status":2,"type":1,"salary":"$1537.93"},
            {"id":93,"employee_id":"391601599-0","first_name":"Lucina","last_name":"Sinclaire","email":"lsinclaire2k@sitemeter.com","phone":"900-419-3471","gender":"Female","department":"Research and Development","address":"1 Mallard Court","hire_date":"12/19/2017","website":"http://woothemes.com","notes":"curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non","status":4,"type":2,"salary":"$1682.97"},
            {"id":94,"employee_id":"780789784-8","first_name":"Zilvia","last_name":"Hessing","email":"zhessing2l@ca.gov","phone":"786-487-2292","gender":"Female","department":"Training","address":"8 Hanover Trail","hire_date":"4/11/2018","website":"http://hhs.gov","notes":"in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam","status":2,"type":1,"salary":"$1264.21"},
            {"id":95,"employee_id":"154091500-X","first_name":"Randie","last_name":"Duplan","email":"rduplan2m@ox.ac.uk","phone":"254-881-3750","gender":"Female","department":"Human Resources","address":"7 Gerald Alley","hire_date":"1/27/2018","website":"https://slideshare.net","notes":"ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a","status":4,"type":3,"salary":"$1338.17"},
            {"id":96,"employee_id":"269765014-8","first_name":"Rose","last_name":"Luter","email":"rluter2n@marketplace.net","phone":"960-532-6752","gender":"Female","department":"Research and Development","address":"99 Tony Drive","hire_date":"8/19/2017","website":"https://marriott.com","notes":"sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi","status":1,"type":1,"salary":"$1901.64"},
            {"id":97,"employee_id":"985484449-8","first_name":"Carmencita","last_name":"Burdis","email":"cburdis2o@comcast.net","phone":"636-450-6253","gender":"Female","department":"Product Management","address":"976 Fieldstone Terrace","hire_date":"3/2/2018","website":"https://google.ru","notes":"amet sapien dignissim vestibulum vestibulum ante ipsum primis in faucibus","status":3,"type":3,"salary":"$1799.42"},
            {"id":98,"employee_id":"803354276-4","first_name":"Martguerita","last_name":"Buckerfield","email":"mbuckerfield2p@businessinsider.com","phone":"994-400-4021","gender":"Female","department":"Research and Development","address":"92 Ridge Oak Terrace","hire_date":"6/13/2018","website":"http://wordpress.org","notes":"sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum","status":1,"type":1,"salary":"$677.13"},
            {"id":99,"employee_id":"326728049-4","first_name":"Lorene","last_name":"Biffen","email":"lbiffen2q@bbb.org","phone":"638-745-7652","gender":"Female","department":"Support","address":"46 Alpine Road","hire_date":"3/29/2018","website":"http://ucoz.ru","notes":"integer aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus","status":2,"type":3,"salary":"$899.25"},
            {"id":100,"employee_id":"607725913-6","first_name":"Magdaia","last_name":"Nickels","email":"mnickels2r@edublogs.org","phone":"546-128-7946","gender":"Female","department":"Services","address":"0 Schiller Pass","hire_date":"3/27/2018","website":"http://networksolutions.com","notes":"scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis","status":6,"type":3,"salary":"$1578.12"},
            {"id":101,"employee_id":"972393712-3","first_name":"Deloria","last_name":"Bamfield","email":"dbamfield2s@nbcnews.com","phone":"470-379-7670","gender":"Female","department":"Accounting","address":"8 Sundown Way","hire_date":"12/20/2017","website":"https://multiply.com","notes":"diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu","status":1,"type":2,"salary":"$1657.96"},
            {"id":102,"employee_id":"885692265-7","first_name":"Aime","last_name":"Wiggins","email":"awiggins2t@de.vu","phone":"517-672-9432","gender":"Female","department":"Legal","address":"687 Oak Trail","hire_date":"8/12/2017","website":"http://alibaba.com","notes":"primis in faucibus orci luctus et ultrices posuere cubilia curae","status":5,"type":3,"salary":"$595.54"},
            {"id":103,"employee_id":"261177042-5","first_name":"Luz","last_name":"Leuren","email":"lleuren2u@php.net","phone":"944-752-0631","gender":"Female","department":"Sales","address":"870 Holmberg Terrace","hire_date":"1/2/2018","website":"https://un.org","notes":"fermentum donec ut mauris eget massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque","status":1,"type":1,"salary":"$1431.61"},
            {"id":104,"employee_id":"705056567-9","first_name":"Herminia","last_name":"Vint","email":"hvint2v@addthis.com","phone":"215-746-1315","gender":"Female","department":"Product Management","address":"2 Jay Point","hire_date":"8/21/2017","website":"http://macromedia.com","notes":"faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam","status":5,"type":1,"salary":"$925.04"},
            {"id":105,"employee_id":"499919735-9","first_name":"Julita","last_name":"Durie","email":"jdurie2w@guardian.co.uk","phone":"476-162-6690","gender":"Female","department":"Engineering","address":"63 Arapahoe Street","hire_date":"5/19/2018","website":"http://istockphoto.com","notes":"sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus","status":5,"type":3,"salary":"$983.78"},
            {"id":106,"employee_id":"513095556-0","first_name":"Saleem","last_name":"Montel","email":"smontel2x@people.com.cn","phone":"228-261-6358","gender":"Male","department":"Training","address":"86472 Commercial Hill","hire_date":"3/4/2018","website":"https://hp.com","notes":"neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio","status":2,"type":2,"salary":"$280.05"},
            {"id":107,"employee_id":"510722692-2","first_name":"Jecho","last_name":"Grayshon","email":"jgrayshon2y@loc.gov","phone":"698-125-3058","gender":"Male","department":"Engineering","address":"4 Norway Maple Pass","hire_date":"5/23/2018","website":"https://wordpress.com","notes":"quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi","status":2,"type":1,"salary":"$765.18"},
            {"id":108,"employee_id":"950399045-9","first_name":"Joaquin","last_name":"Drakeford","email":"jdrakeford2z@census.gov","phone":"394-664-8952","gender":"Male","department":"Sales","address":"2885 Banding Street","hire_date":"9/16/2017","website":"https://indiatimes.com","notes":"integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem","status":4,"type":1,"salary":"$1887.22"},
            {"id":109,"employee_id":"128592509-2","first_name":"Alvina","last_name":"Robiou","email":"arobiou30@meetup.com","phone":"276-927-2841","gender":"Female","department":"Services","address":"3709 Sunfield Alley","hire_date":"7/30/2017","website":"https://state.tx.us","notes":"non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra","status":5,"type":3,"salary":"$2197.02"},
            {"id":110,"employee_id":"641762765-9","first_name":"Kimberly","last_name":"Blewmen","email":"kblewmen31@xrea.com","phone":"993-555-5822","gender":"Female","department":"Support","address":"841 Spenser Trail","hire_date":"3/11/2018","website":"http://economist.com","notes":"et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere","status":4,"type":3,"salary":"$1403.80"},
            {"id":111,"employee_id":"743230811-X","first_name":"Germain","last_name":"Liddell","email":"gliddell32@usda.gov","phone":"210-527-0995","gender":"Male","department":"Business Development","address":"273 Gale Hill","hire_date":"3/12/2018","website":"https://netscape.com","notes":"ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis","status":4,"type":2,"salary":"$1841.60"},
            {"id":112,"employee_id":"280357534-5","first_name":"Wittie","last_name":"Crothers","email":"wcrothers33@bbc.co.uk","phone":"595-268-1541","gender":"Male","department":"Accounting","address":"0615 8th Hill","hire_date":"8/29/2017","website":"https://issuu.com","notes":"quam a odio in hac habitasse platea dictumst maecenas ut massa","status":6,"type":3,"salary":"$2349.82"},
            {"id":113,"employee_id":"297744337-1","first_name":"Ruth","last_name":"Moxon","email":"rmoxon34@blog.com","phone":"311-809-6177","gender":"Female","department":"Support","address":"71749 Esker Crossing","hire_date":"9/8/2017","website":"https://tiny.cc","notes":"nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta","status":1,"type":1,"salary":"$2469.12"},
            {"id":114,"employee_id":"627965147-9","first_name":"Shaw","last_name":"Jeafferson","email":"sjeafferson35@dedecms.com","phone":"402-419-6081","gender":"Male","department":"Training","address":"28 Kropf Lane","hire_date":"9/16/2017","website":"https://amazon.co.jp","notes":"urna ut tellus nulla ut erat id mauris vulputate elementum nullam","status":2,"type":1,"salary":"$725.96"},
            {"id":115,"employee_id":"200221976-1","first_name":"Stern","last_name":"Newbery","email":"snewbery36@berkeley.edu","phone":"592-100-2732","gender":"Male","department":"Product Management","address":"64762 Luster Street","hire_date":"3/7/2018","website":"http://simplemachines.org","notes":"ipsum dolor sit amet consectetuer adipiscing elit proin risus praesent lectus","status":1,"type":2,"salary":"$2391.21"},
            {"id":116,"employee_id":"683010400-9","first_name":"Jeffry","last_name":"Chessil","email":"jchessil37@sogou.com","phone":"350-222-1842","gender":"Male","department":"Human Resources","address":"499 Nelson Lane","hire_date":"8/24/2017","website":"https://marketwatch.com","notes":"sapien placerat ante nulla justo aliquam quis turpis eget elit","status":5,"type":2,"salary":"$1186.46"},
            {"id":117,"employee_id":"492536862-1","first_name":"Darla","last_name":"Letson","email":"dletson38@squarespace.com","phone":"576-354-3003","gender":"Female","department":"Product Management","address":"5237 Division Plaza","hire_date":"10/2/2017","website":"http://networkadvertising.org","notes":"suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris","status":1,"type":2,"salary":"$771.69"},
            {"id":118,"employee_id":"471683625-8","first_name":"Gavra","last_name":"Backhurst","email":"gbackhurst39@tripadvisor.com","phone":"196-599-4507","gender":"Female","department":"Research and Development","address":"07263 Buhler Crossing","hire_date":"6/23/2018","website":"http://altervista.org","notes":"aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse","status":4,"type":3,"salary":"$263.67"},
            {"id":119,"employee_id":"348201330-6","first_name":"Adam","last_name":"Bavridge","email":"abavridge3a@typepad.com","phone":"867-811-3866","gender":"Male","department":"Legal","address":"00 Katie Crossing","hire_date":"7/24/2017","website":"http://friendfeed.com","notes":"maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras","status":2,"type":1,"salary":"$958.84"},
            {"id":120,"employee_id":"738568347-9","first_name":"Hillard","last_name":"Khomich","email":"hkhomich3b@mtv.com","phone":"567-127-1119","gender":"Male","department":"Legal","address":"188 Steensland Point","hire_date":"4/23/2018","website":"http://bloomberg.com","notes":"et commodo vulputate justo in blandit ultrices enim lorem ipsum","status":4,"type":3,"salary":"$314.28"},
            {"id":121,"employee_id":"025483363-2","first_name":"Fiona","last_name":"Bingell","email":"fbingell3c@360.cn","phone":"331-537-3139","gender":"Female","department":"Legal","address":"96 Talisman Park","hire_date":"5/20/2018","website":"http://canalblog.com","notes":"augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id","status":5,"type":3,"salary":"$2374.45"},
            {"id":122,"employee_id":"960974875-9","first_name":"Sigmund","last_name":"Crampsy","email":"scrampsy3d@opera.com","phone":"152-487-2700","gender":"Male","department":"Human Resources","address":"7 Sutherland Street","hire_date":"12/9/2017","website":"https://washingtonpost.com","notes":"montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis dis","status":5,"type":2,"salary":"$332.45"},
            {"id":123,"employee_id":"926752427-5","first_name":"Rasla","last_name":"Middell","email":"rmiddell3e@columbia.edu","phone":"868-976-3698","gender":"Female","department":"Services","address":"2 Gina Hill","hire_date":"11/23/2017","website":"http://timesonline.co.uk","notes":"pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut","status":2,"type":2,"salary":"$1018.57"},
            {"id":124,"employee_id":"806699807-4","first_name":"Iorgo","last_name":"Rigmond","email":"irigmond3f@google.it","phone":"746-546-5211","gender":"Male","department":"Accounting","address":"842 Pearson Pass","hire_date":"9/7/2017","website":"http://digg.com","notes":"luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend","status":3,"type":1,"salary":"$2010.96"},
            {"id":125,"employee_id":"155788341-6","first_name":"Tessa","last_name":"Rohan","email":"trohan3g@cbslocal.com","phone":"630-293-4519","gender":"Female","department":"Product Management","address":"1 Reinke Crossing","hire_date":"12/10/2017","website":"http://google.com","notes":"vestibulum ac est lacinia nisi venenatis tristique fusce congue diam id ornare imperdiet sapien urna pretium nisl","status":3,"type":3,"salary":"$1384.49"},
            {"id":126,"employee_id":"682416426-7","first_name":"Solly","last_name":"Kellet","email":"skellet3h@google.fr","phone":"377-570-8318","gender":"Male","department":"Support","address":"468 Marquette Pass","hire_date":"11/24/2017","website":"https://china.com.cn","notes":"nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum","status":5,"type":1,"salary":"$956.94"},
            {"id":127,"employee_id":"612351588-8","first_name":"Jarret","last_name":"O'Halloran","email":"johalloran3i@indiatimes.com","phone":"154-312-7232","gender":"Male","department":"Support","address":"199 Orin Road","hire_date":"10/20/2017","website":"http://nytimes.com","notes":"elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium","status":5,"type":2,"salary":"$2463.22"},
            {"id":128,"employee_id":"655867342-8","first_name":"Annnora","last_name":"Soles","email":"asoles3j@cafepress.com","phone":"158-251-8502","gender":"Female","department":"Human Resources","address":"59 Fordem Lane","hire_date":"12/15/2017","website":"http://loc.gov","notes":"odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet","status":5,"type":2,"salary":"$859.89"},
            {"id":129,"employee_id":"373591806-9","first_name":"Flory","last_name":"Dabinett","email":"fdabinett3k@cmu.edu","phone":"809-718-7259","gender":"Female","department":"Human Resources","address":"5711 Maywood Parkway","hire_date":"10/28/2017","website":"http://apple.com","notes":"diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere","status":6,"type":3,"salary":"$2060.00"},
            {"id":130,"employee_id":"959199127-4","first_name":"Brigham","last_name":"Winch","email":"bwinch3l@prweb.com","phone":"942-871-6319","gender":"Male","department":"Sales","address":"641 Kings Trail","hire_date":"3/17/2018","website":"http://topsy.com","notes":"non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis","status":4,"type":1,"salary":"$1022.05"},
            {"id":131,"employee_id":"961903930-0","first_name":"Siusan","last_name":"Megahey","email":"smegahey3m@myspace.com","phone":"357-588-1304","gender":"Female","department":"Human Resources","address":"5 Ludington Road","hire_date":"6/22/2018","website":"http://shareasale.com","notes":"tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis","status":2,"type":3,"salary":"$1406.53"},
            {"id":132,"employee_id":"900687666-6","first_name":"Ax","last_name":"Kores","email":"akores3n@tripadvisor.com","phone":"439-825-2783","gender":"Male","department":"Business Development","address":"63271 Pierstorff Crossing","hire_date":"5/14/2018","website":"http://hibu.com","notes":"tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum","status":2,"type":2,"salary":"$1135.64"},
            {"id":133,"employee_id":"466975330-4","first_name":"Sander","last_name":"Chinnick","email":"schinnick3o@cbslocal.com","phone":"374-645-5030","gender":"Male","department":"Accounting","address":"37 Darwin Circle","hire_date":"2/7/2018","website":"http://histats.com","notes":"mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis","status":1,"type":3,"salary":"$381.91"},
            {"id":134,"employee_id":"408416234-5","first_name":"Keir","last_name":"Coulling","email":"kcoulling3p@usa.gov","phone":"118-443-0247","gender":"Male","department":"Legal","address":"4376 Kings Center","hire_date":"10/3/2017","website":"http://omniture.com","notes":"lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id","status":5,"type":2,"salary":"$2378.33"},
            {"id":135,"employee_id":"531987885-0","first_name":"Sid","last_name":"Tenaunt","email":"stenaunt3q@phpbb.com","phone":"295-386-3775","gender":"Male","department":"Sales","address":"222 Blaine Terrace","hire_date":"6/27/2018","website":"http://nationalgeographic.com","notes":"justo etiam pretium iaculis justo in hac habitasse platea dictumst","status":5,"type":1,"salary":"$927.08"},
            {"id":136,"employee_id":"010876438-9","first_name":"Hunfredo","last_name":"Bastone","email":"hbastone3r@gmpg.org","phone":"509-962-4856","gender":"Male","department":"Services","address":"2 Cambridge Terrace","hire_date":"11/22/2017","website":"http://hc360.com","notes":"condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet","status":1,"type":2,"salary":"$1542.99"},
            {"id":137,"employee_id":"673641606-X","first_name":"Virgil","last_name":"Mallabon","email":"vmallabon3s@mysql.com","phone":"412-268-6506","gender":"Male","department":"Business Development","address":"9 Havey Trail","hire_date":"3/26/2018","website":"https://fc2.com","notes":"non mauris morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede venenatis","status":1,"type":2,"salary":"$533.91"},
            {"id":138,"employee_id":"674583602-5","first_name":"Raimund","last_name":"Garthshore","email":"rgarthshore3t@i2i.jp","phone":"690-495-5929","gender":"Male","department":"Support","address":"9 Toban Pass","hire_date":"7/4/2018","website":"https://icq.com","notes":"cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum","status":4,"type":3,"salary":"$1455.67"},
            {"id":139,"employee_id":"669103553-4","first_name":"Velvet","last_name":"Chaffey","email":"vchaffey3u@mit.edu","phone":"751-664-7048","gender":"Female","department":"Human Resources","address":"24 Dexter Avenue","hire_date":"6/29/2018","website":"https://eepurl.com","notes":"sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed","status":6,"type":2,"salary":"$1608.14"},
            {"id":140,"employee_id":"603845266-4","first_name":"Warren","last_name":"Course","email":"wcourse3v@who.int","phone":"714-691-0830","gender":"Male","department":"Research and Development","address":"1 Stoughton Trail","hire_date":"12/7/2017","website":"http://dedecms.com","notes":"ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent","status":2,"type":3,"salary":"$1183.79"},
            {"id":141,"employee_id":"653433959-5","first_name":"Bobina","last_name":"Stroyan","email":"bstroyan3w@spotify.com","phone":"247-343-7540","gender":"Female","department":"Product Management","address":"127 Westerfield Way","hire_date":"8/20/2017","website":"https://unicef.org","notes":"pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo","status":2,"type":2,"salary":"$1289.19"},
            {"id":142,"employee_id":"713131534-6","first_name":"Ulrich","last_name":"Monsey","email":"umonsey3x@google.co.jp","phone":"585-711-5479","gender":"Male","department":"Business Development","address":"638 Birchwood Pass","hire_date":"7/2/2018","website":"http://earthlink.net","notes":"at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet","status":3,"type":3,"salary":"$1350.77"},
            {"id":143,"employee_id":"411238844-6","first_name":"Darrell","last_name":"Kelson","email":"dkelson3y@aol.com","phone":"755-795-2495","gender":"Male","department":"Support","address":"2 Eagan Center","hire_date":"11/1/2017","website":"http://cpanel.net","notes":"vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi","status":6,"type":3,"salary":"$543.19"},
            {"id":144,"employee_id":"341336740-4","first_name":"Brook","last_name":"Temblett","email":"btemblett3z@unesco.org","phone":"985-734-8064","gender":"Male","department":"Marketing","address":"370 Garrison Street","hire_date":"1/16/2018","website":"https://devhub.com","notes":"rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed","status":3,"type":1,"salary":"$354.44"},
            {"id":145,"employee_id":"387002802-5","first_name":"Portia","last_name":"Wybern","email":"pwybern40@example.com","phone":"239-713-0899","gender":"Female","department":"Services","address":"7 Tennessee Point","hire_date":"5/28/2018","website":"http://163.com","notes":"rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis","status":2,"type":1,"salary":"$2208.41"},
            {"id":146,"employee_id":"595244490-3","first_name":"Debi","last_name":"Grady","email":"dgrady41@icio.us","phone":"959-988-3108","gender":"Female","department":"Business Development","address":"18955 Doe Crossing Place","hire_date":"3/10/2018","website":"http://cam.ac.uk","notes":"in felis donec semper sapien a libero nam dui proin leo odio porttitor id consequat in consequat ut","status":4,"type":2,"salary":"$1167.37"},
            {"id":147,"employee_id":"877613651-5","first_name":"Moise","last_name":"Garnson","email":"mgarnson42@dailymail.co.uk","phone":"402-162-8313","gender":"Male","department":"Training","address":"14 Grayhawk Way","hire_date":"2/3/2018","website":"http://t.co","notes":"nulla ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi","status":5,"type":2,"salary":"$2274.95"},
            {"id":148,"employee_id":"057397050-5","first_name":"Val","last_name":"Berthomier","email":"vberthomier43@mozilla.com","phone":"952-537-2739","gender":"Male","department":"Engineering","address":"0 Hanson Junction","hire_date":"2/23/2018","website":"http://smh.com.au","notes":"quam pharetra magna ac consequat metus sapien ut nunc vestibulum ante ipsum primis in","status":3,"type":1,"salary":"$2268.10"},
            {"id":149,"employee_id":"594276612-6","first_name":"Brynn","last_name":"Cosgry","email":"bcosgry44@wikimedia.org","phone":"897-152-4927","gender":"Female","department":"Legal","address":"68483 Bowman Pass","hire_date":"6/11/2018","website":"http://unblog.fr","notes":"elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu adipiscing molestie","status":2,"type":1,"salary":"$304.63"},
            {"id":150,"employee_id":"353613312-6","first_name":"Vitoria","last_name":"Crickmoor","email":"vcrickmoor45@taobao.com","phone":"607-928-5380","gender":"Female","department":"Human Resources","address":"77 Browning Avenue","hire_date":"11/20/2017","website":"http://e-recht24.de","notes":"enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis","status":5,"type":3,"salary":"$924.79"},
            {"id":151,"employee_id":"291902769-7","first_name":"Carrissa","last_name":"Brownell","email":"cbrownell46@answers.com","phone":"128-824-6498","gender":"Female","department":"Services","address":"32386 Di Loreto Park","hire_date":"1/14/2018","website":"https://cbslocal.com","notes":"praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in","status":4,"type":2,"salary":"$2130.86"},
            {"id":152,"employee_id":"842513206-1","first_name":"Dyann","last_name":"Pentecost","email":"dpentecost47@scientificamerican.com","phone":"558-509-9826","gender":"Female","department":"Human Resources","address":"9 Ridgeview Lane","hire_date":"3/25/2018","website":"https://irs.gov","notes":"vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non","status":6,"type":3,"salary":"$954.81"},
            {"id":153,"employee_id":"878064554-2","first_name":"Waldo","last_name":"Bessey","email":"wbessey48@auda.org.au","phone":"986-291-1320","gender":"Male","department":"Business Development","address":"18 Roxbury Lane","hire_date":"4/2/2018","website":"https://biglobe.ne.jp","notes":"sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in","status":5,"type":3,"salary":"$2452.02"},
            {"id":154,"employee_id":"845261853-0","first_name":"Jaymee","last_name":"Longstaffe","email":"jlongstaffe49@comsenz.com","phone":"986-707-1097","gender":"Female","department":"Human Resources","address":"4998 Dakota Drive","hire_date":"7/2/2018","website":"http://comcast.net","notes":"morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl","status":1,"type":1,"salary":"$2401.60"},
            {"id":155,"employee_id":"133467041-2","first_name":"Gui","last_name":"Treuge","email":"gtreuge4a@eventbrite.com","phone":"446-433-2464","gender":"Female","department":"Accounting","address":"44 Meadow Ridge Parkway","hire_date":"2/19/2018","website":"http://amazon.com","notes":"vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget","status":3,"type":2,"salary":"$1260.96"},
            {"id":156,"employee_id":"430655033-8","first_name":"Robinet","last_name":"Pilpovic","email":"rpilpovic4b@clickbank.net","phone":"719-201-5508","gender":"Female","department":"Business Development","address":"73 Talmadge Terrace","hire_date":"12/14/2017","website":"http://fda.gov","notes":"tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus","status":3,"type":3,"salary":"$996.17"},
            {"id":157,"employee_id":"273670127-5","first_name":"Dominique","last_name":"Pinnion","email":"dpinnion4c@myspace.com","phone":"588-678-9990","gender":"Male","department":"Accounting","address":"0 Columbus Parkway","hire_date":"1/16/2018","website":"http://fastcompany.com","notes":"nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue eget semper rutrum nulla","status":6,"type":1,"salary":"$2052.55"},
            {"id":158,"employee_id":"514667447-7","first_name":"Nichole","last_name":"Sneesby","email":"nsneesby4d@google.com.hk","phone":"535-321-5685","gender":"Female","department":"Services","address":"84 Forest Run Trail","hire_date":"6/2/2018","website":"http://ibm.com","notes":"mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean","status":6,"type":3,"salary":"$517.69"},
            {"id":159,"employee_id":"959381289-X","first_name":"Evvie","last_name":"Jurek","email":"ejurek4e@dailymail.co.uk","phone":"933-940-5953","gender":"Female","department":"Legal","address":"9807 Hagan Road","hire_date":"1/30/2018","website":"http://jigsy.com","notes":"dui proin leo odio porttitor id consequat in consequat ut","status":6,"type":3,"salary":"$475.90"},
            {"id":160,"employee_id":"997401253-8","first_name":"Susana","last_name":"Tessier","email":"stessier4f@ox.ac.uk","phone":"723-896-2166","gender":"Female","department":"Sales","address":"9 Chive Place","hire_date":"4/3/2018","website":"https://google.com.br","notes":"orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum","status":3,"type":3,"salary":"$579.03"},
            {"id":161,"employee_id":"252276663-5","first_name":"Kellyann","last_name":"Mangham","email":"kmangham4g@mtv.com","phone":"688-720-2536","gender":"Female","department":"Marketing","address":"70 Muir Court","hire_date":"7/31/2017","website":"https://baidu.com","notes":"non quam nec dui luctus rutrum nulla tellus in sagittis","status":6,"type":1,"salary":"$1833.96"},
            {"id":162,"employee_id":"684537562-3","first_name":"Reta","last_name":"Downham","email":"rdownham4h@columbia.edu","phone":"805-542-6622","gender":"Female","department":"Training","address":"3 Sage Hill","hire_date":"10/7/2017","website":"https://cloudflare.com","notes":"erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec nisi","status":2,"type":1,"salary":"$254.59"},
            {"id":163,"employee_id":"755134881-6","first_name":"Abbe","last_name":"Didsbury","email":"adidsbury4i@usda.gov","phone":"911-906-3632","gender":"Female","department":"Support","address":"3527 Scofield Drive","hire_date":"3/27/2018","website":"http://webs.com","notes":"maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie","status":1,"type":2,"salary":"$1163.39"},
            {"id":164,"employee_id":"983150152-7","first_name":"Bobbe","last_name":"Le Frank","email":"blefrank4j@youtube.com","phone":"777-324-7190","gender":"Female","department":"Accounting","address":"56607 Oneill Hill","hire_date":"8/18/2017","website":"http://salon.com","notes":"erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum","status":1,"type":2,"salary":"$2173.86"},
            {"id":165,"employee_id":"204907720-3","first_name":"Cal","last_name":"Scothorn","email":"cscothorn4k@miibeian.gov.cn","phone":"194-212-1904","gender":"Male","department":"Training","address":"468 Grim Street","hire_date":"5/19/2018","website":"https://ftc.gov","notes":"vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id","status":4,"type":2,"salary":"$2034.27"},
            {"id":166,"employee_id":"697540250-7","first_name":"Lolly","last_name":"Treneman","email":"ltreneman4l@paypal.com","phone":"632-859-5314","gender":"Female","department":"Marketing","address":"72009 Riverside Lane","hire_date":"5/29/2018","website":"https://va.gov","notes":"in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt","status":5,"type":3,"salary":"$753.35"},
            {"id":167,"employee_id":"115690768-3","first_name":"Cecilla","last_name":"Lapenna","email":"clapenna4m@123-reg.co.uk","phone":"628-961-1692","gender":"Female","department":"Human Resources","address":"9280 Kings Junction","hire_date":"9/29/2017","website":"https://desdev.cn","notes":"accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend donec ut dolor","status":1,"type":1,"salary":"$2311.77"},
            {"id":168,"employee_id":"571951854-1","first_name":"Dulcia","last_name":"Salthouse","email":"dsalthouse4n@woothemes.com","phone":"908-491-4688","gender":"Female","department":"Accounting","address":"46165 Lukken Plaza","hire_date":"11/12/2017","website":"https://hostgator.com","notes":"vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non","status":6,"type":1,"salary":"$822.82"},
            {"id":169,"employee_id":"977337629-X","first_name":"Terrijo","last_name":"Creegan","email":"tcreegan4o@sogou.com","phone":"482-913-3726","gender":"Female","department":"Product Management","address":"4717 Hayes Hill","hire_date":"7/26/2017","website":"https://google.fr","notes":"nulla suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et","status":6,"type":1,"salary":"$484.63"},
            {"id":170,"employee_id":"027232140-0","first_name":"Edsel","last_name":"Coward","email":"ecoward4p@hatena.ne.jp","phone":"612-293-5449","gender":"Male","department":"Product Management","address":"3 Westerfield Plaza","hire_date":"8/8/2017","website":"http://prweb.com","notes":"suspendisse potenti cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus","status":1,"type":3,"salary":"$592.46"},
            {"id":171,"employee_id":"263088468-6","first_name":"Ansel","last_name":"Monteith","email":"amonteith4q@deliciousdays.com","phone":"570-559-5834","gender":"Male","department":"Marketing","address":"3596 Elka Alley","hire_date":"12/15/2017","website":"http://paypal.com","notes":"luctus et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin ut suscipit a","status":3,"type":3,"salary":"$1449.66"},
            {"id":172,"employee_id":"530835369-7","first_name":"Adler","last_name":"Medford","email":"amedford4r@ucsd.edu","phone":"595-468-9382","gender":"Male","department":"Training","address":"87 Namekagon Road","hire_date":"3/13/2018","website":"http://princeton.edu","notes":"sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla","status":2,"type":1,"salary":"$399.65"},
            {"id":173,"employee_id":"607099253-9","first_name":"Kira","last_name":"Berford","email":"kberford4s@lulu.com","phone":"572-891-2967","gender":"Female","department":"Accounting","address":"414 Ruskin Terrace","hire_date":"1/16/2018","website":"http://instagram.com","notes":"et tempus semper est quam pharetra magna ac consequat metus sapien","status":1,"type":3,"salary":"$1928.81"},
            {"id":174,"employee_id":"798630883-4","first_name":"Vivyanne","last_name":"Furzey","email":"vfurzey4t@ca.gov","phone":"278-121-5340","gender":"Female","department":"Human Resources","address":"94 Esch Park","hire_date":"5/17/2018","website":"https://amazon.de","notes":"faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices","status":6,"type":2,"salary":"$2375.11"},
            {"id":175,"employee_id":"681999959-3","first_name":"Nikoletta","last_name":"Robelow","email":"nrobelow4u@smugmug.com","phone":"360-351-4307","gender":"Female","department":"Engineering","address":"5 Starling Trail","hire_date":"8/20/2017","website":"https://barnesandnoble.com","notes":"odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi","status":4,"type":2,"salary":"$250.80"},
            {"id":176,"employee_id":"011864426-2","first_name":"Mathew","last_name":"Battyll","email":"mbattyll4v@over-blog.com","phone":"321-386-3766","gender":"Male","department":"Research and Development","address":"65072 Carey Crossing","hire_date":"5/15/2018","website":"http://ibm.com","notes":"vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat","status":2,"type":2,"salary":"$636.70"},
            {"id":177,"employee_id":"570137655-9","first_name":"Forrest","last_name":"Cowderoy","email":"fcowderoy4w@ask.com","phone":"618-278-7932","gender":"Male","department":"Sales","address":"351 Buell Hill","hire_date":"12/26/2017","website":"https://123-reg.co.uk","notes":"magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi","status":5,"type":3,"salary":"$699.94"},
            {"id":178,"employee_id":"418945567-9","first_name":"Ax","last_name":"Brum","email":"abrum4x@ox.ac.uk","phone":"850-631-2124","gender":"Male","department":"Product Management","address":"261 Evergreen Parkway","hire_date":"8/31/2017","website":"http://narod.ru","notes":"non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in","status":1,"type":2,"salary":"$257.02"},
            {"id":179,"employee_id":"848896179-0","first_name":"Travers","last_name":"Francecione","email":"tfrancecione4y@yelp.com","phone":"812-741-5424","gender":"Male","department":"Business Development","address":"425 Redwing Street","hire_date":"10/18/2017","website":"https://examiner.com","notes":"nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse","status":6,"type":3,"salary":"$2117.44"},
            {"id":180,"employee_id":"819724851-6","first_name":"Eamon","last_name":"McGarrie","email":"emcgarrie4z@upenn.edu","phone":"778-137-8339","gender":"Male","department":"Accounting","address":"1045 Crest Line Way","hire_date":"8/18/2017","website":"http://whitehouse.gov","notes":"justo eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea","status":2,"type":1,"salary":"$493.98"},
            {"id":181,"employee_id":"194192430-1","first_name":"Jenda","last_name":"Butts","email":"jbutts50@privacy.gov.au","phone":"396-649-0972","gender":"Female","department":"Research and Development","address":"25264 Sugar Alley","hire_date":"10/16/2017","website":"https://adobe.com","notes":"pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi","status":1,"type":2,"salary":"$957.15"},
            {"id":182,"employee_id":"750517497-5","first_name":"Batsheva","last_name":"O'Hoey","email":"bohoey51@linkedin.com","phone":"545-981-9250","gender":"Female","department":"Services","address":"83 Swallow Circle","hire_date":"10/20/2017","website":"https://army.mil","notes":"duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit id","status":1,"type":1,"salary":"$1379.67"},
            {"id":183,"employee_id":"222948193-2","first_name":"Garrick","last_name":"Coale","email":"gcoale52@blogspot.com","phone":"891-244-1372","gender":"Male","department":"Research and Development","address":"8 Lien Circle","hire_date":"10/14/2017","website":"https://qq.com","notes":"ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in","status":4,"type":2,"salary":"$1818.60"},
            {"id":184,"employee_id":"006801712-X","first_name":"Cody","last_name":"Myhan","email":"cmyhan53@hc360.com","phone":"271-326-1892","gender":"Male","department":"Sales","address":"1993 Forest Run Pass","hire_date":"3/23/2018","website":"http://vinaora.com","notes":"orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi","status":6,"type":3,"salary":"$1057.20"},
            {"id":185,"employee_id":"093515326-8","first_name":"Osbert","last_name":"Musla","email":"omusla54@eventbrite.com","phone":"480-152-0632","gender":"Male","department":"Product Management","address":"032 Annamark Terrace","hire_date":"3/26/2018","website":"http://bbc.co.uk","notes":"neque libero convallis eget eleifend luctus ultricies eu nibh quisque","status":4,"type":2,"salary":"$1241.07"},
            {"id":186,"employee_id":"532269185-5","first_name":"Ranice","last_name":"Lebond","email":"rlebond55@google.co.jp","phone":"157-709-4371","gender":"Female","department":"Legal","address":"2 Randy Junction","hire_date":"7/10/2018","website":"https://diigo.com","notes":"ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit","status":3,"type":1,"salary":"$1139.94"},
            {"id":187,"employee_id":"820600310-X","first_name":"Guthrie","last_name":"Bandey","email":"gbandey56@studiopress.com","phone":"543-161-2237","gender":"Male","department":"Research and Development","address":"0 Pine View Circle","hire_date":"6/28/2018","website":"https://auda.org.au","notes":"primis in faucibus orci luctus et ultrices posuere cubilia curae","status":5,"type":2,"salary":"$2236.51"},
            {"id":188,"employee_id":"665284501-6","first_name":"Launce","last_name":"Geldard","email":"lgeldard57@yandex.ru","phone":"506-333-2822","gender":"Male","department":"Accounting","address":"17 Haas Center","hire_date":"12/9/2017","website":"https://newsvine.com","notes":"ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue","status":4,"type":1,"salary":"$1815.94"},
            {"id":189,"employee_id":"782377092-X","first_name":"Connie","last_name":"Toope","email":"ctoope58@mediafire.com","phone":"651-464-3542","gender":"Female","department":"Training","address":"3 Russell Center","hire_date":"12/14/2017","website":"https://unblog.fr","notes":"eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt","status":5,"type":2,"salary":"$1736.72"},
            {"id":190,"employee_id":"251188287-6","first_name":"Lawton","last_name":"Prigmore","email":"lprigmore59@cnet.com","phone":"738-575-3587","gender":"Male","department":"Legal","address":"050 Eastlawn Avenue","hire_date":"9/4/2017","website":"http://uol.com.br","notes":"adipiscing elit proin interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis congue vivamus metus arcu","status":1,"type":1,"salary":"$1670.77"},
            {"id":191,"employee_id":"219193763-2","first_name":"Barbara","last_name":"Aleksankin","email":"baleksankin5a@tiny.cc","phone":"224-597-1015","gender":"Female","department":"Engineering","address":"1 Gerald Crossing","hire_date":"6/14/2018","website":"http://soundcloud.com","notes":"imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere","status":3,"type":1,"salary":"$2209.41"},
            {"id":192,"employee_id":"643523768-9","first_name":"Bab","last_name":"Vallack","email":"bvallack5b@slashdot.org","phone":"900-188-1943","gender":"Female","department":"Marketing","address":"43013 Rutledge Avenue","hire_date":"5/14/2018","website":"http://addtoany.com","notes":"sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget","status":3,"type":1,"salary":"$975.83"},
            {"id":193,"employee_id":"524396310-0","first_name":"Billi","last_name":"Palia","email":"bpalia5c@google.de","phone":"328-700-9101","gender":"Female","department":"Marketing","address":"66 Pearson Court","hire_date":"3/5/2018","website":"http://trellian.com","notes":"pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est","status":3,"type":2,"salary":"$1311.25"},
            {"id":194,"employee_id":"666722147-1","first_name":"Gallard","last_name":"Gough","email":"ggough5d@comcast.net","phone":"943-155-0838","gender":"Male","department":"Marketing","address":"742 Eliot Street","hire_date":"11/2/2017","website":"http://latimes.com","notes":"consequat dui nec nisi volutpat eleifend donec ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo","status":6,"type":3,"salary":"$1869.81"},
            {"id":195,"employee_id":"433807272-5","first_name":"Matty","last_name":"Lante","email":"mlante5e@netscape.com","phone":"423-832-1948","gender":"Male","department":"Product Management","address":"33278 Northport Center","hire_date":"4/14/2018","website":"https://cornell.edu","notes":"quisque ut erat curabitur gravida nisi at nibh in hac habitasse","status":6,"type":3,"salary":"$1511.57"},
            {"id":196,"employee_id":"082774740-3","first_name":"Niki","last_name":"Surgen","email":"nsurgen5f@unc.edu","phone":"235-964-4962","gender":"Female","department":"Sales","address":"477 Maryland Park","hire_date":"6/3/2018","website":"https://stumbleupon.com","notes":"posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel","status":6,"type":3,"salary":"$1742.42"},
            {"id":197,"employee_id":"496412396-0","first_name":"Erek","last_name":"Devereu","email":"edevereu5g@nydailynews.com","phone":"988-854-5635","gender":"Male","department":"Marketing","address":"4222 Gateway Junction","hire_date":"12/2/2017","website":"http://purevolume.com","notes":"posuere cubilia curae nulla dapibus dolor vel est donec odio justo sollicitudin","status":3,"type":1,"salary":"$2213.58"},
            {"id":198,"employee_id":"815701353-4","first_name":"Ange","last_name":"Bassill","email":"abassill5h@odnoklassniki.ru","phone":"573-589-2234","gender":"Female","department":"Business Development","address":"7450 Maywood Crossing","hire_date":"12/18/2017","website":"http://time.com","notes":"a odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis","status":2,"type":3,"salary":"$2381.50"},
            {"id":199,"employee_id":"079850265-7","first_name":"Robena","last_name":"Jiggins","email":"rjiggins5i@comcast.net","phone":"202-269-3768","gender":"Female","department":"Accounting","address":"81 Golf View Circle","hire_date":"7/28/2017","website":"http://constantcontact.com","notes":"lacinia aenean sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et","status":6,"type":1,"salary":"$2227.40"},
            {"id":200,"employee_id":"710192734-3","first_name":"Lari","last_name":"Sweetenham","email":"lsweetenham5j@amazon.co.jp","phone":"838-858-2584","gender":"Female","department":"Business Development","address":"1021 Mesta Hill","hire_date":"8/11/2017","website":"https://typepad.com","notes":"sit amet consectetuer adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in","status":1,"type":1,"salary":"$1540.09"},];

        var datatable = $('#kt_recent_orders').KTDatatable({
            // datasource definition
            data: {
                type: 'local',
                source: dataJSONArray,
                pageSize: 10,
                serverPaging: false,
                serverFiltering: false,
                serverSorting: false
            },

            // layout definition
            layout: {
                scroll: true,
                height: 500,
                footer: false
            },

            // column sorting
            sortable: true,

            pagination: true,

            search: {
                input: $('#generalSearch'),
            },

            // columns definition
            columns: [{
                field: 'id',
                title: '#',
                sortable: false,
                width: 20,
                type: 'number',
                selector: {class: 'kt-checkbox--solid'},
                textAlign: 'center',
            }, {
                field: 'employee_id',
                title: 'Order ID',
                template: function(row) {
                    return '<span class="kt-label-font-color-3 kt-font-bold">' + row.employee_id + '</span>';
                },
            }, {
                field: 'first_name',
                title: 'Customer',
                width: 130,
                template: function(row) {
                    return '<span class="kt-label-font-color-3 kt-font-bold">' + row.first_name + ' ' + row.last_name + '</span>';
                },
            }, {
                field: 'hire_date',
                title: 'Date',
                type: 'date',
                format: 'MM/DD/YYYY',
            }, {
                field: 'status',
                title: 'Status',
	            autoHide: false,
                // callback function support for column rendering
                template: function(row) {
                    var status = {
                        1: {
                            'title': 'Pending',
                            'class': 'brand'
                        },
                        2: {
                            'title': 'Delivered',
                            'class': 'focus'
                        },
                        3: {
                            'title': 'Canceled',
                            'class': 'primary'
                        },
                        4: {
                            'title': 'Success',
                            'class': 'success'
                        },
                        5: {
                            'title': 'Info',
                            'class': 'info'
                        },
                        6: {
                            'title': 'Danger',
                            'class': 'danger'
                        },
                        7: {
                            'title': 'Warning',
                            'class': 'warning'
                        }
                    };
                    return '<span class="kt-badge kt-badge--' + status[row.status].class + ' kt-badge--dot kt-badge--md"></span>&nbsp;&nbsp;<span class="kt-label-font-color-2 kt-font-bold">' +
                        status[row.type].title + '</span>';
                }
            }, {
                field: 'Actions',
                title: 'Actions',
                sortable: false,
                width: 80,
                overflow: 'visible',
                textAlign: 'center',
	            autoHide: false,
                template: function() {
                    return '\
                        <div class="dropdown" >\
                            <a href="#" class="btn btn-clean btn-icon btn-sm btn-icon-md" data-toggle="dropdown">\
                                <i class="la la-ellipsis-h"></i>\
                            </a>\
                            <div class="dropdown-menu dropdown-menu-right">\
                                <a class="dropdown-item" href="#"><i class="la la-edit"></i> Edit Details</a>\
                                <a class="dropdown-item" href="#"><i class="la la-leaf"></i> Update Status</a>\
                                <a class="dropdown-item" href="#"><i class="la la-print"></i> Generate Report</a>\
                            </div>\
                        </div>\
                        <a href="#" class="btn btn-clean btn-icon btn-sm btn-icon-md" title="Edit details">\
                            <i class="la la-edit"></i>\
                        </a>\
                    ';
                }
            }]
        });

        $('#kt_form_status').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'status');
        });

        $('#kt_form_type').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'type');
        });

        $('#kt_form_status,#kt_form_type').selectpicker();

        // Reload datatable layout on aside menu toggle
        if (KTLayout.getAsideSecondaryToggler && KTLayout.getAsideSecondaryToggler()) {
            KTLayout.getAsideSecondaryToggler().on('toggle', function() {
                datatable.redraw();
            });
        }

        // Fix datatable layout in tabs
        datatable.closest('.kt-content__body').find('[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            datatable.redraw();
        });
    };

    return {
        init: function() {
            mediumCharts();

            latestProductsMiniCharts();
            daterangepickerInit();
            generalStatistics();
            recentOrdersInit();

            widgetTechnologiesChart();
            widgetTechnologiesChart2()
            widgetTotalOrdersChart();
            widgetTotalOrdersChart2();

            widgetSalesStatisticsChart();
            widgetRevenueGrowthChart();
        }
    };
}();

// Class initialization
jQuery(document).ready(function() {
    KTDashboard.init();
});