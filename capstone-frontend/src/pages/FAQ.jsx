import "./FAQ.css";
import ModalPopulate from "../components/modal";
import AccountMenu from "../components/newHeader";
import ApplicationContext from "../applicationContext";
import { useContext } from "react";
function FAQ() {
  const { userEmail } = useContext(ApplicationContext);
  return (
    <div>
      <AccountMenu variable={userEmail} />
      <div className="faq-container">
        <h2 className="faq">Frequently Asked Question</h2>
        <h2 className="faq">Frequently Asked Question</h2>
        <h2 className="faq">Frequently Asked Question</h2>
        <h2 className="faq">Frequently Asked Question</h2>
        <h2 className="faq">Frequently Asked Question</h2>
        <h2 className="faq">Frequently Asked Question</h2>
      </div>
      <ModalPopulate />
    </div>
  );
}
export default FAQ;
