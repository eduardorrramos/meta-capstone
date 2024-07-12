import Header from "../components/header";
import { useParams } from "react-router-dom";
import ModalPopulate from "../components/modal";

function EmergencyContact() {
  const params = useParams();
  const variable = params.userid;

  return (
    <div>
      <Header variable={variable} />
      <h1>Emergency Contacts</h1>
      <ModalPopulate/>
    </div>
  );
}
export default EmergencyContact;
