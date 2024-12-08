// SocketContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import useUser from "@/hooks/useUser";

interface SocketContextType {
  socket: Socket | null;
  membersList: string[] | null;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  membersList: null,
});

export const useSocket = (): SocketContextType => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [membersList, setMembersList] = useState<string[] | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const socketInstance = io("http://localhost:5000", {
      query: {
        userId: user.id,
      },
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected");
    });

    socketInstance.on("userList", (updatedMembersList: string[]) => {
      setMembersList(updatedMembersList);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [user?.id]);

  return (
    <SocketContext.Provider value={{ socket, membersList }}>
      {children}
    </SocketContext.Provider>
  );
};
