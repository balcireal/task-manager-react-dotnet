import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const ProgressTracker = ({ completedTasks, totalTasks }) => {
    const progress = (completedTasks / totalTasks) * 100;

    return (
        <Box sx={{ m: 3, p: 3, bgcolor: 'primary.light', borderRadius: '8px' }}>
            <Typography variant="h6" mb={2}>
                Görev İlerlemesi
            </Typography>
            <Typography variant="body2" mb={1}>
                {`Tamamlanan Görevler: ${completedTasks} / ${totalTasks}`}
            </Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ height: '10px', borderRadius: '5px' }} />
            <Typography variant="body2" mt={1}>
                {`İlerleme: ${progress.toFixed(2)}%`}
            </Typography>
        </Box>
    );
};

export default ProgressTracker;
