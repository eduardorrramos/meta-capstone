import Header from "../components/header";
import { useParams } from "react-router-dom";
import ModalPopulate from "../components/modal";

function EmergencyContact() {
  const params = useParams();
  const variable = params.userid;
  const sendAlert = () => {
    websocket.send(`Front-End Emergency Alert: User ${userId}`);
  };
  return (
    <div>
      <Header variable={variable} />
      <h1>Emergency Contacts</h1>
      <button onClick={sendAlert}></button>
      <ModalPopulate/>
    </div>
  );
}
export default EmergencyContact;
