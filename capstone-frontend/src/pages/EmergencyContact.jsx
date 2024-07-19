import ModalPopulate from "../components/modal";
import ApplicationContext from "../applicationContext";
import { useContext } from "react";
import AccountMenu from "../components/newHeader";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";

function EmergencyContact() {
  const { socket, userEmail } = useContext(ApplicationContext);
  const variable = userEmail

  const sendAlert = () => {
    const websocket = socket.current;
    websocket.send(`Front-End Emergency Alert: User 1${variable}`);
  };

  return (
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
