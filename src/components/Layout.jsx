import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div
      className="
        relative
        min-h-screen
        flex
        overflow-hidden
        bg-[#050816]
        text-white
      "
    >
      {/* GLOBAL BACKGROUND */}
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top_left,rgba(0,255,255,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_35%),linear-gradient(to_bottom_right,#050816,#070a14,#0b1220)]
          pointer-events-none
        "
      />

      {/* SOFT NOISE GRID (SMOOTH VERSION) */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.02]
          bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]
          bg-[size:90px_90px]
          pointer-events-none
        "
      />

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <main
        className="
          relative
          z-10
          flex-1
          overflow-y-auto
          overflow-x-hidden
          p-3
          md:p-6
          lg:p-8
          pb-28
          lg:pb-8
        "
      >
        <div
          className="
            relative
            min-h-[calc(100vh-24px)]
            rounded-[34px]
            overflow-hidden

            bg-white/[0.03]
            backdrop-blur-2xl

            border
            border-cyan-400/15

            shadow-[0_0_25px_rgba(34,211,238,0.08),0_0_90px_rgba(168,85,247,0.08)]

            before:absolute
            before:inset-0
            before:rounded-[34px]
            before:p-[1px]
            before:bg-gradient-to-br
            before:from-cyan-400/40
            before:via-fuchsia-500/25
            before:to-blue-500/30
            before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
            before:[mask-composite:exclude]
            before:pointer-events-none
          "
        >
          {/* TOP LIGHT */}
          <div
            className="
              absolute
              top-0
              left-0
              w-full
              h-40
              bg-gradient-to-b
              from-cyan-400/10
              to-transparent
              pointer-events-none
            "
          />

          {/* PURPLE GLOW */}
          <div
            className="
              absolute
              -top-28
              -right-28
              w-96
              h-96
              rounded-full
              bg-fuchsia-500/15
              blur-3xl
              pointer-events-none
            "
          />

          {/* BLUE GLOW */}
          <div
            className="
              absolute
              bottom-0
              left-0
              w-80
              h-80
              rounded-full
              bg-cyan-400/10
              blur-3xl
              pointer-events-none
            "
          />

          {/* CONTENT */}
          <div
            className="
              relative
              z-10
              p-4
              md:p-6
              lg:p-8
            "
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}