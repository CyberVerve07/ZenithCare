import Navbar from '@/components/public/Navbar';
import HeroSection from '@/components/public/HeroSection';
import TrustSection from '@/components/public/TrustSection';
import HospitalOverviewSection from '@/components/public/HospitalOverviewSection';
import PatientAnalyticsSection from '@/components/public/PatientAnalyticsSection';
import DepartmentsSection from '@/components/public/DepartmentsSection';
import DoctorsSection from '@/components/public/DoctorsSection';
import StaffManagementSection from '@/components/public/StaffManagementSection';
import AppointmentSection from '@/components/public/AppointmentSection';
import TestimonialsAndFAQ from '@/components/public/TestimonialsAndFAQ';
import Footer from '@/components/public/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 antialiased selection:bg-brand-primary selection:text-white">
      <Navbar />
      <HeroSection />
      <TrustSection />
      
      {/* Hospital Overview Wards & Live Telemetry Capacity */}
      <HospitalOverviewSection />

      {/* Interactive Patient Informatics & Telemetry Analytics */}
      <PatientAnalyticsSection />
      
      {/* Specialized Medical Departments */}
      <DepartmentsSection />
      
      {/* Board-Certified Specialist Consultants */}
      <DoctorsSection />
      
      {/* Internal Staff Scheduling & Roster MIS Preview */}
      <StaffManagementSection />
      
      {/* Secure Online Appointment Booking Engine */}
      <AppointmentSection />
      
      {/* Patient Stories & FAQ Accordion */}
      <TestimonialsAndFAQ />
      
      {/* Premium Footer with hospital certification badges */}
      <Footer />
    </main>
  );
}
