export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        /* Hide site header and footer on Keystatic admin pages */
        body > header,
        body > footer {
          display: none !important;
        }
        body > main {
          padding-bottom: 0 !important;
        }
      `}</style>
      <div className="min-h-screen">
        {children}
      </div>
    </>
  );
}
