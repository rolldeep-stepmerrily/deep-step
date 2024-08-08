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

  const isValidPassword = validatePassword(password, passwordConfirm);

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
    const response = await axios.post('/api/users/signup', signupPayload);

    console.log(response);
  } catch (e) {
    console.error(e);

    alert('회원가입에 실패했습니다.');
  }
};

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('proceed-button').addEventListener('click', checkTerms);
  document.getElementById('signup-button').addEventListener('click', signup);
});
