import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Settings as SettingsIcon, User, Lock, Palette, Globe } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-brand-primary">
          Setări
        </h1>
        <p className="text-text-secondary mt-1">
          Configurează setările aplicației
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Venue Information */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-brand-secondary" />
            </div>
            <h2 className="text-xl font-display font-bold text-brand-primary">
              Informații Venue
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="venue-name">Nume</Label>
              <Input
                id="venue-name"
                defaultValue="INFINITY LOUNGE"
                placeholder="Numele localului"
              />
            </div>

            <div>
              <Label htmlFor="venue-address">Adresă</Label>
              <Input
                id="venue-address"
                defaultValue="Str. Exemplu 123, București"
                placeholder="Adresa completă"
              />
            </div>

            <div>
              <Label htmlFor="venue-phone">Telefon</Label>
              <Input
                id="venue-phone"
                type="tel"
                defaultValue="+40 123 456 789"
                placeholder="+40 XXX XXX XXX"
              />
            </div>

            <div>
              <Label htmlFor="venue-email">Email</Label>
              <Input
                id="venue-email"
                type="email"
                defaultValue="contact@infinitylounge.ro"
                placeholder="contact@example.com"
              />
            </div>

            <Button className="w-full">Salvează Modificările</Button>
          </div>
        </Card>

        {/* Profile Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-brand-secondary" />
            </div>
            <h2 className="text-xl font-display font-bold text-brand-primary">
              Profilul Meu
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="profile-name">Nume Complet</Label>
              <Input
                id="profile-name"
                defaultValue="Admin INFINITY LOUNGE"
                placeholder="Numele tău"
              />
            </div>

            <div>
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                type="email"
                defaultValue="admin@infinitylounge.ro"
                placeholder="email@example.com"
              />
            </div>

            <Button className="w-full">Actualizează Profilul</Button>
          </div>
        </Card>

        {/* Change Password */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-brand-secondary" />
            </div>
            <h2 className="text-xl font-display font-bold text-brand-primary">
              Schimbă Parola
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password">Parola Curentă</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <div>
              <Label htmlFor="new-password">Parola Nouă</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <div>
              <Label htmlFor="confirm-password">Confirmă Parola</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <Button className="w-full">Schimbă Parola</Button>
          </div>
        </Card>

        {/* Appearance Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-brand-secondary" />
            </div>
            <h2 className="text-xl font-display font-bold text-brand-primary">
              Aspect & Branding
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="primary-color">Culoare Primară</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="primary-color"
                  type="color"
                  defaultValue="#1a1a1a"
                  className="w-20 h-10"
                />
                <Input
                  defaultValue="#1a1a1a"
                  placeholder="#1a1a1a"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="secondary-color">Culoare Secundară</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="secondary-color"
                  type="color"
                  defaultValue="#fbbf24"
                  className="w-20 h-10"
                />
                <Input
                  defaultValue="#fbbf24"
                  placeholder="#fbbf24"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="logo-url">Logo URL</Label>
              <Input
                id="logo-url"
                type="url"
                placeholder="https://example.com/logo.png"
              />
            </div>

            <Button className="w-full">Salvează Aspectul</Button>
          </div>
        </Card>
      </div>

      {/* Language Settings */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
            <Globe className="w-5 h-5 text-brand-secondary" />
          </div>
          <h2 className="text-xl font-display font-bold text-brand-primary">
            Limbă & Localizare
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="default-language">Limba Implicită</Label>
            <select
              id="default-language"
              className="w-full px-4 py-2 border border-border-medium rounded-lg"
            >
              <option value="ro">Română</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <Label htmlFor="currency">Monedă</Label>
            <select
              id="currency"
              className="w-full px-4 py-2 border border-border-medium rounded-lg"
            >
              <option value="RON">RON (Lei)</option>
              <option value="EUR">EUR (Euro)</option>
              <option value="USD">USD (Dollar)</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <Button>Salvează Preferințele</Button>
        </div>
      </Card>
    </div>
  )
}
