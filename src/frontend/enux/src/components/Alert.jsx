import {Fragment} from 'react'
import {connect} from 'react-redux'

import {
    CheckCircleIcon,
    XCircleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon
} from '@heroicons/react/solid'

const Alert = ({ alert }) => {

    const displayAlert = () => {
        if (alert !== null){
            let bgColor;
            let icon;
            switch (alert.alertType) {
                case 'error':
                    bgColor = 'bg-red-600'
                    icon = <XCircleIcon className={`h-5 w-5 text-white`} aria-hidden="true" />
                    break;
                case 'warning':
                    bgColor = 'bg-amber-600'
                    icon = <ExclamationCircleIcon className={`h-5 w-5 text-white`} aria-hidden="true" />
                    break;
                case 'info':
                    bgColor = 'bg-sky-600'
                    icon = <InformationCircleIcon className={`h-5 w-5 text-white`} aria-hidden="true" />
                    break;
                case 'success':
                        bgColor = 'bg-green-600'
                        icon = <CheckCircleIcon className={`h-5 w-5 text-white`} aria-hidden="true" />
                        break;
                default:
                    bgColor = 'bg-sky-600'
                    icon = <InformationCircleIcon className={`h-5 w-5 text-white`} aria-hidden="true" />
                    break;
            }

            return (
                <div className={`rounded-md ${bgColor} py-3 px-4`}>
                    <div className="flex">
                        <div className="flex-shrink-0">
                        {icon}
                        </div>
                        <div className="ml-3">
                        <p className={`text-sm font-medium text-white`}>{alert.msg || 'Something was wrong.'}</p>
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