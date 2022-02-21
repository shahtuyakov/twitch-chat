import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel
} from 'stream-chat-react';
import Auth from './components/Auth'
import MessagingContainer from './components/MessagingContainer';
import Video from './components/video';
import '@stream-io/stream-chat-css/dist/css/index.css';


const client = StreamChat.getInstance('cb5x6p56jt6d');

const App = () => {
  const [cookies, setCookie, removeCookies] = useCookies(['user'])
  // const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState(null);
  const [ users, setUsers ] = useState(null);
 
  const authToken = cookies.AuthToken;


  useEffect( async () => {
      if (authToken){
        const { users } = await client.queryUsers({ role: 'user'})
        setUsers(users);
      }
  }, []);

  const setupClient = async () => {
    try {
      await client.connectUser(
        {
          id: cookies.UserId,
          name: cookies.Name,
          hashedPassword: cookies.HashedPassword,
        },
        authToken,
      );

      const channel = await client.channel('gaming', 'gaming-demo', {
        name: 'Gaming Demo'
      })
      setChannel(channel);

    } catch (err) {
      console.log(err);
    }
  };

  if (authToken) setupClient();

  return (
    <>
        {!authToken && <Auth/>}
        {authToken && <Chat client={client} darkMode={true}>
          <Channel channel={channel}>
            <Video/>
            <MessagingContainer users={ users }/>
          </Channel>
        </Chat>}
    </>
  );
 
};

export default App;
