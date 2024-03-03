import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";

const ConversationsContext = createContext();

const arrayEquality = (a, b) => {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
};

export const useConversation = () => {
  return useContext(ConversationsContext);
};

export const ConversationsProvider = ({ id, children }) => {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const { contacts } = useContacts();
  const { socket } = useSocket();
  const [selectedConversionIndex, setSelectedConversionIndex] = useState(0);

  const createConversation = (recipients) => {
    return setConversations((prevConversations) => {
      return [
        ...prevConversations,
        {
          recipients,
          messages: [{ sender: "Admin", text: "Welcome to the chat!" }],
        },
      ];
    });
  };

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        const newMessage = { sender, text };

        const doesConversationExist = prevConversations.some((conversation) => {
          return arrayEquality(conversation.recipients, recipients);
        });

        if (doesConversationExist) {
          return prevConversations.map((conversation) => {
            if (arrayEquality(conversation.recipients, recipients)) {
              return {
                ...conversation,
                messages: [...conversation.messages, newMessage],
              };
            }

            return conversation;
          });
        }

        return [...prevConversations, { recipients, messages: [newMessage] }];
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) {
      return;
    }

    socket.on("receive-message", addMessageToConversation);

    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  const sendMessage = ({ recipients, text }) => {
    socket.emit("send-message", { recipients, text });

    addMessageToConversation({
      recipients,
      text,
      sender: id,
    });
  };

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => contact.id === recipient);
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => contact.id === message.sender);
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversionIndex;
    return { ...conversation, recipients, messages, selected };
  });

  return (
    <ConversationsContext.Provider
      value={{
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversionIndex],
        createConversation,
        setSelectedConversation: setSelectedConversionIndex,
        sendMessage,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
