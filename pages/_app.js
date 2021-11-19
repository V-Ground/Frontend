import '../styles/globals.css';
import { useRouter } from "next/router";
import Header from "../src/component/Header";
import Footer from "../src/component/Footer";
import GroundHeader from "../src/component/ground-header";
import TestHeader from "../src/component/test-header";
import Axios from 'axios';

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:8080/api';
Axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  if (router.pathname === "/ground" || /ground/g.exec(router.route) || router.pathname === "/admin/ground" || router.pathname === "/test-ground" || /test-ground/g.exec(router.route) || router.pathname === "/class-ground") {
    return (
      <div style={{ display: "flex" }}>
        <GroundHeader />
        <Component {...pageProps} />
      </div>
    )
  }

  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp
