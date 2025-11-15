export function Header() {
  return (
    <header
     className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-8 h-16
      text-white mix-blend-difference`}
    >
      <div className="text-xl font-bold">Logo</div>
      <div className="text-lg italic">Claim/Lema</div>
    </header>
  );
}