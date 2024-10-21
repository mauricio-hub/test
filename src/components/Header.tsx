import { SearchBar } from "./SearchBar";
import logo from "../assets/logo.png";

interface HeaderProps {
  handleSearch: (query: string) => void;
}

export const Header = ({ handleSearch }: HeaderProps) => {
  return (
    <header className="header">
       <img src={logo} alt="Logo" className="logo"  />
      <SearchBar onSearch={handleSearch} />
    </header>
  );
};
