'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Settings as SettingsIcon, User, Lock } from 'lucide-react'
import { toast } from 'sonner'

interface VenueData {
  id?: string
  name: string
  description?: string
  address?: string
  phone?: string
  email?: string
  logo?: string
}

interface ProfileData {
  id?: string
  name: string
  email: string
}

export default function AdminSettingsPage() {
  // Venue state
  const [venue, setVenue] = useState<VenueData>({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    logo: '',
  })
  const [isSavingVenue, setIsSavingVenue] = useState(false)

  // Profile state
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    email: '',
  })
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  // Password state
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  // Loading states
  const [isLoadingVenue, setIsLoadingVenue] = useState(true)
  const [isLoadingProfile, setIsLoadingProfile] = useState(true)

  // Fetch venue data
  useEffect(() => {
    async function fetchVenue() {
      try {
        const response = await fetch('/api/settings/venue')
        if (response.ok) {
          const data = await response.json()
          setVenue({
            id: data.id,
            name: data.name || '',
            description: data.description || '',
            address: data.address || '',
            phone: data.phone || '',
            email: data.email || '',
            logo: data.logo || '',
          })
        }
      } catch (error) {
        console.error('Error fetching venue:', error)
      } finally {
        setIsLoadingVenue(false)
      }
    }
    fetchVenue()
  }, [])

  // Fetch profile data
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch('/api/settings/profile')
        if (response.ok) {
          const data = await response.json()
          setProfile({
            id: data.id,
            name: data.name || '',
            email: data.email || '',
          })
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setIsLoadingProfile(false)
      }
    }
    fetchProfile()
  }, [])

  // Save venue
  const handleSaveVenue = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingVenue(true)

    try {
      const response = await fetch('/api/settings/venue', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(venue),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Eroare la salvare')
      }

      toast.success('Informațiile venue au fost salvate!')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Eroare la salvare')
    } finally {
      setIsSavingVenue(false)
    }
  }

  // Save profile
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingProfile(true)

    try {
      const response = await fetch('/api/settings/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Eroare la salvare')
      }

      toast.success('Profilul a fost actualizat!')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Eroare la salvare')
    } finally {
      setIsSavingProfile(false)
    }
  }

  // Change password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('Parolele nu coincid')
      return
    }

    if (passwords.newPassword.length < 6) {
      toast.error('Parola nouă trebuie să aibă minim 6 caractere')
      return
    }

    setIsChangingPassword(true)

    try {
      const response = await fetch('/api/settings/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Eroare la schimbarea parolei')
      }

      toast.success('Parola a fost schimbată!')
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Eroare la schimbarea parolei')
    } finally {
      setIsChangingPassword(false)
    }
  }

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

          {isLoadingVenue ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <form onSubmit={handleSaveVenue} className="space-y-4">
              <div>
                <Label htmlFor="venue-name">Nume *</Label>
                <Input
                  id="venue-name"
                  value={venue.name}
                  onChange={(e) => setVenue({ ...venue, name: e.target.value })}
                  placeholder="Numele localului"
                  required
                />
              </div>

              <div>
                <Label htmlFor="venue-address">Adresă</Label>
                <Input
                  id="venue-address"
                  value={venue.address || ''}
                  onChange={(e) => setVenue({ ...venue, address: e.target.value })}
                  placeholder="Adresa completă"
                />
              </div>

              <div>
                <Label htmlFor="venue-phone">Telefon</Label>
                <Input
                  id="venue-phone"
                  type="tel"
                  value={venue.phone || ''}
                  onChange={(e) => setVenue({ ...venue, phone: e.target.value })}
                  placeholder="+40 XXX XXX XXX"
                />
              </div>

              <div>
                <Label htmlFor="venue-email">Email</Label>
                <Input
                  id="venue-email"
                  type="email"
                  value={venue.email || ''}
                  onChange={(e) => setVenue({ ...venue, email: e.target.value })}
                  placeholder="contact@example.com"
                />
              </div>

              <div>
                <Label htmlFor="venue-logo">URL Logo</Label>
                <Input
                  id="venue-logo"
                  type="url"
                  value={venue.logo || ''}
                  onChange={(e) => setVenue({ ...venue, logo: e.target.value })}
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSavingVenue}>
                {isSavingVenue ? 'Se salvează...' : 'Salvează Modificările'}
              </Button>
            </form>
          )}
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

          {isLoadingProfile ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <Label htmlFor="profile-name">Nume Complet</Label>
                <Input
                  id="profile-name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Numele tău"
                />
              </div>

              <div>
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSavingProfile}>
                {isSavingProfile ? 'Se salvează...' : 'Actualizează Profilul'}
              </Button>
            </form>
          )}
        </Card>

        {/* Change Password */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-brand-secondary" />
            </div>
            <h2 className="text-xl font-display font-bold text-brand-primary">
              Schimbă Parola
            </h2>
          </div>

          <form onSubmit={handleChangePassword} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="current-password">Parola Curentă</Label>
              <Input
                id="current-password"
                type="password"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <Label htmlFor="new-password">Parola Nouă</Label>
              <Input
                id="new-password"
                type="password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirm-password">Confirmă Parola</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="md:col-span-3">
              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? 'Se schimbă...' : 'Schimbă Parola'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
