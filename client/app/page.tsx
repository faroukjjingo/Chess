'use client';

import { useSession } from 'next-auth/react';
import ChessboardComponent from '../components/Chessboard';
import LoginButton from '../components/LoginButton';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Chess App</h1>
      {session ? (
        <div>
          <p>Welcome, {session.user?.name}</p>
          <ChessboardComponent />
        </div>
      ) : (
        <LoginButton />
      )}
    </main>
  );
}
