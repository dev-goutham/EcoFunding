// Form Input Data
export const inputData = [
   
    {
        id: 3,
        type: 'email',
        name: 'email',
        placeholder: 'Email',
        required: true,
        errMsg: 'Isso não parece um email',
        pattern: '^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|"[a-zA-Z0-9.+!% -]{1,64}")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$'
    },
    {
        id: 4,
        type: 'password',
        name: 'password',
        placeholder: 'Senha',
        required: true,
        errMsg: 'Senha deve conter ao entre 8 e 10 digitos.',
        pattern: "^[A-Za-z0-9!@#$%^&*]{8,20}$"
    },
]