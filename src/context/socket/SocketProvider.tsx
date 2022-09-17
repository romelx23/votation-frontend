import { FC, useContext, useEffect, useReducer } from "react";
import { useAppDispatch, useAppSelector, useSocket, useVotation } from "../../hooks";
import { GetVotations, Votation, VotationResponse, Votations } from "../../interfaces";
import { setVotation, setVote } from "../../store/slices";
import { SocketContext, SocketReducer, VoteContext } from "../index";
// import.meta.env.BASE_URL;

interface Props {
  children: React.ReactNode;
}

export interface SocketState {
  online: boolean;
}

export const Socket_INITIAL_STATE: SocketState = {
  online: false,
};

export const SocketProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(SocketReducer, Socket_INITIAL_STATE);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const { socket, online } = useSocket(baseUrl);
  const dispatchVotation = useAppDispatch();
  const { votation: votacion } = useAppSelector(state => state.votation);
  // const { setVotation } = useContext(VoteContext);

  const createVotation = (votation: Votation) => {
    console.log("createVotation", votation);
    socket.emit("create-votation", votation);
  };

  const getVotations = () => {
    console.log("getVotations");
    // emitir el evento para obtener las votaciones
    socket.emit("get-votations");
  };

  const incrementVote = (idVotes: string[], idVotation: string) => {
    console.log("increment-vote", idVotes);
    socket.emit("increment-votes", { idVotes, idVotation });
  };
  useEffect(() => {
    // escuchar los eventos
    socket.on("get-votations", (votations: GetVotations) => {
      console.log("get-votations", votations);
      // setVotation(votations.votations);
      dispatchVotation(setVote(votations.votations));
    });
  }, [socket]);

  useEffect(() => {
    console.log(votacion.votation?.uid);
    socket.on("get-votation", (votation: VotationResponse) => {
      if (votation.votation?.uid !== votacion.votation?.uid) return;
      console.log("get-votation", votation);
      dispatchVotation(setVotation(votation));
    });
  }, [socket, votacion]);


  return (
    <SocketContext.Provider
      value={{
        ...state,
        createVotation,
        getVotations,
        incrementVote
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
