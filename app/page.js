import { Footer, Navbar } from '../components';
import { About, Explore, Feedback, GetStarted, Hero, Insights, WhatsNew, World } from '../sections';
import SearchDialog from '../components/SearchDialog.jsx'; // Import the new component

const Page = () => (
  <div className="bg-primary-black overflow-hidden">
    <Navbar />
    <Hero />
    {/* <div className="gradient-03 z-0" /> */}
    <div className="relative">
      {/* <About /> */}
      <div className="gradient-03 z-0" />
      <Explore />
    </div>
    <div className="relative">
      <World />
      <GetStarted />
      <div className="gradient-04 z-0" />
      {/* <WhatsNew /> */}
    </div>
    
    <div className="relative">
      <Insights />
      <div className="gradient-04 z-0" />
      {/* <Feedback /> */}
    </div>
    <Footer />
    
    {/* Add the search dialog component */}
    <SearchDialog />
  </div>
);

export default Page;