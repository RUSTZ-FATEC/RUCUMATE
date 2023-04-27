import Button from '@mui/material/Button';

function ButtonComponent(props : any) {
    return (
        <Button
            fullWidth
            id="fullWidth"
            variant="contained"
            sx={{
                mt: 3,
                boxShadow: "none",
                backgroundColor: "#124116",
                '&:hover': {
                    color: "#124116",
                    boxShadow: "none",
                    backgroundColor: "#e8f5e9"
                }
            }}
            onClick={() => { }}
        >{props.title}
        </Button>
    );
}

export default ButtonComponent;