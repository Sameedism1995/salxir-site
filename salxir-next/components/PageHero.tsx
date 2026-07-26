/** Interior-page hero band (kicker + title + subtitle) used on most pages. */
export default function PageHero({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="kicker">{kicker}</div>
      <h1>{title}</h1>
      {children ? <p>{children}</p> : null}
    </section>
  );
}
