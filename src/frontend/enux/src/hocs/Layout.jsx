import { useEffect } from 'react';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuthenticated, load_user } from '../redux/actions/auth';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import Alert from '../components/Alert'

const Layout = ({ checkAuthenticated, load_user, children }) => {

    useEffect(() => {
        checkAuthenticated()
        load_user()
    }, [checkAuthenticated, load_user]);

    return (
        <div>
            <Navbar/>
            {children}
            <Footer />
            
            <Alert />
        </div>
    )
};

const LayoutConnect = connect(null, {
    checkAuthenticated,
    load_user,
    // refresh
}) (Layout);
export default LayoutConnect;