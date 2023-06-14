import Box from '@mui/material/Box';

interface BoxComponentProps {
    children: any;
}

function BoxComponent(props: BoxComponentProps) {
    return (
        <>
            <Box sx={{
                m: 3,
                display: "grid",
                placeItems: "center"
            }}>
                {props.children}
            </Box>
        </>
    );
}

export default BoxComponent;