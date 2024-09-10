import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar, CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import DashboardCard from '@/components/shared/DashboardCard';
import axios from 'axios';

const YearlyTaskBreakup = () => {
  const [chartData, setChartData] = useState([0, 0, 0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [percentageChange, setPercentageChange] = useState(0);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const currentYear = new Date().getFullYear();
        const [currentYearResponse, previousYearResponse] = await Promise.all([
          axios.get('http://localhost:7157/api/mission/byYear', { params: { year: currentYear } }),
          axios.get('http://localhost:7157/api/mission/byYear', { params: { year: currentYear - 1 } })
        ]);

        const currentYearData = currentYearResponse.data.data;
        const previousYearData = previousYearResponse.data.data;

        const completedCurrent = currentYearData.completedTasks || 0;
        const pendingCurrent = currentYearData.pendingTasks || 0;
        const otherCurrent = currentYearData.otherTasks || 0;

        const completedPrevious = previousYearData.completedTasks || 0;

        setChartData([completedCurrent, pendingCurrent, otherCurrent]);

        const difference = completedCurrent - completedPrevious;
        const change = completedPrevious > 0 ? (difference / completedPrevious) * 100 : 100;
        setPercentageChange(change);
      } catch (error) {
        setError('Error fetching data. Please try again.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  return (
    <DashboardCard title="Yıllık Görev Dağılımı">
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '155px' }}>
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={7} sm={7}>
            <Typography variant="h3" fontWeight="700">
              {chartData.reduce((acc, val) => acc + val, 0)} Görev
            </Typography>
            <Stack direction="row" spacing={1} mt={1} alignItems="center">
              <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
                <FontAwesomeIcon icon={percentageChange >= 0 ? faArrowAltCircleUp : faArrowAltCircleDown} />
              </Avatar>
              <Typography variant="subtitle2" fontWeight="600">
                {percentageChange.toFixed(2)}%
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                geçen yıldan beri
              </Typography>
            </Stack>
            <Stack spacing={3} mt={5} direction="row">
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}></Avatar>
                <Typography variant="subtitle2" color="textSecondary">
                  Tamamlanan
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}></Avatar>
                <Typography variant="subtitle2" color="textSecondary">
                  Tamamlanmamış
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar sx={{ width: 9, height: 9, bgcolor: '#F9F9FD', svg: { display: 'none' } }}></Avatar>
                <Typography variant="subtitle2" color="textSecondary">
                  Diğer
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={5} sm={5}>
            <Chart
              options={optionscolumnchart}
              series={chartData}
              type="donut"
              height="150px"
            />
          </Grid>
        </Grid>
      )}
    </DashboardCard>
  );
};

export default YearlyTaskBreakup;
