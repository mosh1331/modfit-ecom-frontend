'use client';

export default function ModtifLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="animate-pulse text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold uppercase tracking-wider bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent animate-shimmer">
          Modtif
        </h1>
        <p className="text-sm sm:text-base italic text-gray-400 mt-2 tracking-wide">
          Modest Wears
        </p>
      </div>
    </div>
  );
}
