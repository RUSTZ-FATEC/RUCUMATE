import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

function NavigationComponent() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Item
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "auto",
                                placeItems: "center"
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: "#000"
                                }}
                            >

                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "auto",
                                placeItems: "center"
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: "#000"
                                }}
                            >

                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "#000"
                                }}
                            >

                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "#000"
                                }}
                            >

                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={100}>
                        <Item
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "auto auto auto",
                                placeItems: "center"
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: "#000"
                                }}
                            >

                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "#000"
                                }}
                            >

                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "#000"
                                }}
                            >

                            </Box>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default NavigationComponent;