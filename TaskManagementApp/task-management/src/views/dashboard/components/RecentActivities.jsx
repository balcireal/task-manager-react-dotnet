import React, { useEffect, useState } from 'react';
import DashboardCard from '@/components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Typography } from '@mui/material';
import axios from 'axios';

const RecentActivities = () => {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:7157/api/Comment');
        setActivities(response.data.data);
      } catch (error) {
        console.error('Yorumları çekerken hata oluştu:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:7157/api/User');
        const usersData = response.data.data;
        // console.log(usersData);
        const usersMap = usersData.reduce((map, user) => {
          map[user.id] = user.UserId;
          return map;
        }, {});
        setUsers(usersMap);
      } catch (error) {
        console.error('Kullanıcıları çekerken hata oluştu:', error);
      }
    };

    fetchActivities();
    fetchUsers();
  }, []);

  return (
    <DashboardCard title="Görev Yorumları">
      <Timeline
        className="theme-timeline"
        sx={{
          p: 0,
          mb: 0,
          mt: 0,
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.5,
            paddingLeft: 0,
          },
        }}
      >
        {activities.map((activity, index) => (
          <TimelineItem key={activity.id || index}>
            <TimelineOppositeContent>
              <Typography variant="subtitle2" color="textSecondary">
                {new Date(activity.createdAt).toLocaleDateString('tr-TR')}
                {' - '}
                {new Date(activity.createdAt).toLocaleTimeString('tr-TR')}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="subtitle2" fontWeight={600}>
                {activity.content}
              </Typography>
              <Typography color="textSecondary" variant="subtitle2">
                {users[activity.UserId]}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}

      </Timeline>
    </DashboardCard>
  );
};

export default RecentActivities;
