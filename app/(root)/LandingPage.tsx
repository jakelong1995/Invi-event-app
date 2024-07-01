// Create by Thinh
import logopng from "../../public/assets/images/Invi.png";
import phonelight from "../../public/assets/images/phone-light.webm";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/shared/Footer";
import Header1 from "../../components/shared/Header";
import Image from 'next/image'

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/Invi/login");
  };

  return (
    <div className="bg-white mx-auto p-4 flex flex-col justify-between items-center h-screen">
      {/* navbar */}
      <Header1 />

      {/* body */}
      <div className="flex flex-col md:flex-row gap-16 justify-between w-full items-center max-w-5xl">
        <div className="flex flex-col max-w-sm gap-8 items-center text-center md:items-start md:text-left mx-auto">
          <Image src={logopng} alt="logo" className="w-16" />
          <h1 className="text-gray-800 font-semibold text-4xl md:text-5xl">
            Delightful events <span className="text-rose-400">start here.</span>{" "}
          </h1>
          <p className="text-gray-600">
            Set up an event page, invite friends and sell tickets. Host a
            memorable event today.
          </p>
          <button
            onClick={handleSignIn}
            className="px-6 py-2 bg-gray-800 rounded-lg text-white text-lg font-medium hover:bg-gray-600 border-none"
          >
            Create Your First Event
          </button>
        </div>

        <video
          autoPlay
          muted
          loop
          className="w-full md:max-w-lg md:mx-auto bg-transparent"
        >
          <source src={phonelight} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
