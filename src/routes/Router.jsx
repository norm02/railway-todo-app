import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { SignIn } from "../pages/SignIn";
import { NewTask } from "../pages/NewTask";
import { NewList } from "../pages/NewList";
import { EditTask } from "../pages/EditTask";
import { SignUp } from "../pages/SignUp";
import { EditList } from "../pages/EditList";

export const AppRouter = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {auth ? (
          <>
            {
              // authがtrueの場合：Home, NewTask, NewList, EditTask, EditListのルーティングを許可する
            }
            <Route index path="/" element={<Home />} />
            <Route path="/task/new" element={<NewTask />} />
            <Route path="/list/new" element={<NewList />} />
            <Route path="/lists/:listId/tasks/:taskId" element={<EditTask />} />
            <Route path="/lists/:listId/edit" element={<EditList />} />
          </>
        ) : (
          // authがfalseの場合：/signinにリダイレクトする
          <Route
            path="/*"
            element={<Navigate to="/signin" replace state={{ from: "*" }} />}
          />
        )}
        {
          // どのルーティングにも当てはまらない場合：NotFoundページを表示する
        }
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
