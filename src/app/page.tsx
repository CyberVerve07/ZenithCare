import Navbar from '@/components/public/Navbar';
import HeroSection from '@/components/public/HeroSection';
import DepartmentsSection from '@/components/public/DepartmentsSection';
import DoctorsSection from '@/components/public/DoctorsSection';
import ServicesSection from '@/components/public/ServicesSection';
import AppointmentSection from '@/components/public/AppointmentSection';
import TestimonialsAndFAQ from '@/components/public/TestimonialsAndFAQ';
import Footer from '@/components/public/Footer';
import TrustSection from '@/components/public/TrustSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <DepartmentsSection />
      <DoctorsSection />
      <ServicesSection />
      <AppointmentSection />
      <TestimonialsAndFAQ />
      <Footer />
    </main>
  );
}
