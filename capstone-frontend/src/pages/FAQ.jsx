import Header from "../components/header";
import "./FAQ.css";
import { useParams } from "react-router-dom";
import ModalPopulate from "../components/modal";

function FAQ() {
  const params = useParams();
  const variable = params.userid;
  return (
    <div>
      <Header variable={variable} />
      <div className="faq-container">
        <h2 className="faq">Frequently Asked Question</h2>
        <h2 className="faq">Frequently Asked Question</h2>
        <h2 className="faq">Frequently Asked Question</h2>
        <h2 className="faq">Frequently Asked Question</h2>
        <h2 className="faq">Frequently Asked Question</h2>
        <h2 className="faq">Frequently Asked Question</h2>
      </div>
      <ModalPopulate/>
    </div>
  );
}
export default FAQ;
