module.exports = {
  header: $(document.getElementById('header')),
  banner: $(document.getElementById('banner')),
  about: $(document.getElementById('about')),
  register: $(document.getElementById('register')),
  schedule: $(document.getElementById('schedule')),
  venue: $(document.getElementById('venue')),
  isSmall: function isSmall() {  return window.innerWidth < 992; }
};
