import React, { useEffect, useState } from 'react';
import { Select, MenuItem, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import axios from 'axios';

const TaskOverview = () => {
    const [month, setMonth] = useState('8');
    const [year, setYear] = useState('2024');
    const [chartData, setChartData] = useState({ series: [], categories: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:7157/api/mission/byMonth`, {
                    params: {
                        year,
                        month,
                    },
                });

                const data = response.data;
                // console.log(response.data);
                if (!data || !data.data) {
                    throw new Error('No data found');
                }

                const dateMap = {};
                data.data.forEach(mission => {
                    const date = new Date(mission.createdAt).toLocaleDateString('en-GB');

                    if (!dateMap[date]) {
                        dateMap[date] = { completed: 0, pending: 0 };
                    }


                    if (mission.status === 'Tamamlanmış') {
                        dateMap[date].completed += 1;
                    } else if (mission.status === 'Tamamlanmamış') {
                        dateMap[date].pending += 1;
                    } else {
                        console.log('Unhandled mission status:', mission.status);
                    }
                });


                const dates = Object.keys(dateMap);
                const completedTasks = dates.map(date => dateMap[date].completed);
                const pendingTasks = dates.map(date => dateMap[date].pending);

                setChartData({
                    series: [
                        {
                            name: 'Tamamlanan Görev',
                            data: completedTasks,
                        },
                        {
                            name: 'Tamamlanmamış Görev',
                            data: pendingTasks,
                        },
                    ],
                    categories: dates,
                });
            } catch (error) {
                setError('Error fetching data. Please try again.');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [month, year]);

    const optionscolumnchart = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: chartData.categories,
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };

    return (
        <DashboardCard
            title="Görevlere Genel Bakış"
            action={
                <div>
                    <Select
                        labelId="year-dd"
                        id="year-dd"
                        value={year}
                        size="small"
                        onChange={handleYearChange}
                        style={{ marginRight: '10px' }}
                    >
                        <MenuItem value={2023}>2023</MenuItem>
                        <MenuItem value={2024}>2024</MenuItem>
                    </Select>
                    <Select
                        labelId="month-dd"
                        id="month-dd"
                        value={month}
                        size="small"
                        onChange={handleMonthChange}
                    >
                        <MenuItem value={1}>Ocak</MenuItem>
                        <MenuItem value={2}>Şubat</MenuItem>
                        <MenuItem value={3}>Mart</MenuItem>
                        <MenuItem value={4}>Nisan</MenuItem>
                        <MenuItem value={5}>Mayıs</MenuItem>
                        <MenuItem value={6}>Haziran</MenuItem>
                        <MenuItem value={7}>Temmuz</MenuItem>
                        <MenuItem value={8}>Ağustos</MenuItem>
                        <MenuItem value={9}>Eylül</MenuItem>
                        <MenuItem value={10}>Ekim</MenuItem>
                        <MenuItem value={11}>Kasım</MenuItem>
                        <MenuItem value={12}>Aralık</MenuItem>

                    </Select>
                </div>
            }
        >
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '370px' }}>
                    <CircularProgress />
                </div>
            ) : error ? (
                <Typography color="error" align="center">{error}</Typography>
            ) : (
                <Chart
                    options={optionscolumnchart}
                    series={chartData.series}
                    type="bar"
                    height="370px"
                />
            )}
        </DashboardCard>
    );
};

export default TaskOverview;
