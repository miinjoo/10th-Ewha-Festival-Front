import { useAppDispatch, useAppSelector } from "../redux/store";
import { setUser } from "../redux/userSlice";
import { persistor } from "../index";

const ReduxTest = () => {
  const dispatch = useAppDispatch();
  const { userNumber, id, nickname } = useAppSelector(state => state.user);

  const Change = () => {
    dispatch(setUser({ userNumber: 1, id: "maru", nickname: "바부" }));
  };

  const Logout = async () => {
    window.location.reload();
    await persistor.purge();
  };
  return (
    <div>
      <button onClick={() => Change()}>변경</button>
      <button onClick={async () => Logout()}>로그아웃</button>
      <p>userNumber : {userNumber}</p>
      <p>id : {id}</p>
      <p>nickname:{nickname}</p>
    </div>
  );
};

export default ReduxTest;