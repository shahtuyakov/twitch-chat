import { ChannelHeader, MessageInput, MessageList, Thread, Window } from "stream-chat-react";
import { useState } from "react";
import { useCookies } from "react-cookie"
import UserList from "./UserList";
import { FaUser, FaArrowAltCircleLeft } from "react-icons/fa"



const MessagingContainer = ({ users }) => {

    const [cookies, setCookie, removeCookies] = useCookies(['user']);
    const [userListVisible, setUserListVisible] = useState(false);

    const logout = () => {
        removeCookies('Name', cookies.Name);
        removeCookies('HashedPassword', cookies.HashedPassword);
        removeCookies('UserId', cookies.UserId);
        removeCookies('AuthToken', cookies.AuthToken);
        window.location.reload();
    }

    return (
        <div className="messaging-container">
            {!userListVisible && (
                <Window>
                    <FaUser className="icon" onClick={() => setUserListVisible(true)}/>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                    <button className="standart-button"onClick={logout} >Logout</button>
                    {/* <UserList users={ users }/> */}
            </Window>
            )}
            
            { userListVisible && (
                <Window>
                    <div className="chat-container"> 
                        <FaArrowAltCircleLeft className="icon" onClick={() => setUserListVisible(false)}/>
                        <ChannelHeader title="Users"/>
                        <UserList users={ users }/>
                    </div>
                </Window>
            )}
            <Thread />
        </div>
    )
}
 

export default MessagingContainer;