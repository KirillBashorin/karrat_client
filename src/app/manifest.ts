import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Karrat',
    short_name: 'Karrat',
    description: 'Karrat',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    // icons: [
    //   {
    //     src: '/favicon.ico',
    //     sizes: 'any',
    //     type: 'image/x-icon',
    //   },
    //   { src: './favicons/192.png', type: 'image/png', sizes: '192x192' },
    //   { src: './favicons/512.png', type: 'image/png', sizes: '512x512' },
    // ],
  };
}
