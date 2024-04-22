import * as React from "react";
import {
  Text, View
} from 'react-native';
import { useSelector } from "react-redux";  

const Message = () => {
    const message = useSelector((state) => state.apiReducer.message);
    const msg = useSelector((state) => state.apiReducer.msg);
    const error = useSelector((state) => state.apiReducer.error);
    const errormsg = useSelector((state) => state.apiReducer.errormsg);

    return (
        <View>
          {message && <Text>{ message }</Text>}
          {error && <Text>{ error }</Text>}
          {msg && <Text>{ msg }</Text>}
          {errormsg && <Text>{ errormsg }</Text>}
        </View>
      );
}

export default Message;