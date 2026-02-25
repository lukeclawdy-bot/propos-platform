import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-warm-white min-h-screen">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-8 font-serif">{title}</h1>
          <div className="prose prose-sm max-w-none text-text-main [&_h2]:text-navy [&_h2]:font-serif [&_h2]:text-xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-navy [&_h3]:text-base [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-text-light [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:text-text-light [&_ul]:mb-4 [&_li]:mb-1 [&_a]:text-teal [&_a]:underline">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
