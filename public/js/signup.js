function proceedToSignup() {
  const serviceTerms = document.querySelector('#serviceTerms').checked;
  const privacyTerms = document.querySelector('#privacyTerms').checked;
  const privacyOptionTerms = document.querySelector('#privacyOptionTerms').checked;
  const ageTerms = document.querySelector('#ageTerms').checked;

  if (!serviceTerms || !privacyTerms || !ageTerms) {
    alert('필수 이용 약관에 동의해주세요.');
    return;
  }

  hideElement('terms-section');
  showElement('signup-section');
}

function signup() {
  console.log('회원가입 ㄱㄱ;;');
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('proceed-button').addEventListener('click', proceedToSignup);
  document.getElementById('signup-button').addEventListener('click', signup);
});
