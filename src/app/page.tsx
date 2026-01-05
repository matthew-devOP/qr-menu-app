export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-primary">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-light">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-display font-bold text-brand-primary">
            INFINITY LOUNGE
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-display font-bold text-brand-primary">
            Bine ai venit!
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Aplicația ta de meniu digital este în curs de dezvoltare.
            <br />
            În curând vei putea explora meniul nostru interactiv.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl border border-border-light bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">🍽️</div>
              <h3 className="font-semibold text-brand-primary mb-2">Meniu Digital</h3>
              <p className="text-sm text-text-secondary">
                Explorează categoriile și produsele noastre
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border-light bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold text-brand-primary mb-2">Cod QR</h3>
              <p className="text-sm text-text-secondary">
                Acces rapid prin scanare QR code
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border-light bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-semibold text-brand-primary mb-2">Multi-lingvistic</h3>
              <p className="text-sm text-text-secondary">
                Disponibil în Română și Engleză
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 max-w-2xl mx-auto">
            <p className="text-sm font-medium text-brand-primary">
              🚀 Sprint 1 - Foundation & Setup
            </p>
            <p className="text-xs text-text-secondary mt-2">
              Status: Next.js configurat cu succes ✅
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-auto py-8 border-t border-border-light">
        <div className="container mx-auto px-4 text-center text-sm text-text-muted">
          <p>&copy; {new Date().getFullYear()} INFINITY LOUNGE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
