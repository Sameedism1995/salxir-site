import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { NavKey } from '@/lib/site';

/**
 * Standard page frame: announcement + header + content + full footer.
 * Keeps every page's chrome identical and DRY.
 */
export default function PageShell({
  active = null,
  showDisclaimer = true,
  longDisclaimer = false,
  children,
}: {
  active?: NavKey;
  showDisclaimer?: boolean;
  longDisclaimer?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Navbar active={active} />
      {children}
      <Footer showDisclaimer={showDisclaimer} longDisclaimer={longDisclaimer} />
    </>
  );
}
