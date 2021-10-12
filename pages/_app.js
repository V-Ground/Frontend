import '../styles/globals.css';
import { useRouter } from "next/router";
import Header from "../src/component/Header";
import Footer from "../src/component/Footer";
import GroundHeader from "../src/component/ground-header";
import GroundSidebar from "../src/component/ground-sidebar";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  if (router.pathname === "/ground") {
    return (
      <div style={{ display: "flex" }}>
        <GroundHeader />
        <GroundSidebar />
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
