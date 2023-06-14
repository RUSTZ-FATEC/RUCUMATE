import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";

interface ItemData {
  id: number;
  user_id: string;
  temperature: string;
  humidity: string;
}

const useStyles = makeStyles(() => ({
  date: {
    color: "#D6E1E0",
  },
  time: {
    color: "#D6E1E0",
  },
  description: {
    color: "#D6E1E0",
  },
}));

function CarouselComponent(props: any): any {
  const [slides, setSlides] = useState<ItemData[]>([]);
  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://rucumate.herokuapp.com/esp/data/id/user/${user_id}`
        );
        const data = await response.json();
        setSlides(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user_id]);

  const getModelInfo = (slide: any) => {
    if (props.title === "Informações de temperatura dos sensores:") {
      return slide.temperature;
    } else if (props.title === "Informações de umidade dos sensores:") {
      return slide.humidity;
    } else {
      return "Modelo não especificado";
    }
  };

  const classes = useStyles();

  return (
    <>
      <h1 className="title-carousel">{props.title}</h1>
      <Box sx={{ width: "100%", height: "110px", bgcolor: "transparent", overflow: "auto" }}>
        <List style={{ padding: 0 }}>
          {slides.map((slide: ItemData) => (
            <ListItem disablePadding key={slide.id}>
              <ListItemButton disableRipple>
                <Box
                  sx={{
                    width: "100%",
                    padding: "3px",
                    borderRadius: "10px",
                    backgroundColor: "#100F10",
                  }}
                >
                  <ListItemText
                    primary={`ID: ${slide.id}`}
                    secondary={
                      <div>
                        <hr />
                        <span className={classes.date}>Usuário: {slide.user_id}</span>
                        <span className={classes.time}>Modelo: {getModelInfo(slide)}</span>
                      </div>
                    }
                  />
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}

export default CarouselComponent;
