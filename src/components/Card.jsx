import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../features/theme/themeSlice";

function Card() {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme);

  const handleChangeTheme = () => {
    dispatch(changeTheme());
  };

  return (
    <div>
      <h1>Theme: {theme.toString()}</h1>
      <button onClick={handleChangeTheme}>Change Theme</button>
      {theme ? <h2>Hola</h2> : ""}
    </div>
  );
}

export default Card;
