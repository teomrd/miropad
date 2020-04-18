import storage from "../localstorage";
import { getNotes } from "../../components/noteManager/noteManager";

export const getGist = (id, token = storage.get("authToken")) =>
  fetch(`https://api.github.com/gists/${id}`, {
    headers: {
      Authorization: `token ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });

export const getAuthenticatedUsersGists = (token = storage.get("authToken")) =>
  fetch("https://api.github.com/gists", {
    headers: {
      Authorization: `token ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });

export const updateGist = (
  gistId = storage.get("gistId"),
  token = storage.get("authToken")
) => {
  const notes = getNotes();
  const noteToFiles = notes.reduce((acc, { id, text, deleted }) => {
    return {
      ...acc,
      [id]: deleted ? null : { content: text },
    };
  }, {});
  return fetch(`https://api.github.com/gists/${gistId}`, {
    method: "PATCH",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      files: noteToFiles,
      description: "MiroPad Gist",
      public: false,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((responseAsJson) => {
      console.log(responseAsJson);
      return responseAsJson;
    });
};

export const createNewGist = (token = storage.get("authToken")) => {
  const notes = getNotes();
  const noteToFiles = notes.reduce((acc, note) => {
    return {
      ...acc,
      [note.id]: {
        content: note.text,
      },
    };
  }, {});
  return fetch("https://api.github.com/gists", {
    method: "POST",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      files: noteToFiles,
      description: "MiroPad Gist",
      public: false,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((responseAsJson) => {
      console.log(responseAsJson);
      return responseAsJson;
    });
};

export const getAuthToken = (code, state) =>
  fetch(`https://miropad.herokuapp.com/auth?state=${state}&code=${code}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("response", response);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((responseAsJson) => {
      console.log(responseAsJson);
      return responseAsJson;
    });
