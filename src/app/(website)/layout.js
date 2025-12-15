import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WebsiteLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto p-6 flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  )
}
