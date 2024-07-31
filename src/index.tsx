import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from 'components/AuthContext';

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(<AuthProvider><App /></AuthProvider>)
