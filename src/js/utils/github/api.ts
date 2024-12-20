import storage from "../localstorage.js";
import {
  getNotes,
  Note,
} from "../../components/organisms/noteManager/noteManager.ts";
import notify from "../../components/molecules/notify.ts";
import { configuration } from "../../../configuration.ts";

export const getGist = (id: string, token = storage.get("authToken")) =>
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

export const deleteFileOnGist = async (
  fileName: string,
  gistId = storage.get("gistId"),
  token = storage.get("authToken"),
) => {
  const response = await fetch(`https://api.github.com/gists/${gistId}`, {
    method: "PATCH",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      files: {
        [fileName]: null,
      },
      description: "MiroPad Gist",
      public: false,
    }),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const responseAsJson = await response.json();
  notify.info(`${fileName} deleted on Gist!`);
  return responseAsJson;
};

export const updateGist = (
  notes = getNotes(),
  gistId = storage.get("gistId"),
  token = storage.get("authToken"),
) => {
  if (gistId && token) {
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
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((responseAsJson) => {
        notes.map(({ id, deleted }) => {
          if (deleted) localStorage.removeItem(id);
        });
        return responseAsJson;
      });
  }
};

export const createNewGist = async (token = storage.get("authToken")) => {
  const notes = getNotes();
  const noteToFiles = notes.reduce((acc, note) => {
    return {
      ...acc,
      [note.id]: {
        content: note.text,
      },
    };
  }, {});
  const response = await fetch("https://api.github.com/gists", {
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
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const responseAsJson = await response.json();
  return responseAsJson;
};

export const getAuthToken = (code: string, state: string) =>
  fetch(`${configuration.auth_service}?state=${state}&code=${code}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((responseAsJson) => {
      return responseAsJson;
    });

export const publishGist = async ({
  note,
  token = storage.get("authToken"),
}: {
  note: Note;
  token?: string;
}) => {
  const response = await fetch("https://api.github.com/gists", {
    method: "POST",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      files: {
        [note.id]: {
          content: note.text,
        },
      },
      description: "MiroPad Gist",
      public: true,
    }),
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const responseAsJson = await response.json();
  return responseAsJson;
};
