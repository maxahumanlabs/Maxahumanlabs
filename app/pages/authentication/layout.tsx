import { notFound } from 'next/navigation';

/**
 * TEMPORARILY DISABLED.
 *
 * This route serves the verification-code form, which posts to /api/verify-code.
 * That endpoint marks a code as used by writing maxahumanverificationcode.xlsx
 * back to disk — which cannot work on Vercel: the deployment filesystem is
 * read-only, so a customer entering a *valid* code gets a 500 instead of a
 * confirmation. Until the code status is moved to a database, the route is
 * hidden rather than left returning errors to customers.
 *
 * The page component is left untouched — delete this file to re-enable it.
 */
export default function AuthenticationLayout() {
  notFound();
}
