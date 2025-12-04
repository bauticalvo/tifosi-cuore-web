import { SimpleMenu } from "../Header/Filter/ShopMenuData";

export const Footer = () => {

  const bautiUrl = import.meta.env.VITE_BAUTI_URL ;

  const BautiSpan = () => (
    <button className="text-bauti cursor-pointer">
      J.B.CALVO
    </button>
  );

  const renderMoreItems = () => {
    const items = SimpleMenu.more

    return items.map((item, i) => {
      if (item.text === "|") {
        return (
          <span key={i} className="text-light/40">
            |
          </span>
        );
      }

      const isExternal = item.url_a;
      const href = item.url_a || item.url;

      return isExternal ? (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-light hover:text-light/60 transition-colors"
        >
          {item.text}
        </a>
      ) : (
        <a
          key={i}
          href={href}
          className="text-light hover:text-light/60 transition-colors"
        >
          {item.text}
        </a>
      );
    });
  };

  return (
    <footer className="bg-primary text-light py-2 px-6 w-screen flex flex-col items-center justify-end border-t border-light">
      
      {/* ---------------- TOP BAR ---------------- */}
      <section className="flex space-x-4 p-2 items-center border-b border-light/10 w-full justify-center uppercase text-sm tracking-wide">
        {renderMoreItems()}
      </section>

      {/* ---------------- BOTTOM PART ---------------- */}
      <section className="flex space-x-2 py-2 px-10 items-center justify-between w-full">
        <p className="text-light/50">
          Desarrollado por <BautiSpan />
        </p>

        <img src="/logos/logo_acortado.svg" className="h-20" />

        <p className="text-light/50">© 2025 TIFOSI CUORE</p>
      </section>

    </footer>
  );
};
