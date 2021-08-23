export const setErrorsWrapper = (setErrors, error, errors) => {
    console.log(JSON.stringify(error, null, 2));
    error.graphQLErrors.length
        ? setErrors(error.graphQLErrors[0].extensions.errors)
        : setErrors({
              ...errors,
              general: 'Connexion au serveur impossible',
          });
};
