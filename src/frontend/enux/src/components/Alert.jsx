import {Fragment} from 'react'
import {connect} from 'react-redux'

import { CheckCircleIcon } from '@heroicons/react/solid'

const Alert = ({ alert }) => {

    const displayAlert = () => {
        if (alert !== null){
            return (
                <div className={`rounded-md bg-${alert.alertType}-600 p-4`}>
                    <div className="flex">
                        <div className="flex-shrink-0">
                        <CheckCircleIcon className={`h-5 w-5 text-white`} aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                        <p className={`text-sm font-medium text-white`}>{alert.msg}</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <Fragment></Fragment>
            )
        }
    }

    return (
        <Fragment>
            {displayAlert()}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    alert: state.Alert.alert
})

const AlertConnect = connect(mapStateToProps)(Alert)
export default AlertConnect;