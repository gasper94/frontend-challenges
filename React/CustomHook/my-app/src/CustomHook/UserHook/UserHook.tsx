import { useEffect, useState } from "react";
import axios from "axios";

export type User = {
  name: string;
  thumbnail: string;
};

export const useCustomHook = (
  url: string
): [User[], boolean, number, () => void, () => void, () => void] => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<number>(0);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = (): void => {
    try {
      setLoading(true);
      axios
        .get(url)
        .then((res) => {
          const {
            data: { results },
          } = res;
          console.log("user:", results[0]);
          const {
            name: { first },
            name: { last },
            picture: { thumbnail },
          } = results[0];

          const newUser: User = {
            name: `${first} ${last}`,
            thumbnail: thumbnail,
          };

          setUsers([...users, newUser]);

          setLoading(false);
        })
        .catch((Error) => {
          console.log("Error:", Error);
        });
    } catch (error) {
      alert("error:" + error);
    }
  };

  useEffect(() => {
    setCurrentUser(users.length - 1);
  }, [users]);

  const next = (): void => {
    if (currentUser < users.length - 1) {
      setCurrentUser(currentUser + 1);
    } else {
      fetchUser();
    }
  };

  const previous = (): void => {
    if (currentUser > 0) {
      setCurrentUser(currentUser - 1);
    }
  };

  return [users, loading, currentUser, fetchUser, next, previous];
};
