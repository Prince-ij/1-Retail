import { Alert } from "react-bootstrap";
import { useEffect} from "react";
import { notify } from "../../reducers/notificationReducer";
import { useAppDispatch } from "../../hooks";

interface PropsType {
  type: "danger" | "success" | "";
  message: string;
}

const AlertDismissable = ({ type, message }: PropsType) => {
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (!message) return;
    setTimeout(() => {
      dispatch(notify({type: "", message: ""}))
    }, 5000);
  }, [dispatch, message]);

  return (
    message && (
      <Alert variant={type} dismissible className="m-2 fixed-top">
        {message}
      </Alert>
    )
  );
};

export default AlertDismissable;
