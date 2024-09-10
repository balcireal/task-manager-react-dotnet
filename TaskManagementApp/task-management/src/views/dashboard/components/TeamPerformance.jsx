import React, { useEffect, useState, useRef } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button
} from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DashboardCard from '@/components/shared/DashboardCard';

const TeamPerformance = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const tableRef = useRef();

    useEffect(() => {
        axios.get('http://localhost:7157/api/user')
            .then(response => {
                const users = response.data.data;

                if (Array.isArray(users)) {
                    const requests = users.map(user =>
                        axios.get(`http://localhost:7157/api/mission/byUserId/${user.userId}`)
                            .then(missionResponse => {
                                const missions = missionResponse.data.data;

                                if (!Array.isArray(missions)) {
                                    throw new Error('Görev verileri beklenen formatta değil.');
                                }

                                return missions.map(mission => ({
                                    id: user.userId,
                                    name: user.username,
                                    role: user.role,
                                    task: mission.title,
                                    priority: mission.priority,
                                    status: mission.status,
                                    statusColor: getStatusColor(mission.status),
                                }));
                            })
                    );

                    Promise.all(requests).then(results => {
                        setTeamMembers(results.flat());
                    });
                } else {
                    console.error('Beklenen dizi formatında veri alındı ancak:', users);
                }
            })
            .catch(error => {
                console.error('Veri alınırken bir hata oluştu:', error);
            });
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'success.main';
            case 'In Progress':
                return 'primary.main';
            case 'Pending':
                return 'secondary.main';
            case 'Tamamlanmamış':
                return 'warning.main';
            default:
                return 'info.main';
        }
    };

    const downloadPDF = () => {
        const input = tableRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('team_performance.pdf');
        }).catch(error => {
            console.error('PDF oluşturulurken bir hata oluştu:', error);
        });
    };

    return (
        <DashboardCard title="Takım Performansı">
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button variant="contained" onClick={downloadPDF}>
                    PDF Olarak İndir
                </Button>
            </Box>
            <Box sx={{ overflow: 'auto' }} ref={tableRef}>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2,
                        minWidth: 650,
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    ID
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Takım Üyesi
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Görev
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Durum
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teamMembers.map((member) => (
                            <TableRow key={`${member.id}-${member.task}`}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {member.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {member.name}
                                    </Typography>
                                    <Typography
                                        color="textSecondary"
                                        sx={{
                                            fontSize: "13px",
                                        }}
                                    >
                                        {member.role}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {member.task || "Görev Atanmamış"}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: member.statusColor,
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={member.status || "Bilinmeyen Durum"}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default TeamPerformance;
