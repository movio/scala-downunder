module.exports = {
  body: $('body'),
  header: $(document.getElementById('header')),
  banner: $(document.getElementById('banner')),
  about: $(document.getElementById('about')),
  register: $(document.getElementById('register')),
  speakers: $(document.getElementById('speakers')),
  schedule: $(document.getElementById('schedule')),
  callforpapers: $(document.getElementById('callforpapers')),
  jonasvideo: $(document.getElementById('jonasvideo')),
  jobs: $(document.getElementById('jobs')),
  conduct: $(document.getElementById('conduct')),
  venue: $(document.getElementById('venue')),
  isSmall: function isSmall() {  return window.innerWidth < 992; }
};
