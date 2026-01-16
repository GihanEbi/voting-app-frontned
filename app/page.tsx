"use client";
import Link from "next/link";
import { useWeb3 } from "../context/Web3Context";

export default function Home() {
  const { isConnected, rounds, activeRound } = useWeb3();

  // Simple calculated stats
  const totalRounds = rounds.length;
  const totalPool = rounds.reduce(
    (acc, r) => acc + parseFloat(r.totalRewardPool),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 pt-10 animate-in fade-in duration-500">
      <section className="relative mb-20 py-20 text-center">
        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase">
          {activeRound
            ? `Live: ${activeRound.title}`
            : "Decentralized Voting System"}
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
          Vote. Earn. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
            Govern.
          </span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
          Participate in on-chain governance rounds. Top candidates earn
          automatic rewards via Smart Contracts.
        </p>

        <div className="flex justify-center gap-4">
          {isConnected ? (
            <Link
              href="/explore"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-primary/25"
            >
              Vote Now
            </Link>
          ) : (
            <button className="bg-slate-800 text-slate-500 px-8 py-4 rounded-xl font-bold text-lg cursor-not-allowed border border-slate-700">
              Connect Wallet First
            </button>
          )}
          <Link
            href="/leaderboard"
            className="bg-surface-dark border border-border-dark hover:bg-white/5 px-8 py-4 rounded-xl font-bold text-lg transition"
          >
            View Leaderboard
          </Link>
        </div>
      </section>

      {/* Live Blockchain Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <StatBox label="Total Rounds" value={totalRounds.toString()} />
        <StatBox
          label="Rewards Distributed"
          value={`${totalPool.toFixed(1)} TKN`}
          color="text-accent-gold"
        />
        <StatBox
          label="Active Status"
          value={activeRound ? "Voting Open" : "Standby"}
          color={activeRound ? "text-green-500" : "text-slate-500"}
        />
      </section>
    </div>
  );
}

const StatBox = ({ label, value, color = "text-white" }: any) => (
  <div className="p-8 bg-surface-dark border border-border-dark rounded-2xl text-center hover:border-primary/30 transition">
    <p className="text-slate-500 uppercase text-xs font-bold tracking-widest mb-2">
      {label}
    </p>
    <p className={`text-3xl font-black ${color}`}>{value}</p>
  </div>
);
