const Background = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute inset-0  bg-gradient-radial from-cyan-400/40 via-sky-500/30 
      via-30%  to-75%"
      />
      <div
        className="absolute inset-0
       bg-[radial-gradient(ellipse_at_center,rgba(103,232,249,0.3)_0%,rgba(56,189,248,0.25)_20%,rgba(20,184,166,0.15)_40%,rgba(186,230,253,0.05)_60%,transparent_80%)]"
      />
    </div>
  );
};

export default Background;
