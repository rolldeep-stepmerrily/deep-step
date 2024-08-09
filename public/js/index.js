const signin = async () => {
  const username = document.querySelector('#username').value.trim();

  const isValidUsername = validateUsername(username);

  if (!isValidUsername) {
    return;
  }

  const password = document.querySelector('#password').value.trim();

  const isValidPassword = validatePassword(password);

  if (!isValidPassword) {
    return;
  }

  try {
    const response = await axios.post('/api/users/signin', { username, password });

    const { accessToken } = response.data;

    if (accessToken) {
      sessionStorage.setItem('accessToken', accessToken);

      window.location.href = '/chat-room';
    }
  } catch (e) {
    console.error(e);

    const message = e.response.data.message;

    alert(message);
  }

  console.log(response);
};

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#signin-button').addEventListener('click', signin);
});
