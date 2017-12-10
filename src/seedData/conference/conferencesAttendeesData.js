const conferencesAttendees = [];

for (let i = 1; i < 70; i += 1) {
  conferencesAttendees.push({
    conference_id: 1,
    user_id: i,
  });
}
conferencesAttendees.push({
  conference_id: 6,
  user_id: 6,
});

module.exports = conferencesAttendees;
