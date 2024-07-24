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
      <section class="resources-section">
          <h2>Resources</h2>
          <ul>
            <li>
              <a href="#">Resource 1</a>
            </li>
            <li>
              <a href="#">Resource 2</a>
            </li>
            <li>
              <a href="#">Resource 3</a>
            </li>
          </ul>
        </section>
      <ModalPopulate />
    </div>
  );
}
export default FAQ;
