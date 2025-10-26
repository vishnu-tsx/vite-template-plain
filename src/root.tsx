import React, { useState, useEffect } from 'react';
import "./app.css";

// @ts-expect-error @fontsource-variable is not typed
import "@fontsource-variable/geist";

import type { MetaDescriptor } from "react-router";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import { AppProviders } from "~/components/providers";
import { supabase } from '~/lib/supabaseClient';
import Auth from '~/components/Auth';
import Account from '~/components/Account';
import type { Session } from '@supabase/supabase-js';

export function meta() {
	return [
		{ title: "Vite Template Plain" },
		{ name: "description", content: "Vite Template Plain" },
	] satisfies MetaDescriptor[];
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AppProviders>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? <Auth /> : <Account session={session} />}
      </div>
    </AppProviders>
  );
}
