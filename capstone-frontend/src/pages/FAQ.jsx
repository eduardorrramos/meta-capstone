import "./FAQ.css";
import ModalPopulate from "../components/modal";
import AccountMenu from "../components/newHeader";
import ApplicationContext from "../applicationContext";

function FAQ() {
  const { userEmail } = useContext(ApplicationContext);
  const variable = userEmail
  return (
    <div>
      <AccountMenu variable={variable} />
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
