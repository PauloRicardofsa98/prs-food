import Header from "./_components/header";
import Search from "./_components/search-input";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <Search />
      </div>
    </>
  );
}
