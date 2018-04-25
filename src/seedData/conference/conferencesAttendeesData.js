const conferencesAttendees = [];

for (let i = 1; i <= 123; i += 1) {
  conferencesAttendees.push({
    conference_id: 1,
    user_id: i,
  });
}

for (let i = 2; i < 13; i += 1) {
  conferencesAttendees.push({
    conference_id: i,
    user_id: 6,
  });
}

module.exports = conferencesAttendees;
