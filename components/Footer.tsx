export const Footer = () => {
  return (
    <footer className="border-t border-border-dark/30 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="size-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">
              how_to_vote
            </span>
          </div>
          <span className="font-extrabold tracking-tight">VOTE.io</span>
        </div>
        <div className="flex gap-8 text-sm text-slate-500 font-medium">
          <a className="hover:text-white transition-colors" href="#">
            Docs
          </a>
          <a className="hover:text-white transition-colors" href="#">
            Governance Forum
          </a>
          <a className="hover:text-white transition-colors" href="#">
            Discord
          </a>
          <a className="hover:text-white transition-colors" href="#">
            X / Twitter
          </a>
        </div>
        <p className="text-slate-500 text-xs">
          © 2024 VOTE.io. Built for the community.
        </p>
      </div>
    </footer>
  );
};
