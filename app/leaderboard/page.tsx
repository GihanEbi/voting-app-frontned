"use client";
import React, { useState, useMemo } from "react";
import { useWeb3 } from "../../context/Web3Context";

export default function LeaderboardPage() {
  const { rounds, allCandidates, loading } = useWeb3();

  // Default to the most recent round if available
  const [selectedRoundId, setSelectedRoundId] = useState<number | null>(
    rounds.length > 0 ? rounds[0].id : null
  );

  // Get data for the selected round
  const currentRound = rounds.find((r) => r.id === selectedRoundId);
  const candidates = selectedRoundId
    ? allCandidates[selectedRoundId] || []
    : [];

  // Sort candidates by votes (High to Low)
  const sortedCandidates = useMemo(() => {
    return [...candidates].sort((a, b) => b.voteCount - a.voteCount);
  }, [candidates]);

  const top3 = sortedCandidates.slice(0, 3);
  const rest = sortedCandidates.slice(3);

  if (loading)
    return (
      <div className="p-10 text-center animate-pulse">
        Loading Leaderboard...
      </div>
    );

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-6 py-10">
      <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-bold mb-2">Leaderboard</h2>
          <p className="text-slate-400">
            View rankings for active and past rounds.
          </p>
        </div>

        {/* ROUND SELECTOR */}
        <div className="w-full md:w-64">
          <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
            Select Round
          </label>
          <select
            className="w-full bg-surface-dark border border-border-dark rounded-xl px-4 py-3 outline-none focus:border-primary text-white cursor-pointer"
            value={selectedRoundId || ""}
            onChange={(e) => setSelectedRoundId(Number(e.target.value))}
          >
            {rounds.map((r) => (
              <option key={r.id} value={r.id}>
                #{r.id} - {r.title} ({r.isActive ? "Active" : "Ended"})
              </option>
            ))}
          </select>
        </div>
      </header>

      {!currentRound ? (
        <div className="text-center text-slate-500 py-10">
          No rounds available.
        </div>
      ) : (
        <>
          {/* ROUND STATS */}
          <div className="flex gap-4 mb-10 text-sm">
            <div className="px-4 py-2 bg-surface-dark rounded-lg border border-border-dark">
              Status:{" "}
              <span
                className={
                  currentRound.isActive
                    ? "text-green-500 font-bold"
                    : "text-red-500 font-bold"
                }
              >
                {currentRound.isActive ? "Live" : "Ended"}
              </span>
            </div>
            <div className="px-4 py-2 bg-surface-dark rounded-lg border border-border-dark">
              Pool:{" "}
              <span className="text-accent-gold font-bold">
                {currentRound.totalRewardPool}
              </span>
            </div>
          </div>

          {/* PODIUM */}
          {top3.length > 0 ? (
            <section className="flex justify-center items-end gap-4 md:gap-8 mb-16 h-64 border-b border-border-dark/50 pb-16">
              {/* 2nd */}
              <div className="flex flex-col items-center w-1/3 max-w-[150px]">
                {top3[1] && (
                  <>
                    <p className="font-bold text-slate-300 mb-2">
                      {top3[1].name}
                    </p>
                    <div className="w-full h-32 bg-slate-600 rounded-t-xl flex items-end justify-center pb-2 shadow-xl relative">
                      <span className="text-4xl font-black text-black/30">
                        2
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-sm">
                      {top3[1].voteCount} Votes
                    </p>
                  </>
                )}
              </div>

              {/* 1st */}
              <div className="flex flex-col items-center w-1/3 max-w-[150px] z-10">
                {top3[0] && (
                  <>
                    <div className="mb-2 text-center">
                      <span className="material-symbols-outlined text-accent-gold text-4xl">
                        emoji_events
                      </span>
                      <p className="font-bold text-accent-gold text-lg">
                        {top3[0].name}
                      </p>
                    </div>
                    <div className="w-full h-48 bg-accent-gold rounded-t-xl flex items-end justify-center pb-2 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
                      <span className="text-5xl font-black text-black/30">
                        1
                      </span>
                    </div>
                    <p className="mt-2 font-mono font-bold text-lg">
                      {top3[0].voteCount} Votes
                    </p>
                  </>
                )}
              </div>

              {/* 3rd */}
              <div className="flex flex-col items-center w-1/3 max-w-[150px]">
                {top3[2] && (
                  <>
                    <p className="font-bold text-slate-300 mb-2">
                      {top3[2].name}
                    </p>
                    <div className="w-full h-24 bg-orange-700 rounded-t-xl flex items-end justify-center pb-2 shadow-xl">
                      <span className="text-4xl font-black text-black/30">
                        3
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-sm">
                      {top3[2].voteCount} Votes
                    </p>
                  </>
                )}
              </div>
            </section>
          ) : (
            <div className="text-center py-10 text-slate-500">
              No votes cast yet.
            </div>
          )}

          {/* LIST VIEW */}
          <div className="space-y-3 max-w-4xl mx-auto">
            {rest.map((c, i) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-4 bg-surface-dark border border-border-dark rounded-xl hover:border-primary/30 transition"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-slate-500 text-lg w-8 text-center">
                    #{i + 4}
                  </span>
                  <div>
                    <p className="font-bold">{c.name}</p>
                    <p className="text-xs text-slate-500">{c.wallet}</p>
                  </div>
                </div>
                <div className="font-mono font-bold text-lg">
                  {c.voteCount} Votes
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
