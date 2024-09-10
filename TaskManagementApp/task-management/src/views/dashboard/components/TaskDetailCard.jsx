import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Typography, Stack, Chip, IconButton, List, ListItem, ListItemText, ListItemIcon, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFilePdf, faFileWord, faFileExcel, faFilePowerpoint, faFileImage } from '@fortawesome/free-solid-svg-icons';

const TaskDetailCard = ({ open, onClose, taskId }) => {
    const [task, setTask] = useState(null);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTaskAndFiles = async () => {
            try {
                const taskResponse = await axios.get(`http://localhost:7157/api/Mission/${taskId}`);
                setTask(taskResponse.data.data);

                const filesResponse = await axios.get(`http://localhost:7157/api/File/byMission/${taskId}`);
                setFiles(filesResponse.data.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching task details:', err);
                setError('Failed to fetch task details.');
                setLoading(false);
            }
        };

        if (taskId) fetchTaskAndFiles();
    }, [taskId]);

    const getFileIcon = (filePath) => {
        if (!filePath) return faFile;

        const fileExtension = filePath.split('.').pop().toLowerCase();
        switch (fileExtension) {
            case 'pdf':
                return faFilePdf;
            case 'docx':
                return faFileWord;
            case 'xlsx':
                return faFileExcel;
            case 'pptx':
                return faFilePowerpoint;
            case 'jpg':
            case 'jpeg':
            case 'png':
                return faFileImage;
            default:
                return faFile;
        }
    };

    const handleFileDownload = async (fileId) => {
        try {
            const response = await axios.get(`http://localhost:7157/api/File/download/${fileId}`, {
                responseType: 'blob',
            });

            const contentDisposition = response.headers['content-disposition'];
            const fileName = contentDisposition
                ? contentDisposition.split('filename=')[1].replace(/"/g, '')
                : 'downloaded-file';

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Error downloading file:', err);
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogContent>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6">{task?.title}</Typography>
                <Typography variant="body1">Oluşturulma Tarihi: {task?.createdAt && new Date(task.createdAt).toLocaleDateString('tr-TR')}</Typography>
                <Stack direction="row" spacing={1} mt={2}>
                    <Chip label={task?.priority} sx={{ backgroundColor: getPriorityColor(task?.priority), color: '#fff' }} />
                    <Chip label={task?.status} sx={{ backgroundColor: getStatusColor(task?.status), color: '#fff' }} />
                </Stack>
                <Typography variant="body2" mt={2}>{task?.description}</Typography>

                {files.length > 0 && (
                    <>
                        <Typography variant="h6" mt={2}>Ekteki Dosyalar:</Typography>
                        <List>
                            {files.map((file, index) => (
                                <ListItem key={file.id}>
                                    <ListItemIcon>
                                        <FontAwesomeIcon icon={getFileIcon(file?.filePath)} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Link
                                                component="button"
                                                onClick={() => handleFileDownload(file.id)}
                                            >
                                                {file?.filePath?.split('/').pop()}
                                            </Link>
                                        }
                                        secondary={file?.uploadedAt && `${new Date(file.uploadedAt).toLocaleDateString('tr-TR')} tarihinde yüklendi.`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
        case 'yüksek':
            return 'error.main';
        case 'orta':
            return 'warning.main';
        case 'kritik':
            return 'secondary.main';
        case 'düşük':
            return 'primary.main';
        default:
            return 'grey.500';
    }
};

const getStatusColor = (status) => {
    return status === 'Tamamlanmış' ? 'success.main' : 'error.main';
};

export default TaskDetailCard;
