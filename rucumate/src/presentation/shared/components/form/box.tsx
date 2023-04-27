import Box from '@mui/material/Box';

function BoxComponent(props : any) {
    return(
        <Box sx={{
            m: 3,
            display: "grid",
            placeItems: "center"
         }}>
            {props.children}
        </Box>
    );
}

export default BoxComponent;