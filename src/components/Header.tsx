import { SearchBar } from "./SearchBar";


interface HeaderProps {
  handleSearch: (query: string) => void;
}

export const Header = ({ handleSearch }: HeaderProps) => {
  return (
    <header className="header">
      <p className="logo">Logo</p>
      <SearchBar />
    </header>
  );
};
