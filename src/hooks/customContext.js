import { useContext } from "react";
import { MainContext } from '../hoc/MainContextProvider';

const useCustomContext = () => {
  return useContext(MainContext);
};

export default useCustomContext;