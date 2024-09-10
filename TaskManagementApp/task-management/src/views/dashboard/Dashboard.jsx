import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from '@/components/container/PageContainer';

import TaskOverview from '@/views/dashboard/components/TaskOverview';

import YearlyTaskBreakup from '@/views/dashboard/components/YearlyTaskBreakup';
import RecentActivities from '@/views/dashboard/components/RecentActivities';
import TeamPerformance from '@/views/dashboard/components/TeamPerformance';
import TaskCard from '@/views/dashboard/components/TaskCard';
import MonthlyProgress from '@/views/dashboard/components/MonthlyProgress';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="This is the Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <TaskOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyTaskBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyProgress />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentActivities />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TeamPerformance />
          </Grid>
          <Grid item xs={12}>
            <TaskCard />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
