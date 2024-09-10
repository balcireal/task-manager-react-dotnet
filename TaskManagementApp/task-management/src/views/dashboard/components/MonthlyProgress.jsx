import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faTasks } from '@fortawesome/free-solid-svg-icons';
import DashboardCard from '@/components/shared/DashboardCard';
import axios from 'axios';

const MonthlyProgress = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primaryLight = '#e3f2fd';

  const [monthlyProgress, setMonthlyProgress] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);

  useEffect(() => {
    const fetchMonthlyProgress = async () => {
      try {
        const year = new Date().getFullYear();
        const response = await axios.get(`http://localhost:7157/api/mission/monthlyProgress?year=${year}`);
        if (response.status === 200) {
          const data = response.data.data;
          setMonthlyProgress(data);
          setTotalTasks(data.reduce((total, item) => total + item.tasksCompleted, 0));

          const lastMonth = new Date().getMonth() - 1;
          const currentMonthData = data.find(item => item.month === new Date().getMonth() + 1);
          const lastMonthData = data.find(item => item.month === lastMonth + 1);

          const currentMonthTasks = currentMonthData ? currentMonthData.tasksCompleted : 0;
          const lastMonthTasks = lastMonthData ? lastMonthData.tasksCompleted : 0;

          const change = lastMonthTasks === 0 ? 0 : ((currentMonthTasks - lastMonthTasks) / lastMonthTasks) * 100;
          setPercentageChange(change.toFixed(2));
        }
      } catch (error) {
        console.error('Failed to fetch monthly progress data:', error);
      }
    };

    fetchMonthlyProgress();
  }, []);

  const options = {
    chart: {
      type: 'area',
      height: 60,
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [primaryLight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
    xaxis: {
      categories: monthlyProgress.map(progress => `Ay ${progress.month}`),
    },
  };

  const series = [
    {
      name: 'Tasks Completed',
      color: primary,
      data: monthlyProgress.map(progress => progress.tasksCompleted),
    },
  ];

  return (
    <DashboardCard
      title="Aylık İlerleme"
      action={
        <Fab color="primary" size="medium" sx={{ color: '#ffffff' }}>
          <FontAwesomeIcon icon={faTasks} size="2x" />
        </Fab>
      }
      footer={
        monthlyProgress.length > 0 ? (
          <Chart options={options} series={series} type="area" height="60px" />
        ) : (
          <Typography>Veri bulunamadı</Typography>
        )
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          {totalTasks} Görev
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: '#e8f5e9', width: 27, height: 27 }}>
            <FontAwesomeIcon icon={faArrowAltCircleUp} />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            {percentageChange > 0 ? `+${percentageChange}%` : `${percentageChange}%`}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            geçen aydan beri
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default MonthlyProgress;
