const checkTerms = () => {
  const serviceTerm = document.querySelector('#service-term').checked;
  const privacyTerm = document.querySelector('#privacy-term').checked;
  const ageTerm = document.querySelector('#age-term').checked;

  if (!serviceTerm || !privacyTerm || !ageTerm) {
    alert('필수 이용 약관에 동의해주세요.');
    return;
  }

  hideElement('terms-section');
  showElement('signup-section');
};

const signup = async () => {
  const username = document.querySelector('#username').value.trim();

  const isValidUsername = validateUsername(username);

  if (!isValidUsername) {
    return;
  }

  const password = document.querySelector('#password').value.trim();
  const passwordConfirm = document.querySelector('#password-confirm').value.trim();

  if (password !== passwordConfirm) {
    alert('비밀번호가 서로 일치하지 않습니다.');

    return false;
  }

  const isValidPassword = validatePassword(password);

  if (!isValidPassword) {
    return;
  }

  const email = document.querySelector('#email').value.trim();

  const isValidEmail = validateEmail(email);

  if (!isValidEmail) {
    return;
  }

  const name = document.querySelector('#name').value.trim();

  const isValidName = validateName(name);

  if (!isValidName) {
    return;
  }

  const nickname = document.querySelector('#nickname').value.trim();

  const isValidNickname = validateNickname(nickname);

  if (!isValidNickname) {
    return;
  }

  const phoneNumber = document.querySelector('#phone-number').value.trim();

  const isValidPhoneNumber = validatePhoneNumber(phoneNumber);

  if (!isValidPhoneNumber) {
    return;
  }

  const privacyOptionTerm = document.querySelector('#privacy-option-term').checked;

  const signupPayload = {
    username,
    password,
    email,
    name,
    nickname,
    phoneNumber: phoneNumber.replaceAll('-', ''),
    terms: {
      isService: true,
      isPrivacy: true,
      isPrivacyOption: privacyOptionTerm,
      isAge: true,
    },
  };

  try {
    await axios.post('/api/users/signup', signupPayload);

    alert('회원가입이 완료되었습니다.');

    window.location.href = '/';
  } catch (e) {
    console.error(e);

    const message = e.response.data.message;

    alert(message);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#proceed-button').addEventListener('click', checkTerms);
  document.querySelector('#signup-button').addEventListener('click', signup);
});
