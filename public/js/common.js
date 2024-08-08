const hideElement = (elementId) => {
  document.querySelector(`#${elementId}`).classList.add('hidden');
};

const showElement = (elementId) => {
  document.querySelector(`#${elementId}`).classList.remove('hidden');
};

const validateUsername = (username) => {
  if (!/^[a-zA-Z0-9]{4,16}$/.test(username)) {
    alert('사용자 이름은 4~16자의 영문 대소문자와 숫자로만 입력해주세요.');

    return false;
  }

  return true;
};

const validatePassword = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    alert('비밀번호가 일치하지 않습니다.');

    return false;
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[`~!@#$%^&*()_=+])[A-Za-z\d`~!@#$%^&*()_=+]{8,16}$/.test(password)) {
    alert('비밀번호는 8~16자의 영문 대소문자, 숫자, 특수문자로 입력해주세요.');

    return false;
  }

  return true;
};

const validateEmail = (email) => {
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    alert('이메일 주소를 다시 확인해주세요.');

    return false;
  }

  return true;
};

const validateName = (name) => {
  if (!/^.{2,6}$/.test(name)) {
    alert('이름은 2~6글자만 입력해주세요.');

    return false;
  }

  return true;
};

const validateNickname = (nickname) => {
  if (!/^[a-zA-Z0-9가-힣]{2,10}$/.test(nickname)) {
    alert('닉네임은 2~10자의 영문, 숫자, 한글로만 입력해주세요.');

    return false;
  }

  return true;
};

const validatePhoneNumber = (phoneNumber) => {
  if (!/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/.test(phoneNumber)) {
    alert('전화번호를 다시 확인해주세요.');

    return false;
  }

  return true;
};
