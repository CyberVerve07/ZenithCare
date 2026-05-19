import { redirect } from 'next/navigation';

// Redirect /login → /mis/login for backward compatibility
export default function LoginRedirect() {
  redirect('/mis/login');
}
