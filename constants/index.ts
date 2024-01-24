export const NavLinks = [
  { url: '/', image: '/assets/icons/home.svg', label: 'Accueil' },
  { url: '/threads', image: '/assets/icons/threads.svg', label: 'Threads' },
  { url: '/create', image: '/assets/icons/create.svg', label: 'Créer un Thread' },
  { url: '/profile', image: '/assets/icons/user.svg', label: 'Profil' },
  { url: '/settings', image: '/assets/icons/settings.svg', label: 'Options' },
]

export const AdminNavLinks = [
  { url: '/admin/dashboard', image: '/assets/icons/dashboard.svg', label: 'Dashboard' },
  { url: '/admin/users', image: '/assets/icons/users.svg', label: 'Users' },
  { url: '/admin/threads', image: '/assets/icons/threads.svg', label: 'Threads' }
]

export const threadDefaultValues = {
  title: '',
  description: '',
  summary: '',
  imageUrl: '',
}