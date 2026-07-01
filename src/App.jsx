import Navbar from './components/Navbar';
import SawBlade from './components/SawBlade';
import Hero from './sections/Hero';
import Overview from './sections/Overview';
import Machine from './sections/Machine';
import Components from './sections/Components';
import Engineering from './sections/Engineering';
import Software from './sections/Software';
import Monitoring from './sections/Monitoring';
import Analytics from './sections/Analytics';
import Maintenance from './sections/Maintenance';
import ProductionLine from './sections/ProductionLine';
import Gallery from './sections/Gallery';
import Documents from './sections/Documents';
import References from './sections/References';
import Team from './sections/Team';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <SawBlade />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Overview />
        <Machine />
        <Components />
        <Engineering />
        <Software />
        <Monitoring />
        <Analytics />
        <Maintenance />
        <ProductionLine />
        <Gallery />
        <Documents />
        <References />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
