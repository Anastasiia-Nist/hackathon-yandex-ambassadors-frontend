import { NavLink, useLocation } from "react-router-dom";
import SearchBlock from "../SearchBlock/SearchBlock";
import Tabs from "../Tabs/Tabs";
import "./AmbassadorsPage.css";
import BudgetPrice from "../Tables/BudgetPrice";

function AmbassadorsPage() {
  const { pathname } = useLocation();

  return (
    <section className="page">
      {pathname.includes("/budget") && (
        <ul className="page__buget">
          <NavLink
            className="page__link"
            to="/budget/info"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#1D6BF3" : "",
              color: isActive ? "#FFFFFF" : "",
            })}
          >
            Бюджет
          </NavLink>
          <NavLink
            className="page__link"
            to="/budget/price"
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#1D6BF3" : "",
              color: isActive ? "#FFFFFF" : "",
            })}
          >
            Стоимость товара
          </NavLink>
        </ul>
      )}
      <SearchBlock></SearchBlock>
      <Tabs></Tabs>
    </section>
  );
}

export default AmbassadorsPage;
