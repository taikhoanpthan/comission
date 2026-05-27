import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div
      className="
        min-h-screen
        flex
        bg-gradient-to-br
        from-slate-100
        via-slate-50
        to-white
        overflow-hidden
      "
    >
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <main
        className="
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
            rounded-[36px]
            bg-white/55
            backdrop-blur-3xl
            border
            border-white/60
            shadow-[0_10px_60px_rgba(15,23,42,0.08)]
            overflow-hidden
          "
        >
          {/* IOS LIGHT EFFECT */}
          <div
            className="
              absolute
              top-0
              left-0
              w-full
              h-40
              bg-gradient-to-b
              from-white/70
              to-transparent
              pointer-events-none
            "
          />

          {/* DECOR BLUR */}
          <div
            className="
              absolute
              -top-20
              -right-20
              w-72
              h-72
              rounded-full
              bg-blue-200/30
              blur-3xl
              pointer-events-none
            "
          />

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