import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Telehealth App',
    short_name: 'Telehealth',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/assets/icon/app-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/icon/app-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}