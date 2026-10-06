import React, { useState } from 'react';
import { Navbar } from '@/components/common/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { ManifestoSection } from '@/components/landing/ManifestoSection';
import { TracksSection } from '@/components/landing/TracksSection';
import { SpeakersSection } from '@/components/landing/SpeakersSection';
import { ScheduleSection } from '@/components/landing/ScheduleSection';
import { TicketTiersSection } from '@/components/landing/TicketTiersSection';
import { RegistrationSection } from '@/components/landing/RegistrationSection';
import { RegistrationModal } from '@/components/landing/RegistrationModal';
import { FaqSection } from '@/components/landing/FaqSection';
import { Footer } from '@/components/common/Footer';
import { SupabaseConfigModal } from '@/components/admin/SupabaseConfigModal';

export const LandingPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>('all-access');
  const [configModalOpen, setConfigModalOpen] = useState(false);

  const handleOpenRegister = (tierId?: string) => {
    if (tierId) {
      setSelectedTier(tierId);
    }
    setModalOpen(true);
  };

  const handleScrollToRegister = (tierId?: string) => {
    if (tierId) {
      setSelectedTier(tierId);
    }
    const elem = document.getElementById('register');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      setModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-neutral-100 flex flex-col font-sans">
      {/* Navigation */}
      <Navbar
        onRegisterClick={() => handleOpenRegister()}
        onOpenSupabaseConfig={() => setConfigModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection onRegisterClick={() => handleScrollToRegister()} />
        <ManifestoSection />
        <TracksSection />
        <SpeakersSection />
        <ScheduleSection />
        <TicketTiersSection onSelectTier={(tierId) => handleScrollToRegister(tierId)} />
        <RegistrationSection onOpenSupabaseConfig={() => setConfigModalOpen(true)} />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onOpenSupabaseConfig={() => setConfigModalOpen(true)} />

      {/* Slide-over / Modal for quick registration from navbar or buttons */}
      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedTier={selectedTier}
        onOpenSupabaseConfig={() => setConfigModalOpen(true)}
      />

      {/* Database Setup Modal */}
      <SupabaseConfigModal
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
      />
    </div>
  );
};
