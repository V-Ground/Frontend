import '../styles/globals.css';
import Header from "../src/component/Header";
import Footer from "../src/component/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp
