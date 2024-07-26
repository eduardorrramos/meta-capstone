import "./FAQ.css";
import ModalPopulate from "../components/modal";
import AccountMenu from "../components/header";
import ApplicationContext from "../applicationContext";
import { useContext } from "react";
import EmergencyAlert from "../components/emergencyAlert";
import { Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function FAQ() {
  const { userEmail } = useContext(ApplicationContext);
  return (
    <Grid
      container
      direction="row"
      style={{ height: "100vh", width: "100vw", backgroundColor: "#f0f2f5" }}
      justifyContent="center"
      alignItems="stretch"
    >
      <AccountMenu
        variable={userEmail}
        sx={{ zIndex: 1000, position: "sticky", top: 0, left: 0 }}
      />
      <Grid
        container
        direction="row"
        style={{ height: "100vh", width: "100vw" }}
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          Lg={12}
          sx={{ marginTop: "80px", height: "40px" }}
        >
          <section class="resources-section">
            <h2 className="pageTitle">Resources</h2>
            <ul>
              <li>
                <a href="https://www.cbp.gov/travel/us-citizens/know-before-you-go">
                  Know Before You Go
                </a>
              </li>
              <li>
                <a href="https://www.cbp.gov/travel/trusted-traveler-programs">
                  Trusted Travelers Programs
                </a>
              </li>
              <li>
                <a href="https://www.cbp.gov/about/contact/ports">
                  Port Information
                </a>
              </li>
            </ul>
          </section>
        </Grid>
        <Grid item xs={12} sm={12} md={10} Lg={10} sx={{ marginTop: "0px" }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>Who should opt in?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                It's important to note that the emergency response service
                should only be used in absolute emergencies. This service is a
                last resort and should only be used when there is an immediate
                threat to your safety or the safety of others. When you use this
                service, your coordinates and the name associated with your
                account will be sent out to emergency responders. This
                information will be used to locate you and provide assistance as
                quickly as possible. It's important to remember that using this
                service will also alert your emergency contacts, so it should
                only be used in situations where it is absolutely necessary. If
                you are in a situation where you need help, but it is not an
                absolute emergency, it may be better to try to find other ways
                to get assistance before using this service. Overall, the
                emergency response service is a valuable tool that can help save
                lives in emergency situations. However, it should only be used
                as a last resort and when there is an immediate threat to your
                safety or the safety of others.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography>
                Will my information be sold or distributed?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                No. All of the information you enter will feed directly into the
                Migra secure database. This information can only be accessed by
                system administrators and the data will never be sold or
                distributed to third parties.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>What do I do if I move?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                If you move after you have entered your information into the
                website you will need to go back into the website and toggle the
                emergency alert from your new address.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography>What is the point of this alert?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                When you trigger an emergency alert, a notification will be sent
                to all users currently on the platform. The alert will include
                your name and Google account email address, as well as your
                current location coordinates (latitude and longitude). This
                information will be shared with other users in the vicinity of
                your location, who may be able to provide assistance if it is
                safe to do so. Please note that this system is designed for use
                in genuine emergencies only, and should not be used for
                non-urgent situations or as a test. By using this system, you
                acknowledge that you understand its purpose and limitations.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} sm={12} md={10} Lg={10} sx={{ marginTop: "0px" }}>
          <EmergencyAlert />
        </Grid>
      </Grid>
      <ModalPopulate />
    </Grid>
  );
}
export default FAQ;
