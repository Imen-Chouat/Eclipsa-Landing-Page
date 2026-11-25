import Background from './components/layout/Background';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Agenda from './components/sections/Agenda';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#070312] text-white overflow-x-hidden">

      <Background />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <div className="h-[1600px]" />
        <main className="flex-grow">
          <Hero />
          <About />
          <Agenda />
        </main>

        <Footer />
      </div>
    </div>
  );
}
