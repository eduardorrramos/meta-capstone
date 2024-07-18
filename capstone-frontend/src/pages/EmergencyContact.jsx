import ModalPopulate from "../components/modal";
import ApplicationContext from "../applicationContext";
import { useContext } from "react";
import AccountMenu from "../components/newHeader";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";

function EmergencyContact() {
  const { socket } = useContext(ApplicationContext);
  const variable = sessionStorage.getItem('email')

  const sendAlert = () => {
    const websocket = socket.current;
    websocket.send(`Front-End Emergency Alert: User 1${variable}`);
  };

  return (
    //header passed variable propm, look into this opposed to context and
    <Grid container spacing={2}>
      <AccountMenu variable={variable} />
      <Grid xs={12}>
        <Button variant="contained" onClick={sendAlert}>
          Emergency Alert
        </Button>
      </Grid>
      <ModalPopulate />
    </Grid>
  );
}
export default EmergencyContact;
