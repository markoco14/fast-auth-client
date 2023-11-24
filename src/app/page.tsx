import LoginSignup from "@/modules/auth/components/LoginSignup";
import Navbar from "@/components/Navbar";

export default function Home() {

  return (
    <>
      <header className="mb-16 h-[48px] shadow">
        <Navbar />
      </header>
      <main>
        <LoginSignup />
      </main>
    </>
  );
}
