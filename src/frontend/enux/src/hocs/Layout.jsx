import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { check_authenticated, load_user } from '../redux/actions/auth';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';

const Layout = (props) => {

    useEffect(() => {
        props.check_authenticated()
        props.load_user()
    }, []);

    return (
        <div>
            <Navbar/>
            <ToastContainer autoClose={5000} />
            {props.children}
            <Footer />
        </div>
    )
};

const LayoutConnect = connect(null, {
    check_authenticated,
    load_user,
    // refresh
}) (Layout);
export default LayoutConnect;