export const configuration = {
  github: {
    client_id: '70c1955dfe4914c52c10',
    request_state: 'miro-pad',
  },
  auth_service: 'https://vercel-api-phi.vercel.app/api/auth',
  mail_service: {
    api: 'https://vercel-api-phi.vercel.app/api/mail',
    signature: `Theo Mironidis <br/>
    Software Engineer <br/>
    https://teomrd.github.io`,
  },
  file_service: {
    api: 'https://vercel-api-phi.vercel.app/api/upload',
  },
} as const;
