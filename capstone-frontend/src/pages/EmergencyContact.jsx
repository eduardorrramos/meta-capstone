import Header from "../components/header"
import {useParams} from 'react-router-dom'

function EmergencyContact() {
    const params = useParams();
    const variable = params.fourthid

    return (
        <div>
            <Header variable={variable}/>
            <h1>Emergency Contacts</h1>
        </div>
    )
}
export default EmergencyContact